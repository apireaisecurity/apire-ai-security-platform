# Integration Examples: APIRE Prompt Shield

This document provides code examples for integrating APIRE Prompt Shield into various environments.

## 1. TypeScript / Node.js Integration

```typescript
import axios from "axios";

const APIRE_URL = "http://localhost:4000/api/v1";
const API_KEY = process.env.APIRE_API_KEY;

async function checkPromptSafety(prompt: string) {
  try {
    const response = await axios.post(
      `${APIRE_URL}/tests`,
      {
        input: prompt,
        checks: ["injection", "pii", "toxicity"],
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    );

    const { result } = response.data;
    if (!result.is_safe) {
      console.warn("Unsafe prompt detected:", result.flags);
      throw new Error("Security check failed");
    }

    return true;
  } catch (error) {
    console.error("Scan failed:", error);
    return false;
  }
}
```

## 2. Express.js Middleware

Protect your API endpoints automatically.

```typescript
import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const promptSecurityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userPrompt = req.body.prompt;

  if (userPrompt) {
    const isSafe = await checkPromptSafety(userPrompt); // Implementation from above
    if (!isSafe) {
      return res
        .status(400)
        .json({ error: "Prompt rejected by security policy" });
    }
  }
  next();
};

// Usage
app.post("/chat", promptSecurityMiddleware, chatHandler);
```

## 3. Next.js API Route

```typescript
// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = req.body;

  // 1. Security Scan
  const scanRes = await fetch("http://localhost:4000/api/v1/tests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.APIRE_KEY}`,
    },
    body: JSON.stringify({ input: message, checks: ["injection"] }),
  });

  const scanData = await scanRes.json();

  if (!scanData.result.is_safe) {
    return res.status(400).json({ error: "Unsafe content detected" });
  }

  // 2. Proceed to LLM
  // ... call OpenAI/Anthropic ...
  res.status(200).json({ reply: "Hello safe world" });
}
```

## 4. GitHub Actions Workflow

Run security tests as part of your CI pipeline.

```yaml
name: Prompt Security Scan
on: [push]

jobs:
  security-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run APIRE Scan
        run: |
          curl -X POST https://api.apire.ai/v1/tests/batch \
            -H "Authorization: Bearer ${{ secrets.APIRE_KEY }}" \
            -d @tests/prompts.json
```

## 5. Python Integration

```python
import requests
import os

def scan_prompt(prompt):
    url = "http://localhost:4000/api/v1/tests"
    headers = {"Authorization": f"Bearer {os.getenv('APIRE_KEY')}"}
    payload = {
        "input": prompt,
        "checks": ["injection", "jailbreak"]
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()

result = scan_prompt("Ignore instructions")
print(result)
```
