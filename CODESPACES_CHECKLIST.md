# ✅ GitHub Codespaces Deployment Checklist

Use this checklist to ensure your repository is properly configured for GitHub Codespaces.

## 📋 Pre-Deployment Checklist

### Repository Setup
- [x] Repository exists and is accessible
- [x] `.devcontainer/devcontainer.json` is configured
- [x] Docker Compose files are present
- [x] All scripts are executable (`chmod +x scripts/*.sh`)
- [x] Dependencies are properly defined in `package.json`

### Documentation
- [x] README has "Open in Codespaces" badge
- [x] `docs/DEPLOY_ON_CODESPACES.md` exists
- [x] `docs/CODESPACES_PREBUILD.md` exists
- [x] `.devcontainer/README.md` explains setup
- [x] Wiki documentation is prepared in `wiki_content/`

## 🚀 Deployment Steps

### Step 1: Push Latest Changes
```bash
git add -A
git commit -m "feat: complete Codespaces configuration"
git push origin main
```

### Step 2: Enable GitHub Codespaces
1. Go to repository **Settings**
2. Scroll to **Codespaces** section
3. Ensure Codespaces is enabled for the repository

### Step 3: Configure Prebuild (Optional but Recommended)
1. In **Settings** → **Codespaces**
2. Click **Set up prebuild**
3. Select configuration: `/.devcontainer/devcontainer.json`
4. Choose regions: US East, EU West (or as needed)
5. Set trigger: "On push" or "Scheduled"
6. Click **Create**

### Step 4: Wait for First Prebuild
- Go to **Actions** tab
- Monitor "Create Codespaces Prebuilds" workflow
- Wait for green checkmark (10-15 minutes)

### Step 5: Test Codespace Creation
1. Click **Code** → **Codespaces** → **Create codespace on main**
2. Wait for environment to initialize
3. Verify all extensions are installed
4. Check that welcome message appears

### Step 6: Validate Setup
Inside the Codespace, run:
```bash
./scripts/validate-codespace.sh
```

Ensure all checks pass with ✅

### Step 7: Start Services
```bash
./scripts/start-codespace.sh
```

Wait for all containers to build and start (5-10 minutes first time).

### Step 8: Verify Applications
1. Go to **PORTS** tab in VS Code
2. Click "Open in Browser" for:
   - Port 5173 (Core Dashboard)
   - Port 3002 (Prompt Shield)
   - Port 3004 (Compliance Checker)
   - Port 3006 (RedTeam Kit)

### Step 9: Run Tests
```bash
./scripts/test-all.sh
```

Ensure all tests pass.

## 🧪 Post-Deployment Validation

### Functional Tests
- [ ] Core Dashboard loads successfully
- [ ] Can register a new user
- [ ] Can login and receive JWT token
- [ ] Prompt Shield UI is accessible
- [ ] Compliance Checker UI is accessible
- [ ] RedTeam Kit UI is accessible
- [ ] All APIs respond on their ports

### Performance Tests
- [ ] Codespace creation time < 2 minutes (with prebuild)
- [ ] Docker containers start successfully
- [ ] No memory/CPU warnings in container logs
- [ ] Port forwarding works for all services

### Documentation Validation
- [ ] README badge works
- [ ] Links in README are correct
- [ ] API documentation is accurate
- [ ] Architecture diagrams are up-to-date

## 🎯 Optional Enhancements

### Wiki Publication
```bash
# After creating first wiki page in GitHub UI:
./scripts/publish-wiki.sh
```

### Environment Secrets
For production Codespaces, add secrets:
1. Go to **Settings** → **Secrets and variables** → **Codespaces**
2. Add:
   - `OPENAI_API_KEY` (if using AI features)
   - `JWT_SECRET` (for production)
   - `DATABASE_URL` (if using external DB)

### Custom Machine Types
For resource-intensive workloads:
1. Edit `.devcontainer/devcontainer.json`
2. Add:
   ```json
   "hostRequirements": {
     "cpus": 4,
     "memory": "8gb",
     "storage": "32gb"
   }
   ```

## 🐛 Troubleshooting

### Issue: Prebuild Never Completes
**Check**: Actions tab for errors
**Fix**: Review `postCreateCommand` in devcontainer.json

### Issue: Docker Daemon Not Available
**Check**: Feature `docker-in-docker` is enabled
**Fix**: Add to `devcontainer.json`:
```json
"features": {
  "ghcr.io/devcontainers/features/docker-in-docker:2": {}
}
```

### Issue: Port Not Forwarding
**Check**: Port is in `forwardPorts` array
**Fix**: Add to `devcontainer.json`:
```json
"forwardPorts": [3000, 5173, ...]
```

### Issue: Out of Memory
**Check**: Container resource limits
**Fix**: Reduce concurrent containers or upgrade machine type

## 📊 Success Metrics

Your Codespaces deployment is successful when:

✅ **Creation Time**: < 2 minutes (with prebuild)
✅ **Build Success Rate**: > 95%
✅ **Test Pass Rate**: 100%
✅ **User Feedback**: "Easy to use"
✅ **Cost**: Within budget (monitor in Billing)

## 📚 Additional Resources

- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
- [Devcontainer Specification](https://containers.dev/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Project Wiki](https://github.com/apireaisecurity/apire-ai-security-platform/wiki)

## 🎉 Completion

Once all items are checked:
1. Mark this as complete in your project tracker
2. Share the Codespaces link with your team
3. Update stakeholders that the platform is ready for testing

---

**Date Completed**: _________________
**Deployed By**: _________________
**Codespace URL**: _________________
