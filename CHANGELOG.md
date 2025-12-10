# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.0.0] - 2024-12-09

### 🎉 First Stable Release

The Apire AI Security Platform is now production-ready with comprehensive documentation, a mature SDK, and automated release pipeline.

### 🚀 Major Features

- **Three Independent Security Tools**:
  - **Prompt Shield**: Real-time injection detection and jailbreak prevention (Ports 3001/3002)
  - **RedTeam Kit**: Advanced adversarial testing toolkit (Ports 3005/3006)
  - **Compliance Checker**: Automated regulatory compliance scanner (Ports 3003/3004)
- **Production-Ready SDK**: `@apire/sdk` v1.0.0 with full TypeScript support
- **Comprehensive Documentation**: 10+ documentation files covering all aspects
- **Automated CI/CD**: Complete GitHub Actions workflows for testing, building, and releasing
- **Docker & Kubernetes**: Production-ready deployment configurations
- **Observability**: Prometheus/Grafana integration guide

### 💥 Breaking Changes

- **Core Platform Removal**: The legacy Core Platform (dashboard, auth service, user service) has been completely removed. Each tool now operates independently.
- **Port Changes**:
  - RedTeam Kit API: 3003 → **3005**
  - RedTeam Kit Web: 3004 → **3006**
  - Compliance Checker remains at 3003/3004
- **API Endpoint Changes**:
  - Prompt Shield: `/test` → `/tests`, `/analyze` removed
  - Compliance Checker: `/scan` → `/scans`, `/scans/:id/status` removed
  - RedTeam Kit: `/scenarios/run`, `/simulations`, `/reports` removed (not yet implemented)

### � Documentation

- **Added `docs/CONFIGURATION.md`**: Complete environment variable reference for all 8 workspaces
- **Added `docs/OBSERVABILITY.md`**: Prometheus/Grafana setup guide with metrics definitions
- **Added `docs/RELEASE.md`**: Versioning strategy, release process, and changelog guidelines
- **Added `docs/REVERSE_PROXY.md`**: Production-ready nginx/Traefik/Caddy configurations
- **Updated `docs/API.md`**: Fixed endpoint documentation to match actual implementations
- **Updated `wiki_content/API-Reference.md`**: Added warning banner and quick reference table
- **Added `packages/sdk/README.md`**: Comprehensive SDK usage guide with 20+ examples

### ✨ SDK Enhancements

- **Full TypeScript Support**: Complete type definitions for all API responses
- **Three Client Implementations**: `PromptShieldClient`, `RedTeamKitClient`, `ComplianceCheckerClient`
- **Unified Client**: `ApireClient` class providing access to all tools
- **Error Handling**: 8 custom error classes (AuthenticationError, RateLimitError, TimeoutError, etc.)
- **Retry Logic**: Automatic exponential backoff for failed requests
- **Helper Methods**: `isPromptSafe()`, `batchTest()`, `scanGDPR()`, `scanHIPAA()`, etc.
- **Comprehensive Examples**: Production-ready code examples in documentation

### 🔧 GitHub Actions

- **Enhanced Release Workflow**: 
  - Matrix testing across all 8 workspaces
  - Docker image building for 6 containers (multi-platform: amd64/arm64)
  - Automated NPM publishing for SDK
  - Comprehensive release notes generation
  - Smoke tests for deployed images
- **Pull Request Template**: Structured template with code quality, testing, and documentation checklists
- **Improved CI/CD**: Security scanning, dependency auditing, and automated testing

### 🤝 Contribution & Governance

- **Updated `CONTRIBUTING.md`**: Expanded from 30 to 500+ lines with:
  - Development workflow (branch naming, commit conventions)
  - Testing requirements (70% minimum coverage)
  - Documentation standards
  - Pull request process
  - Coding guidelines
  - Workspace-specific contribution notes
- **Added `.github/pull_request_template.md`**: Comprehensive PR template
- **Added `.vscode/settings.json`**: Workspace configuration for consistent development
- **Added `.vscode/extensions.json`**: 30+ recommended VS Code extensions

### 🔒 Security

- **Hardened Containers**: All backend services run as non-root users
- **Security Scanning**: Automated npm audit, CodeQL, and container scanning in CI/CD
- **API Key Authentication**: Support for `REQUIRE_API_KEY` and `API_KEY` environment variables
- **Rate Limiting**: Configurable rate limiting for all APIs
- **CORS Configuration**: Restrictive CORS policies for production

### � Bug Fixes

- Fixed API documentation drift (15+ endpoints that didn't exist)
- Corrected port numbers in docker-compose files
- Fixed TypeScript configuration issues across workspaces
- Resolved linting errors in frontend applications

### 🧹 Maintenance

- Removed duplicate `.js` files where `.tsx` versions existed
- Cleaned up legacy Core Platform code
- Updated all `package.json` files to v1.0.0
- Standardized directory structures across workspaces

### 📦 Dependencies

- Updated to Node.js 20 (LTS)
- Updated all major dependencies to latest stable versions
- Added `axios` to SDK for HTTP client
- Added Prometheus and Grafana to observability stack

### 🔄 Migration Guide

**From v0.x to v1.0.0**:

1. **Update Port Numbers**:
   ```bash
   # Old ports (v0.x)
   RedTeam Kit API: 3003
   RedTeam Kit Web: 3004
   
   # New ports (v1.0.0)
   RedTeam Kit API: 3005
   RedTeam Kit Web: 3006
   ```

2. **Update API Endpoints**:
   ```bash
   # Prompt Shield
   POST /test → POST /tests
   
   # Compliance Checker
   POST /scan → POST /scans
   ```

3. **Update Environment Variables** (see `docs/CONFIGURATION.md`):
   - Add `REQUIRE_API_KEY=true` for production
   - Set `API_KEY=your-secure-key`
   - Update `CORS_ORIGINS` to specific domains

4. **Update Docker Compose**:
   ```bash
   docker-compose -f docker-compose.codespaces.yml down
   docker-compose -f docker-compose.codespaces.yml pull
   docker-compose -f docker-compose.codespaces.yml up -d
   ```

5. **Install New SDK**:
   ```bash
   npm install @apire/sdk@1.0.0
   ```

### 📊 Statistics

- **Tests**: 39/39 passing across all workspaces
- **Code Coverage**: Maintained at target levels
- **Documentation**: ~5,000 lines added
- **SDK**: ~2,000 lines of TypeScript code
- **Docker Images**: 6 production-ready containers
- **Kubernetes Manifests**: Complete deployment configurations
