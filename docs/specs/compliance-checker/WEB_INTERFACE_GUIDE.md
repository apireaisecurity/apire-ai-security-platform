# Web Interface Guide

## Dashboard

- **Compliance Score**: Your overall health.
- **Framework Status**: Progress bars for each active framework.
- **Upcoming Audits**: Calendar of scheduled scans.

## Policy Scanner

- **Source Code**: Connect GitHub/GitLab repos.
- **Infrastructure**: Connect AWS/Azure accounts.
- **Documents**: Upload policy PDFs.
- **Run Scan**: Trigger an immediate analysis.

## Remediation Planner

A Kanban board of tasks generated from scan findings.

- **To Do**: New findings.
- **In Progress**: Assigned to engineers.
- **Resolved**: Fixed and verified by re-scan.
- **Accepted Risk**: Manually overridden findings.

## Document Vault

Securely store your evidence.

- Upload policies, training logs, and architecture diagrams.
- Link documents to specific framework controls (e.g., link "Access Policy.pdf" to "ISO 27001 A.9.1").
