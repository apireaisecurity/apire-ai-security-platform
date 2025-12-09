export interface TestConfig {
  threshold?: number;
}

export interface TestRequest {
  input: string;
  model?: string;
  checks: string[];
  config?: TestConfig;
}

export interface TestResult {
  is_safe: boolean;
  score: number;
  flags: Array<{
    type: string;
    confidence: number;
    description: string;
  }>;
}

export interface TestJob {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  created_at: Date;
  request: TestRequest;
  result?: TestResult;
}
