/**
 * Main Apire Client - Unified interface for all security tools
 */

import { PromptShieldClient } from './clients/prompt-shield';
import { RedTeamKitClient } from './clients/redteam-kit';
import { ComplianceCheckerClient } from './clients/compliance-checker';

export interface ApireClientConfig {
  apiKey?: string;
  timeout?: number;
  retries?: number;
  baseUrls?: {
    promptShield?: string;
    redTeamKit?: string;
    complianceChecker?: string;
  };
  headers?: Record<string, string>;
}

/**
 * Unified Apire Client providing access to all security tools
 * 
 * @example
 * ```typescript
 * import { ApireClient } from '@apire/sdk';
 * 
 * const client = new ApireClient({
 *   apiKey: 'your-api-key',
 *   baseUrls: {
 *     promptShield: 'https://api.apire.example.com/shield',
 *     redTeamKit: 'https://api.apire.example.com/redteam',
 *     complianceChecker: 'https://api.apire.example.com/compliance'
 *   }
 * });
 * 
 * // Prompt Shield - Injection detection
 * const testResult = await client.promptShield.createTest({
 *   prompt: "User input to analyze"
 * });
 * 
 * // RedTeam Kit - Adversarial testing
 * const scenarios = await client.redTeamKit.listScenarios({
 *   category: 'injection'
 * });
 * 
 * // Compliance Checker - Regulatory scanning
 * const scan = await client.complianceChecker.scanGDPR(
 *   "https://api.example.com"
 * );
 * ```
 */
export class ApireClient {
  public readonly promptShield: PromptShieldClient;
  public readonly redTeamKit: RedTeamKitClient;
  public readonly complianceChecker: ComplianceCheckerClient;

  constructor(config: ApireClientConfig = {}) {
    const sharedConfig = {
      apiKey: config.apiKey,
      timeout: config.timeout,
      retries: config.retries,
      headers: config.headers,
    };

    this.promptShield = new PromptShieldClient({
      ...sharedConfig,
      baseUrl: config.baseUrls?.promptShield,
    });

    this.redTeamKit = new RedTeamKitClient({
      ...sharedConfig,
      baseUrl: config.baseUrls?.redTeamKit,
    });

    this.complianceChecker = new ComplianceCheckerClient({
      ...sharedConfig,
      baseUrl: config.baseUrls?.complianceChecker,
    });
  }

  /**
   * Test connection to all services
   * @returns Object indicating which services are reachable
   * 
   * @example
   * ```typescript
   * const status = await client.healthCheck();
   * console.log('Prompt Shield:', status.promptShield ? 'OK' : 'DOWN');
   * console.log('RedTeam Kit:', status.redTeamKit ? 'OK' : 'DOWN');
   * console.log('Compliance Checker:', status.complianceChecker ? 'OK' : 'DOWN');
   * ```
   */
  async healthCheck(): Promise<{
    promptShield: boolean;
    redTeamKit: boolean;
    complianceChecker: boolean;
  }> {
    const [shieldHealth, redteamHealth, complianceHealth] = await Promise.allSettled([
      this.promptShield['request']({ method: 'GET', path: '/health' }),
      this.redTeamKit['request']({ method: 'GET', path: '/health' }),
      this.complianceChecker['request']({ method: 'GET', path: '/health' }),
    ]);

    return {
      promptShield: shieldHealth.status === 'fulfilled',
      redTeamKit: redteamHealth.status === 'fulfilled',
      complianceChecker: complianceHealth.status === 'fulfilled',
    };
  }
}
