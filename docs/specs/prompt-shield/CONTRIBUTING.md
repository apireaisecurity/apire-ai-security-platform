# Contributing to APIRE Prompt Shield

Thank you for your interest in contributing! We welcome contributions from the community to help make AI safer for everyone.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally.
3.  **Install dependencies**: `npm install`
4.  **Create a branch** for your feature or fix: `git checkout -b feature/amazing-feature`

## Development Workflow

### Project Structure

- `src/api`: Backend API service
- `src/worker`: Background worker service
- `src/web`: Frontend React application
- `src/shared`: Shared types and utilities

### Running Locally

We use Docker Compose for a consistent dev environment.

```bash
docker-compose up
```

This starts the DB, Redis, API, Worker, and Web UI.

### Testing

Please ensure all tests pass before submitting a PR.

```bash
npm test
```

We use Jest for backend tests and React Testing Library for frontend.

## Code Style

- **TypeScript**: We use strict mode. No `any` unless absolutely necessary.
- **Linting**: ESLint and Prettier are configured. Run `npm run lint` to check.
- **Commits**: We follow Conventional Commits (e.g., `feat: add new attack pattern`, `fix: resolve login bug`).

## Pull Request Process

1.  Update the `README.md` or documentation with details of changes if applicable.
2.  Add tests for any new functionality.
3.  Ensure the CI build passes.
4.  Request a review from a maintainer.

## Adding New Attack Patterns

To add a new attack pattern to the library:

1.  Navigate to `src/worker/patterns`.
2.  Create a new definition file (e.g., `new-attack.ts`).
3.  Implement the detection logic.
4.  Register it in `src/worker/registry.ts`.
5.  Add unit tests in `src/worker/__tests__/patterns`.

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.
