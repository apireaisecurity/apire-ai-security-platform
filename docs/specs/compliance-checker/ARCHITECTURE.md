# Architecture: APIRE Compliance Checker

## Overview

A data-intensive application designed for auditability and searchability.

![Architecture](https://via.placeholder.com/800x400?text=Compliance+Architecture)

## Components

1.  **Policy Engine**: The core logic that evaluates rules against inputs (code, config, text).
2.  **Connectors**: Adapters for fetching data from external sources (GitHub, AWS, Jira).
3.  **Elasticsearch**: Indexes all findings, policies, and evidence for fast full-text search.
4.  **Report Service**: Headless Chrome (Puppeteer) worker that renders PDFs.
5.  **Blockchain Ledger (Optional)**: Hashes of audit logs are anchored to a blockchain for immutability.

## Data Model

- **Framework**: A set of Controls (e.g., GDPR).
- **Control**: A specific requirement (e.g., "Data Encryption").
- **Policy**: A technical rule to verify a Control (e.g., "Check for TLS 1.2").
- **Finding**: A violation of a Policy.
- **Evidence**: Proof of compliance (file, log, screenshot).

## Scalability

- **Scanning**: Can be distributed across multiple worker nodes.
- **Search**: Elasticsearch cluster can scale horizontally.
