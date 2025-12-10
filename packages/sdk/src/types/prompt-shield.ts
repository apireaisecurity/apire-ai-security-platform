/**
 * Types for Prompt Shield API
 */

export interface CreateTestRequest {
  prompt: string;
  context?: string;
  metadata?: Record<string, any>;
}

export interface TestResult {
  id: string;
  prompt: string;
  context?: string;
  riskLevel: RiskLevel;
  threats: Threat[];
  recommendations: string[];
  score: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Threat {
  type: ThreatType;
  severity: RiskLevel;
  description: string;
  confidence: number;
  indicators: string[];
}

export type ThreatType =
  | 'prompt_injection'
  | 'jailbreak'
  | 'data_leakage'
  | 'malicious_intent'
  | 'pii_exposure'
  | 'toxic_content';

export interface GetTestResponse {
  id: string;
  result: TestResult;
}
