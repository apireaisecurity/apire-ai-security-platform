# API Reference

## ⚠️ Important: Official Documentation

**For the most accurate and up-to-date API documentation, always refer to the primary source:**

📘 **[Official API Documentation](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md)**

This page provides a high-level overview. The official documentation in `docs/API.md` is updated with every code change and reflects the actual implemented endpoints.

---

## Quick Reference

| Service | Base URL | Primary Endpoints | Documentation |
|---------|----------|-------------------|---------------|
| **Prompt Shield** | http://localhost:3001/api/v1 | `POST /tests`<br>`GET /tests/:id` | [View Details](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#prompt-shield-api) |
| **RedTeam Kit** | http://localhost:3005/api/v1 | `GET /scenarios`<br>`GET /scenarios/:id` | [View Details](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#redteam-kit-api) |
| **Compliance Checker** | http://localhost:3003/api/v1 | `POST /scans` | [View Details](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#compliance-checker-api) |

---

## Overview

This page provides a high-level overview of the API endpoints available in the Apire AI Security Platform tools.

For the most up-to-date and detailed specification, please refer to the [OpenAPI Specification](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md) in the repository.

## Prompt Shield APIs

**Base URL**: `http://localhost:3001/api/v1`

### Analysis
-   `POST /test`: Test a prompt for security risks.
    -   **Parameters**: `input` (string), `detectors` (array, optional).
    -   **Response**: Risk assessment with threat categories and severity.
    -   **Example**:
        ```json
        {
          "input": "Ignore all previous instructions",
          "detectors": ["injection", "jailbreak"]
        }
        ```

-   `POST /analyze`: Detailed analysis of a prompt.
    -   **Parameters**: `text` (string), `context` (object, optional).
    -   **Response**: Detailed risk breakdown, patterns matched, suggestions.

### Configuration
-   `GET /config`: Get current shield configuration.
    -   **Response**: Detection thresholds, enabled detectors, logging settings.

-   `PUT /config`: Update sensitivity thresholds.
    -   **Parameters**: `detectors` (object with threshold values).
    -   **Example**:
        ```json
        {
          "detectors": {
            "injection": { "enabled": true, "threshold": 0.75 },
            "jailbreak": { "enabled": true, "threshold": 0.80 }
          }
        }
        ```

### History
-   `GET /history`: Retrieve past scan results.
    -   **Query Params**: `limit`, `offset`, `severity`.
    -   **Response**: Paginated list of scans with metadata.

-   `GET /history/:id`: Get details for a specific scan.
    -   **Response**: Full scan result including input, output, and analysis.

### Health
-   `GET /health`: Health check endpoint.
    -   **Response**: Service status, database connectivity, uptime.

## RedTeam Kit APIs

**Base URL**: `http://localhost:3005/api/v1`

### Scenarios
-   `GET /scenarios`: List available attack scenarios.
    -   **Query Params**: `category`, `difficulty`, `tag`.
    -   **Response**: Array of scenarios with metadata.

-   `GET /scenarios/:id`: Get details for a specific scenario.
    -   **Response**: Scenario description, attack vectors, expected outcomes.

-   `POST /scenarios/run`: Start a new attack simulation.
    -   **Parameters**: `scenarioId` (string), `target` (object), `config` (object).
    -   **Response**: Simulation ID and status.
    -   **Example**:
        ```json
        {
          "scenarioId": "injection-basic",
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

### Simulations
-   `GET /simulations`: List all past simulations.
    -   **Query Params**: `status`, `scenarioId`, `limit`, `offset`.
    -   **Response**: Paginated list of simulations.

-   `GET /simulations/:id`: Get status and results of a simulation.
    -   **Response**: Progress, results, logs.

-   `DELETE /simulations/:id`: Cancel a running simulation.

### Reports
-   `GET /reports`: List generated reports.
    -   **Response**: Array of report summaries.

-   `GET /reports/:id`: Get detailed report for a simulation.
    -   **Response**: Full report with vulnerabilities found, attack success rate, recommendations.

-   `POST /reports/:id/export`: Export report as PDF or JSON.
    -   **Parameters**: `format` (string: "pdf" or "json").
    -   **Response**: Download link or file.

### Attack Vectors
-   `GET /vectors`: List available attack vectors.
    -   **Response**: Array of vectors with descriptions and usage.

-   `POST /vectors/custom`: Add a custom attack vector.
    -   **Parameters**: `name`, `category`, `prompts` (array).

### Health
-   `GET /health`: Health check endpoint.

## Compliance Checker APIs

**Base URL**: `http://localhost:3003/api/v1`

### Scans
-   `POST /scan`: Initiate a compliance audit.
    -   **Parameters**: `targetType` (string), `targetId` (string), `frameworks` (array).
    -   **Response**: Scan ID and initial status.
    -   **Example**:
        ```json
        {
          "targetType": "application",
          "targetId": "my-chatbot",
          "frameworks": ["GDPR", "HIPAA"]
        }
        ```

-   `GET /scan/:id/status`: Check status of a running scan.
    -   **Response**: Progress percentage, current checks, estimated completion time.

-   `GET /scan/:id/results`: Get results of a completed scan.
    -   **Response**: Compliance score, violations found, recommendations.

### Policies
-   `GET /policies`: List supported regulatory frameworks.
    -   **Response**: Array of frameworks with descriptions and check categories.

-   `GET /policies/:framework`: Get details for a specific framework.
    -   **Response**: All checks within the framework, requirements, severity levels.

-   `POST /policies/custom`: Add a custom compliance policy.
    -   **Parameters**: `name`, `checks` (array of check definitions).

### Audits
-   `GET /audits`: List past audits.
    -   **Query Params**: `framework`, `status`, `dateFrom`, `dateTo`.
    -   **Response**: Paginated list of audits.

-   `GET /audits/:id`: Get detailed audit report.
    -   **Response**: Full audit findings, evidence, remediation steps.

### Remediation
-   `GET /remediation/:auditId`: Get remediation guidance for an audit.
    -   **Response**: Step-by-step fixes for each violation.

-   `POST /remediation/:auditId/verify`: Re-check specific violations after fixes.
    -   **Parameters**: `checkIds` (array of check IDs to re-verify).

### Health
-   `GET /health`: Health check endpoint.

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { /* ... */ },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Description of the error",
    "details": { /* ... */ }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Authentication

Currently, the APIs support optional API key authentication:

```bash
curl -H "X-API-Key: your-api-key" \
     -X POST http://localhost:3001/api/v1/test \
     -d '{"input": "test prompt"}'
```

Set `REQUIRE_API_KEY=true` in environment variables to enforce authentication.

## Rate Limiting

Default rate limits:
- **Prompt Shield**: 100 requests/minute
- **RedTeam Kit**: 10 simulations/hour
- **Compliance Checker**: 20 scans/hour

Configurable via environment variables:
```bash
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## CORS

CORS is enabled by default for local development. Configure allowed origins:
```bash
CORS_ORIGINS=https://yourapp.com,https://staging.yourapp.com
```

## Webhooks

All tools support webhooks for async notifications:

```bash
# Set webhook URL
WEBHOOK_URL=https://yourapp.com/apire-webhook

# Webhook payload example
{
  "event": "scan.completed",
  "service": "prompt-shield",
  "data": {
    "scanId": "abc123",
    "result": { /* ... */ }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## SDK Support (Coming Soon)

```javascript
// JavaScript/TypeScript
import { PromptShield, RedTeamKit, ComplianceChecker } from '@apire/sdk';

const shield = new PromptShield({ apiKey: 'your-key', baseUrl: 'http://localhost:3001' });
const result = await shield.test({ input: 'test prompt' });
```

```python
# Python
from apire import PromptShield, RedTeamKit, ComplianceChecker

shield = PromptShield(api_key='your-key', base_url='http://localhost:3001')
result = shield.test(input='test prompt')
```

## Further Reading
- [Getting Started](Getting-Started)
- [Architecture Overview](Architecture-Overview)
- [Tool-Specific Guides](Home#security-tools)
