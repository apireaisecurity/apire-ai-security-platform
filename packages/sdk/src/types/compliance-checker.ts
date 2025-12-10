/**
 * Types for Compliance Checker API
 */

export interface CreateScanRequest {
  target: string;
  frameworks: ComplianceFramework[];
  scope?: ScanScope;
  metadata?: Record<string, any>;
}

export type ComplianceFramework = 'GDPR' | 'HIPAA' | 'SOC2' | 'EU_AI_ACT' | 'CCPA' | 'PCI_DSS';

export interface ScanScope {
  endpoints?: string[];
  dataCategories?: string[];
  includeTests?: string[];
  excludeTests?: string[];
}

export interface ScanResult {
  id: string;
  target: string;
  frameworks: ComplianceFramework[];
  status: ScanStatus;
  score: number;
  violations: Violation[];
  findings: Finding[];
  recommendations: Recommendation[];
  startedAt: string;
  completedAt?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export type ScanStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Violation {
  id: string;
  framework: ComplianceFramework;
  ruleId: string;
  title: string;
  description: string;
  severity: ViolationSeverity;
  evidence: string[];
  remediation: string;
}

export type ViolationSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Finding {
  id: string;
  type: FindingType;
  description: string;
  location?: string;
  timestamp: string;
}

export type FindingType = 'data_collection' | 'data_processing' | 'data_storage' | 'access_control' | 'encryption';

export interface Recommendation {
  id: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  actionItems: string[];
  estimatedEffort?: string;
}

export interface CreateScanResponse {
  scanId: string;
  status: ScanStatus;
  message: string;
}
