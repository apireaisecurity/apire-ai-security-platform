"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const uuid_1 = require("uuid");
// Mock storage for now
const tests = new Map();
class TestService {
    async createTest(request) {
        const id = (0, uuid_1.v4)();
        const job = {
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
    async getTest(id) {
        return tests.get(id);
    }
    // Simulate worker processing
    async processTest(id) {
        const job = tests.get(id);
        if (!job)
            return;
        job.status = "processing";
        tests.set(id, job);
        setTimeout(() => {
            const isSafe = !job.request.input.toLowerCase().includes("ignore");
            const result = {
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
exports.TestService = TestService;
