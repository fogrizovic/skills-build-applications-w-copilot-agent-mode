import { Request, Response } from 'express';
import Activity from '../models/activity';

export const listActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().limit(100).lean();
    return res.json(activities);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
