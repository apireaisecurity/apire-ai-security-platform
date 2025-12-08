import { Router } from 'express';
import { ScannerController } from '../controllers/scanner.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const scannerController = new ScannerController();

// Protected route - only authenticated users can scan
router.post('/', authenticate, scannerController.scan);

export { router as scannerRoutes };
