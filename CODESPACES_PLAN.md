# Codespaces Experience Plan

This document outlines the tasks required to create a seamless "one-click" developer experience using GitHub Codespaces.

## Goals

1.  **Zero Configuration**: A user should be able to open the repo in Codespaces and have a fully running environment.
2.  **Discoverability**: Ports and services should be clearly labeled and easy to access.
3.  **Debuggability**: Pre-configured launch tasks for debugging backend services.
4.  **Guidance**: Clear documentation on how to use the Codespace.

## Task List

### 1. Configuration Refinement (`.devcontainer/devcontainer.json`)

- [ ] **Port Attributes**: Add `label` and `onAutoForward` properties to `forwardPorts`.
  - Core API (3000): "Core Backend"
  - Core Web (5173): "Core Frontend"
  - Prompt Shield API (3001): "Prompt Shield API"
  - Prompt Shield Web (3002): "Prompt Shield Web"
  - Compliance API (3003): "Compliance API"
  - Compliance Web (3004): "Compliance Web"
  - RedTeam API (3005): "RedTeam API"
  - RedTeam Web (3006): "RedTeam Web"
- [ ] **Extensions**: Ensure the following are included:
  - `dbaeumer.vscode-eslint`
  - `esbenp.prettier-vscode`
  - `ms-azuretools.vscode-docker`
  - `ms-kubernetes-tools.vscode-kubernetes-tools`
  - `rangav.vscode-thunder-client` (for API testing)

### 2. Automation Scripts

- [ ] **`scripts/setup-codespace.sh`**:
  - Install dependencies (`npm install`).
  - Build all workspaces (`npm run build`).
  - (Optional) Seed database with sample data.
- [ ] **`scripts/welcome.sh`**:
  - Print a banner with links to all running services.
  - Display basic commands (test, build).

### 3. Debugging Configuration (`.vscode/launch.json`)

- [ ] Create launch configurations for:
  - Core Backend (Attach or Launch)
  - Prompt Shield Backend
  - RedTeam Backend
  - Compliance Backend
- [ ] Create a "Debug All" compound configuration.

### 4. Documentation

- [ ] **`docs/CODESPACES.md`**:
  - Prerequisites (GitHub account).
  - How to start.
  - Directory structure explanation.
  - Troubleshooting common issues.
- [ ] **`README.md`**:
  - Add the official "Open in GitHub Codespaces" badge.

## Success Criteria

- A new user can click the badge, wait for the container to build, and immediately see the "Core Frontend" running in the simple browser or a new tab without typing any terminal commands.
