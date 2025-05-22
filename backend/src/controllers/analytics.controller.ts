import { Request, Response } from 'express';
import { pool } from '../db';

export const getAllAnalyticsEvents = async (_req: Request, res: Response): Promise<void> => {
  const result = await pool.query('SELECT * FROM dealership.analytics_events ORDER BY occurred_at DESC');
  res.json(result.rows);
};

export const registerEvent = async (req: Request, res: Response): Promise<void> => {
  const { session_id, event_name, event_properties } = req.body;
  const result = await pool.query(
    `INSERT INTO dealership.analytics_events (session_id, event_name, event_properties) VALUES ($1, $2, $3) RETURNING *`,
    [session_id, event_name, event_properties || {}]
  );
  res.status(201).json(result.rows[0]);
};
