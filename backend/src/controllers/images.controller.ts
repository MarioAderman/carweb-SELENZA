import { Request, Response } from 'express';
import { pool } from '../db';

export const getVehicleImages = async (req: Request, res: Response): Promise<void> => {
  const { vehicleId } = req.params;
  const result = await pool.query(
    'SELECT * FROM dealership.vehicle_images WHERE vehicle_id = $1 ORDER BY sort_order ASC',
    [vehicleId]
  );
  res.json(result.rows);
};

export const addImageToVehicle = async (req: Request, res: Response): Promise<void> => {
  const { vehicle_id, url, sort_order } = req.body;
  const result = await pool.query(
    `INSERT INTO dealership.vehicle_images (vehicle_id, url, sort_order) VALUES ($1, $2, $3) RETURNING *`,
    [vehicle_id, url, sort_order || 0]
  );
  res.status(201).json(result.rows[0]);
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await pool.query('DELETE FROM dealership.vehicle_images WHERE id = $1', [id]);
  res.status(204).send();
};
