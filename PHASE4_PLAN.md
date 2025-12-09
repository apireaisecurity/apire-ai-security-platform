# Phase 4 Plan: Integration & Hardening

This phase focuses on integrating the newly created tools into a cohesive platform, ensuring robust testing, and preparing for deployment.

## 1. Unified Dashboard (Core Platform)

- **Goal**: Create a single pane of glass to access all tools.
- **Tasks**:
  - Update Core Frontend (`frontend/`) to link to the new tools.
  - Implement a "Launchpad" page in the main dashboard.
  - Ensure consistent styling/theming across all apps (Tailwind).

## 2. Shared Authentication (SSO)

- **Goal**: Allow users to log in once and access all tools.
- **Tasks**:
  - Refactor `backend/src/services/auth.service.ts` to issue JWTs valid for all sub-services.
  - Update `apire-prompt-shield`, `apire-redteam-kit`, and `apire-compliance-checker` to verify the main platform's JWT.
  - Implement a shared "Auth Middleware" package or shared code pattern.

## 3. End-to-End Testing

- **Goal**: Verify that a user can navigate from the main platform to a tool and perform an action.
- **Tasks**:
  - Create a new Playwright test suite in `frontend/e2e/`.
  - Scenario: Login -> Dashboard -> Launch Prompt Shield -> Run Test.

## 4. Infrastructure Refinement

- **Goal**: Optimize Docker usage and prepare for Kubernetes.
- **Tasks**:
  - Create a master `docker-compose.override.yml` to run EVERYTHING at once (optional, for high-spec machines).
  - Review resource limits in Dockerfiles.

## 5. Documentation Finalization

- **Goal**: Ensure all new tools are documented.
- **Tasks**:
  - Generate `API.md` for each new tool.
  - Update the main `ARCHITECTURE.md` diagram.
