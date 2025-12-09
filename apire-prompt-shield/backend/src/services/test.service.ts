import { TestRequest, TestJob, TestResult } from "../types";
import { v4 as uuidv4 } from "uuid";

// Mock storage for now
const tests: Map<string, TestJob> = new Map();

export class TestService {
  async createTest(request: TestRequest): Promise<TestJob> {
    const id = uuidv4();
    const job: TestJob = {
      id,
      status: "queued",
      created_at: new Date(),
      request,
    };

    tests.set(id, job);

    // Simulate async processing
    this.processTest(id);

    return job;
  }

  async getTest(id: string): Promise<TestJob | undefined> {
    return tests.get(id);
  }

  // Simulate worker processing
  private async processTest(id: string) {
    const job = tests.get(id);
    if (!job) return;

    job.status = "processing";
    tests.set(id, job);

    setTimeout(() => {
      const isSafe = !job.request.input.toLowerCase().includes("ignore");
      const result: TestResult = {
        is_safe: isSafe,
        score: isSafe ? 1.0 : 0.1,
        flags: isSafe
          ? []
          : [
              {
                type: "injection",
                confidence: 0.95,
                description: "Potential prompt injection detected",
              },
            ],
      };

      job.status = "completed";
      job.result = result;
      tests.set(id, job);
    }, 2000);
  }
}
