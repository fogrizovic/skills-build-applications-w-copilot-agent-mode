import { Request, Response } from 'express';
import User from '../models/user';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().limit(50).lean();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to create user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};
