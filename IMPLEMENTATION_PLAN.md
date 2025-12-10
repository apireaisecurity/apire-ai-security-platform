# Comprehensive Implementation Plan
## Apire AI Security Platform - Documentation & Governance Completion

**Created**: December 10, 2025  
**Target Completion**: 3 weeks  
**Status**: Planning Phase

---

## Overview

This plan addresses the remaining 31% of tasks to bring the Apire AI Security Platform to 100% completion. Focus areas: API documentation drift correction, missing documentation creation, SDK maturation, and governance polish.

---

## Phase 7: Documentation & Governance Polish

### Week 1: Critical Documentation Fixes (High Priority)

#### Task 1: Fix API Documentation Drift ⚠️ **CRITICAL**
**Priority**: P0  
**Estimated Time**: 3-4 hours  
**Owner**: Documentation Team

**Problem Statement**:
- `docs/API.md` and `wiki_content/API-Reference.md` document endpoints that don't exist in code
- Mismatch between documented and actual routes creates confusion for developers
- No automated sync between code and documentation

**Current State Analysis**:

| Service | Documented (Wrong) | Actual (Correct) | Impact |
|---------|-------------------|------------------|--------|
| Prompt Shield | POST /test<br>POST /analyze<br>GET /config<br>PUT /config<br>GET /history | POST /tests<br>GET /tests/:id | High - Developers will get 404s |
| RedTeam Kit | POST /scenarios/run | GET /<br>GET /scenarios<br>GET /scenarios/:id | High - Wrong endpoint structure |
| Compliance Checker | POST /scan<br>GET /scans/:id | POST /scans | Medium - Only partial mismatch |

**Implementation Steps**:

1. **Audit All Endpoints** (30 min)
   ```bash
   # Run grep searches to find all route definitions
   cd apire-prompt-shield/backend
   grep -r "router\.\(get\|post\|put\|delete\)" src/
   
   cd ../../apire-redteam-kit/backend
   grep -r "@\(Get\|Post\|Put\|Delete\)" src/
   
   cd ../../apire-compliance-checker/backend
   grep -r "router\.\(get\|post\|put\|delete\)" src/
   ```

2. **Update docs/API.md** (1.5 hours)
   - Section 1: Prompt Shield API
     - Replace `POST /test` → `POST /tests`
     - Remove `POST /analyze`, `GET /config`, `PUT /config`, `GET /history`
     - Add request/response examples for `POST /tests` and `GET /tests/:id`
   
   - Section 2: RedTeam Kit API
     - Replace `POST /scenarios/run` → `GET /scenarios` (list)
     - Add `GET /scenarios/:id` (get specific)
     - Add `GET /` (health check)
   
   - Section 3: Compliance Checker API
     - Keep `POST /scans` (already correct)
     - Verify response structure matches implementation

3. **Update wiki_content/API-Reference.md** (30 min)
   Replace manual endpoint lists with reference to source of truth:
   ```markdown
   ## API Documentation
   
   **⚠️ For the most accurate and up-to-date API documentation, always refer to:**
   
   - **Primary Source**: [docs/API.md](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md)
   - **Interactive Docs**: Swagger UI (coming soon)
   
   ### Quick Reference
   
   | Service | Base URL | Documentation |
   |---------|----------|---------------|
   | Prompt Shield | http://localhost:3001/api/v1 | [View Endpoints](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#prompt-shield-api) |
   | RedTeam Kit | http://localhost:3005/api/v1 | [View Endpoints](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#redteam-kit-api) |
   | Compliance Checker | http://localhost:3003/api/v1 | [View Endpoints](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md#compliance-checker-api) |
   ```

4. **Add OpenAPI/Swagger Generation** (1 hour) - Optional but recommended
   - Add `swagger-jsdoc` and `swagger-ui-express` to backend dependencies
   - Configure Swagger for each backend
   - Add JSDoc comments to route handlers
   - Expose Swagger UI at `/api-docs`

**Verification Steps**:
```bash
# Test all documented endpoints
curl -X POST http://localhost:3001/api/v1/tests \
  -H "Content-Type: application/json" \
  -d '{"input": "test prompt"}'

curl http://localhost:3005/api/v1/scenarios

curl -X POST http://localhost:3003/api/v1/scans \
  -H "Content-Type: application/json" \
  -d '{"target": "test"}'
```

**Success Criteria**:
- [ ] All documented endpoints return 200/201 (not 404)
- [ ] Request/response examples match actual API behavior
- [ ] Wiki references docs/API.md as source of truth
- [ ] CI check added to validate endpoints exist (optional)

---

#### Task 2: Create docs/CONFIGURATION.md
**Priority**: P0  
**Estimated Time**: 2 hours  
**Owner**: Documentation Team

**Purpose**: Comprehensive environment variables reference for all workspaces

**Content Structure**:

```markdown
# Configuration Reference

## Overview
This document details all environment variables for the Apire AI Security Platform.

## 🔒 Security Best Practices
- Never commit `.env` files to version control
- Use secrets management (AWS Secrets Manager, HashiCorp Vault) in production
- Rotate API keys and database credentials regularly
- Use strong passwords (min 16 characters, mixed case, numbers, symbols)

## Configuration by Tool

### 1. Prompt Shield

#### Backend (Port 3001)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `PORT` | No | 3001 | API server port | 3001 |
| `NODE_ENV` | No | development | Environment mode | production |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string | postgres://user:pass@localhost:5432/shield |
| `REDIS_URL` | Yes | - | Redis connection string | redis://localhost:6379 |
| `JWT_SECRET` | Yes | - | JWT signing secret (32+ chars) | your-super-secret-jwt-key-here |
| `REQUIRE_API_KEY` | No | false | Enable API key auth | true |
| `API_KEY` | Conditional | - | API key (if REQUIRE_API_KEY=true) | sk_test_1234... |
| `RATE_LIMIT_WINDOW_MS` | No | 60000 | Rate limit window (ms) | 60000 |
| `RATE_LIMIT_MAX` | No | 100 | Max requests per window | 100 |
| `CORS_ORIGINS` | No | * | Allowed CORS origins (comma-sep) | https://app.example.com |
| `LOG_LEVEL` | No | info | Logging level | debug, info, warn, error |

#### Frontend (Port 3002)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `VITE_API_BASE_URL` | No | http://localhost:3001 | Backend API URL | https://api.example.com |

### 2. RedTeam Kit

#### Backend (Port 3005)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `PORT` | No | 3005 | API server port | 3005 |
| `NODE_ENV` | No | development | Environment mode | production |
| `MONGODB_URI` | Yes | - | MongoDB connection string | mongodb://localhost:27017/redteam |
| `RABBITMQ_URL` | Yes | - | RabbitMQ connection string | amqp://localhost:5672 |
| `JWT_SECRET` | Yes | - | JWT signing secret | your-jwt-secret |

#### Frontend (Port 3006)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | No | http://localhost:3005 | Backend API URL | https://api.example.com |

### 3. Compliance Checker

#### Backend (Port 3003)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `PORT` | No | 3003 | API server port | 3003 |
| `NODE_ENV` | No | development | Environment mode | production |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string | postgres://... |
| `ELASTICSEARCH_URL` | Yes | - | Elasticsearch connection | http://localhost:9200 |

#### Frontend (Port 3004)
| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `VITE_API_BASE_URL` | No | http://localhost:3003 | Backend API URL | https://api.example.com |

### 4. Core Platform (Legacy)

#### Backend (Port 3000)
Used for integration tests only. Not deployed in production.

#### Frontend (Port 5173)
Dashboard/Launchpad for accessing all three tools.

## Environment-Specific Configurations

### Development (.env.development)
```bash
NODE_ENV=development
LOG_LEVEL=debug
REQUIRE_API_KEY=false
CORS_ORIGINS=*
```

### Production (.env.production)
```bash
NODE_ENV=production
LOG_LEVEL=warn
REQUIRE_API_KEY=true
CORS_ORIGINS=https://yourdomain.com
DATABASE_URL=${DATABASE_URL_SECRET}
JWT_SECRET=${JWT_SECRET_FROM_VAULT}
```

## Observability Configuration

### Prometheus
| Variable | Default | Description |
|----------|---------|-------------|
| `PROMETHEUS_PORT` | 9090 | Prometheus server port |

### Grafana
| Variable | Default | Description |
|----------|---------|-------------|
| `GF_SECURITY_ADMIN_PASSWORD` | admin | Grafana admin password |

## Docker Compose Variables

See `docker-compose.codespaces.yml` and `.env.example` files in each workspace.

## Kubernetes ConfigMaps

For Kubernetes deployments, use ConfigMaps and Secrets:
```bash
kubectl create configmap shield-config --from-env-file=.env.production
kubectl create secret generic shield-secrets --from-literal=JWT_SECRET=xxx
```

## Validation

Validate your configuration before deployment:
```bash
./scripts/validate-config.sh
```
```

**Implementation Checklist**:
- [ ] Create file with full structure above
- [ ] Verify all variables by checking each `.env.example`
- [ ] Add security warnings prominently
- [ ] Link from README.md "Documentation" section
- [ ] Add to wiki sidebar

---

#### Task 3: Create docs/OBSERVABILITY.md
**Priority**: P1  
**Estimated Time**: 1.5 hours  
**Owner**: DevOps Team

**Content Outline**:

```markdown
# Observability Guide

## Overview
Monitoring and observability setup for the Apire AI Security Platform using Prometheus and Grafana.

## Quick Start

### Start Observability Stack
```bash
# Start all services + observability
docker-compose -f docker-compose.codespaces.yml -f docker-compose.observability.yml up -d
```

### Access Dashboards
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090

## Architecture

```
┌─────────────┐
│   Services  │
│  (3 tools)  │
└──────┬──────┘
       │ /metrics
       ▼
┌─────────────┐
│ Prometheus  │ ←─ Scrapes metrics every 15s
│   :9090     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Grafana   │
│   :3000     │
└─────────────┘
```

## Metrics Endpoints

### Health Checks
- Prompt Shield: http://localhost:3001/health
- RedTeam Kit: http://localhost:3005/health (NestJS root)
- Compliance Checker: http://localhost:3003/health

### Metrics Endpoints (future)
- Prompt Shield: http://localhost:3001/metrics
- RedTeam Kit: http://localhost:3005/metrics
- Compliance Checker: http://localhost:3003/metrics

## Prometheus Configuration

See `config/prometheus.yml`:
```yaml
scrape_configs:
  - job_name: 'prompt-shield'
    static_configs:
      - targets: ['shield-api:3001']
  
  - job_name: 'redteam-kit'
    static_configs:
      - targets: ['redteam-api:3005']
  
  - job_name: 'compliance-checker'
    static_configs:
      - targets: ['compliance-api:3003']
```

## Grafana Setup

### First-time Setup
1. Open http://localhost:3000
2. Login: admin / admin
3. Change password when prompted
4. Add Prometheus data source:
   - Configuration → Data Sources → Add Prometheus
   - URL: http://prometheus:9090
   - Save & Test

### Import Dashboards
Pre-built dashboards available in `config/grafana/dashboards/`:
- `api-overview.json` - Request rates, latencies, errors
- `security-metrics.json` - Threat detection stats
- `infrastructure.json` - CPU, memory, disk usage

Import via: + → Import → Upload JSON file

## Key Metrics to Monitor

### Application Metrics
- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request latency
- `http_requests_errors_total` - Error count
- `active_connections` - Current connections

### Security Metrics
- `threats_detected_total` - Threats by type
- `scans_performed_total` - Total scans
- `compliance_violations_total` - Compliance issues

### Infrastructure Metrics
- `process_cpu_usage` - CPU usage
- `process_memory_usage_bytes` - Memory usage
- `process_uptime_seconds` - Service uptime

## Alerting (Advanced)

Configure Prometheus alerts in `config/prometheus-alerts.yml`:
```yaml
groups:
  - name: api_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
```

## Production Considerations

### Persistent Storage
Add volumes to `docker-compose.observability.yml`:
```yaml
volumes:
  prometheus-data:
  grafana-data:
```

### Authentication
Set strong Grafana password:
```yaml
environment:
  - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
```

### Retention
Configure Prometheus retention:
```yaml
command:
  - '--storage.tsdb.retention.time=30d'
```

## Troubleshooting

### Services not showing up in Prometheus
- Check Prometheus targets: http://localhost:9090/targets
- Verify service is exposing /metrics endpoint
- Check network connectivity between containers

### Grafana can't connect to Prometheus
- Use internal Docker network name: `http://prometheus:9090`
- Don't use `localhost` inside containers

## Next Steps
- [ ] Implement /metrics endpoints in all services
- [ ] Add custom business metrics
- [ ] Set up alerting rules
- [ ] Configure log aggregation (Loki)
```

---

### Week 2: Medium Priority Tasks

#### Task 4: Create docs/RELEASE.md
**Priority**: P1  
**Estimated Time**: 1 hour

**Content**:
```markdown
# Release Process

## Versioning Policy

We follow [Semantic Versioning 2.0.0](https://semver.org/):
- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features (backward compatible)
- **PATCH** (0.0.x): Bug fixes

## Release Checklist

### Pre-Release
- [ ] All tests passing (`./scripts/test-all.sh`)
- [ ] All builds passing (`./scripts/build.sh`)
- [ ] Security audit clean (`npm audit`)
- [ ] Update CHANGELOG.md
- [ ] Version bumped in all package.json files

### Release Steps

1. **Update Version**
   ```bash
   # Update version in all workspaces
   npm version <major|minor|patch> --workspaces
   ```

2. **Update CHANGELOG.md**
   ```markdown
   ## [X.Y.Z] - YYYY-MM-DD
   
   ### Added
   - New feature descriptions
   
   ### Changed
   - Modified functionality
   
   ### Fixed
   - Bug fixes
   
   ### Security
   - Security improvements
   ```

3. **Create Git Tag**
   ```bash
   git add .
   git commit -m "chore: release vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin main --tags
   ```

4. **Automated Release**
   GitHub Actions workflow (`.github/workflows/release.yml`) automatically:
   - Builds Docker images
   - Pushes to GHCR
   - Generates SBOMs
   - Creates GitHub Release
   - Attaches artifacts

5. **Verify Release**
   - Check GitHub Releases page
   - Verify Docker images in GHCR
   - Test deployment from new images

### Post-Release
- [ ] Announce in GitHub Discussions
- [ ] Update documentation site
- [ ] Notify users via email/Slack

## Breaking Changes

When introducing breaking changes:
1. Increment MAJOR version
2. Add migration guide to CHANGELOG
3. Mark deprecated features in previous release
4. Provide upgrade path documentation

## Hotfix Process

For urgent fixes:
```bash
git checkout -b hotfix/vX.Y.Z main
# Make fixes
git commit -m "fix: critical bug"
git tag -a vX.Y.Z -m "Hotfix vX.Y.Z"
git push origin hotfix/vX.Y.Z --tags
```

## Release Schedule

- **Major releases**: Yearly (January)
- **Minor releases**: Quarterly
- **Patch releases**: As needed
- **Security patches**: Immediately
```

#### Task 5: Create docs/REVERSE_PROXY.md
**Priority**: P2  
**Estimated Time**: 1.5 hours

**Content**: Nginx and Traefik configuration examples for production gateway

#### Task 6: Mature SDK Package
**Priority**: P1  
**Estimated Time**: 6 hours

**Implementation Steps**:

1. **Create Typed Clients** (3 hours)
   ```typescript
   // packages/sdk/src/clients/PromptShieldClient.ts
   export class PromptShieldClient {
     constructor(private baseUrl: string, private apiKey?: string) {}
     
     async createTest(input: string): Promise<TestResult> {
       // POST /tests implementation
     }
     
     async getTest(id: string): Promise<TestResult> {
       // GET /tests/:id implementation
     }
   }
   
   // Similar for RedTeamKitClient and ComplianceCheckerClient
   ```

2. **Add Unit Tests** (2 hours)
   - Mock HTTP responses
   - Test error handling
   - Test authentication

3. **Create README** (30 min)
   - Installation instructions
   - Usage examples
   - API reference

4. **Add to Workspaces** (15 min)
   Update root `package.json`:
   ```json
   "workspaces": [
     "packages/sdk",
     // ... existing workspaces
   ]
   ```

---

### Week 3: Governance & Release

#### Task 7: Create Release Automation Workflow
**Priority**: P1  
**Estimated Time**: 3 hours

**File**: `.github/workflows/release.yml`
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker Images
        run: docker-compose build
      
      - name: Generate SBOMs
        run: |
          syft ghcr.io/apireaisecurity/prompt-shield:${GITHUB_REF_NAME} -o json > sbom-shield.json
          syft ghcr.io/apireaisecurity/redteam-kit:${GITHUB_REF_NAME} -o json > sbom-redteam.json
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            sbom-*.json
          generate_release_notes: true
```

#### Task 8-12: Templates, CONTRIBUTING, and v1.0.0 Tag
**Total Time**: 3 hours

---

## Success Metrics

### Completion Criteria
- [ ] All 12 tasks completed
- [ ] Build passing: `./scripts/build.sh`
- [ ] Tests passing: `./scripts/test-all.sh`
- [ ] Documentation coverage: 100%
- [ ] v1.0.0 tag created and released

### Quality Gates
- API documentation matches code (verified with tests)
- All missing docs created and reviewed
- SDK has >80% test coverage
- Release workflow successfully creates GitHub Release

---

## Risk Mitigation

### Risks
1. **API endpoint changes**: Coordinate with backend team
2. **Time estimation**: Buffer 20% for unforeseen issues
3. **Breaking changes**: Defer to v2.0.0 if needed

### Dependencies
- Requires backend team input for API verification
- Requires DevOps for observability testing
- Requires security team for SDK review

---

## Communication Plan

### Daily Standups
- Progress updates on current task
- Blockers identification
- Next task preparation

### Weekly Reviews
- Demo completed documentation
- Gather feedback
- Adjust timeline if needed

### Final Review
- Comprehensive walkthrough
- User testing
- Sign-off from stakeholders

---

## Timeline Summary

| Week | Focus | Deliverables |
|------|-------|--------------|
| **Week 1** | Critical Docs | API.md fixed, CONFIGURATION.md, OBSERVABILITY.md created |
| **Week 2** | SDK & Automation | SDK matured, Release workflow, RELEASE.md |
| **Week 3** | Governance & Release | PR template, CONTRIBUTING updated, v1.0.0 tagged |

**Total Estimated Hours**: 24-28 hours  
**Team Size**: 2-3 developers  
**Target Date**: December 31, 2025
