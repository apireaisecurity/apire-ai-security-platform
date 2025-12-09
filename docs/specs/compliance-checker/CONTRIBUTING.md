# Contributing to APIRE Compliance Checker

## Tech Stack
- **Backend**: Node.js, Express, TypeScript.
- **Frontend**: Vue.js 3, Vuetify, Pinia.

## Adding a New Framework

1.  Create a JSON definition in `src/frameworks/definitions`.
2.  Map controls to existing Policies.
3.  If new Policies are needed, implement them in `src/engine/policies`.

## Testing

- **Unit Tests**: Jest.
- **Integration Tests**: Supertest.
- **E2E Tests**: Cypress.

## Pull Requests

- Please include a changelog entry.
- Update documentation if you change configuration options.
