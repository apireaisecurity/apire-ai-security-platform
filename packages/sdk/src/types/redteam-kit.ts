/**
 * Types for RedTeam Kit API
 */

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  techniques: string[];
  metadata?: Record<string, any>;
}

export type ScenarioCategory =
  | 'injection'
  | 'jailbreak'
  | 'data_extraction'
  | 'model_manipulation'
  | 'prompt_leaking';

export type ScenarioDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface ListScenariosParams {
  category?: ScenarioCategory;
  difficulty?: ScenarioDifficulty;
  page?: number;
  limit?: number;
}

export interface GetScenarioResponse {
  id: string;
  scenario: Scenario;
}
