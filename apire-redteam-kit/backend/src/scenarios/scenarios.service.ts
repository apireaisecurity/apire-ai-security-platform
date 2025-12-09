import { Injectable } from "@nestjs/common";

export interface Scenario {
  id: string;
  name: string;
  category: string;
  description: string;
}

@Injectable()
export class ScenariosService {
  private scenarios: Scenario[] = [
    {
      id: "prompt-injection-basic",
      name: "Basic Prompt Injection",
      category: "Injection",
      description:
        "Attempts to override system instructions using direct commands.",
    },
    {
      id: "dan-jailbreak",
      name: "DAN Jailbreak",
      category: "Jailbreak",
      description: "Classic Do Anything Now roleplay attack.",
    },
  ];

  findAll(): Scenario[] {
    return this.scenarios;
  }

  findOne(id: string): Scenario | undefined {
    return this.scenarios.find((s) => s.id === id);
  }
}
