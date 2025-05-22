import { Request, Response } from 'express';
import { pool } from '../db';

export const getSources = async (_req: Request, res: Response): Promise<void> => {
  const result = await pool.query('SELECT * FROM dealership.survey_sources ORDER BY name');
  res.json(result.rows);
};

export const submitSurveyResponse = async (req: Request, res: Response): Promise<void> => {
  const { session_id, source_id, details } = req.body;
  const result = await pool.query(
    `INSERT INTO dealership.survey_responses (session_id, source_id, details) VALUES ($1, $2, $3) RETURNING *`,
    [session_id, source_id, details]
  );
  res.status(201).json(result.rows[0]);
};
