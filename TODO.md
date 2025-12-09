# Project Task List: Apire AI Security Platform

This TODO focuses on this single repo. Phase 1 reflects the current MVP; Phase 2 is a realistic next step.

## Phase 1: MVP (Completed)

- [x] **Root & Structure**
    - [x] Initialize `package.json` (workspace root)
    - [x] Create `.gitignore`, `.editorconfig`, `.nvmrc`
    - [x] Set up base `tsconfig.json`
    - [x] Create `backend/`, `frontend/`, `docs/`, `scripts/`, `kubernetes/`
- [x] **Backend MVP**
    - [x] Express app with `/health`, `/api/v1/auth`, `/api/v1/scanner`
    - [x] Auth module (controller, service, middleware, routes, in-memory model)
    - [x] Scanner module (service, controller, routes)
    - [x] Jest unit tests for health, auth controller, scanner service
- [x] **Frontend MVP**
    - [x] React/Vite app with login and dashboard
    - [x] Basic routing
    - [x] Unit tests for login and dashboard (Vitest + RTL)
- [x] **Infra & Tooling**
    - [x] Dockerfiles for backend/frontend (+ test variants)
    - [x] `docker-compose.yml` and `docker-compose.test.yml`
    - [x] Kubernetes base manifests (backend + frontend deployments and services)
    - [x] Basic CI and security scan workflows
    - [x] Shell scripts: `build.sh`, `test-all.sh`, `deploy.sh`
- [x] **Docs & Governance**
    - [x] `README.md`
    - [x] `docs/ARCHITECTURE.md`, `docs/API.md`, `docs/TESTING.md`
    - [x] Issue/PR templates, `SECURITY.md`, `CODEOWNERS`

## Phase 2: Quality, CI, and testing hardening (In Progress)

### 2.1 CI & dependency hygiene ✅

- [x] Add `.github/dependabot.yml` for:
    - [x] `github-actions`
    - [x] `npm` (root, `backend`, `frontend`)
- [x] Add `.github/workflows/test.yml` to:
    - [x] Run backend Jest tests with coverage
    - [x] Run frontend Vitest tests with coverage
    - [x] Run lint jobs for both backend and frontend
- [x] Enforce coverage thresholds in CI:
    - [x] Backend coverage ≥ 80% (currently: 92.24% statements, 88.46% branches, 84.61% functions)
    - [x] Frontend coverage ≥ 80% (currently: 100% on tested files)
- [x] Ensure lint/format enforcement:
    - [x] Configure ESLint 9 + Prettier in backend
    - [x] Configure ESLint 9 + Prettier in frontend
    - [x] Run lint jobs in CI and fail on errors

### 2.2 Deeper automated testing ✅

- [x] Backend integration tests (Jest + supertest):
    - [x] Register + login flow (`/api/v1/auth`)
    - [x] Authenticated scanner call (`/api/v1/scanner`)
    - [x] Validation error responses (invalid payloads)
    - [x] Unauthorized access to scanner
    - [x] Total: 12 integration tests passing
- [x] Frontend E2E improvements (Playwright):
    - [x] Parameterize backend base URL via `VITE_API_BASE_URL` env
    - [x] Wire Login component with real backend integration (POST to `/api/v1/auth/login`)
    - [x] Add e2e scenario for failed login → error message visible
    - [x] Install Playwright browsers and fix PostCSS config for clean runs
- [x] Scanner robustness tests:
    - [x] Empty prompt handling
    - [x] Very long prompt input (50k characters)
    - [x] Behavior validation: `checkType` parameter limits scanning to specified threat category
    - [x] Total: 6 scanner service tests passing

### 2.3 Performance and security checks ✅

- [x] Add k6 load test:
    - [x] `tests/perf/k6-login-and-scan.js` scenario (login + scanner flow)
    - [x] NPM script `perf:k6` to run the scenario
    - [x] README with installation and usage instructions
    - [x] Performance thresholds: p95 < 500ms, error rate < 10%
- [x] Extend security scanning:
    - [x] Add `npm audit` to test workflow for all workspaces
    - [x] Create dedicated security workflow (`.github/workflows/security.yml`)
    - [x] Weekly scheduled security audits
    - [x] CodeQL static analysis integration
    - [x] Audit report artifacts

### 2.4 DevX & documentation ✅

- [x] Enhance `scripts/test-all.sh` to:
    - [x] Run backend unit + integration tests
    - [x] Run frontend unit tests
    - [x] Optionally run Playwright e2e via `RUN_E2E` env flag
    - [x] Optionally run with coverage via `RUN_COVERAGE` env flag
    - [x] Colorized output and summary
- [x] Add `.env.example` files:
    - [x] Backend env example (JWT secret, ports, NODE_ENV)
    - [x] Frontend env example (VITE_API_BASE_URL)
- [x] Update `docs/TESTING.md` to cover:
    - [x] Coverage goals and local commands
    - [x] k6 load test usage
    - [x] High-level overview of CI workflows
    - [x] Comprehensive testing strategy documentation
    - [x] Troubleshooting guide

## Phase 3: Product Suite Expansion (Completed)

- [x] **APIRE Prompt Shield**
    - [x] Create Specification (`docs/specs/prompt-shield/SPECIFICATION.md`)
    - [x] Initialize Backend (Express) & Frontend (React)
    - [x] Implement Core Logic (Test Service, Scenarios)
    - [x] Dockerize (Dockerfile, docker-compose.yml)
- [x] **APIRE RedTeam Kit**
    - [x] Create Specification (`docs/specs/redteam-kit/SPECIFICATION.md`)
    - [x] Initialize Backend (NestJS) & Frontend (Next.js)
    - [x] Dockerize (Dockerfile, docker-compose.yml)
- [x] **APIRE Compliance Checker**
    - [x] Create Specification (`docs/specs/compliance-checker/SPECIFICATION.md`)
    - [x] Initialize Backend (Express) & Frontend (Vue.js)
    - [x] Dockerize (Dockerfile, docker-compose.yml)
- [x] **Integration**
    - [x] Update root `package.json` workspaces
    - [x] Update `scripts/build.sh`
    - [x] Update `README.md` with running instructions

## Phase 4: Integration & Hardening (Completed)

- [x] **Unified Dashboard**
    - [x] Add Launchpad to Core Dashboard
    - [x] Resolve port conflicts (RedTeam Kit moved to 3005/3006)
- [x] **Shared Authentication**
    - [x] Implement JWT Middleware in Prompt Shield
    - [x] Implement JWT Middleware in Compliance Checker
    - [x] Implement AuthGuard in RedTeam Kit
- [x] **Testing**
    - [x] Create Integration E2E Test (`frontend/e2e/integration.spec.ts`)
    - [x] Update `test-all.sh` to run all suites

## Phase 5: Deployment Preparation (Completed)

- [x] **Kubernetes Manifests**
    - [x] Create Prompt Shield Manifests (`kubernetes/prompt-shield/`)
    - [x] Create RedTeam Kit Manifests (`kubernetes/redteam-kit/`)
    - [x] Create Compliance Checker Manifests (`kubernetes/compliance-checker/`)
    - [x] Update `kustomization.yaml`