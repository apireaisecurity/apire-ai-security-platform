import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';

config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
import { authRoutes } from './routes/auth.routes';
import { scannerRoutes } from './routes/scanner.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/scanner', scannerRoutes);

export { app };
