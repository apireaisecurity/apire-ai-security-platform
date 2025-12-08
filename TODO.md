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

## Phase 2: Quality, CI, and testing hardening (Next)

### 2.1 CI & dependency hygiene

- [ ] Add `.github/dependabot.yml` for:
    - [ ] `github-actions`
    - [ ] `npm` (root, `backend`, `frontend`)
- [ ] Add `.github/workflows/test.yml` to:
    - [ ] Run backend Jest tests with coverage
    - [ ] Run frontend Vitest tests with coverage
- [ ] Enforce coverage thresholds in CI:
    - [ ] Backend coverage ≥ 80%
    - [ ] Frontend coverage ≥ 80%
- [ ] Ensure lint/format enforcement:
    - [ ] Configure ESLint + Prettier in backend
    - [ ] Configure ESLint + Prettier in frontend
    - [ ] Run lint jobs in CI and fail on errors

### 2.2 Deeper automated testing

- [ ] Backend integration tests (Jest + supertest):
    - [ ] Register + login flow (`/api/v1/auth`)
    - [ ] Authenticated scanner call (`/api/v1/scanner`)
    - [ ] Validation error responses (invalid payloads)
    - [ ] Unauthorized access to scanner
- [ ] Frontend E2E improvements (Playwright):
    - [ ] Parameterize backend base URL via env
    - [ ] Add e2e scenario for failed login → error message
- [ ] Scanner robustness tests:
    - [ ] Empty prompt handling
    - [ ] Very long prompt input
    - [ ] Prompt triggering multiple flags (PII + injection + toxicity)

### 2.3 Performance and security checks

- [ ] Add k6 load test:
    - [ ] `tests/perf/k6-login-and-scan.js` scenario
    - [ ] NPM script `perf:k6` to run the scenario (document k6 requirement)
- [ ] Extend security scanning:
    - [ ] Add dependency vulnerability scan (e.g., `npm audit` or equivalent) for backend
    - [ ] Add dependency vulnerability scan for frontend

### 2.4 DevX & documentation

- [ ] Enhance `scripts/test-all.sh` to:
    - [ ] Run backend unit + integration tests
    - [ ] Run frontend unit tests
    - [ ] Optionally run Playwright e2e via env flag
- [ ] Add `.env.example` files:
    - [ ] Backend env example (JWT secret, ports, etc.)
    - [ ] Frontend env example (API base URL, etc.)
- [ ] Update `docs/TESTING.md` to cover:
    - [ ] Coverage goals and local commands
    - [ ] k6 load test usage
    - [ ] High-level overview of CI workflows
