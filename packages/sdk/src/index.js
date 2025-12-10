"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApireClient = void 0;
class ApireClient {
    constructor(apiKey, baseUrl = 'http://localhost:3000') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    async checkPrompt(prompt) {
        // Placeholder for Prompt Shield API call
        console.log(`Checking prompt: ${prompt}`);
        return { safe: true };
    }
    async runScan(target) {
        // Placeholder for Compliance Checker API call
        console.log(`Scanning target: ${target}`);
        return { compliant: true };
    }
}
exports.ApireClient = ApireClient;
