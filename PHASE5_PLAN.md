# Phase 5 Plan: Deployment & CI/CD

This phase focuses on preparing the platform for production deployment using Kubernetes and automating the release process.

## 1. Kubernetes Manifests
- **Goal**: Define all services in Kubernetes YAML.
- **Tasks**:
  - Create `kubernetes/prompt-shield/` (api.yaml, web.yaml).
  - Create `kubernetes/redteam-kit/` (api.yaml, web.yaml).
  - Create `kubernetes/compliance-checker/` (api.yaml, web.yaml).
  - Update `kubernetes/kustomization.yaml` to include all new resources.

## 2. CI/CD Pipeline
- **Goal**: Automate testing and building of all services.
- **Tasks**:
  - Update `.github/workflows/test.yml` to run tests for all workspaces (already done via script update, but verify yaml).
  - Create `.github/workflows/build-and-push.yml` to build Docker images for all 8 services (Core Backend/Frontend + 3 Tools x 2).

## 3. Helm Chart (Optional)
- **Goal**: Package the entire platform for easy installation.
- **Tasks**:
  - Create a `charts/apire-platform` directory.
  - Template the values for ports and image tags.
