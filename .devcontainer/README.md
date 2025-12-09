# Codespaces Quick Start Guide

This repository is fully configured for **GitHub Codespaces**. You can launch a complete development environment in your browser with zero local setup.

## 🚀 Launch in Codespaces

1. Click the **Code** button on the GitHub repository
2. Select the **Codespaces** tab
3. Click **Create codespace on main**

Or click this badge: [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/apireaisecurity/apire-ai-security-platform)

## ⏱️ What Happens During Creation

### Automatic Setup (5-10 minutes)
1. **Container Build**: GitHub creates a Docker-based development environment
2. **Dependencies**: NPM packages are installed across all workspaces
3. **Compilation**: All TypeScript projects are built
4. **Extensions**: VS Code extensions for Docker, Kubernetes, ESLint are installed

You'll see progress in the terminal output.

## 🎯 After Creation

Once your Codespace is ready, you'll see a welcome message in the terminal.

### Start All Services

Run this command to launch all microservices:

```bash
./scripts/start-codespace.sh
```

This starts:
- Core Platform (Backend + Frontend)
- Prompt Shield (Backend + Frontend)
- Compliance Checker (Backend + Frontend)
- RedTeam Kit (Backend + Frontend)
- All databases (PostgreSQL, MongoDB, Redis, RabbitMQ)

### Access Applications

GitHub will automatically forward ports. Click on the **PORTS** tab in VS Code to see:

| Port | Service | Access |
|------|---------|--------|
| 5173 | Core Dashboard | Click "Open in Browser" |
| 3000 | Core API | http://localhost:3000 |
| 3002 | Prompt Shield | Click "Open in Browser" |
| 3001 | Prompt Shield API | http://localhost:3001 |
| 3004 | Compliance Checker | Click "Open in Browser" |
| 3003 | Compliance API | http://localhost:3003 |
| 3006 | RedTeam Kit | Click "Open in Browser" |
| 3005 | RedTeam API | http://localhost:3005 |

## 🛠️ Common Commands

### View Running Containers
```bash
docker ps
```

### View Logs
```bash
docker-compose -f docker-compose.codespaces.yml logs -f
```

### Stop All Services
```bash
docker-compose -f docker-compose.codespaces.yml down
```

### Restart a Service
```bash
docker-compose -f docker-compose.codespaces.yml restart core-frontend
```

### Run Tests
```bash
./scripts/test-all.sh
```

## 🐛 Troubleshooting

### Services Not Starting
```bash
# Check Docker daemon
docker ps

# Rebuild containers
docker-compose -f docker-compose.codespaces.yml up --build
```

### Port Already in Use
```bash
# Stop all services and restart
docker-compose -f docker-compose.codespaces.yml down
docker-compose -f docker-compose.codespaces.yml up -d
```

### Out of Memory
GitHub Codespaces provides 4GB RAM by default. If you run out:
1. Stop unused services
2. Upgrade your Codespace machine type (Settings → Machine type)

## 💰 Cost Information

- **Free Tier**: 60 hours/month for personal accounts
- **Pro/Team**: 180 hours/month included
- After free hours: ~$0.18/hour for 2-core machine

**Tip**: Stop your Codespace when not in use to save hours.

## 📚 Next Steps

- [Architecture Overview](../docs/ARCHITECTURE.md)
- [API Reference](../docs/API.md)
- [Deployment Guide](../docs/DEPLOY_ON_CODESPACES.md)
- [Contributing Guidelines](../wiki_content/Contributing.md)
