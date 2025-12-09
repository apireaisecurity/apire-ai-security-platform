[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/apireaisecurity/apire-ai-security-platform)

# Apire AI Security Platform

The Apire AI Security Platform is a comprehensive solution for securing AI applications, featuring prompt injection detection, PII scanning, and toxicity checks.

## 🚀 Features

- **Prompt Shield**: Detects and blocks prompt injection attacks.
- **PII Scanner**: Identifies and redacts Personally Identifiable Information.
- **Toxicity Check**: Filters harmful or toxic content.
- **Dashboard**: User-friendly interface for managing security policies and viewing scan results.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, Vite, Tailwind CSS
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

2. Install dependencies (for all workspaces):

   ```bash
   npm install
   ```

3. Start the Core Platform:
   ```bash
   docker-compose up --build
   ```

   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

### Running Additional Tools

Each tool runs in its own Docker environment.

**APIRE Prompt Shield**

```bash
cd apire-prompt-shield
docker-compose up --build
```

- API: http://localhost:3001
- Web: http://localhost:3002

**APIRE RedTeam Kit**

```bash
cd apire-redteam-kit
docker-compose up --build
```

- API: http://localhost:3005
- Web: http://localhost:3006

**APIRE Compliance Checker**

```bash
cd apire-compliance-checker
docker-compose up --build
```

- API: http://localhost:3003
- Web: http://localhost:3004

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
