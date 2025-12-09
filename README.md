[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/apireaisecurity/apire-ai-security-platform)
[![CI](https://github.com/apireaisecurity/apire-ai-security-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/apireaisecurity/apire-ai-security-platform/actions/workflows/ci.yml)
[![Security Audit](https://github.com/apireaisecurity/apire-ai-security-platform/actions/workflows/security.yml/badge.svg)](https://github.com/apireaisecurity/apire-ai-security-platform/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Apire AI Security Platform

The Apire AI Security Platform is a comprehensive suite of security tools designed to protect AI applications against threats including prompt injection, adversarial attacks, and compliance violations.

## 🚀 Tools

- **🛡️ Prompt Shield**: Real-time defense against prompt injection and jailbreak attempts
- **⚔️ RedTeam Kit**: Advanced adversarial testing and security auditing toolkit for LLMs
- **✅ Compliance Checker**: Automated regulatory compliance scanner (GDPR, HIPAA, EU AI Act)

## ⚡ Quickstart

Start all services with Docker Compose:

```bash
./scripts/start-codespace.sh
```

Access the tools:

| Tool | Web Interface | API Endpoint |
|------|--------------|--------------|
| **Prompt Shield** | http://localhost:3002 | http://localhost:3001 |
| **RedTeam Kit** | http://localhost:3006 | http://localhost:3005 |
| **Compliance Checker** | http://localhost:3004 | http://localhost:3003 |

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, NestJS, TypeScript
- **Frontend**: React, Next.js, Vue.js, Vite, Tailwind CSS
- **Infrastructure**: Docker, Kubernetes
- **Testing**: Jest, Vitest, Playwright

## 📦 Getting Started

### 🚀 Run in GitHub Codespaces (No Install Required)

You can run the entire platform directly in your browser using GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/apireaisecurity/apire-ai-security-platform)

1. Click the badge above or the **Code** button on the GitHub repository.
2. Select the **Codespaces** tab.
3. Click **Create codespace on main**.

GitHub will spin up a cloud environment, build all Docker containers, and forward the ports so you can access the applications.

👉 **[Read the Full Deployment Guide](./docs/DEPLOY_ON_CODESPACES.md)** for detailed instructions.
👉 **[Setup Prebuilds](./docs/CODESPACES_PREBUILD.md)** to speed up Codespace creation (optional but recommended).

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/apireaisecurity/apire-ai-security-platform.git
   cd apire-ai-security-platform
   ```

2. Install dependencies (for all tools):

   ```bash
   npm install
   ```

3. Start the tools using Docker Compose:
   ```bash
   docker-compose -f docker-compose.codespaces.yml up --build
   ```

### Accessing the Tools

Once running, the services are available at:

**APIRE Prompt Shield**
- API: http://localhost:3001
- Web: http://localhost:3002

**APIRE RedTeam Kit**
- API: http://localhost:3005
- Web: http://localhost:3006

**APIRE Compliance Checker**
- API: http://localhost:3003
- Web: http://localhost:3004

### Running Individual Tools

Each tool can also be run independently:

**APIRE Prompt Shield**

```bash
cd apire-prompt-shield
docker-compose up --build
```

**APIRE RedTeam Kit**

```bash
cd apire-redteam-kit
docker-compose up --build
```

**APIRE Compliance Checker**

```bash
cd apire-compliance-checker
docker-compose up --build
```

## 🧪 Testing

Run all tests:

```bash
./scripts/test-all.sh
```

## 📖 Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Testing Guide](./docs/TESTING.md)
- [Deployment Guide](./docs/DEPLOY_ON_CODESPACES.md)

Full documentation is available in the [GitHub Wiki](https://github.com/apireaisecurity/apire-ai-security-platform/wiki).

To publish updates to the Wiki:
1. Initialize the Wiki in the GitHub UI (click "Create the first page").
2. Run the publish script:
   ```bash
   ./scripts/publish-wiki.sh
   ```

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
