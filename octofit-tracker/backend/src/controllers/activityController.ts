import { Request, Response } from 'express';
import Activity from '../models/activity';

export const listActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().limit(100).lean();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
