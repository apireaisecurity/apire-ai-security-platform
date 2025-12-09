# API Reference: APIRE Prompt Shield

This document describes the REST API for APIRE Prompt Shield.

**Base URL**: `http://localhost:4000/api/v1`

## Authentication

All API requests must include the `Authorization` header with a valid Bearer token.

```http
Authorization: Bearer <YOUR_API_KEY>
```

## Rate Limiting

- **Standard**: 100 requests per minute
- **Enterprise**: 1000 requests per minute

## Endpoints

### Tests

#### Create a New Test

`POST /tests`

Initiates a new security scan for a given prompt.

**Request Body:**

```json
{
  "input": "string", // The prompt to test
  "model": "string", // Optional: Target model (e.g., "gpt-4")
  "checks": ["string"], // Array of checks: "injection", "pii", "toxicity", "jailbreak"
  "config": {
    "threshold": 0.8 // Optional: Sensitivity threshold
  }
}
```

**Response:**

```json
{
  "id": "uuid",
  "status": "queued",
  "created_at": "timestamp"
}
```

#### Get Test Results

`GET /tests/:id`

Retrieves the status and results of a specific test.

**Response:**

```json
{
  "id": "uuid",
  "status": "completed", // "queued", "processing", "completed", "failed"
  "result": {
    "is_safe": boolean,
    "score": number, // 0-1
    "flags": [
      {
        "type": "injection",
        "confidence": 0.95,
        "description": "Potential SQL injection detected"
      }
    ]
  }
}
```

#### Batch Testing

`POST /tests/batch`

Submit multiple tests at once.

**Request Body:**

```json
{
  "tests": [
    { "input": "test 1", "checks": ["injection"] },
    { "input": "test 2", "checks": ["pii"] }
  ]
}
```

### Attack Patterns

#### List Attack Patterns

`GET /attack-patterns`

Returns a list of available attack patterns and their descriptions.

**Response:**

```json
[
  {
    "id": "sql-injection",
    "name": "SQL Injection",
    "description": "Attempts to manipulate database queries",
    "severity": "high"
  },
  {
    "id": "dan-jailbreak",
    "name": "DAN Jailbreak",
    "description": "Do Anything Now roleplay attack",
    "severity": "critical"
  }
]
```

### Rules

#### Create Custom Rule

`POST /rules`

Define a custom regex or keyword-based rule.

**Request Body:**

```json
{
  "name": "No Competitor Mentions",
  "type": "keyword", // "keyword", "regex"
  "pattern": "CompetitorName",
  "action": "block" // "block", "flag"
}
```

### Real-time Updates

#### WebSocket Connection

`WS /ws/tests`

Connect to receive real-time updates for running tests.

**Protocol:**

1. Connect with `?token=<API_KEY>`
2. Subscribe to test ID: `{"action": "subscribe", "testId": "uuid"}`
3. Receive events: `{"type": "progress", "testId": "uuid", "percent": 50}`

## Error Codes

| Code | Description                               |
| ---- | ----------------------------------------- |
| 400  | Bad Request - Invalid input parameters    |
| 401  | Unauthorized - Invalid or missing API key |
| 403  | Forbidden - Insufficient permissions      |
| 404  | Not Found - Resource does not exist       |
| 429  | Too Many Requests - Rate limit exceeded   |
| 500  | Internal Server Error                     |

## SDK Usage

### TypeScript

```typescript
import { PromptShield } from "@apire/prompt-shield";

const client = new PromptShield({ apiKey: process.env.APIRE_KEY });

// Run a scan
const result = await client.scan("Is this safe?");
```
