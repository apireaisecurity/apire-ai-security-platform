import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

import testRoutes from './routes/test.routes';
import { authenticate } from './middleware/auth.middleware';

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'apire-prompt-shield-api' });
});

app.use('/api/v1', authenticate, testRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
