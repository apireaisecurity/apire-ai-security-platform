# Contributing to Apire AI Security Platform

Thank you for your interest in contributing! We welcome community contributions to help make AI security accessible to everyone.

## 🛠️ Development Workflow

1.  **Fork the Repository**: Click the "Fork" button on GitHub.
2.  **Clone your Fork**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/apire-ai-security-platform.git
    ```
3.  **Create a Branch**:
    ```bash
    git checkout -b feature/my-awesome-feature
    ```
4.  **Make Changes**: Write code, add tests, and update documentation.
5.  **Run Tests**: Ensure all tests pass.
    ```bash
    ./scripts/test-all.sh
    ```
6.  **Commit Changes**: Use clear commit messages.
    ```bash
    git commit -m "feat: add new detection rule for prompt injection"
    ```
7.  **Push to GitHub**:
    ```bash
    git push origin feature/my-awesome-feature
    ```
8.  **Open a Pull Request**: Submit your PR to the `main` branch.

## 🧪 Testing Guidelines

-   **Unit Tests**: Required for all new logic.
-   **Integration Tests**: Required for API endpoints.
-   **E2E Tests**: Recommended for UI changes.

## 📝 Coding Standards

-   **TypeScript**: Use strict typing. Avoid `any`.
-   **Linting**: Run `npm run lint` before committing.
-   **Formatting**: We use Prettier.

## 🐛 Reporting Issues

If you find a bug, please open an issue on GitHub with:
-   Steps to reproduce.
-   Expected behavior.
-   Actual behavior.
-   Screenshots or logs.

## 🔒 Security Vulnerabilities

If you discover a security vulnerability within this project, please do **NOT** open a public issue. Instead, email us at `security@apire.io` (placeholder).
