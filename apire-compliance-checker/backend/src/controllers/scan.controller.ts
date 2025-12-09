import { Request, Response } from "express";
import { ScanService } from "../services/scan.service";

const scanService = new ScanService();

export class ScanController {
  async createScan(req: Request, res: Response) {
    try {
      const { config, frameworks } = req.body;
      if (!config || !frameworks) {
        return res.status(400).json({ error: "Missing config or frameworks" });
      }

      const result = await scanService.runScan(config, frameworks);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
