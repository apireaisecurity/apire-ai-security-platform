# Testing Guide

We use a comprehensive testing strategy involving Unit, Integration, and E2E tests.

## Backend Testing

- **Framework**: Jest
- **Location**: `backend/src/__tests__`
- **Running Tests**:
  ```bash
  cd backend
  npm test
  ```

## Frontend Testing

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Location**: `frontend/src/__tests__`
- **Running Unit Tests**:
  ```bash
  cd frontend
  npm test
  ```
- **Running E2E Tests**:
  ```bash
  cd frontend
  npx playwright test
  ```

## CI/CD

Tests are automatically run on every push and pull request via GitHub Actions. See `.github/workflows/ci.yml` for details.
