# API Reference

Base URL: `/api/v1`

## Scans

`POST /scans`
Trigger a new compliance scan.

`GET /scans/:id`
Get scan status and summary.

`GET /scans/:id/findings`
Get detailed list of violations.

## Evidence

`POST /evidence`
Upload a file or link.

`GET /evidence`
List all evidence.

## Reports

`POST /reports`
Generate a report.

`GET /reports/:id/download`
Download the report file.

## Webhooks

Register webhooks to get notified when:
- A scan completes.
- A compliance score drops below a threshold.
- A new critical vulnerability is found.
