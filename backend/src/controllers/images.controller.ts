import { Request, Response } from 'express';
import { pool } from '../db';
import { s3 } from '../lib/s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import type { UploadRequest } from '../types/express';

interface S3File extends Express.Multer.File {
  location?: string; // URL of the uploaded file on S3
  key?: string;      // Key of the uploaded file on S3 (path in bucket)
  // acl?: string;
  // contentType?: string; // This is usually the same as mimetype
  // bucket?: string;
  // etag?: string;
  // serverSideEncryption?: string;
  // metadata?: any;
}

interface DeleteImageParams {
  imageId: string;
}

export const getVehicleImages = async (req: Request, res: Response): Promise<void> => {
  const { vehicleId } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, vehicle_id, image_url, sort_order, s3_key, mime_type, original_filename, is_primary, uploaded_at FROM dealership.vehicle_images WHERE vehicle_id = $1 ORDER BY sort_order ASC, id ASC', // Added id ASC for stable sort
      [vehicleId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching vehicle images:', error);
    res.status(500).json({ message: 'Error fetching vehicle images.' });
  }
};

export const addImageToVehicle = async (req: UploadRequest, res: Response): Promise<void> => {
  const { vehicleId } = req.params; // vehicleId from route params

  // req.files is populated by multer's .array() middleware
  const files = req.files as S3File[] | undefined; // Cast to S3File array

  if (!files || files.length === 0) {
    res.status(400).json({ message: 'No files uploaded.' });
    return;
  }

  if (!vehicleId) {
    // This check might be redundant if your route structure guarantees vehicleId
    res.status(400).json({ message: 'Vehicle ID is missing.' });
    return;
  }

  const client = await pool.connect(); // Get a client from the pool for transaction

  try {
    await client.query('BEGIN'); // Start transaction

    const insertedImagesMetadata = [];

    for (const file of files) {
      if (!file.location || !file.key) {
        console.error('Uploaded file is missing S3 location or key:', file.originalname);
        // Optionally, you could add this to an errors array to return to the client
        continue; // Skip this file
      }

      const queryText = `
        INSERT INTO dealership.vehicle_images 
          (vehicle_id, image_url, s3_key, mime_type, original_filename, sort_order, is_primary)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, image_url, s3_key, vehicle_id, sort_order, is_primary, mime_type, original_filename, uploaded_at;
      `;
      // Default sort_order to 0, is_primary to false. You might want more sophisticated logic.
      // For example, make the first uploaded image primary, or allow client to specify.
      const queryParams = [
        parseInt(vehicleId, 10),
        file.location,
        file.key,
        file.mimetype,
        file.originalname,
        0,       // Default sort_order
        false    // Default is_primary
      ];

      const result = await client.query(queryText, queryParams);
      if (result.rows[0]) {
        insertedImagesMetadata.push(result.rows[0]);
      }
    }

    if (insertedImagesMetadata.length === 0 && files.length > 0) {
        // This means all files had issues (e.g. missing location/key)
        await client.query('ROLLBACK'); // Rollback transaction
        res.status(500).json({ message: 'Error processing uploaded files. S3 location/key missing for all files.' });
        return;
    }
    
    await client.query('COMMIT'); // Commit transaction

    res.status(201).json({
      message: `${insertedImagesMetadata.length} image(s) uploaded and linked successfully.`,
      images: insertedImagesMetadata,
    });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error saving image metadata to DB:', error);
    // Note: Files are already on S3. A more robust solution might try to delete them from S3 on DB error.
    res.status(500).json({ message: 'Error saving image information to the database.' });
  } finally {
    client.release(); // Release client back to the pool
  }
};

export const deleteImage = async (req: Request<DeleteImageParams>, res: Response): Promise<void> => {
  const { imageId } = req.params;
  const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

  if (!imageId) {
    res.status(400).json({ message: 'Image ID is required.' });
    return;
  }
  if (!BUCKET_NAME) {
    console.error('AWS_BUCKET_NAME environment variable is not set.');
    res.status(500).json({ message: 'Server configuration error for S3 bucket.' });
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Fetch image details (especially s3_key) from DB
    const imageResult = await client.query(
      'SELECT s3_key FROM dealership.vehicle_images WHERE id = $1',
      [imageId]
    );

    if (imageResult.rows.length === 0) {
      await client.query('ROLLBACK');
      res.status(404).json({ message: 'Image not found in database.' });
      return;
    }
    const s3Key = imageResult.rows[0].s3_key;

    // 2. Delete from S3
    if (s3Key) { // Only attempt S3 delete if s3_key exists
        try {
          await s3.send(new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: s3Key,
          }));
        } catch (s3Error) {
            // Log S3 deletion error but proceed to delete from DB if desired,
            // or rollback if S3 deletion is critical.
            console.error(`Error deleting image ${s3Key} from S3:`, s3Error);
            // Depending on policy, you might choose to rollback here:
            // await client.query('ROLLBACK');
            // return res.status(500).json({ message: 'Failed to delete image from S3 storage.' });
        }
    } else {
        console.warn(`Image ID ${imageId} has no s3_key. Skipping S3 deletion.`);
    }


    // 3. Delete from DB
    const deleteDbResult = await client.query(
      'DELETE FROM dealership.vehicle_images WHERE id = $1 RETURNING id',
      [imageId]
    );

    if (deleteDbResult.rowCount === 0) {
        // This case should ideally be caught by the earlier check, but as a safeguard
        await client.query('ROLLBACK');
        res.status(404).json({ message: 'Image not found in database for deletion (race condition or unexpected state).' });
        return;
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Image deleted successfully.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image.' });
  } finally {
    client.release();
  }
};
