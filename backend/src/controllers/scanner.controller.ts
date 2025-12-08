import { Request, Response } from 'express';
import { ScannerService } from '../services/scanner.service';
import { scanSchema } from '../utils/validators';

const scannerService = new ScannerService();

export class ScannerController {
  async scan(req: Request, res: Response) {
    try {
      const validation = scanSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
      }

      const result = await scannerService.scan(validation.data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
