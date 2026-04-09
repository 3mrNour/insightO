import cors from 'cors';
import express from 'express';
import { errorHandler } from './src/middlewares/errorHandler.js';
import authRoutes from './src/Routes/authRoutes.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/', authRoutes);

  app.use((_req, _res, next) => {
    const err = new Error('Not Found') as Error & { status: number };
    err.status = 404;
    next(err);
  });

  app.use(errorHandler);
  return app;
}