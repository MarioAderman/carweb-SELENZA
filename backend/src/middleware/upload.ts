import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../lib/s3'; // Assuming s3.ts is in a lib folder
import { UploadRequest } from '../types/express'; // Correct path to your type

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;
const MAX_FILES_TO_UPLOAD = 10; // Define a max number of files per upload

// Updated buildKey function to include vehicleId
const buildS3Key = (folder: string, model: string, vehicleId: string, filename: string) =>
  `${folder}/${model.toUpperCase()}/${vehicleId}/${Date.now()}-${filename}`;

export const uploadVehicleImages = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req: UploadRequest, file, cb) => { // req should be of type UploadRequest
      // Ensure model and vehicleId are present in params
      const model = req.params?.model;
      const vehicleId = req.params?.vehicleId;

      if (!model || !vehicleId) {
        // Handle error: model or vehicleId is missing.
        // You might want to pass an error to the callback.
        // For now, logging and using a fallback.
        console.error('Model or VehicleId missing in request params for S3 key generation.');
        // cb(new Error('Model or VehicleId missing')); // This would stop the upload
        // Fallback key or specific error handling needed if params are critical for key
        const fallbackKey = `vehicles/ERRORS/${Date.now()}-${file.originalname}`;
        return cb(null, fallbackKey);
      }

      const key = buildS3Key('vehicles', model, vehicleId, file.originalname);
      cb(null, key);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10, // Limit file size to 10MB (optional)
  },
  fileFilter: (req, file, cb) => { // Optional: Filter for image types
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}).array('vehicleImages', MAX_FILES_TO_UPLOAD);
