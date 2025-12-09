# Getting Started

This guide will help you set up the Apire AI Security Platform for development and testing.

## ☁️ Quick Start: GitHub Codespaces

The easiest way to run the platform is using GitHub Codespaces. This requires no local installation.

1.  Go to the [GitHub Repository](https://github.com/apireaisecurity/apire-ai-security-platform).
2.  Click the green **Code** button.
3.  Select the **Codespaces** tab.
4.  Click **Create codespace on main**.

The environment will automatically build and start all services.
See the **[Codespaces Guide](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/DEPLOY_ON_CODESPACES.md)** for more details.

## 💻 Local Installation

### Prerequisites

-   **Node.js**: v18 or higher
-   **Docker**: Desktop or Engine (with Docker Compose)
-   **Git**

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/apireaisecurity/apire-ai-security-platform.git
    cd apire-ai-security-platform
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Build All Services**
    ```bash
    ./scripts/build.sh
    ```

4.  **Start the Platform**
    ```bash
    docker-compose up --build
    ```

### Accessing the Applications

Once running, the services are available at:

| Service | URL | Description |
| :--- | :--- | :--- |
| **Prompt Shield Web** | `http://localhost:3002` | Injection Testing UI |
| **Prompt Shield API** | `http://localhost:3001` | Shield API endpoints |
| **RedTeam Kit Web** | `http://localhost:3006` | Attack Simulation UI |
| **RedTeam Kit API** | `http://localhost:3005` | RedTeam API endpoints |
| **Compliance Checker Web** | `http://localhost:3004` | Policy Scanner UI |
| **Compliance Checker API** | `http://localhost:3003` | Compliance API endpoints |

## 🧪 Running Tests

To verify your installation, run the full test suite:

```bash
./scripts/test-all.sh
```
