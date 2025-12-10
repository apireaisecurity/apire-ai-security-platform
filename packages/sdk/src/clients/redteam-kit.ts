/**
 * RedTeam Kit Client - Adversarial testing and security auditing
 */

import { BaseClient, BaseClientConfig } from '../base-client';
import { ApiResponse, PaginatedResponse } from '../types/common';
import { Scenario, ListScenariosParams, GetScenarioResponse } from '../types/redteam-kit';

export interface RedTeamKitClientConfig extends Omit<BaseClientConfig, 'baseUrl'> {
  baseUrl?: string;
}

export class RedTeamKitClient extends BaseClient {
  constructor(config: RedTeamKitClientConfig) {
    super({
      baseUrl: config.baseUrl || 'http://localhost:3005',
      ...config,
    });
  }

  /**
   * List available test scenarios
   * @param params - Filtering and pagination parameters
   * @returns Paginated list of scenarios
   * 
   * @example
   * ```typescript
   * const scenarios = await client.listScenarios({
   *   category: 'injection',
   *   difficulty: 'medium',
   *   limit: 20
   * });
   * console.log(`Found ${scenarios.data.length} scenarios`);
   * ```
   */
  async listScenarios(params?: ListScenariosParams): Promise<ApiResponse<Scenario[]>> {
    const response = await this.request<Scenario[]>({
      method: 'GET',
      path: '/scenarios',
      params,
    });
    
    return response;
  }

  /**
   * Get detailed scenario information
   * @param scenarioId - Unique scenario identifier
   * @returns Complete scenario details
   * 
   * @example
   * ```typescript
   * const scenario = await client.getScenario('scenario_456');
   * console.log(`Scenario: ${scenario.data.scenario.name}`);
   * console.log(`Techniques: ${scenario.data.scenario.techniques.join(', ')}`);
   * ```
   */
  async getScenario(scenarioId: string): Promise<ApiResponse<GetScenarioResponse>> {
    return this.request<GetScenarioResponse>({
      method: 'GET',
      path: `/scenarios/${scenarioId}`,
    });
  }

  /**
   * Get scenarios by category
   * @param category - Scenario category filter
   * @returns Scenarios matching the category
   * 
   * @example
   * ```typescript
   * const jailbreaks = await client.getScenariosByCategory('jailbreak');
   * console.log(`${jailbreaks.data.length} jailbreak scenarios available`);
   * ```
   */
  async getScenariosByCategory(category: string): Promise<ApiResponse<Scenario[]>> {
    return this.listScenarios({ category: category as any });
  }

  /**
   * Get scenarios by difficulty level
   * @param difficulty - Difficulty level (easy, medium, hard, expert)
   * @returns Scenarios matching the difficulty
   * 
   * @example
   * ```typescript
   * const expertTests = await client.getScenariosByDifficulty('expert');
   * console.log(`${expertTests.data.length} expert-level scenarios`);
   * ```
   */
  async getScenariosByDifficulty(difficulty: 'easy' | 'medium' | 'hard' | 'expert'): Promise<ApiResponse<Scenario[]>> {
    return this.listScenarios({ difficulty });
  }
}
