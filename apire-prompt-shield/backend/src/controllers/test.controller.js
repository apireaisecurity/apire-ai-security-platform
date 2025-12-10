"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const test_service_1 = require("../services/test.service");
const testService = new test_service_1.TestService();
class TestController {
    async createTest(req, res) {
        try {
            const request = req.body;
            // Basic validation
            if (!request.input || !request.checks) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields: input, checks" });
            }
            const job = await testService.createTest(request);
            res.status(201).json(job);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async getTest(req, res) {
        try {
            const { id } = req.params;
            const job = await testService.getTest(id);
            if (!job) {
                return res.status(404).json({ error: "Test not found" });
            }
            res.json(job);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.TestController = TestController;
