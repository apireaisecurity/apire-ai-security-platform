import { Router } from 'express';
import { ScanController } from '../controllers/scan.controller';

const router = Router();
const scanController = new ScanController();

router.post('/scans', scanController.createScan.bind(scanController));

export default router;
