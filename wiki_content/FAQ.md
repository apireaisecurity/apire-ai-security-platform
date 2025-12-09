# Frequently Asked Questions (FAQ)

## General Questions

### What is Apire AI Security Platform?
Apire is an open-source suite of security tools designed to protect AI applications (especially LLMs) from security threats like prompt injection, jailbreaks, data leakage, and adversarial attacks.

### Is it free to use?
Yes! Apire is open-source under the MIT license. You can use it freely in both personal and commercial projects.

### What security tools are included?
- **Prompt Shield**: Real-time input scanning and filtering
- **RedTeam Kit**: Offensive security testing toolkit
- **Compliance Checker**: Regulatory compliance auditing

### Can I use just one tool, or do I need all of them?
Each tool can run independently. Use only the tools you need for your security requirements. They're designed to work standalone or together.

## Technical Questions

### What LLM providers are supported?
Apire works with any LLM provider:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini, PaLM)
- Local models (Llama, Mistral, etc.)
- Custom APIs

The tools analyze prompts **before** they reach your LLM, so integration is provider-agnostic.

### What are the system requirements?
**Minimum (Development)**:
- CPU: 2 cores
- RAM: 4 GB
- Storage: 10 GB
- Docker & Docker Compose

**Recommended (Production)**:
- CPU: 4+ cores
- RAM: 8 GB+
- Storage: 50 GB+
- Kubernetes cluster

### How do I integrate Apire into my existing application?
Three integration methods:

1. **API Integration** (Recommended):
   ```javascript
   // Before sending to LLM
   const scanResult = await fetch('http://shield-api:3001/api/v1/test', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ input: userPrompt })
   });
   
   if (scanResult.safe) {
     // Send to LLM
   } else {
     // Block or sanitize
   }
   ```

2. **Middleware/Proxy**:
   Route all LLM traffic through Apire services

3. **Embedded**: 
   Include detection logic directly in your app (coming soon)

### What's the performance impact?
- **Prompt Shield**: Adds ~50-100ms latency per scan
- **RedTeam Kit**: Runs offline, no production impact
- **Compliance Checker**: Runs on-demand or scheduled

For high-throughput scenarios, consider:
- Caching results for similar prompts
- Async scanning for non-critical paths
- Horizontal scaling

## Security Questions

### How does Apire protect against prompt injection?
Multi-layered approach:
1. **Pattern Matching**: Known injection patterns (regex-based)
2. **Heuristic Analysis**: Structural analysis of prompts
3. **Contextual Evaluation**: Comparison against expected input
4. **Community Database**: Crowdsourced attack signatures

### Can Apire be bypassed?
No security tool is 100% effective. Apire provides **defense in depth**. Recommended practices:
- Combine Apire with input sanitization
- Use output validation
- Monitor for anomalies
- Keep patterns updated
- Test regularly with RedTeam Kit

### Does Apire store my prompts?
**Configurable**:
- **Default**: Scan metadata only (no full prompts)
- **Optional**: Full logging for debugging/auditing
- **Privacy Mode**: Zero logging, in-memory only

Set `STORE_PROMPTS=false` to disable all prompt storage.

### How often are attack patterns updated?
- **Community Updates**: Weekly (via GitHub)
- **Critical Patches**: As needed
- **Local Updates**: Pull latest images or update patterns manually

## Deployment Questions

### Can I deploy to cloud platforms?
Yes! Apire works on:
- **AWS**: ECS, EKS, EC2
- **Google Cloud**: GKE, Cloud Run
- **Azure**: AKS, Container Instances
- **DigitalOcean**: Kubernetes, Droplets
- **Self-hosted**: Any Docker-compatible environment

### Do I need Kubernetes?
No. Options:
- **Docker Compose**: Simple, local or single-server deployments
- **Kubernetes**: Production, multi-server, auto-scaling
- **Standalone**: Each tool can run independently

### How do I handle secrets and API keys?
- **Development**: `.env` files (not committed to Git)
- **Production**: 
  - Docker Secrets
  - Kubernetes Secrets
  - Cloud secret managers (AWS Secrets Manager, GCP Secret Manager, etc.)

### Can I use a managed database?
Yes! Configure via environment variables:
```bash
# Prompt Shield example
POSTGRES_HOST=my-db.amazonaws.com
POSTGRES_USER=apire_user
POSTGRES_PASSWORD=secure_password
```

## Tool-Specific Questions

### Prompt Shield

#### What types of attacks can it detect?
- Prompt injection
- Jailbreak attempts
- PII/sensitive data leakage
- SQL injection patterns in prompts
- Command injection attempts
- Cross-site scripting (XSS) in outputs

#### Can I customize detection rules?
Yes! Each detection category has configurable sensitivity:
```json
{
  "detectors": {
    "injection": { "enabled": true, "threshold": 0.7 },
    "jailbreak": { "enabled": true, "threshold": 0.8 }
  }
}
```

### RedTeam Kit

#### What attack scenarios are included?
- **Injection**: 50+ prompt injection techniques
- **Jailbreak**: Role-playing, DAN variants, system override
- **Extraction**: Data exfiltration patterns
- **Adversarial**: Model manipulation attacks

#### Can I add custom attack scenarios?
Yes! Create JSON files in the scenarios directory:
```json
{
  "name": "Custom Attack",
  "category": "injection",
  "prompts": ["...", "..."]
}
```

### Compliance Checker

#### What regulations are supported?
- **GDPR**: Data protection requirements
- **HIPAA**: Healthcare data security
- **SOC 2**: Security controls
- **CCPA**: California privacy laws
- **Custom**: Define your own policies

#### How often should I run scans?
Recommended:
- **Pre-deployment**: Every release
- **Scheduled**: Weekly or monthly audits
- **On-demand**: After significant changes

## Troubleshooting

### Services won't start
1. Check Docker is running: `docker ps`
2. Check ports aren't in use: `lsof -i :3001`
3. Check logs: `docker-compose logs [service-name]`
4. Restart: `docker-compose down && docker-compose up -d`

### High memory usage
- Reduce concurrent scans/tests
- Lower logging verbosity
- Scale horizontally instead of vertically
- Enable Redis caching for Prompt Shield

### Slow scan performance
- Enable caching (Redis)
- Reduce detector count
- Lower threshold sensitivity
- Use async scanning for non-blocking operations

### Database connection errors
- Verify credentials in `.env`
- Check network connectivity
- Wait for DB initialization (first startup takes 30s)
- Check Docker network: `docker network ls`

## Contributing

### How can I contribute?
- Report bugs via GitHub Issues
- Submit attack patterns to RedTeam Kit
- Improve documentation
- Add detection algorithms to Prompt Shield
- Submit pull requests

### How do I report a security vulnerability?
Email: security@apire.ai (or use GitHub Security Advisories)

Do NOT open public issues for security vulnerabilities.

## Licensing

### Can I use this commercially?
Yes! MIT license allows commercial use with attribution.

### Can I modify the code?
Yes! Fork, modify, and distribute as needed (see LICENSE).

### Do I need to contribute back changes?
No, but we encourage it! Open-source contributions help everyone.

## Getting Help

### Where can I get support?
- **Documentation**: [GitHub Wiki](https://github.com/apireaisecurity/apire-ai-security-platform/wiki)
- **Issues**: [GitHub Issues](https://github.com/apireaisecurity/apire-ai-security-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/apireaisecurity/apire-ai-security-platform/discussions)
- **Community**: [Discord](#) (coming soon)

### How do I request a feature?
Open a GitHub Issue with:
- Use case description
- Expected behavior
- Why existing features don't meet the need

### Is professional support available?
Contact us for enterprise support options including:
- Dedicated assistance
- Custom integrations
- SLA guarantees
- Training and consulting
