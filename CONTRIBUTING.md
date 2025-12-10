# Contributing to Apire AI Security Platform

Thank you for your interest in contributing to the Apire AI Security Platform! We welcome contributions of all kinds, from bug reports to documentation improvements to major new features.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Issue Reporting](#issue-reporting)
- [Security Vulnerabilities](#security-vulnerabilities)

---

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**Core Principles**:
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ ([Install](https://nodejs.org/))
- **npm**: v9+ (comes with Node.js)
- **Docker**: Latest version ([Install](https://docs.docker.com/get-docker/))
- **Git**: Latest version

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/apire-ai-security-platform.git
   cd apire-ai-security-platform
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/apire-ai-security/apire-ai-security-platform.git
   ```

### Install Dependencies

```bash
# Install all workspace dependencies
npm install

# Verify installation
npm run build
npm test
```

### Start Development Environment

```bash
# Option 1: Use Docker Compose (recommended)
docker-compose -f docker-compose.codespaces.yml up -d

# Option 2: Run services individually
npm run dev --workspace=apire-prompt-shield/backend
npm run dev --workspace=apire-prompt-shield/frontend
# ... repeat for other services

# Verify services are running
curl http://localhost:3001/health  # Prompt Shield
curl http://localhost:3005/        # RedTeam Kit
curl http://localhost:3003/health  # Compliance Checker
```

---

## Development Workflow

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/short-description` - New features
- `fix/short-description` - Bug fixes
- `docs/short-description` - Documentation changes
- `refactor/short-description` - Code refactoring
- `test/short-description` - Test improvements
- `chore/short-description` - Maintenance tasks

**Examples**:
```bash
git checkout -b feature/add-rate-limiting
git checkout -b fix/authentication-middleware-bug
git checkout -b docs/update-api-reference
```

### Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples**:
```
feat(shield): add rate limiting middleware

Implement rate limiting using express-rate-limit to prevent abuse.
Rate limit: 100 requests per 15 minutes per IP.

Closes #123

fix(redteam): correct scenario loading logic

The scenario loader was failing to load YAML files with special characters.
Fixed by properly escaping filenames before parsing.

Fixes #456

docs(api): update endpoint documentation

Updated docs/API.md to reflect new authentication requirements.
Added examples for API key authentication.
```

### Keep Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git checkout main
git merge upstream/main

# Update your feature branch
git checkout feature/your-feature
git rebase main
```

---

## Testing Requirements

### Before Submitting a PR

**All PRs must**:
1. ✅ Pass all existing tests
2. ✅ Include new tests for new functionality
3. ✅ Maintain or improve code coverage
4. ✅ Pass linting checks

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific workspace
npm test --workspace=apire-prompt-shield/backend

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e --workspace=frontend
```

### Writing Tests

#### Unit Tests (Jest)

```typescript
// src/__tests__/unit/service.test.ts
import { MyService } from '../service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
  });

  it('should perform action correctly', () => {
    const result = service.doSomething('input');
    expect(result).toBe('expected output');
  });

  it('should handle errors gracefully', () => {
    expect(() => service.doSomething(null)).toThrow('Invalid input');
  });
});
```

#### Integration Tests

```typescript
// src/__tests__/integration/api.test.ts
import request from 'supertest';
import app from '../app';

describe('POST /tests', () => {
  it('should create a new test', async () => {
    const response = await request(app)
      .post('/tests')
      .send({ prompt: 'test prompt' })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.riskLevel).toBeDefined();
  });
});
```

### Test Coverage Requirements

- **Minimum coverage**: 70% overall
- **Critical paths**: 90% coverage
- **New features**: Must include tests

---

## Documentation Standards

### When to Update Documentation

Update documentation when you:
- Add or modify API endpoints → `docs/API.md`
- Add or change environment variables → `docs/CONFIGURATION.md`
- Change architecture → `docs/ARCHITECTURE.md`
- Add deployment steps → `docs/DEPLOY_ON_CODESPACES.md`
- Change user-facing behavior → `README.md` and `wiki_content/`

### Documentation Files

| File | Purpose | When to Update |
|------|---------|----------------|
| `README.md` | Project overview and quick start | Major features, installation changes |
| `docs/API.md` | API endpoint reference | Any API changes |
| `docs/CONFIGURATION.md` | Environment variables | New config options |
| `docs/ARCHITECTURE.md` | System design | Architectural changes |
| `docs/TESTING.md` | Testing strategies | Test framework changes |
| `wiki_content/*.md` | User-facing guides | Feature additions |
| `CHANGELOG.md` | Version history | Every PR |

### Documentation Style Guide

- Use **Markdown** for all documentation
- Include **code examples** for technical docs
- Use **tables** for configuration references
- Add **diagrams** for architecture (ASCII art or Mermaid)
- **Link** to related documentation

**Example**:
````markdown
## Configuration

Set the following environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_KEY` | Yes | - | Authentication key |
| `PORT` | No | `3001` | Server port |

**Example**:
```bash
export API_KEY=your-key-here
export PORT=3001
```

See [Configuration Guide](./docs/CONFIGURATION.md) for details.
````

---

## Pull Request Process

### 1. Create a PR

- Use the PR template (automatically loaded)
- Fill out all sections completely
- Link related issues
- Add screenshots/videos if UI changes

### 2. PR Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Commit messages follow conventions
- [ ] No merge conflicts
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### 3. Code Review Process

- **Maintainers** will review your PR within 2-3 business days
- **CI/CD checks** must pass (automated)
- **At least one approval** required from maintainers
- **Address feedback** by pushing new commits (don't force-push)

### 4. After Approval

- Maintainer will merge your PR
- Your changes will be included in the next release
- You'll be credited in CHANGELOG.md

---

## Coding Guidelines

### TypeScript Style

```typescript
// ✅ Good
export interface UserConfig {
  apiKey: string;
  timeout?: number;
}

export class ApiClient {
  private readonly config: UserConfig;

  constructor(config: UserConfig) {
    this.config = config;
  }

  async fetchData(): Promise<Data> {
    // Implementation
  }
}

// ❌ Bad
export class apiClient {
  constructor(public apiKey, public timeout) {}
  
  fetchData() {
    // Missing types, poor naming
  }
}
```

### Code Style Rules

- **Naming**:
  - Classes: `PascalCase`
  - Functions/variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `kebab-case.ts`
  
- **TypeScript**:
  - Always use type annotations
  - Avoid `any` type (use `unknown` if needed)
  - Use interfaces for objects
  - Use `readonly` for immutable properties
  
- **Error Handling**:
  - Always handle errors explicitly
  - Use custom error classes
  - Include error context
  
- **Comments**:
  - Explain "why", not "what"
  - Use JSDoc for public APIs
  - Remove commented-out code

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint:fix
```

### File Structure

```
workspace/
├── src/
│   ├── __tests__/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── app.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## Issue Reporting

### Bug Reports

Use the bug report template and include:

1. **Description**: Clear summary of the issue
2. **Steps to Reproduce**:
   ```
   1. Start service with `docker-compose up`
   2. Send POST request to `/tests`
   3. Observe error response
   ```
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - OS: macOS 13.4
   - Node.js: v20.9.0
   - Docker: v24.0.6
6. **Logs**: Relevant error messages
7. **Screenshots**: If applicable

### Feature Requests

Include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives Considered**: Other approaches
4. **Additional Context**: Use cases, examples

---

## Security Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email security@apire.example.com
2. Include detailed description
3. Wait for response before disclosure

See [SECURITY.md](./SECURITY.md) for our security policy.

---

## Workspace-Specific Guidelines

### Prompt Shield (`apire-prompt-shield/`)

- **Focus**: Injection detection, jailbreak prevention
- **Tests**: Must include prompt examples
- **Docs**: Update threat types in `docs/API.md`

### RedTeam Kit (`apire-redteam-kit/`)

- **Focus**: Adversarial testing scenarios
- **Tests**: Include scenario validation
- **Docs**: Document new attack techniques

### Compliance Checker (`apire-compliance-checker/`)

- **Focus**: Regulatory compliance scanning
- **Tests**: Include framework-specific tests
- **Docs**: Update compliance frameworks list

### SDK (`packages/sdk/`)

- **Focus**: Developer experience
- **Tests**: Must include integration tests
- **Docs**: Update README with examples

---

## Release Process

Releases are automated via GitHub Actions when tags are pushed:

```bash
# Create release tag
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0
```

See [docs/RELEASE.md](./docs/RELEASE.md) for details.

---

## Questions?

- **Documentation**: Check [docs/](./docs/) and [wiki](https://github.com/apire-ai-security/apire-ai-security-platform/wiki)
- **Discussions**: Use [GitHub Discussions](https://github.com/apire-ai-security/apire-ai-security-platform/discussions)
- **Chat**: Join our Discord/Slack (link TBD)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## Recognition

Contributors are recognized in:
- CHANGELOG.md for each release
- README.md contributors section
- GitHub contributor graph

**Thank you for contributing to Apire AI Security Platform!** 🎉
