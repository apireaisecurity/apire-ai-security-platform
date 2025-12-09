# Core Platform

The **Core Platform** serves as the foundation for the Apire suite. It handles user identity, centralized reporting, and navigation.

## Features

-   **User Management**: Registration, Login, and Profile management.
-   **Authentication**: Centralized JWT issuance.
-   **Dashboard**: A "Launchpad" interface to access all other tools.
-   **Unified Reporting**: (Planned) Aggregated view of security posture across all tools.

## Tech Stack

-   **Backend**: Node.js, Express, TypeScript
-   **Frontend**: React, Vite, Tailwind CSS
-   **Database**: PostgreSQL (User data)
-   **Testing**: Jest (Backend), Vitest (Frontend), Playwright (E2E)

## Key Directories

-   `backend/`: Express application source code.
-   `frontend/`: React application source code.
-   `kubernetes/base/`: K8s manifests for the core platform.

## API Endpoints

### Authentication
-   `POST /api/v1/auth/register`: Create a new account.
-   `POST /api/v1/auth/login`: Authenticate and receive JWT.

### Scanner (Legacy MVP)
-   `POST /api/v1/scanner`: Basic text scanning endpoint.
