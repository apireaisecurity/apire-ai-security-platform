# ☁️ Deploying Apire AI Security Platform on GitHub Codespaces

This guide provides detailed instructions on how to deploy, run, and test the entire Apire AI Security Platform using GitHub Codespaces. This environment allows you to run the full stack (Backend, Frontend, Databases, and AI Tools) directly in your browser without any local installation.

## 📋 Table of Contents
1. [What is GitHub Codespaces?](#what-is-github-codespaces)
2. [Quick Start](#quick-start)
3. [Architecture Overview](#architecture-overview)
4. [Accessing the Applications](#accessing-the-applications)
5. [Running the Full Stack](#running-the-full-stack)
6. [Testing & Validation](#testing--validation)
7. [Troubleshooting](#troubleshooting)

---

## 1. What is GitHub Codespaces?
GitHub Codespaces provides a cloud-hosted development environment that is pre-configured with all the tools, libraries, and dependencies needed for this project. It includes:
- **Node.js & npm**: For running the application code.
- **Docker & Docker Compose**: For containerizing services.
- **PostgreSQL, MongoDB, Redis**: Pre-configured databases.
- **VS Code**: A full-featured code editor in your browser.

## 2. Quick Start

### Step 1: Launch Codespace
1. Navigate to the [Apire AI Security Platform Repository](https://github.com/apireaisecurity/apire-ai-security-platform).
2. Click the green **Code** button.
3. Select the **Codespaces** tab.
4. Click **Create codespace on main**.

> **Note**: The first time you launch a Codespace, it may take 3-5 minutes to build the container image. Subsequent launches will be much faster.

### Step 2: Wait for Initialization
Once the VS Code interface loads, a terminal will open automatically. You will see a setup script running:
- Installing dependencies (`npm install`)
- Building all workspaces (`npm run build`)

Wait until you see the **"Welcome to APIRE AI Security Platform"** banner in the terminal.

---

## 3. Architecture Overview
The platform consists of four main components, each running on specific ports:

| Component | Tech Stack | Description |
| :--- | :--- | :--- |
| **Core Platform** | Node.js, React, Postgres | The main dashboard and authentication service. |
| **Prompt Shield** | Express, React, Redis | Real-time prompt injection detection tool. |
| **RedTeam Kit** | NestJS, Next.js, Mongo | Adversarial attack simulation toolkit. |
| **Compliance Checker** | Express, Vue.js, Elastic | Automated policy compliance scanner. |

---

## 4. Accessing the Applications
GitHub Codespaces automatically forwards ports to public URLs. You can access them via the **PORTS** tab in the bottom panel of VS Code.

| Application | Port | Access URL |
| :--- | :--- | :--- |
| **Core Dashboard** | `5173` | Click the "Globe" icon next to port 5173 |
| **Prompt Shield** | `3002` | Click the "Globe" icon next to port 3002 |
| **RedTeam Kit** | `3006` | Click the "Globe" icon next to port 3006 |
| **Compliance Checker** | `3004` | Click the "Globe" icon next to port 3004 |

> **Tip**: If a port is not listed, press `F1` and type **"Ports: Focus on Ports View"** to open the panel.

---

## 5. Running the Full Stack
By default, the setup script builds the code but does not start the servers to save resources. You have two options to run the platform:

### Option A: Run via Docker (Recommended)
This simulates a production-like environment where every service runs in its own container.

1. Open a new terminal (`Ctrl + Shift + `).
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
3. This will start:
   - Core Backend & Frontend
   - Prompt Shield API & Web
   - RedTeam Kit API & Web
   - Compliance Checker API & Web
   - All Databases (Postgres, Mongo, Redis)

### Option B: Run via NPM (Development Mode)
If you want to work on the code and see changes instantly (Hot Reload):

1. **Core Platform**:
   ```bash
   npm run dev
   ```
2. **Prompt Shield**:
   ```bash
   cd apire-prompt-shield && npm run dev
   ```
   *(Repeat for other tools in separate terminals)*

---

## 6. Testing & Validation
We have a comprehensive test suite pre-configured.

### Run All Tests
To verify that everything is working correctly:
```bash
./scripts/test-all.sh
```
This script will:
1. Lint all codebases.
2. Run Unit Tests for Backend & Frontend.
3. Run Integration Tests.
4. Generate a summary report.

### Run E2E Tests
To run End-to-End tests with Playwright (simulating real user interactions):
```bash
RUN_E2E=true ./scripts/test-all.sh
```

---

## 7. Troubleshooting

### "Port already in use"
If you see this error, it means a service is already running.
- Run `docker-compose down` to stop all containers.
- Kill any running node processes: `pkill -f node`.

### "Database connection failed"
Ensure the database containers are running.
- Run `docker ps` to check active containers.
- If missing, run `docker-compose up -d postgres mongo redis`.

### "502 Bad Gateway" on URL
This usually means the application server hasn't finished starting yet. Wait 10-20 seconds and refresh the page.

---

**Happy Hacking! 🛡️**
