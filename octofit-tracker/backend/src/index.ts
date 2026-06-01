import express, { Express, Request, Response } from 'express';
import './config/database';
import dotenv from 'dotenv';
import usersRouter from './routes/users';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API' });
});

// API routes
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
