# Best Practices for AI Red Teaming

## Ethical Guidelines

1.  **Authorization**: Only test systems you own or have explicit permission to test.
2.  **Scope**: Define clear boundaries. Do not attack production infrastructure unless authorized.
3.  **Data Privacy**: Avoid using real PII in test payloads.

## Strategy

1.  **Start Simple**: Begin with basic prompt injections before moving to complex multi-turn attacks.
2.  **Test Continuously**: AI models drift. A prompt that is safe today might be unsafe tomorrow after a model update.
3.  **Human-in-the-Loop**: Automated scoring is great, but manual review of "successful" attacks is crucial to reduce false positives.
4.  **Defense in Depth**: Use the findings to improve your system prompts, input filters, and output guardrails.

## Reporting

- Focus on impact. A successful injection is only a risk if it leads to harmful outcomes.
- Provide reproduction steps (the exact prompt sequence).
