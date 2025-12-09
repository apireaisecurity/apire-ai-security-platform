# API Reference

This page provides a high-level overview of the API endpoints available in the Apire AI Security Platform.

For the most up-to-date and detailed specification, please refer to the [OpenAPI Specification](https://github.com/apireaisecurity/apire-ai-security-platform/blob/main/docs/API.md) in the repository.

## Core Platform APIs

### Authentication
-   `POST /api/v1/auth/register`: Register a new user.
-   `POST /api/v1/auth/login`: Login and retrieve JWT.
-   `GET /api/v1/auth/me`: Get current user profile.

### Users
-   `GET /api/v1/users`: List users (Admin only).
-   `PUT /api/v1/users/:id`: Update user details.

## Prompt Shield APIs

### Analysis
-   `POST /api/v1/analyze`: Analyze a prompt for security risks.
    -   **Parameters**: `text` (string), `detectors` (array).
    -   **Response**: Risk score, flagged categories.

### Configuration
-   `GET /api/v1/config`: Get current shield configuration.
-   `PUT /api/v1/config`: Update sensitivity thresholds.

## RedTeam Kit APIs

### Scenarios
-   `GET /api/v1/scenarios`: List available attack scenarios.
-   `POST /api/v1/scenarios/run`: Start a new attack simulation.

### Reports
-   `GET /api/v1/reports`: List past simulation reports.
-   `GET /api/v1/reports/:id`: Get detailed report for a run.

## Compliance Checker APIs

### Scans
-   `POST /api/v1/scan`: Initiate a compliance audit.
-   `GET /api/v1/scan/:id/status`: Check status of a running scan.

### Policies
-   `GET /api/v1/policies`: List supported regulatory frameworks.
