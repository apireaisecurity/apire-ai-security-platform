import { PolicyEngine } from '../engine/policy.engine';

const policyEngine = new PolicyEngine();

export class ScanService {
  async runScan(config: any, frameworks: string[]) {
    // Simulate async scan
    return new Promise((resolve) => {
      setTimeout(() => {
        const findings = policyEngine.scan(config, frameworks);
        resolve({
          id: 'scan-' + Date.now(),
          status: 'completed',
          findings,
          score: findings.length === 0 ? 100 : 50,
        });
      }, 1000);
    });
  }
}
