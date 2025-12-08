import { ScanInput } from '../utils/validators';

export interface ScanResult {
  isSafe: boolean;
  flags: string[];
  confidence: number;
  timestamp: Date;
}

export class ScannerService {
  async scan(input: ScanInput): Promise<ScanResult> {
    // Mock implementation of scanning logic
    const flags: string[] = [];
    let isSafe = true;

    // Simple keyword matching for demonstration
    const lowerPrompt = input.prompt.toLowerCase();

    if (input.checkType === 'injection' || !input.checkType) {
      if (
        lowerPrompt.includes('ignore previous instructions') ||
        lowerPrompt.includes('system prompt')
      ) {
        isSafe = false;
        flags.push('PROMPT_INJECTION_DETECTED');
      }
    }

    if (input.checkType === 'pii') {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (emailRegex.test(input.prompt)) {
        isSafe = false;
        flags.push('PII_DETECTED_EMAIL');
      }
    }

    if (input.checkType === 'toxicity') {
      const toxicWords = ['hate', 'kill', 'stupid']; // Very basic list
      if (toxicWords.some((word) => lowerPrompt.includes(word))) {
        isSafe = false;
        flags.push('TOXICITY_DETECTED');
      }
    }

    return {
      isSafe,
      flags,
      confidence: isSafe ? 0.9 : 0.95,
      timestamp: new Date(),
    };
  }
}
