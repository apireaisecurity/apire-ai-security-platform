# Apire Compliance Checker

The **Compliance Checker** automates the process of auditing AI systems against major regulatory frameworks.

## Supported Frameworks

-   **GDPR**: General Data Protection Regulation (EU).
-   **HIPAA**: Health Insurance Portability and Accountability Act (US).
-   **EU AI Act**: Upcoming regulation for AI safety.
-   **NIST AI RMF**: AI Risk Management Framework.

## Features

-   **Policy Scanning**: Checks configuration and data handling practices against defined rules.
-   **Audit Logs**: Maintains an immutable record of compliance checks.
-   **Gap Analysis**: Identifies missing controls or documentation.

## Tech Stack

-   **Backend**: Node.js, Express
-   **Frontend**: Vue.js
-   **Database**: PostgreSQL
-   **Search Engine**: Elasticsearch (For searching through large policy documents and logs)

## Usage

1.  Define the scope of the audit (e.g., "Customer Support Bot").
2.  Select the regulatory framework (e.g., "GDPR").
3.  Run the scan.
4.  View the compliance score and remediation steps.

## API Reference

-   `POST /api/v1/scan`: Initiate a compliance scan.
    ```json
    {
      "frameworks": ["gdpr", "eu-ai-act"],
      "config": { ... }
    }
    ```
