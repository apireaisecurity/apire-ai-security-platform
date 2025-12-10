# Release Process Guide

## Overview

This document outlines the versioning strategy, release process, and contribution guidelines for the Apire AI Security Platform.

---

## Versioning Strategy

We follow **[Semantic Versioning 2.0.0](https://semver.org/)** (SemVer).

### Version Format: `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`

- **MAJOR**: Incompatible API changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes (backward-compatible)
- **PRERELEASE**: Optional pre-release tags (`alpha`, `beta`, `rc`)
- **BUILD**: Optional build metadata

### Examples

| Version | Description |
|---------|-------------|
| `1.0.0` | First stable release |
| `1.1.0` | Minor feature addition |
| `1.1.1` | Bug fix |
| `2.0.0` | Breaking API change |
| `1.2.0-beta.1` | Beta pre-release |
| `1.0.0+20230615` | Build with metadata |

---

## Release Types

### 1. 🚀 Major Release (X.0.0)

**When to use**:
- Breaking API changes
- Major architectural changes
- Removal of deprecated features
- Changes requiring migration steps

**Example scenarios**:
- Changing endpoint paths (`/test` → `/tests`)
- Removing environment variables
- Changing database schema incompatibly
- Updating Node.js version requirement (14 → 18)

**Process**:
1. Create migration guide (`MIGRATION_v2.md`)
2. Update all documentation
3. Deprecate features in previous minor release
4. Create release candidate (`2.0.0-rc.1`)
5. Extensive testing period (1-2 weeks)
6. Release with comprehensive changelog

---

### 2. ✨ Minor Release (1.X.0)

**When to use**:
- New features (backward-compatible)
- New API endpoints
- New configuration options (with defaults)
- Performance improvements

**Example scenarios**:
- Adding new `/metrics` endpoint
- Adding optional `REQUIRE_API_KEY` environment variable
- Implementing new compliance framework
- Adding new RedTeam test scenarios

**Process**:
1. Feature branch → PR → merge to `main`
2. Update `CHANGELOG.md`
3. Tag release
4. Deploy to staging → production

---

### 3. 🐛 Patch Release (1.1.X)

**When to use**:
- Bug fixes
- Security patches
- Documentation updates
- Dependency updates (minor)

**Example scenarios**:
- Fixing 404 errors on existing endpoints
- Fixing authentication middleware bug
- Updating README typos
- Patching vulnerable dependencies

**Process**:
1. Hotfix branch → PR → merge
2. Update `CHANGELOG.md`
3. Tag and release immediately

---

### 4. 🧪 Pre-release (1.0.0-alpha.1)

**When to use**:
- Testing major changes before stable release
- Community feedback on new features
- Beta testing with early adopters

**Pre-release tags**:
- `alpha`: Early development, unstable
- `beta`: Feature-complete, testing phase
- `rc` (release candidate): Final testing before stable

**Example flow**:
```
1.0.0-alpha.1 → 1.0.0-alpha.2 → 1.0.0-beta.1 → 1.0.0-rc.1 → 1.0.0
```

---

## Release Checklist

### Pre-Release (Before Tagging)

- [ ] All tests passing (`npm test` across all workspaces)
- [ ] Linting passes (`npm run lint`)
- [ ] Security audit clean (`npm audit`)
- [ ] Documentation updated:
  - [ ] `README.md` (if API changes)
  - [ ] `docs/API.md` (if endpoints changed)
  - [ ] `docs/CONFIGURATION.md` (if env vars changed)
  - [ ] `docs/ARCHITECTURE.md` (if structure changed)
  - [ ] `wiki_content/` (matching updates)
- [ ] `CHANGELOG.md` updated with version and date
- [ ] Version bumped in all `package.json` files
- [ ] Breaking changes documented in `CHANGELOG.md`
- [ ] Migration guide created (for major releases)

### Release (Tagging)

```bash
# 1. Ensure clean working directory
git status

# 2. Pull latest changes
git checkout main
git pull origin main

# 3. Bump version in all package.json files
npm version [major|minor|patch] --workspaces --no-git-tag-version

# 4. Update CHANGELOG.md
# Add release notes manually or with tool

# 5. Commit version bump
git add .
git commit -m "chore: bump version to v1.2.0"

# 6. Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0 - Feature XYZ"

# 7. Push changes and tag
git push origin main
git push origin v1.2.0
```

### Post-Release

- [ ] GitHub Release created with notes
- [ ] Docker images built and pushed to registry
- [ ] Wiki updated (run `./scripts/publish-wiki.sh`)
- [ ] Announcement posted (Discord, Twitter, blog)
- [ ] Monitor error tracking for issues
- [ ] Update staging environment

---

## Changelog Guidelines

### Format (Keep A Changelog)

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features in development

### Changed
- Modifications to existing features

### Deprecated
- Features planned for removal

### Removed
- Features removed in this release

### Fixed
- Bug fixes

### Security
- Security vulnerability patches

## [1.2.0] - 2024-01-15

### Added
- New `/metrics` endpoint for Prometheus integration (#123)
- Support for GDPR compliance scanning (#145)

### Changed
- Improved error messages in Prompt Shield (#156)

### Fixed
- Fixed 404 error on `/tests/:id` endpoint (#178)

## [1.1.0] - 2023-12-01

...
```

### Changelog Entry Examples

**Good** ✅:
```markdown
### Added
- New `/api/v1/tests` endpoint for running prompt security tests (#45)
- `REQUIRE_API_KEY` environment variable to enable API key authentication (#67)

### Fixed
- Fixed race condition in RedTeam job queue causing duplicate executions (#89)
- Corrected API documentation endpoint paths in `docs/API.md` (#102)
```

**Bad** ❌:
```markdown
### Changed
- Updated stuff
- Fixed bugs
- Improved things
```

**Always include**:
- Clear description of change
- Issue/PR reference (`#123`)
- Breaking change warnings (if applicable)

---

## Git Tagging Conventions

### Tag Naming

- ✅ `v1.0.0` (with `v` prefix)
- ❌ `1.0.0` (no prefix)
- ❌ `release-1.0.0` (don't use `release-` prefix)

### Annotated Tags (Required)

```bash
# Create annotated tag with message
git tag -a v1.2.0 -m "Release v1.2.0: Added Prometheus metrics"

# Verify tag
git show v1.2.0
```

### Lightweight Tags (Avoid)

```bash
# Don't create lightweight tags for releases
git tag v1.2.0  # ❌ Missing annotation
```

### Deleting Tags

```bash
# Delete local tag
git tag -d v1.2.0

# Delete remote tag
git push --delete origin v1.2.0
```

---

## GitHub Releases

### Creating a Release

**Via GitHub UI**:
1. Go to **Releases** → **Draft a new release**
2. Choose tag: `v1.2.0` (or create new tag)
3. Release title: `v1.2.0 - Prometheus Integration`
4. Description:
   - Copy relevant `CHANGELOG.md` section
   - Add highlights and screenshots
   - Include upgrade instructions
5. Mark as pre-release if applicable
6. Publish release

**Via GitHub CLI**:
```bash
gh release create v1.2.0 \
  --title "v1.2.0 - Prometheus Integration" \
  --notes-file RELEASE_NOTES.md \
  --latest
```

### Release Notes Template

```markdown
## 🎉 What's New

- ✨ **New Feature**: Prometheus metrics endpoint for all services
- 🛡️ **Security**: API key authentication support
- 📊 **Observability**: Grafana dashboard templates

## 🐛 Bug Fixes

- Fixed 404 error on `/tests/:id` endpoint (#178)
- Corrected RedTeam queue processing race condition (#189)

## 🔧 Configuration Changes

**New environment variables**:
- `REQUIRE_API_KEY` (optional, default: `false`)
- `API_KEY` (required if `REQUIRE_API_KEY=true`)

See [CONFIGURATION.md](./docs/CONFIGURATION.md) for details.

## 📦 Installation

### Docker Compose
\`\`\`bash
docker-compose -f docker-compose.codespaces.yml up -d
\`\`\`

### NPM (SDK)
\`\`\`bash
npm install @apire/sdk@1.2.0
\`\`\`

## 🔄 Upgrade Guide

No breaking changes. This is a drop-in replacement for v1.1.x.

To enable new features:
1. Add `REQUIRE_API_KEY=true` to `.env`
2. Set `API_KEY=your-secure-key`
3. Restart services

## 📚 Documentation

- [API Reference](./docs/API.md)
- [Configuration Guide](./docs/CONFIGURATION.md)
- [Observability Setup](./docs/OBSERVABILITY.md)

## 🙏 Contributors

Thank you to all contributors who made this release possible!

**Full Changelog**: https://github.com/apire/apire-platform/compare/v1.1.0...v1.2.0
```

---

## Continuous Deployment

### GitHub Actions Workflow (`.github/workflows/release.yml`)

**Trigger**: On tag push matching `v*`

**Steps**:
1. Run tests on all workspaces
2. Build Docker images for each service
3. Tag images with version (`v1.2.0`) and `latest`
4. Push to GitHub Container Registry (ghcr.io)
5. Create GitHub Release with auto-generated notes
6. Publish NPM package (`@apire/sdk`)
7. Deploy to staging environment
8. Run smoke tests
9. (Manual approval) → Deploy to production

**Example workflow** (simplified):
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Extract version
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT
      
      - name: Run tests
        run: npm run test:all
      
      - name: Build Docker images
        run: |
          docker build -t ghcr.io/apire/shield-api:${{ steps.version.outputs.VERSION }} ./apire-prompt-shield/backend
          docker build -t ghcr.io/apire/redteam-api:${{ steps.version.outputs.VERSION }} ./apire-redteam-kit/backend
          docker build -t ghcr.io/apire/compliance-api:${{ steps.version.outputs.VERSION }} ./apire-compliance-checker/backend
      
      - name: Push images
        run: |
          echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          docker push ghcr.io/apire/shield-api:${{ steps.version.outputs.VERSION }}
          # ... push other images
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.version.outputs.VERSION }}
          body_path: RELEASE_NOTES.md
```

---

## Hotfix Process

**Scenario**: Critical bug in production (`v1.2.0`) requiring immediate patch.

### Steps

1. **Create hotfix branch from tag**:
   ```bash
   git checkout -b hotfix/1.2.1 v1.2.0
   ```

2. **Fix the bug**:
   ```bash
   # Make changes
   git add .
   git commit -m "fix: critical authentication bypass (CVE-2024-1234)"
   ```

3. **Bump version to patch**:
   ```bash
   npm version patch --workspaces --no-git-tag-version
   # Updates all package.json to 1.2.1
   ```

4. **Update CHANGELOG.md**:
   ```markdown
   ## [1.2.1] - 2024-01-20

   ### Security
   - Fixed authentication bypass vulnerability (CVE-2024-1234)
   ```

5. **Commit version bump**:
   ```bash
   git add .
   git commit -m "chore: bump version to v1.2.1"
   ```

6. **Tag hotfix**:
   ```bash
   git tag -a v1.2.1 -m "Hotfix v1.2.1: Security patch"
   ```

7. **Merge back to main**:
   ```bash
   git checkout main
   git merge hotfix/1.2.1 --no-ff
   ```

8. **Push everything**:
   ```bash
   git push origin main
   git push origin v1.2.1
   git branch -d hotfix/1.2.1
   ```

9. **Deploy immediately** (automated via GitHub Actions)

---

## Deprecation Policy

### Deprecating a Feature

**Timeline**: Minimum 1 minor release before removal

**Process**:
1. **Mark as deprecated in docs** (add warning banner)
2. **Add deprecation warnings** in code (console.warn)
3. **Update CHANGELOG.md**:
   ```markdown
   ### Deprecated
   - `/api/v1/old-endpoint` is deprecated, use `/api/v2/new-endpoint` instead. Will be removed in v2.0.0.
   ```
4. **Announce in release notes**
5. **Remove in next major release**

**Example code deprecation**:
```typescript
/**
 * @deprecated Use `newFunction()` instead. Will be removed in v2.0.0.
 */
export function oldFunction() {
  console.warn('oldFunction() is deprecated, use newFunction() instead');
  return newFunction();
}
```

---

## Release Schedule

### Regular Releases

- **Minor releases**: Every 4-6 weeks
- **Patch releases**: As needed (bug fixes, security)
- **Major releases**: Every 6-12 months

### Support Windows

- **Current major version**: Full support (features + bugs + security)
- **Previous major version**: Security patches only (6 months)
- **Older versions**: No support (upgrade required)

**Example**:
- v2.x.x: Full support ✅
- v1.x.x: Security patches only 🔒
- v0.x.x: No support ❌

---

## Rollback Procedure

**If a release causes critical issues**:

1. **Revert Docker images** to previous version:
   ```bash
   docker pull ghcr.io/apire/shield-api:1.1.0
   docker-compose up -d
   ```

2. **Delete bad tag**:
   ```bash
   git tag -d v1.2.0
   git push --delete origin v1.2.0
   ```

3. **Mark GitHub Release as draft** (don't delete)

4. **Post incident report**

5. **Fix and re-release** as `v1.2.1`

---

## Tools & Automation

### Recommended Tools

- **[semantic-release](https://github.com/semantic-release/semantic-release)**: Automated versioning and changelog
- **[standard-version](https://github.com/conventional-changelog/standard-version)**: Changelog and version bumping
- **[release-please](https://github.com/googleapis/release-please)**: Google's automated releases
- **[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)**: Generate changelog from commits

### Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/) for automated changelog generation:

```
feat: add prometheus metrics endpoint
fix: correct authentication middleware bug
docs: update API documentation
chore: bump dependency versions
refactor: simplify test execution logic
perf: optimize database queries
test: add integration tests for compliance checker
```

---

## Additional Resources

- [Semantic Versioning Specification](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
