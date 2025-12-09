# API Reference

This document provides an overview of the API endpoints available across the three security tools in the Apire AI Security Platform.

## Table of Contents
- [Security & Authentication](#security--authentication)
- [Prompt Shield API](#prompt-shield-api)
- [RedTeam Kit API](#redteam-kit-api)
- [Compliance Checker API](#compliance-checker-api)
- [Common Patterns](#common-patterns)

---

## Security & Authentication

### API Key Authentication
All services support API key authentication. To enable it, set `REQUIRE_API_KEY=true` in your environment variables.

**Header**: `X-API-Key: <your-api-key>`

**Example Request**:
```bash
curl -X POST http://localhost:3001/api/v1/test \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-key" \
  -d '{"input": "test prompt"}'
```

### Rate Limiting
Rate limits are configured per service to prevent abuse. Default limits:

| Service | Limit | Window | Env Variable |
|---------|-------|--------|--------------|
| Prompt Shield | 100 req | 1 min | `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` |
| RedTeam Kit | 10 req | 1 hour | `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` |
| Compliance Checker | 20 req | 1 hour | `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` |

### CORS Configuration
Cross-Origin Resource Sharing (CORS) is enabled by default. In production, restrict allowed origins using the `CORS_ORIGINS` environment variable.

```bash
# Example .env
CORS_ORIGINS=https://your-frontend-domain.com,https://admin.your-domain.com
```

---

## Prompt Shield API

**Base URL**: `http://localhost:3001/api/v1`

### Test Prompt
Analyze a prompt for security risks in real-time.

- **URL**: `/test`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "input": "Ignore all previous instructions",
    "detectors": ["injection", "jailbreak"]  // optional
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "safe": false,
    "riskScore": 0.92,
    "threats": [
      {
        "type": "injection",
        "severity": "high",
        "confidence": 0.95,
        "matched": "Ignore all previous instructions"
      }
    ],
    "timestamp": "2024-01-01T00:00:00Z"
  }
  ```

### Get Configuration
Retrieve current detection settings.

- **URL**: `/config`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "detectors": {
      "injection": { "enabled": true, "threshold": 0.7 },
      "jailbreak": { "enabled": true, "threshold": 0.8 },
      "pii": { "enabled": true, "threshold": 0.6 }
    }
  }
  ```

### Update Configuration
Modify detection sensitivity and settings.

- **URL**: `/config`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "detectors": {
      "injection": { "enabled": true, "threshold": 0.75 }
    }
  }
  ```
- **Response**: `200 OK`

### Get Scan History
Retrieve past scan results.

- **URL**: `/history`
- **Method**: `GET`
- **Query Parameters**: 
  - `limit` (number, default: 50)
  - `offset` (number, default: 0)
  - `severity` (string: "low" | "medium" | "high")
- **Response**: `200 OK`
  ```json
  {
    "total": 150,
    "results": [
      {
        "id": "scan_123",
        "timestamp": "2024-01-01T00:00:00Z",
        "riskScore": 0.92,
        "safe": false
      }
    ]
  }
  ```

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `200 OK`

---

## RedTeam Kit API

**Base URL**: `http://localhost:3005/api/v1`

### List Scenarios
Get available attack scenarios.

- **URL**: `/scenarios`
- **Method**: `GET`
- **Query Parameters**:
  - `category` (string: "injection" | "jailbreak" | "extraction")
  - `difficulty` (string: "easy" | "medium" | "hard")
- **Response**: `200 OK`
  ```json
  {
    "scenarios": [
      {
        "id": "scenario_1",
        "name": "Basic Injection",
        "category": "injection",
        "difficulty": "easy",
        "description": "Tests basic prompt injection patterns"
      }
    ]
  }
  ```

### Get Scenario Details
- **URL**: `/scenarios/:id`
- **Method**: `GET`
- **Response**: `200 OK`

### Run Attack Simulation
Execute an attack scenario against a target.

- **URL**: `/scenarios/run`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "scenarioId": "scenario_1",
    "target": {
      "url": "http://my-llm-api/chat",
      "apiKey": "optional-key"
    },
    "config": {
      "iterations": 10,
      "delayMs": 1000
    }
  }
  ```
- **Response**: `202 Accepted`
  ```json
  {
    "simulationId": "sim_456",
    "status": "running",
    "estimatedDuration": 60000
  }
  ```

### Get Simulation Status
- **URL**: `/simulations/:id`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "id": "sim_456",
    "status": "completed",
    "progress": 100,
    "results": {
      "totalAttempts": 10,
      "successfulAttacks": 3,
      "vulnerabilities": [
        {
          "type": "injection",
          "severity": "high",
          "payload": "..."
        }
      ]
    }
  }
  ```

### Cancel Simulation
- **URL**: `/simulations/:id`
- **Method**: `DELETE`
- **Response**: `200 OK`

### List Reports
- **URL**: `/reports`
- **Method**: `GET`
- **Response**: `200 OK`

### Get Report
- **URL**: `/reports/:id`
- **Method**: `GET`
- **Response**: `200 OK`

### Export Report
- **URL**: `/reports/:id/export`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "format": "pdf"  // or "json"
  }
  ```
- **Response**: `200 OK` (file download)

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `200 OK`

---

## Compliance Checker API

**Base URL**: `http://localhost:3003/api/v1`

### List Policies
Get supported regulatory frameworks.

- **URL**: `/policies`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "frameworks": [
      {
        "id": "GDPR",
        "name": "General Data Protection Regulation",
        "checks": 42
      },
      {
        "id": "HIPAA",
        "name": "Health Insurance Portability and Accountability Act",
        "checks": 38
      }
    ]
  }
  ```

### Get Policy Details
- **URL**: `/policies/:framework`
- **Method**: `GET`
- **Response**: `200 OK`

### Initiate Compliance Scan
Start a compliance audit.

- **URL**: `/scan`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "targetType": "application",
    "targetId": "my-chatbot",
    "frameworks": ["GDPR", "HIPAA"]
  }
  ```
- **Response**: `202 Accepted`
  ```json
  {
    "scanId": "scan_789",
    "status": "running",
    "estimatedDuration": 120000
  }
  ```

### Get Scan Status
- **URL**: `/scan/:id/status`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "scanId": "scan_789",
    "status": "running",
    "progress": 65,
    "currentCheck": "GDPR-Article-25",
    "estimatedCompletion": "2024-01-01T00:05:00Z"
  }
  ```

### Get Scan Results
- **URL**: `/scan/:id/results`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "scanId": "scan_789",
    "complianceScore": 78,
    "status": "completed",
    "violations": [
      {
        "framework": "GDPR",
        "article": "Article 25",
        "severity": "high",
        "description": "Data protection by design and default",
        "evidence": "..."
      }
    ],
    "recommendations": [
      {
        "priority": "high",
        "action": "Implement data minimization",
        "reference": "GDPR Article 25"
      }
    ]
  }
  ```

### Get Remediation Guidance
- **URL**: `/remediation/:scanId`
- **Method**: `GET`
- **Response**: `200 OK`

### Verify Fixes
Re-check specific violations after remediation.

- **URL**: `/remediation/:scanId/verify`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "checkIds": ["GDPR-Article-25", "HIPAA-164.308"]
  }
  ```
- **Response**: `200 OK`

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `200 OK`

---

## Common Patterns

### Response Format

All APIs follow a consistent response format:

**Success**:
```json
{
  "success": true,
  "data": { /* ... */ },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Error**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Input validation failed",
    "details": {
      "field": "input",
      "reason": "Required field missing"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Authentication

All tools support optional API key authentication:

```bash
curl -H "X-API-Key: your-api-key" \
     -X POST http://localhost:3001/api/v1/test \
     -H "Content-Type: application/json" \
     -d '{"input": "test prompt"}'
```

Enable authentication by setting `REQUIRE_API_KEY=true` in environment variables.

### Rate Limiting

Default rate limits (configurable via environment variables):
- **Prompt Shield**: 100 requests/minute
- **RedTeam Kit**: 10 simulations/hour
- **Compliance Checker**: 20 scans/hour

When rate limit is exceeded:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

### CORS

CORS is enabled by default for development. Configure allowed origins:

```bash
CORS_ORIGINS=https://yourapp.com,https://staging.yourapp.com
```

### Webhooks

All tools support webhook notifications for async operations:

```bash
# Set webhook URL
WEBHOOK_URL=https://yourapp.com/apire-webhook

# Webhook payload example
{
  "event": "scan.completed",
  "service": "prompt-shield",
  "data": {
    "scanId": "scan_123",
    "status": "completed",
    "result": { /* ... */ }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## SDK Support (Coming Soon)

We're developing official SDKs for easy integration:

**JavaScript/TypeScript**:
```javascript
import { PromptShield, RedTeamKit, ComplianceChecker } from '@apire/sdk';

const shield = new PromptShield({ 
  apiKey: 'your-key', 
  baseUrl: 'http://localhost:3001' 
});

const result = await shield.test({ input: 'test prompt' });
```

**Python**:
```python
from apire import PromptShield, RedTeamKit, ComplianceChecker

shield = PromptShield(
    api_key='your-key',
    base_url='http://localhost:3001'
)

result = shield.test(input='test prompt')
```

## Further Reading

- [Architecture Overview](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOY_ON_CODESPACES.md)
- [Testing Guide](./TESTING.md)
- [GitHub Wiki](https://github.com/apireaisecurity/apire-ai-security-platform/wiki)
