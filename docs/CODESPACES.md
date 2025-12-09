# GitHub Codespaces Guide

This repository is configured for a seamless experience with GitHub Codespaces.

> **New:** Check out the comprehensive [Deployment Guide](./DEPLOY_ON_CODESPACES.md) for detailed instructions.

## 🚀 Quick Start

1. Click the **Code** button on the GitHub repository page.
2. Select the **Codespaces** tab.
3. Click **Create codespace on main**.

Wait for the environment to build (approx. 2-3 minutes). Once ready, you will see a welcome message in the terminal.

## 🔗 Accessing Applications

Codespaces will automatically forward the following ports. You can access them via the "Ports" tab in VS Code or the pop-up notifications.

| Application            | Description               | Port   |
| :--------------------- | :------------------------ | :----- |
| **Prompt Shield Web**  | Injection Testing UI      | `3002` |
| **Prompt Shield API**  | Shield Backend API        | `3001` |
| **RedTeam Kit Web**    | Attack Simulation UI      | `3006` |
| **RedTeam Kit API**    | RedTeam Backend API       | `3005` |
| **Compliance Web**     | Policy Scanning UI        | `3004` |
| **Compliance API**     | Compliance Backend API    | `3003` |

## 🛠️ Development Workflow

### Terminal

The terminal is pre-configured with `zsh` and all necessary tools (`node`, `npm`, `docker`, `kubectl`).

### Running Tests

To run the full test suite:

```bash
./scripts/test-all.sh
```

### Debugging

We have pre-configured launch tasks for VS Code.

1. Go to the **Run and Debug** view (Ctrl+Shift+D).
2. Select a configuration for a specific tool.
3. Press **F5** to start debugging.

## 🐳 Docker Support

Docker-in-Docker is enabled. You can build and run containers just like on your local machine.

```bash
docker-compose up --build
```
