# APIRE Compliance Checker

![APIRE Compliance Checker Logo](https://via.placeholder.com/800x200?text=APIRE+Compliance+Checker)

> **The Automated Regulatory Scanner for AI Applications**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/apireaisecurity/compliance-checker)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](https://github.com/apireaisecurity/compliance-checker)

**APIRE Compliance Checker** is an enterprise-grade platform that automates the process of ensuring your AI systems meet global regulatory standards. It scans your code, data flows, and documentation against frameworks like GDPR, EU AI Act, HIPAA, and more.

## 🌍 Supported Frameworks

- **EU AI Act**: High-risk system classification and requirements.
- **GDPR**: Data privacy, consent, and erasure checks.
- **HIPAA**: PHI handling and security controls.
- **PCI-DSS**: Payment card data protection.
- **SOC 2 Type II**: Security, availability, and confidentiality.
- **ISO 27001**: Information security management.
- **NIST AI RMF**: Risk management framework.

## 🚀 Key Features

- 🔍 **Automated Policy Scanning**: Static analysis of code and config for compliance violations.
- 📊 **Gap Analysis**: Visual identification of missing controls or documentation.
- 📝 **Report Generation**: One-click PDF/HTML reports for auditors.
- 🛡️ **Risk Assessment**: Interactive scoring based on system criticality.
- 📅 **Continuous Monitoring**: Scheduled scans to prevent compliance drift.
- 🔗 **Evidence Collection**: Automatically gather and link evidence to controls.

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/apireaisecurity/compliance-checker.git
cd compliance-checker

# Start with Docker Compose
docker-compose up -d
```

Access the dashboard at `http://localhost:3000`.

## 📚 Documentation

- [Supported Frameworks](./FRAMEWORKS.md)
- [Docker Quickstart](./QUICKSTART_DOCKER.md)
- [Configuration Guide](./CONFIGURATION.md)
- [Reporting Guide](./REPORTING.md)
- [Web Interface Guide](./WEB_INTERFACE_GUIDE.md)
- [API Reference](./API_REFERENCE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Integration Examples](./INTEGRATION_EXAMPLES.md)
- [Compliance Playbooks](./COMPLIANCE_PLAYBOOKS.md)
- [Architecture](./ARCHITECTURE.md)
- [Contributing](./CONTRIBUTING.md)
- [Legal Disclaimer](./LEGAL_DISCLAIMER.md)

## 🏗️ Architecture

- **Frontend**: Vue.js 3, Vuetify.
- **Backend**: Node.js, Express.
- **Data**: PostgreSQL (Relational), Elasticsearch (Search/Logs).
- **Storage**: MinIO (S3-compatible) for documents/reports.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

Apache 2.0
