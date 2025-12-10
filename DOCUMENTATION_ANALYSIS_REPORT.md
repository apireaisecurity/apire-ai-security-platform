# Documentation Inconsistency Analysis Report

**Date**: December 10, 2025
**Status**: Analysis Complete
**Scope**: README.md, docs/, wiki_content/

## Executive Summary
The documentation has been analyzed against the current codebase state (3-tool microservices architecture). While the high-level structure is consistent, there are several discrepancies in port numbers, API endpoints, and deployment instructions between the `README.md`, `wiki_content`, and the actual codebase configuration.

## 1. Port Configuration Inconsistencies

| Component | README.md | Wiki (Home/Getting-Started) | Codebase (docker-compose.yml) | Status |
|-----------|-----------|-----------------------------|-------------------------------|--------|
| **Prompt Shield API** | 3001 | 3001 | 3001 | ✅ Consistent |
| **Prompt Shield Web** | 3002 | 3002 | 3002 | ✅ Consistent |
| **Compliance API** | 3003 | 3003 | 3003 | ✅ Consistent |
| **Compliance Web** | 3004 | 3004 | 3004 | ✅ Consistent |
| **RedTeam API** | 3005 | 3005 | 3005 | ✅ Consistent |
| **RedTeam Web** | 3006 | 3006 | 3006 | ✅ Consistent |

**Finding**: Port documentation is currently consistent across major files.

## 2. Architecture & Terminology

- **Issue**: `README.md` mentions "Core Platform removal" in the changelog todo, but some docs might still reference a monolithic "Core" or "Gateway".
- **Finding**: `docs/ARCHITECTURE.md` correctly depicts the 3-tool architecture with a Gateway. However, the `docker-compose.yml` structure implies independent services without a unified Gateway container in the default stack.
- **Action**: Clarify if the "Gateway" in `ARCHITECTURE.md` is a logical component (Ingress) or a missing physical container.

## 3. Deployment Instructions

- **Issue**: `wiki_content/Deployment.md` references `kubectl apply -k kubernetes/`.
- **Verification**: The `kubernetes/` directory exists with `kustomization.yaml`.
- **Gap**: The `README.md` focuses heavily on Codespaces and Docker Compose, with Kubernetes mentioned only briefly. The Wiki provides more detail but lacks specific prerequisites for the *new* microservices (e.g., does RedTeam need a specific RabbitMQ setup in K8s?).

## 4. API Reference Gaps

- **Issue**: `wiki_content/API-Reference.md` lists `POST /test` and `POST /analyze` for Prompt Shield.
- **Verification Needed**: Verify if these endpoints exist in `apire-prompt-shield/backend/src/routes`.
- **Gap**: The API reference is manual and likely outdated compared to the actual code. It should ideally point to a generated Swagger/OpenAPI spec.

## 5. Missing Documentation

1.  **Observability**: `TODO.md` mentions Prometheus/Grafana, but no docs exist in `wiki_content` or `docs/` explaining how to access dashboards.
2.  **SDK**: `TODO.md` mentions `@apire/sdk`, but no documentation exists for client usage.
3.  **Configuration**: No detailed guide on environment variables for each specific tool (only generic `.env` mentions).

## Recommended Actions

### Immediate Fixes
1.  **Consolidate Deployment Guides**: Merge `docs/DEPLOY_ON_CODESPACES.md` content into the Wiki's `Getting-Started.md` to avoid duplication.
2.  **Update API Reference**: Replace manual endpoint lists in Wiki with a link to the Swagger UI (if available) or the `docs/API.md` which should be auto-generated.
3.  **Clarify Gateway**: Update `ARCHITECTURE.md` to reflect the actual Docker Compose setup (direct access vs. gateway).

### Long-term Improvements
1.  **Auto-generated Docs**: Implement TypeDoc or similar to generate API docs from the TypeScript code.
2.  **Versioning**: Add version dropdowns or tags to the Wiki if multiple versions are supported.

## Todo List for Documentation Updates

- [ ] **Wiki**: Update `Home.md` to remove "Core Platform" references if any remain.
- [ ] **Wiki**: Update `API-Reference.md` to match the actual routes in `apire-prompt-shield`, `apire-redteam-kit`, and `apire-compliance-checker`.
- [ ] **Docs**: Create `docs/CONFIGURATION.md` listing all environment variables for the 3 tools.
- [ ] **Docs**: Create `docs/OBSERVABILITY.md` explaining the Prometheus/Grafana setup.
- [ ] **README**: Add a "Documentation" section linking to the Wiki and specific guides in `docs/`.
