/**
 * Compliance Checker Client - Regulatory compliance scanning
 */

import { BaseClient, BaseClientConfig } from '../base-client';
import { ApiResponse } from '../types/common';
import { CreateScanRequest, CreateScanResponse, ScanResult } from '../types/compliance-checker';

export interface ComplianceCheckerClientConfig extends Omit<BaseClientConfig, 'baseUrl'> {
  baseUrl?: string;
}

export class ComplianceCheckerClient extends BaseClient {
  constructor(config: ComplianceCheckerClientConfig) {
    super({
      baseUrl: config.baseUrl || 'http://localhost:3003',
      ...config,
    });
  }

  /**
   * Create a new compliance scan
   * @param request - Scan configuration including target and frameworks
   * @returns Scan ID and initial status
   * 
   * @example
   * ```typescript
   * const scan = await client.createScan({
   *   target: "https://api.example.com",
   *   frameworks: ['GDPR', 'HIPAA'],
   *   scope: {
   *     endpoints: ['/users', '/data']
   *   }
   * });
   * console.log(`Scan ID: ${scan.data.scanId}`);
   * ```
   */
  async createScan(request: CreateScanRequest): Promise<ApiResponse<CreateScanResponse>> {
    return this.request<CreateScanResponse>({
      method: 'POST',
      path: '/scans',
      data: request,
    });
  }

  /**
   * Run a GDPR compliance scan
   * @param target - Target URL or system identifier
   * @returns Scan result with GDPR violations
   * 
   * @example
   * ```typescript
   * const result = await client.scanGDPR("https://api.example.com");
   * console.log(`GDPR Score: ${result.data.score}/100`);
   * console.log(`Violations: ${result.data.violations.length}`);
   * ```
   */
  async scanGDPR(target: string): Promise<ApiResponse<CreateScanResponse>> {
    return this.createScan({
      target,
      frameworks: ['GDPR'],
    });
  }

  /**
   * Run a HIPAA compliance scan
   * @param target - Target URL or system identifier
   * @returns Scan result with HIPAA violations
   * 
   * @example
   * ```typescript
   * const result = await client.scanHIPAA("https://healthcare-api.example.com");
   * const criticalIssues = result.data.violations?.filter(v => v.severity === 'critical');
   * ```
   */
  async scanHIPAA(target: string): Promise<ApiResponse<CreateScanResponse>> {
    return this.createScan({
      target,
      frameworks: ['HIPAA'],
    });
  }

  /**
   * Run a SOC 2 compliance scan
   * @param target - Target URL or system identifier
   * @returns Scan result with SOC 2 findings
   * 
   * @example
   * ```typescript
   * const result = await client.scanSOC2("https://api.example.com");
   * console.log(`SOC 2 Compliance Score: ${result.data.score}%`);
   * ```
   */
  async scanSOC2(target: string): Promise<ApiResponse<CreateScanResponse>> {
    return this.createScan({
      target,
      frameworks: ['SOC2'],
    });
  }

  /**
   * Run EU AI Act compliance scan
   * @param target - Target URL or system identifier
   * @returns Scan result with EU AI Act compliance status
   * 
   * @example
   * ```typescript
   * const result = await client.scanEUAIAct("https://ai-service.example.com");
   * const highRiskItems = result.data.violations?.filter(v => v.severity === 'high');
   * ```
   */
  async scanEUAIAct(target: string): Promise<ApiResponse<CreateScanResponse>> {
    return this.createScan({
      target,
      frameworks: ['EU_AI_ACT'],
    });
  }

  /**
   * Run comprehensive multi-framework scan
   * @param target - Target URL or system identifier
   * @param frameworks - Array of compliance frameworks to check
   * @returns Scan result covering all frameworks
   * 
   * @example
   * ```typescript
   * const result = await client.scanAll("https://api.example.com", [
   *   'GDPR', 'HIPAA', 'SOC2', 'EU_AI_ACT'
   * ]);
   * console.log(`Overall compliance score: ${result.data.score}`);
   * ```
   */
  async scanAll(target: string, frameworks?: ('GDPR' | 'HIPAA' | 'SOC2' | 'EU_AI_ACT' | 'CCPA' | 'PCI_DSS')[]): Promise<ApiResponse<CreateScanResponse>> {
    return this.createScan({
      target,
      frameworks: frameworks || ['GDPR', 'HIPAA', 'SOC2', 'EU_AI_ACT'],
    });
  }
}
