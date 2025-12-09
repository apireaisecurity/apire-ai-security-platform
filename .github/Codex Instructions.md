GitHub Repository Creation Instructions for ChatGPT Codex (Enhanced)
APIRE Open Source Initiative - Complete Repository Setup with Testing

🎯 MISSION
Create 3 complete, production-ready TypeScript/Node.js web application repositories with comprehensive test coverage, full documentation, and all GitHub features enabled. Test everything before committing.
GitHub Organization: https://github.com/apireaisecurity

📦 REPOSITORIES TO CREATE
Repository 1: apire-prompt-shield
URL: https://github.com/apireaisecurity/apire-prompt-shield
Repository 2: apire-redteam-kit
URL: https://github.com/apireaisecurity/apire-redteam-kit
Repository 3: apire-compliance-checker
URL: https://github.com/apireaisecurity/apire-compliance-checker

🏗️ ENHANCED PROJECT STRUCTURE (All Repositories)
repo-name/
├── .github/
│ ├── workflows/
│ │ ├── ci.yml # Full CI pipeline
│ │ ├── cd.yml # Deployment pipeline
│ │ ├── docker-publish.yml # Multi-arch Docker builds
│ │ ├── security-scan.yml # CodeQL, Trivy, Snyk
│ │ ├── test-coverage.yml # Coverage reporting
│ │ ├── dependency-review.yml # Dependency checks
│ │ ├── release.yml # Automated releases
│ │ ├── stale.yml # Stale issue management
│ │ └── label-sync.yml # Label management
│ ├── ISSUE_TEMPLATE/
│ │ ├── bug_report.yml # Bug report form
│ │ ├── feature_request.yml # Feature request form
│ │ ├── security.yml # Security report form
│ │ └── config.yml # Issue template config
│ ├── PULL_REQUEST_TEMPLATE/
│ │ └── pull_request_template.md
│ ├── DISCUSSION_TEMPLATE/
│ │ ├── announcements.yml
│ │ ├── ideas.yml
│ │ └── q-and-a.yml
│ ├── CODEOWNERS # Code ownership
│ ├── dependabot.yml # Automated dependency updates
│ ├── FUNDING.yml # Sponsorship info
│ ├── SECURITY.md # Security policy
│ └── release-drafter.yml # Auto-generate release notes
├── .husky/ # Git hooks
│ ├── pre-commit # Run linting before commit
│ ├── pre-push # Run tests before push
│ └── commit-msg # Validate commit messages
├── .vscode/
│ ├── settings.json # VS Code settings
│ ├── extensions.json # Recommended extensions
│ ├── launch.json # Debug configurations
│ └── tasks.json # Task automation
├── backend/
│ ├── src/
│ │ ├── **tests**/ # Tests directory
│ │ │ ├── unit/ # Unit tests
│ │ │ │ ├── controllers/
│ │ │ │ ├── services/
│ │ │ │ ├── models/
│ │ │ │ ├── middleware/
│ │ │ │ └── utils/
│ │ │ ├── integration/ # Integration tests
│ │ │ │ ├── api/
│ │ │ │ ├── database/
│ │ │ │ └── websocket/
│ │ │ ├── e2e/ # End-to-end tests
│ │ │ │ └── scenarios/
│ │ │ ├── fixtures/ # Test fixtures
│ │ │ ├── mocks/ # Mock data
│ │ │ └── setup.ts # Test setup
│ │ ├── controllers/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.controller.test.ts # Co-located tests
│ │ │ ├── test.controller.ts
│ │ │ ├── test.controller.test.ts
│ │ │ └── [others].controller.ts
│ │ ├── services/
│ │ │ ├── scanner.service.ts
│ │ │ ├── scanner.service.test.ts
│ │ │ └── [others].service.ts
│ │ ├── models/
│ │ │ ├── test.model.ts
│ │ │ ├── test.model.test.ts
│ │ │ └── [others].model.ts
│ │ ├── middleware/
│ │ │ ├── auth.middleware.ts
│ │ │ ├── auth.middleware.test.ts
│ │ │ └── [others].middleware.ts
│ │ ├── routes/
│ │ │ ├── api.routes.ts
│ │ │ ├── api.routes.test.ts
│ │ │ └── health.routes.ts
│ │ ├── utils/
│ │ │ ├── logger.ts
│ │ │ ├── logger.test.ts
│ │ │ ├── validators.ts
│ │ │ ├── validators.test.ts
│ │ │ └── helpers.ts
│ │ ├── config/
│ │ │ ├── database.ts
│ │ │ ├── redis.ts
│ │ │ └── env.ts
│ │ ├── types/
│ │ │ └── index.d.ts
│ │ └── app.ts
│ ├── coverage/ # Test coverage reports
│ ├── Dockerfile
│ ├── Dockerfile.test # Test-specific Dockerfile
│ ├── .dockerignore
│ ├── package.json
│ ├── tsconfig.json
│ ├── tsconfig.test.json # Test-specific TS config
│ ├── .eslintrc.js
│ ├── .prettierrc
│ ├── jest.config.js
│ ├── jest.setup.js
│ ├── .env.example
│ ├── .env.test # Test environment
│ └── sonar-project.properties # SonarQube config
├── frontend/
│ ├── src/
│ │ ├── **tests**/ # Tests directory
│ │ │ ├── unit/ # Unit tests
│ │ │ │ ├── components/
│ │ │ │ ├── hooks/
│ │ │ │ └── utils/
│ │ │ ├── integration/ # Integration tests
│ │ │ │ └── api/
│ │ │ ├── e2e/ # Playwright E2E tests
│ │ │ │ ├── login.spec.ts
│ │ │ │ ├── dashboard.spec.ts
│ │ │ │ └── [scenarios].spec.ts
│ │ │ ├── fixtures/
│ │ │ └── setup.ts
│ │ ├── components/
│ │ │ ├── Dashboard/
│ │ │ │ ├── Dashboard.tsx
│ │ │ │ ├── Dashboard.test.tsx
│ │ │ │ └── Dashboard.module.css
│ │ │ ├── TestRunner/
│ │ │ │ ├── TestRunner.tsx
│ │ │ │ └── TestRunner.test.tsx
│ │ │ └── [others]/
│ │ ├── pages/
│ │ ├── services/
│ │ │ ├── api.service.ts
│ │ │ └── api.service.test.ts
│ │ ├── hooks/
│ │ │ ├── useAuth.ts
│ │ │ └── useAuth.test.ts
│ │ ├── store/
│ │ ├── utils/
│ │ ├── types/
│ │ ├── styles/
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── public/
│ ├── playwright.config.ts # Playwright config
│ ├── playwright-report/ # E2E test reports
│ ├── coverage/ # Test coverage
│ ├── Dockerfile
│ ├── Dockerfile.test
│ ├── .dockerignore
│ ├── package.json
│ ├── tsconfig.json
│ ├── vite.config.ts (or next.config.js)
│ ├── jest.config.js
│ ├── .env.example
│ └── .env.test
├── worker/ (if applicable)
│ ├── src/
│ │ ├── **tests**/
│ │ ├── processors/
│ │ ├── jobs/
│ │ └── worker.ts
│ ├── Dockerfile
│ ├── package.json
│ └── tsconfig.json
├── docs/
│ ├── README.md
│ ├── ARCHITECTURE.md
│ ├── API.md
│ ├── DEPLOYMENT.md
│ ├── DOCKER.md
│ ├── KUBERNETES.md
│ ├── TESTING.md # Testing guide
│ ├── CONTRIBUTING.md
│ ├── guides/
│ │ ├── getting-started.md
│ │ ├── web-interface.md
│ │ ├── api-integration.md
│ │ ├── testing-guide.md
│ │ └── security-best-practices.md
│ └── examples/
├── examples/
│ ├── typescript-client/
│ │ ├── src/
│ │ │ ├── index.ts
│ │ │ └── index.test.ts
│ │ ├── package.json
│ │ └── README.md
│ ├── express-middleware/
│ │ ├── src/
│ │ │ ├── index.ts
│ │ │ └── index.test.ts
│ │ └── [others]
│ └── [10+ more examples with tests]
├── kubernetes/
│ ├── base/ # Kustomize base
│ │ ├── deployment.yaml
│ │ ├── service.yaml
│ │ ├── ingress.yaml
│ │ └── kustomization.yaml
│ ├── overlays/ # Environment overlays
│ │ ├── development/
│ │ ├── staging/
│ │ └── production/
│ ├── helm/ # Helm chart
│ │ ├── Chart.yaml
│ │ ├── values.yaml
│ │ ├── values-dev.yaml
│ │ ├── values-staging.yaml
│ │ ├── values-prod.yaml
│ │ └── templates/
│ └── README.md
├── scripts/
│ ├── setup.sh
│ ├── build.sh
│ ├── test.sh
│ ├── test-all.sh # Run all test suites
│ ├── coverage.sh # Generate coverage report
│ ├── deploy.sh
│ ├── seed-data.sh
│ ├── benchmark.sh # Performance benchmarks
│ └── verify-installation.sh # Post-install verification
├── benchmarks/ # Performance benchmarks
│ ├── load-tests/
│ └── stress-tests/
├── .devcontainer/ # VS Code Dev Containers
│ ├── devcontainer.json
│ └── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── docker-compose.test.yml # Testing environment
├── .dockerignore
├── .gitignore
├── .gitattributes
├── .editorconfig
├── .nvmrc # Node version
├── .node-version
├── .env.example
├── .env.test.example
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── SECURITY.md
├── CHANGELOG.md
├── ROADMAP.md # Product roadmap
├── package.json (workspace root)
├── package-lock.json
├── turbo.json (or nx.json)
├── lerna.json (if using Lerna)
├── renovate.json # Renovate config
├── codecov.yml # Codecov config
├── sonar-project.properties # SonarQube
└── .all-contributorsrc # All contributors

🧪 COMPREHENSIVE TESTING STRATEGY
Testing Requirements (CRITICAL):

Unit Tests: >85% code coverage
Integration Tests: All API endpoints
E2E Tests: All critical user flows
Performance Tests: Load testing with k6
Security Tests: OWASP ZAP, Snyk
Contract Tests: API contract validation
Visual Regression Tests: Percy/Chromatic

Test Files to Generate:
Backend Unit Tests (Generate 50+ test files):
backend/src/controllers/auth.controller.test.ts (200 lines)
typescriptimport request from 'supertest';
import { app } from '../app';
import { AuthController } from './auth.controller';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

describe('AuthController', () => {
let authController: AuthController;

beforeAll(async () => {
// Setup test database
await setupTestDatabase();
});

afterAll(async () => {
await teardownTestDatabase();
});

beforeEach(async () => {
authController = new AuthController();
await clearDatabase();
});

describe('POST /auth/register', () => {
it('should register a new user successfully', async () => {
const userData = {
email: 'test@example.com',
password: 'SecurePass123!',
name: 'Test User'
};

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should reject registration with weak password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('password');
    });

    it('should reject duplicate email registration', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      };

      // First registration
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      // Duplicate registration
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });

    it('should validate email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'SecurePass123!',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toContain('email');
    });

    // Add 15+ more test cases

});

describe('POST /auth/login', () => {
it('should login with valid credentials', async () => {
// Create test user
await createTestUser({
email: 'test@example.com',
password: 'SecurePass123!'
});

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should reject invalid credentials', async () => {
      await createTestUser({
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        })
        .expect(401);

      expect(response.body.error).toContain('Invalid credentials');
    });

    it('should rate limit login attempts', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrong'
      };

      // Make 6 failed attempts (assuming 5 is the limit)
      for (let i = 0; i < 6; i++) {
        await request(app)
          .post('/api/v1/auth/login')
          .send(loginData);
      }

      // 7th attempt should be rate limited
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(429);

      expect(response.body.error).toContain('Too many attempts');
    });

    // Add 10+ more test cases

});

describe('GET /auth/me', () => {
it('should return current user with valid token', async () => {
const user = await createTestUser({
email: 'test@example.com',
password: 'SecurePass123!'
});
const token = generateTestToken(user);

      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.email).toBe(user.email);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .expect(401);

      expect(response.body.error).toContain('token');
    });

    it('should reject expired token', async () => {
      const user = await createTestUser({
        email: 'test@example.com',
        password: 'SecurePass123!'
      });
      const expiredToken = generateExpiredToken(user);

      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.error).toContain('expired');
    });

    // Add 8+ more test cases

});
});

// Helper functions
async function setupTestDatabase() { /_ ... _/ }
async function teardownTestDatabase() { /_ ... _/ }
async function clearDatabase() { /_ ... _/ }
async function createTestUser(data: any) { /_ ... _/ }
function generateTestToken(user: any) { /_ ... _/ }
function generateExpiredToken(user: any) { /_ ... _/ }
Generate similar comprehensive tests for:

test.controller.test.ts (250 lines, 30+ test cases)
scanner.service.test.ts (300 lines, 40+ test cases)
queue.service.test.ts (200 lines, 25+ test cases)
user.model.test.ts (150 lines, 20+ test cases)
auth.middleware.test.ts (200 lines, 25+ test cases)
validators.test.ts (250 lines, 35+ test cases)
[40+ more test files]

Backend Integration Tests:
backend/src/**tests**/integration/api/health.test.ts (100 lines)
typescriptimport request from 'supertest';
import { app } from '../../../app';

describe('Health Check API', () => {
describe('GET /health', () => {
it('should return 200 OK', async () => {
const response = await request(app)
.get('/health')
.expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should include service checks', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('services');
      expect(response.body.services).toHaveProperty('database');
      expect(response.body.services).toHaveProperty('redis');
    });

});

describe('GET /health/ready', () => {
it('should return 200 when all services are ready', async () => {
const response = await request(app)
.get('/health/ready')
.expect(200);

      expect(response.body.ready).toBe(true);
    });

});
});
Generate integration tests for:

Complete API workflow tests (10 files)
Database integration tests (5 files)
Redis integration tests (3 files)
WebSocket integration tests (5 files)
Queue integration tests (4 files)

Frontend Unit Tests:
frontend/src/components/Dashboard/Dashboard.test.tsx (200 lines)
typescriptimport { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { AuthProvider } from '../../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
defaultOptions: {
queries: { retry: false },
},
});

const renderDashboard = () => {
return render(
<BrowserRouter>
<QueryClientProvider client={queryClient}>
<AuthProvider>
<Dashboard />
</AuthProvider>
</QueryClientProvider>
</BrowserRouter>
);
};

describe('Dashboard Component', () => {
beforeEach(() => {
jest.clearAllMocks();
});

it('should render dashboard header', () => {
renderDashboard();
expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
});

it('should display loading state initially', () => {
renderDashboard();
expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

it('should fetch and display statistics', async () => {
renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/total tests/i)).toBeInTheDocument();
      expect(screen.getByText(/passed/i)).toBeInTheDocument();
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });

});

it('should render recent activity list', async () => {
renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('activity-item').length).toBeGreaterThan(0);
    });

});

it('should handle refresh button click', async () => {
renderDashboard();

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

});

it('should display error message on fetch failure', async () => {
// Mock API failure
jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard/i)).toBeInTheDocument();
    });

});

it('should navigate to test details on card click', async () => {
renderDashboard();

    await waitFor(() => {
      const testCard = screen.getAllByTestId('test-card')[0];
      fireEvent.click(testCard);
    });

    // Check navigation occurred
    expect(window.location.pathname).toContain('/test/');

});

// Add 20+ more test cases
});
Generate frontend tests for:

All components (30+ test files)
All hooks (10+ test files)
All services (5+ test files)
All utilities (8+ test files)

E2E Tests (Playwright):
frontend/src/**tests**/e2e/login.spec.ts (150 lines)
typescriptimport { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
test.beforeEach(async ({ page }) => {
await page.goto('http://localhost:3000');
});

test('should display login page', async ({ page }) => {
await expect(page.locator('h1')).toContainText('Login');
await expect(page.locator('input[name="email"]')).toBeVisible();
await expect(page.locator('input[name="password"]')).toBeVisible();
});

test('should login with valid credentials', async ({ page }) => {
await page.fill('input[name="email"]', 'test@example.com');
await page.fill('input[name="password"]', 'SecurePass123!');
await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();

});

test('should show error with invalid credentials', async ({ page }) => {
await page.fill('input[name="email"]', 'test@example.com');
await page.fill('input[name="password"]', 'wrongpassword');
await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toContainText('Invalid credentials');

});

test('should validate email format', async ({ page }) => {
await page.fill('input[name="email"]', 'invalid-email');
await page.fill('input[name="password"]', 'SecurePass123!');
await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toContainText('valid email');

});

test('should show/hide password on icon click', async ({ page }) => {
const passwordInput = page.locator('input[name="password"]');
const toggleIcon = page.locator('.password-toggle');

    await expect(passwordInput).toHaveAttribute('type', 'password');

    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');

});

test('should remember me checkbox work', async ({ page, context }) => {
await page.check('input[name="remember"]');
await page.fill('input[name="email"]', 'test@example.com');
await page.fill('input[name="password"]', 'SecurePass123!');
await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);

    // Check cookie was set
    const cookies = await context.cookies();
    const rememberCookie = cookies.find(c => c.name === 'remember_token');
    expect(rememberCookie).toBeDefined();

});

// Add 15+ more E2E test cases
});
Generate E2E tests for:

dashboard.spec.ts (20+ scenarios)
test-creation.spec.ts (15+ scenarios)
results-viewing.spec.ts (12+ scenarios)
settings.spec.ts (10+ scenarios)
admin-panel.spec.ts (15+ scenarios)

Performance Tests (k6):
benchmarks/load-tests/api-load.test.js (100 lines)
javascriptimport http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
stages: [
{ duration: '1m', target: 50 }, // Ramp up to 50 users
{ duration: '3m', target: 50 }, // Stay at 50 users
{ duration: '1m', target: 100 }, // Ramp up to 100 users
{ duration: '3m', target: 100 }, // Stay at 100 users
{ duration: '1m', target: 0 }, // Ramp down to 0 users
],
thresholds: {
'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
'errors': ['rate<0.1'], // Error rate should be below 10%
},
};

const BASE_URL = 'http://localhost:3001/api/v1';

export default function () {
// Test health endpoint
let healthRes = http.get(`${BASE_URL}/health`);
check(healthRes, {
'health status is 200': (r) => r.status === 200,
}) || errorRate.add(1);

sleep(1);

// Test authentication
let loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
email: 'test@example.com',
password: 'SecurePass123!'
}), {
headers: { 'Content-Type': 'application/json' },
});

check(loginRes, {
'login status is 200': (r) => r.status === 200,
'has token': (r) => r.json('token') !== undefined,
}) || errorRate.add(1);

const token = loginRes.json('token');

sleep(1);

// Test creating a scan
let scanRes = http.post(`${BASE_URL}/scans`, JSON.stringify({
prompt: 'Test prompt for security scanning',
attackPatterns: ['injection', 'jailbreak']
}), {
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
},
});

check(scanRes, {
'scan status is 201': (r) => r.status === 201,
'has scan id': (r) => r.json('id') !== undefined,
}) || errorRate.add(1);

sleep(2);
}
Security Tests (OWASP ZAP):
.github/workflows/security-scan.yml includes:
yaml- name: OWASP ZAP Baseline Scan
uses: zaproxy/action-baseline@v0.7.0
with:
target: 'http://localhost:3000'
rules_file_name: '.zap/rules.tsv'

🔧 COMPLETE CI/CD WORKFLOWS
.github/workflows/ci.yml (Enhanced - 350 lines)
yamlname: Continuous Integration

on:
push:
branches: [main, develop, 'feature/**']
pull_request:
branches: [main, develop]
schedule: - cron: '0 0 \* \* 0' # Weekly on Sundays

env:
NODE_VERSION: '20'
DOCKER_BUILDKIT: 1
COMPOSE_DOCKER_CLI_BUILD: 1

jobs:

# Job 1: Code Quality Checks

code-quality:
name: Code Quality
runs-on: ubuntu-latest
steps: - name: Checkout code
uses: actions/checkout@v4
with:
fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint
        continue-on-error: false

      - name: Run Prettier check
        run: npm run format:check

      - name: Check TypeScript compilation
        run: npm run type-check

      - name: Run commitlint
        if: github.event_name == 'pull_request'
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }}

# Job 2: Backend Unit Tests

backend-unit-tests:
name: Backend Unit Tests
runs-on: ubuntu-latest
services:
postgres:
image: postgres:15-alpine
env:
POSTGRES_USER: test
POSTGRES_PASSWORD: test
POSTGRES_DB: test_db
options: >-
--health-cmd pg_isready
--health-interval 10s
--health-timeout 5s
--health-retries 5
ports: - 5432:5432
redis:
image: redis:7-alpine
options: >-
--health-cmd "redis-cli ping"
--health-interval 10s
--health-timeout 5s
--health-retries 5
ports: - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run backend unit tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test
        run: npm run test:unit -- --coverage --maxWorkers=2

      - name: Upload backend coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/coverage-final.json
          flags: backend-unit
          name: backend-unit-coverage

# Job 3: Backend Integration Tests

backend-integration-tests:
name: Backend Integration Tests
runs-on: ubuntu-latest
services:
postgres:
image: postgres:15-alpine
env:
POSTGRES_USER: test
POSTGRES_PASSWORD: test
POSTGRES_DB: test_db
options: >-
--health-cmd pg_isready
--health-interval 10s
--health-timeout 5s
--health-retries 5
ports: - 5432:5432
redis:
image: redis:7-alpine
options: >-
--health-cmd "redis-cli ping"
--health-interval 10s
--health-timeout 5s
--health-retries 5
ports: - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
        run: npm run migrate:test

      - name: Run backend integration tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test
        run: npm run test:integration -- --coverage

      - name: Upload integration coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/coverage-final.json
          flags: backend-integration
          name: backend-integration-coverage

# Job 4: Frontend Unit Tests

frontend-unit-tests:
name: Frontend Unit Tests
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run frontend unit tests
        working-directory: ./frontend
        run: npm run test:unit -- --coverage --watchAll=false

      - name: Upload frontend coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/coverage-final.json
          flags: frontend-unit
          name: frontend-unit-coverage

# Job 5: E2E Tests with Playwright

e2e-tests:
name: E2E Tests (Playwright)
runs-on: ubuntu-latest
timeout-minutes: 30
steps: - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        working-directory: ./frontend
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Start application with Docker Compose
        run: |
          cp .env.test.example .env.test
          docker-compose -f docker-compose.test.yml up -d
          sleep 30 # Wait for services to be ready

      - name: Wait for services to be healthy
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000; do sleep 2; done'
          timeout 60 bash -c 'until curl -f http://localhost:3001/health; do sleep 2; done'

      - name: Run E2E tests
        working-directory: ./frontend
        run: npm run test:e2e

      - name: Upload E2E test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: frontend/playwright-report/
          retention-days: 30

      - name: Upload E2E test videos
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-videos
          path: frontend/test-results/
          retention-days: 7

      - name: Stop Docker Compose
        if: always()
        run: docker-compose -f docker-compose.test.yml down -v

# Job 6: Docker Build & Test

docker-build:
name: Docker Build Test
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build backend image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: false
          tags: apire-backend:test
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: false
          tags: apire-frontend:test
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Test Docker Compose
        run: |
          cp .env.example .env
          docker-compose up -d
          sleep 30
          docker-compose ps
          curl -f http://localhost:3000 || exit 1
          curl -f http://localhost:3001/health || exit 1
          docker-compose down -v

# Job 7: Security Scanning

security-scan:
name: Security Scanning
runs-on: ubuntu-latest
permissions:
security-events: write
steps: - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner (filesystem)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
        continue-on-error: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Run npm audit
        run: |
          npm ci
          npm audit --audit-level=moderate

# Job 8: CodeQL Analysis

codeql-analysis:
name: CodeQL Analysis
runs-on: ubuntu-latest
permissions:
security-events: write
actions: read
contents: read
strategy:
matrix:
language: ['javascript', 'typescript']
steps: - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: ${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2

# Job 9: Performance Tests

performance-tests:
name: Performance Tests (k6)
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4

      - name: Start application
        run: |
          cp .env.example .env
          docker-compose up -d
          sleep 30

      - name: Run k6 load tests
        uses: grafana/k6-action@v0.3.1
        with:
          filename: benchmarks/load-tests/api-load.test.js
          flags: --out json=results.json

      - name: Upload k6 results
        uses: actions/upload-artifact@v3
        with:
          name: k6-results
          path: results.json

      - name: Stop application
        if: always()
        run: docker-compose down -v

# Job 10: Dependency Review (PRs only)

dependency-review:
name: Dependency Review
runs-on: ubuntu-latest
if: github.event_name == 'pull_request'
steps: - uses: actions/checkout@v4 - name: Dependency Review
uses: actions/dependency-review-action@v3
with:
fail-on-severity: moderate

# Job 11: Coverage Report

coverage-report:
name: Coverage Report
runs-on: ubuntu-latest
needs: [backend-unit-tests, backend-integration-tests, frontend-unit-tests]
steps: - uses: actions/checkout@v4

      - name: Download all coverage reports
        uses: actions/download-artifact@v3

      - name: Generate combined coverage report
        run: |
          npm ci
          npm run coverage:merge
          npm run coverage:report

      - name: Upload to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: combined
          fail_ci_if_error: true

      - name: SonarQube Scan
        if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}

# Job 12: Build Success Summary

build-success:
name: Build Success
runs-on: ubuntu-latest
needs: - code-quality - backend-unit-tests - backend-integration-tests - frontend-unit-tests - e2e-tests - docker-build - security-scan - codeql-analysis
if: success()
steps: - name: Success notification
run: |
echo "✅ All CI checks passed successfully!"
echo "- Code quality: Passed"
echo "- Backend tests: Passed"
echo "- Frontend tests: Passed"
echo "- E2E tests: Passed"
echo "- Docker build: Passed"
echo "- Security scan: Passed"
.github/workflows/docker-publish.yml (Enhanced - 200 lines)
yamlname: Build and Publish Docker Images

on:
push:
branches: [main]
tags: ['v*.*.*']
release:
types: [published]
workflow_dispatch:

env:
REGISTRY_DOCKERHUB: docker.io
REGISTRY_GHCR: ghcr.io

jobs:
build-and-push:
name: Build and Push (${{ matrix.service }})
runs-on: ubuntu-latest
permissions:
contents: read
packages: write
id-token: write
strategy:
fail-fast: false
matrix:
service: - backend - frontend - worker
steps: - name: Checkout
uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: |
            apireaisecurity/${{ github.event.repository.name }}-${{ matrix.service }}
            ghcr.io/apireaisecurity/${{ github.event.repository.name }}-${{ matrix.service }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./${{ matrix.service }}
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            BUILD_DATE=${{ steps.meta.outputs.created }}
            VCS_REF=${{ github.sha }}
            VERSION=${{ steps.meta.outputs.version }}

      - name: Run Trivy vulnerability scanner on image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/apireaisecurity/${{ github.event.repository.name }}-${{ matrix.service }}:${{ steps.meta.outputs.version }}
          format: 'sarif'
          output: 'trivy-results-${{ matrix.service }}.sarif'

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results-${{ matrix.service }}.sarif'
          category: ${{ matrix.service }}

update-docker-hub-description:
name: Update Docker Hub Description
needs: build-and-push
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4

      - name: Update Docker Hub description (backend)
        uses: peter-evans/dockerhub-description@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
          repository: apireaisecurity/${{ github.event.repository.name }}-backend
          short-description: ${{ github.event.repository.description }}
          readme-filepath: ./backend/README.md

      - name: Update Docker Hub description (frontend)
        uses: peter-evans/dockerhub-description@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
          repository: apireaisecurity/${{ github.event.repository.name }}-frontend
          short-description: ${{ github.event.repository.description }}
          readme-filepath: ./frontend/README.md

Additional Workflows to Generate:
.github/workflows/release.yml (150 lines)

Automated release creation
Changelog generation
GitHub Release creation
Notification to Discord/Slack

.github/workflows/security-scan.yml (200 lines)

Scheduled security scans (weekly)
OWASP ZAP scanning
Dependency vulnerability checks
Container image scanning

.github/workflows/test-coverage.yml (100 lines)

Generate detailed coverage reports
Upload to Codecov/Coveralls
Comment coverage on PRs
Fail on coverage decrease

.github/workflows/stale.yml (50 lines)

Auto-close stale issues/PRs
Label management
Community engagement

📋 GITHUB REPOSITORY CONFIGURATION
Repository Settings (Set via GitHub CLI or API):
bash# Create repository with all features enabled
gh repo create apireaisecurity/apire-prompt-shield \
 --public \
 --description "🛡️ Open-source web-based AI prompt security testing framework with real-time threat detection | TypeScript + Node.js + Docker + Kubernetes" \
 --homepage "https://apire.io/oss/prompt-shield" \
 --enable-issues \
 --enable-wiki \
 --enable-discussions \
 --enable-projects

# Enable vulnerability alerts

gh api repos/apireaisecurity/apire-prompt-shield/vulnerability-alerts \
 --method PUT

# Enable automated security fixes

gh api repos/apireaisecurity/apire-prompt-shield/automated-security-fixes \
 --method PUT

# Set default branch to main

gh api repos/apireaisecurity/apire-prompt-shield \
 --method PATCH \
 -f default_branch='main'

# Allow squash merging only

gh api repos/apireaisecurity/apire-prompt-shield \
 --method PATCH \
 -F allow_squash_merge=true \
 -F allow_merge_commit=false \
 -F allow_rebase_merge=false \
 -F delete_branch_on_merge=true

# Enable auto-merge for dependabot PRs

gh api repos/apireaisecurity/apire-prompt-shield \
 --method PATCH \
 -F allow_auto_merge=true
Branch Protection Rules:
bash# Protect main branch
gh api repos/apireaisecurity/apire-prompt-shield/branches/main/protection \
 --method PUT \
 --input - <<EOF
{
"required_status_checks": {
"strict": true,
"contexts": [
"Code Quality",
"Backend Unit Tests",
"Backend Integration Tests",
"Frontend Unit Tests",
"E2E Tests (Playwright)",
"Docker Build Test",
"Security Scanning"
]
},
"enforce_admins": true,
"required_pull_request_reviews": {
"dismissal_restrictions": {},
"dismiss_stale_reviews": true,
"require_code_owner_reviews": true,
"required_approving_review_count": 1
},
"restrictions": null,
"required_linear_history": true,
"allow_force_pushes": false,
"allow_deletions": false,
"required_conversation_resolution": true
}
EOF
Repository Labels:
bash# Create comprehensive label set
gh label create "type: bug" --color "d73a4a" --description "Something isn't working"
gh label create "type: feature" --color "0e8a16" --description "New feature or request"
gh label create "type: enhancement" --color "a2eeef" --description "Improvement to existing feature"
gh label create "type: documentation" --color "0075ca" --description "Documentation improvements"
gh label create "type: security" --color "ee0701" --description "Security vulnerability or concern"
gh label create "type: performance" --color "f9d0c4" --description "Performance improvement"
gh label create "type: refactor" --color "fbca04" --description "Code refactoring"
gh label create "type: test" --color "d4c5f9" --description "Testing improvements"

gh label create "priority: critical" --color "b60205" --description "Critical priority"
gh label create "priority: high" --color "d93f0b" --description "High priority"
gh label create "priority: medium" --color "fbca04" --description "Medium priority"
gh label create "priority: low" --color "0e8a16" --description "Low priority"

gh label create "status: needs-triage" --color "ededed" --description "Needs triage"
gh label create "status: blocked" --color "000000" --description "Blocked by other issues"
gh label create "status: in-progress" --color "yellow" --description "Work in progress"
gh label create "status: review-needed" --color "fbca04" --description "Needs code review"
gh label create "status: approved" --color "0e8a16" --description "Approved"

gh label create "area: backend" --color "1d76db" --description "Backend related"
gh label create "area: frontend" --color "006b75" --description "Frontend related"
gh label create "area: docker" --color "2496ed" --description "Docker related"
gh label create "area: kubernetes" --color "326ce5" --description "Kubernetes related"
gh label create "area: ci-cd" --color "5319e7" --description "CI/CD related"
gh label create "area: docs" --color "0075ca" --description "Documentation"

gh label create "good first issue" --color "7057ff" --description "Good for newcomers"
gh label create "help wanted" --color "008672" --description "Extra attention needed"
gh label create "duplicate" --color "cfd3d7" --description "Duplicate issue"
gh label create "wontfix" --color "ffffff" --description "Will not fix"
gh label create "dependencies" --color "0366d6" --description "Dependency updates"
Repository Topics:
bashgh repo edit apireaisecurity/apire-prompt-shield \
 --add-topic typescript \
 --add-topic nodejs \
 --add-topic express \
 --add-topic react \
 --add-topic docker \
 --add-topic kubernetes \
 --add-topic ai-security \
 --add-topic llm-security \
 --add-topic prompt-injection \
 --add-topic security-testing \
 --add-topic cybersecurity \
 --add-topic open-source \
 --add-topic websocket \
 --add-topic postgresql \
 --add-topic redis \
 --add-topic ci-cd \
 --add-topic github-actions \
 --add-topic apire
GitHub Projects Setup:
bash# Create project board
gh project create \
 --owner apireaisecurity \
 --title "APIRE Prompt Shield Development" \
 --body "Main development board for tracking features, bugs, and improvements"

# Add project fields

gh project field-create \
 --owner apireaisecurity \
 --name "Status" \
 --data-type "SINGLE_SELECT" \
 --single-select-options "Backlog,Ready,In Progress,In Review,Done"

gh project field-create \
 --owner apireaisecurity \
 --name "Priority" \
 --data-type "SINGLE_SELECT" \
 --single-select-options "Low,Medium,High,Critical"

gh project field-create \
 --owner apireaisecurity \
 --name "Sprint" \
 --data-type "TEXT"
Dependabot Configuration:
.github/dependabot.yml
yamlversion: 2
updates:

# Backend dependencies

- package-ecosystem: "npm"
  directory: "/backend"
  schedule:
  interval: "weekly"
  day: "monday"
  open-pull-requests-limit: 10
  reviewers:
  - "apireaisecurity/backend-team"
    labels:
  - "dependencies"
  - "area: backend"
    commit-message:
    prefix: "build(backend)"
    include: "scope"
    groups:
    production-dependencies:
    dependency-type: "production"
    development-dependencies:
    dependency-type: "development"

# Frontend dependencies

- package-ecosystem: "npm"
  directory: "/frontend"
  schedule:
  interval: "weekly"
  day: "monday"
  open-pull-requests-limit: 10
  reviewers:
  - "apireaisecurity/frontend-team"
    labels:
  - "dependencies"
  - "area: frontend"
    commit-message:
    prefix: "build(frontend)"

# Docker

- package-ecosystem: "docker"
  directory: "/"
  schedule:
  interval: "weekly"
  labels:
  - "dependencies"
  - "area: docker"

# GitHub Actions

- package-ecosystem: "github-actions"
  directory: "/"
  schedule:
  interval: "weekly"
  labels:
  - "dependencies"
  - "area: ci-cd"

✅ PRE-COMMIT TESTING REQUIREMENTS
Before ANY commit, run these verification scripts:
scripts/test-all.sh (200 lines)
bash#!/bin/bash
set -e

echo "🧪 Running comprehensive test suite..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Color codes

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output

print_success() {
echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
echo -e "${RED}✗ $1${NC}"
}

print_info() {
echo -e "${YELLOW}ℹ $1${NC}"
}

# Counters

PASSED=0
FAILED=0

# Test 1: TypeScript Compilation

print_info "Test 1: TypeScript Compilation..."
if npm run type-check; then
print_success "TypeScript compilation passed"
((PASSED++))
else
print_error "TypeScript compilation failed"
((FAILED++))
fi

# Test 2: Linting

print_info "Test 2: ESLint..."
if npm run lint; then
print_success "Linting passed"
((PASSED++))
else
print_error "Linting failed"
((FAILED++))
fi

# Test 3: Formatting

print_info "Test 3: Prettier formatting..."
if npm run format:check; then
print_success "Formatting check passed"
((PASSED++))
else
print_error "Formatting check failed - run 'npm run format' to fix"
((FAILED++))
fi

# Test 4: Backend Unit Tests

print_info "Test 4: Backend unit tests..."
cd backend
if npm run test:unit -- --silent --maxWorkers=50%; then
print_success "Backend unit tests passed"
((PASSED++))
else
print_error "Backend unit tests failed"
((FAILED++))
fi
cd ..

# Test 5: Backend Integration Tests

print_info "Test 5: Backend integration tests..."
cd backend
if npm run test:integration -- --silent --maxWorkers=50%; then
print_success "Backend integration tests passed"
((PASSED++))
else
print_error "Backend integration tests failed"
((FAILED++))
fi
cd ..

# Test 6: Frontend Unit Tests

print_info "Test 6: Frontend unit tests..."
cd frontend
if npm run test:unit -- --silent --watchAll=false; then
print_success "Frontend unit tests passed"
((PASSED++))
else
print_error "Frontend unit tests failed"
((FAILED++))
fi
cd ..

# Test 7: Docker Build Test

print_info "Test 7: Docker build test..."
if docker-compose -f docker-compose.test.yml build; then
print_success "Docker build passed"
((PASSED++))
else
print_error "Docker build failed"
((FAILED++))
fi

# Test 8: Start and Health Check

print_info "Test 8: Docker Compose health check..."
docker-compose -f docker-compose.test.yml up -d
sleep 30

if curl -f http://localhost:3000 && curl -f http://localhost:3001/health; then
print_success "Health checks passed"
((PASSED++))
else
print_error "Health checks failed"
((FAILED++))
fi

docker-compose -f docker-compose.test.yml down -v

# Test 9: Security Audit

print_info "Test 9: NPM security audit..."
if npm audit --audit-level=moderate; then
print_success "Security audit passed"
((PASSED++))
else
print_error "Security audit found vulnerabilities"
((FAILED++))
fi

# Test 10: Coverage Threshold

print_info "Test 10: Coverage threshold check..."
cd backend
if npm run test:coverage -- --silent --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80,"statements":80}}'; then
print_success "Coverage threshold met (>80%)"
((PASSED++))
else
print_error "Coverage below threshold"
((FAILED++))
fi
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print*success "Passed: $PASSED/10"
if [ $FAILED -gt 0 ]; then
    print_error "Failed: $FAILED/10"
    echo ""
    print_error "❌ Tests failed. Fix errors before committing."
    exit 1
else
    echo ""
    print_success "✅ All tests passed! Ready to commit."
    exit 0
fi
Husky Git Hooks:
.husky/pre-commit
bash#!/bin/sh
. "$(dirname "$0")/*/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run linting on staged files

npx lint-staged

# Type check

npm run type-check

echo "✅ Pre-commit checks passed!"
.husky/pre-push
bash#!/bin/sh
. "$(dirname "$0")/\_/husky.sh"

echo "🧪 Running pre-push tests..."

# Run all tests

./scripts/test-all.sh

echo "✅ Pre-push tests passed!"
.husky/commit-msg
bash#!/bin/sh
. "$(dirname "$0")/\_/husky.sh"

npx --no -- commitlint --edit "$1"
.lintstagedrc.js
javascriptmodule.exports = {
'_.{ts,tsx}': [
'eslint --fix',
'prettier --write',
() => 'tsc --noEmit' // Type check all files
],
'_.{js,jsx}': [
'eslint --fix',
'prettier --write'
],
'\*.{json,md,yml,yaml}': [
'prettier --write'
]
};

```

---

## 🚀 **EXECUTION COMMAND FOR CODEX**
```

═══════════════════════════════════════════════════════════════
TASK: Generate 3 Complete Production-Ready Repositories
═══════════════════════════════════════════════════════════════

GITHUB ORGANIZATION: apireaisecurity
REPOSITORY URLS:

1. https://github.com/apireaisecurity/apire-prompt-shield
2. https://github.com/apireaisecurity/apire-redteam-kit
3. https://github.com/apireaisecurity/apire-compliance-checker

═══════════════════════════════════════════════════════════════
CRITICAL REQUIREMENTS:
═══════════════════════════════════════════════════════════════

✅ ALL CODE MUST BE PRODUCTION-READY (No placeholders)
✅ ALL TESTS MUST PASS (85%+ coverage required)
✅ ALL DOCKER IMAGES MUST BUILD (No errors)
✅ ALL GITHUB WORKFLOWS MUST BE VALID
✅ ALL SECURITY SCANS MUST PASS
✅ ALL DOCUMENTATION MUST BE COMPLETE

═══════════════════════════════════════════════════════════════
DELIVERABLES PER REPOSITORY:
═══════════════════════════════════════════════════════════════

BACKEND (TypeScript + Node.js + Express):
✅ Complete source code (30+ files)
✅ 50+ unit test files (85%+ coverage)
✅ 20+ integration test files
✅ All controllers, services, models, middleware
✅ Database migrations
✅ Multi-stage Dockerfile (<200MB)
✅ Complete API documentation

FRONTEND (React/Next.js + TypeScript):
✅ Complete source code (40+ components)
✅ 30+ unit test files (85%+ coverage)
✅ 10+ E2E test files (Playwright)
✅ Responsive web interface
✅ Dark/Light theme
✅ Multi-stage Dockerfile (<50MB)
✅ Storybook documentation

WORKER (if applicable):
✅ Complete source code
✅ Test coverage 85%+
✅ Dockerfile optimized

INFRASTRUCTURE:
✅ docker-compose.yml (development)
✅ docker-compose.prod.yml (production)
✅ docker-compose.test.yml (testing)
✅ Complete Kubernetes manifests
✅ Helm charts (optional but recommended)
✅ Terraform/CloudFormation (AWS, GCP, Azure)

CI/CD:
✅ 12 GitHub Actions workflows (all valid)
✅ Pre-commit hooks (Husky)
✅ Automated testing pipeline
✅ Security scanning (Trivy, Snyk, CodeQL)
✅ Automated Docker publishing
✅ Dependabot configuration

DOCUMENTATION:
✅ README.md (6000+ words)
✅ 25+ documentation files
✅ API documentation (OpenAPI/Swagger)
✅ Architecture diagrams (descriptions)
✅ Deployment guides (AWS, GCP, Azure)
✅ Contributing guide
✅ Security policy

EXAMPLES:
✅ 15+ working code examples
✅ Each example with tests
✅ Complete documentation

TESTING:
✅ 100+ test files total
✅ Unit tests (85%+ coverage)
✅ Integration tests (all API endpoints)
✅ E2E tests (all critical flows)
✅ Performance tests (k6)
✅ Security tests (OWASP ZAP)

═══════════════════════════════════════════════════════════════
VERIFICATION BEFORE COMMIT:
═══════════════════════════════════════════════════════════════

RUN scripts/test-all.sh AND VERIFY:
✅ TypeScript compiles (0 errors)
✅ ESLint passes (0 warnings)
✅ Prettier passes (all formatted)
✅ Backend unit tests pass (85%+ coverage)
✅ Backend integration tests pass
✅ Frontend unit tests pass (85%+ coverage)
✅ Docker builds successfully
✅ Health checks pass
✅ npm audit passes (no high/critical)
✅ Coverage threshold met (>80%)

═══════════════════════════════════════════════════════════════
COMMIT SEQUENCE (14 commits per repo):
═══════════════════════════════════════════════════════════════

Commit 1: "feat: initialize repository with README and LICENSE"
Commit 2: "feat: add project structure and configuration files"
Commit 3: "feat: implement backend API with TypeScript and Express"
Commit 4: "test: add comprehensive backend test suite (85%+ coverage)"
Commit 5: "feat: implement React frontend with TypeScript"
Commit 6: "test: add frontend unit and E2E tests (85%+ coverage)"
Commit 7: "feat: implement background worker service"
Commit 8: "feat: add Docker and Docker Compose configurations"
Commit 9: "feat: add Kubernetes manifests and Helm charts"
Commit 10: "ci: add GitHub Actions workflows for CI/CD"
Commit 11: "docs: add comprehensive documentation"
Commit 12: "feat: add working code examples with tests"
Commit 13: "feat: add utility scripts and tools"
Commit 14: "chore: add community files and final polish"

═══════════════════════════════════════════════════════════════
GITHUB SETUP COMMANDS:
═══════════════════════════════════════════════════════════════

# Create and configure repositories

gh repo create apireaisecurity/apire-prompt-shield --public --enable-issues --enable-wiki --enable-discussions
gh repo create apireaisecurity/apire-redteam-kit --public --enable-issues --enable-wiki --enable-discussions
gh repo create apireaisecurity/apire-compliance-checker --public --enable-issues --enable-wiki --enable-discussions

# Set descriptions

gh repo edit apireaisecurity/apire-prompt-shield --description "🛡️ Open-source AI prompt security testing framework"
gh repo edit apireaisecurity/apire-redteam-kit --description "⚔️ Open-source AI red team toolkit with 50+ scenarios"
gh repo edit apireaisecurity/apire-compliance-checker --description "✅ Open-source compliance scanner"

# Enable features

gh api repos/apireaisecurity/apire-prompt-shield/vulnerability-alerts --method PUT
gh api repos/apireaisecurity/apire-prompt-shield/automated-security-fixes --method PUT

# Set branch protection

# (See branch protection section above)

# Create labels

# (See labels section above)

# Set topics

# (See topics section above)

═══════════════════════════════════════════════════════════════
QUALITY STANDARDS:
═══════════════════════════════════════════════════════════════

CODE QUALITY:
✅ TypeScript strict mode enabled
✅ ESLint configured and passing
✅ Prettier configured and applied
✅ No console.log (use logger)
✅ No any types (proper typing)
✅ JSDoc comments on all functions
✅ Error handling everywhere
✅ Input validation everywhere

SECURITY:
✅ No hardcoded secrets
✅ Environment variables for config
✅ SQL injection prevention
✅ XSS prevention
✅ CSRF protection
✅ Rate limiting implemented
✅ Authentication & authorization
✅ Security headers configured

DOCKER:
✅ Multi-stage builds
✅ Non-root user
✅ Health checks
✅ Optimized layers
✅ Small image size
✅ Security scanning passing

DOCUMENTATION:
✅ Complete and accurate
✅ Code examples working
✅ API docs generated
✅ Architecture documented
✅ Deployment guides complete

═══════════════════════════════════════════════════════════════
BEGIN GENERATION NOW
═══════════════════════════════════════════════════════════════

Generate ALL files with COMPLETE code.
Run ALL tests and verify they pass.
Build ALL Docker images and verify they work.
Validate ALL GitHub workflows.
Create git commits following the sequence above.
Provide complete setup and push commands.

START WITH: Repository 1 - apire-prompt-shield
PROCEED TO: Repository 2 - apire-redteam-kit
COMPLETE WITH: Repository 3 - apire-compliance-checker

DO NOT USE PLACEHOLDERS.
WRITE COMPLETE, WORKING CODE.
VERIFY EVERYTHING BEFORE COMMITTING.

═══════════════════════════════════════════════════════════════
