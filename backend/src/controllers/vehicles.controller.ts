import { Request, Response } from 'express';
import { pool } from '../db';

export const getAllVehicles = async (_req: Request, res: Response): Promise<void> => {
  const result = await pool.query(`SELECT * FROM dealership.vehicles WHERE status = 'available' ORDER BY created_at DESC`);
  res.json(result.rows);
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
      'SELECT id, url, sort_order FROM dealership.vehicle_images WHERE vehicle_id = $1 ORDER BY sort_order ASC, id ASC',
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
