import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { DependencyContainer } from './infrastructure/DependencyContainer';
import { createUserRoutes } from './presentation/routes/userRoutes';

export function createApp(): express.Application {
  const app = express();
  const container = new DependencyContainer();

  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.use('/api', createUserRoutes(container.getUserController()));

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  return app;
}
