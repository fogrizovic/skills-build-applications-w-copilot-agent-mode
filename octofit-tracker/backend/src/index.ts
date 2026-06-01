import express, { Express, Request, Response } from 'express';
import './config/database';
import { API_BASE_URL, PORT } from './server';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL });
});

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ apiBaseUrl: API_BASE_URL, port: PORT });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Base URL: ${API_BASE_URL}`);
});
