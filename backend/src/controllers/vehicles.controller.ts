import { Request, Response } from 'express';
import { pool } from '../db';

export const getAllVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      limit = 12, // Default limit for how many vehicles to fetch
      offset = 0,
      // Add other potential filter query params here if needed in the future
      // brand, model, year_min, year_max, price_min, price_max
    } = req.query;

    // Basic validation for limit and offset
    const numLimit = parseInt(limit as string, 10);
    const numOffset = parseInt(offset as string, 10);

    if (isNaN(numLimit) || isNaN(numOffset) || numLimit <= 0 || numOffset < 0) {
      res.status(400).json({ message: 'Invalid limit or offset parameters.' });
      return;
    }

    // For now, we are only filtering by status = 'available'
    // In the future, you can build more complex WHERE clauses here based on query params
    const whereClauses = ["v.status = 'available'"];
    const queryParams: any[] = [];
    let paramIndex = 1;

    // Example: If you were to add a brand filter
    // if (brand) {
    //   whereClauses.push(`v.brand ILIKE $${paramIndex++}`);
    //   queryParams.push(`%${brand}%`);
    // }

    const query = `
      SELECT
        v.*,
        (
          SELECT vi.image_url -- Assumes vehicle_images.image_url stores the full S3 URL
          FROM dealership.vehicle_images vi
          WHERE vi.vehicle_id = v.id
          ORDER BY vi.is_primary DESC, vi.uploaded_at ASC -- Prioritize primary, then oldest uploaded
          LIMIT 1
        ) AS main_image_url
      FROM dealership.vehicles v
      WHERE ${whereClauses.join(' AND ')} -- Currently just "v.status = 'available'"
      ORDER BY v.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++};
    `;

    // Add limit and offset to the query parameters *after* any filter params
    const finalQueryParams = [...queryParams, numLimit, numOffset];

    const result = await pool.query(query, finalQueryParams);

    // Also fetch total count for pagination purposes (optional but good for UI)
    const countQuery = `SELECT COUNT(*) FROM dealership.vehicles v WHERE ${whereClauses.join(' AND ')};`;
    const countResult = await pool.query(countQuery, queryParams); // Use only filter params for count

    const totalVehicles = parseInt(countResult.rows[0].count, 10);

    res.json({
      vehicles: result.rows,
      totalVehicles: totalVehicles,
      currentPage: Math.floor(numOffset / numLimit) + 1,
      totalPages: Math.ceil(totalVehicles / numLimit),
    });

  } catch (error) {
    console.error('Error fetching all vehicles:', error);
    res.status(500).json({ message: 'Error fetching vehicles', error: (error as Error).message });
  }
};

export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Fetch vehicle details
    const vehicleResult = await pool.query(
      'SELECT * FROM dealership.vehicles WHERE id = $1',
      [id]
    );

    if (vehicleResult.rows.length === 0) {
      res.status(404).json({ message: 'Vehicle not found' });
      return
    }

    const vehicle = vehicleResult.rows[0];

    // Fetch vehicle images
    const imagesResult = await pool.query(
      'SELECT id, image_url, sort_order FROM dealership.vehicle_images WHERE vehicle_id = $1 ORDER BY sort_order ASC, id ASC',
      [id]
    );

    // Add images to the vehicle object
    vehicle.images = imagesResult.rows;

    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    const e = error as Error;
    res.status(500).json({ message: 'Error fetching vehicle data', error: e.message });
  }
};

export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  const { brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status } = req.body;
  const result = await pool.query(
    `INSERT INTO dealership.vehicles 
     (brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status) 
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status]
  );
  res.status(201).json(result.rows[0]);
};

export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status } = req.body;
  const result = await pool.query(
    `UPDATE dealership.vehicles SET 
     brand=$1, model=$2, year=$3, price=$4, mileage=$5, description=$6,
     outer_equipment=$7, inner_equipment=$8, status=$9
     WHERE id=$10 RETURNING *`,
    [brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status, id]
  );
  res.json(result.rows[0]);
};

export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await pool.query('DELETE FROM dealership.vehicles WHERE id = $1', [id]);
  res.status(204).send();
};
