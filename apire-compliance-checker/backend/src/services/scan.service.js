"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanService = void 0;
const policy_engine_1 = require("../engine/policy.engine");
const policyEngine = new policy_engine_1.PolicyEngine();
class ScanService {
    async runScan(config, frameworks) {
        // Simulate async scan
        return new Promise((resolve) => {
            setTimeout(() => {
                const findings = policyEngine.scan(config, frameworks);
                resolve({
                    id: "scan-" + Date.now(),
                    status: "completed",
                    findings,
                    score: findings.length === 0 ? 100 : 50,
                });
            }, 1000);
        });
    }
}
exports.ScanService = ScanService;
