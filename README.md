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

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/apireaisecurity/apire-ai-security-platform.git
   cd apire-ai-security-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:
   ```bash
   docker-compose up --build
   ```

   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

## 🧪 Testing

Run all tests:
```bash
./scripts/test-all.sh
```

## 📖 Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Testing Guide](./docs/TESTING.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
