# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-09

### 🚀 Major Changes
- **Architecture Overhaul**: Transitioned from monolithic Core Platform to three independent security tools:
  - **Prompt Shield**: Real-time injection detection.
  - **RedTeam Kit**: Adversarial testing toolkit.
  - **Compliance Checker**: Regulatory compliance scanner.

### 💥 Breaking Changes
- **Core Platform Removal**: The legacy Core Platform (dashboard, auth service, user service) has been completely removed.
- **Port Changes**:
  - Prompt Shield: API 3001, Web 3002
  - Compliance Checker: API 3003, Web 3004
  - RedTeam Kit: API 3005, Web 3006

### 🔒 Security
- **Hardened Containers**: All backend services now run as non-root users.
- **CI/CD**: Added automated security audits (npm audit, CodeQL) and dependency updates (Dependabot).
- **Authentication**: Added API Key support and rate limiting configuration.

### 📚 Documentation
- Complete rewrite of `ARCHITECTURE.md` and `API.md`.
- Updated `DEPLOY_ON_CODESPACES.md` with new environment variables.
- Added `TESTING.md` with tool-specific strategies.
