# Testing Guide

This document describes the comprehensive testing strategy for the Apire AI Security Platform's three security tools: Prompt Shield, RedTeam Kit, and Compliance Checker.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Coverage Goals](#coverage-goals)
- [Testing by Tool](#testing-by-tool)
- [Performance Testing](#performance-testing)
- [Security Testing](#security-testing)
- [CI/CD Workflows](#cicd-workflows)
- [Running Tests Locally](#running-tests-locally)

## Testing Strategy

We employ a multi-layered testing approach across all three tools:

1. **Unit Tests**: Test individual functions and components in isolation
2. **Integration Tests**: Test API endpoints and service interactions
3. **E2E Tests**: Test complete user flows in a browser
4. **Performance Tests**: Load testing with k6
5. **Security Tests**: Dependency audits and static analysis

## Coverage Goals

We enforce strict coverage thresholds in CI to maintain code quality:

| Metric     | Threshold | Target |
| ---------- | --------- | ------ |
| Statements | ≥ 80%     | 90%+   |
| Branches   | ≥ 80%     | 85%+   |
| Functions  | ≥ 80%     | 85%+   |
| Lines      | ≥ 80%     | 90%+   |

**Coverage is enforced in CI** - PRs that drop coverage below thresholds will fail.

## Testing by Tool

### Prompt Shield

**Framework & Tools**:
- **Backend**: Jest + ts-jest + supertest
- **Frontend**: Vitest + React Testing Library
- **E2E**: Playwright
- **Location**: `apire-prompt-shield/backend/src/__tests__/` and `apire-prompt-shield/frontend/src/__tests__/`

**Running Tests**:
```bash
# Backend tests
cd apire-prompt-shield/backend
npm test

# Frontend tests
cd apire-prompt-shield/frontend
npm test

# E2E tests
cd apire-prompt-shield
# E2E tests
cd apire-prompt-shield
npx playwright test
```

**Test Coverage Areas**:
- Injection detection algorithms
- PII scanning and redaction
- Risk scoring accuracy
- API endpoint validation
- Frontend user flows

### RedTeam Kit

**Framework & Tools**:
- **Backend**: Jest + ts-jest + supertest (NestJS testing)
- **Frontend**: Jest + React Testing Library (Next.js)
- **E2E**: Playwright
- **Location**: `apire-redteam-kit/backend/test/` and `apire-redteam-kit/frontend/__tests__/`

**Running Tests**:
```bash
# Backend tests
cd apire-redteam-kit/backend
npm test

# Frontend tests
cd apire-redteam-kit/frontend
npm test

# E2E tests
cd apire-redteam-kit
npx playwright test
```

**Test Coverage Areas**:
- Attack scenario execution
- Report generation
- Simulation orchestration
- MongoDB integration
- RabbitMQ message handling

### Compliance Checker

**Framework & Tools**:
- **Backend**: Jest + ts-jest + supertest
- **Frontend**: Vitest + Vue Test Utils
- **E2E**: Playwright
- **Location**: `apire-compliance-checker/backend/src/__tests__/` and `apire-compliance-checker/frontend/src/__tests__/`

**Running Tests**:
```bash
# Backend tests
cd apire-compliance-checker/backend
npm test

# Frontend tests
cd apire-compliance-checker/frontend
npm test

# E2E tests
cd apire-compliance-checker
npx playwright test
```

**Test Coverage Areas**:
- Policy validation logic
- Framework compliance checks
- Elasticsearch integration
- Audit report generation
- Remediation recommendations

**Unit Tests (9 tests)**:

- Login component (render, input handling, success, error handling)
- Dashboard component (render, safe results, unsafe results, error handling)

**E2E Tests (5 tests)**:

- Page title and navigation
- Login form rendering
- Failed login with error message
- Dashboard scan flow

## Performance Testing

We use [k6](https://k6.io/) for load testing.

### Installing k6

```bash
# macOS
brew install k6

# Linux
sudo apt-get install k6

# Windows
choco install k6
```

See [tests/perf/README.md](../tests/perf/README.md) for detailed installation instructions.

### Running Performance Tests

```bash
# Start backend server first
cd backend
npm run dev

# In another terminal, run k6 test
npm run perf:k6

# With custom backend URL
API_BASE_URL=http://localhost:4000 npm run perf:k6
```

### Performance Thresholds

- **95th percentile response time**: < 500ms
- **Error rate**: < 10%
- **Test scenario**: 10 concurrent users for 1 minute

### k6 Test Scenarios

**Login and Scanner Flow** (`tests/perf/k6-login-and-scan.js`):

1. Register a test user
2. Login and obtain JWT token
3. Make scanner API requests with various prompts
4. Validate response structure and performance

## Security Testing

### Dependency Audits

We run `npm audit` in CI to catch known vulnerabilities:

```bash
# Audit all workspaces
npm audit --audit-level=high

# Audit specific workspace
cd backend && npm audit --audit-level=high
cd frontend && npm audit --audit-level=high

# Fix vulnerabilities automatically (use with caution)
npm audit fix
```

### CodeQL Analysis

GitHub's CodeQL runs on every push to scan for security vulnerabilities in the codebase. Results are available in the **Security** tab.

### Dependabot

Dependabot automatically creates PRs for dependency updates weekly. Review and merge these promptly to stay secure.

## CI/CD Workflows

### Test Workflow (`.github/workflows/test.yml`)

Runs on every push and PR:

1. **Lint Job**: ESLint checks on backend and frontend
2. **Backend Tests Job**: Jest tests with coverage enforcement
3. **Frontend Tests Job**: Vitest tests with coverage enforcement
4. **Security Audit Job**: npm audit on all workspaces

### Security Workflow (`.github/workflows/security.yml`)

Runs weekly and on push:

1. **Dependency Audit**: npm audit with detailed reports
2. **CodeQL Analysis**: Static security analysis

All workflows must pass before merging to `main`.

## Running Tests Locally

### Quick Test Commands

```bash
# Run all tests across all workspaces
./scripts/test-all.sh

# Run with coverage
RUN_COVERAGE=true ./scripts/test-all.sh

# Run including E2E tests (backend must be running)
RUN_E2E=true ./scripts/test-all.sh

# Run with all options
RUN_COVERAGE=true RUN_E2E=true ./scripts/test-all.sh

# Skip lint checks
RUN_LINT=false ./scripts/test-all.sh
```

### Manual Test Workflow

```bash
# 1. Install dependencies
npm install

# 2. Run linters
npm run lint --workspaces

# 3. Run backend tests
cd backend && npm test -- --coverage

# 4. Run frontend tests
cd frontend && npm test -- --coverage

# 5. Start backend for E2E (in separate terminal)
cd backend && npm run dev

# 6. Run E2E tests
cd frontend && npm run test:e2e

# 7. (Optional) Run performance tests
npm run perf:k6
```

## Test Environment Setup

### Backend Environment

Create `backend/.env` from `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
# Edit JWT_SECRET, PORT, NODE_ENV
```

### Frontend Environment

Create `frontend/.env.local` from `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env.local
# Edit VITE_API_BASE_URL if backend runs on different port
```

## Troubleshooting

### E2E Tests Fail with "Backend not responding"

Make sure the backend server is running on port 3000 (or the configured `VITE_API_BASE_URL`).

### Coverage Threshold Errors

If coverage drops below 80%, add more tests to the affected files:

```bash
# Check which files need more coverage
cd backend && npm test -- --coverage
cd frontend && npm test -- --coverage
```

### Playwright Browser Installation

If E2E tests fail with "browser not found":

```bash
cd frontend
npx playwright install
```

### k6 Not Found

Install k6 following the instructions in [tests/perf/README.md](../tests/perf/README.md).

## Best Practices

1. **Write tests before implementing features** (TDD approach)
2. **Keep tests isolated** - No shared state between tests
3. **Mock external dependencies** - Use jest.mock() or vi.mock()
4. **Use descriptive test names** - Clearly state what's being tested
5. **Test edge cases** - Empty inputs, very long inputs, special characters
6. **Maintain coverage** - Always check coverage before committing
7. **Run full test suite** - Use `./scripts/test-all.sh` before pushing

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [k6 Documentation](https://k6.io/docs/)
- [React Testing Library](https://testing-library.com/react)

## CI Status

All tests and security checks run automatically on every commit. Check the **Actions** tab in GitHub for workflow results.

---

**Questions?** Open an issue or contact the team.
