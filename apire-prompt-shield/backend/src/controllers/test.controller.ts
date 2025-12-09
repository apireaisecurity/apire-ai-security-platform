import { Request, Response } from "express";
import { TestService } from "../services/test.service";
import { TestRequest } from "../types";

const testService = new TestService();

export class TestController {
  async createTest(req: Request, res: Response) {
    try {
      const request: TestRequest = req.body;
      // Basic validation
      if (!request.input || !request.checks) {
        return res
          .status(400)
          .json({ error: "Missing required fields: input, checks" });
      }

      const job = await testService.createTest(request);
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getTest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const job = await testService.getTest(id);

      if (!job) {
        return res.status(404).json({ error: "Test not found" });
      }

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
