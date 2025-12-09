# GitHub Codespaces Prebuild Setup Guide

This guide walks you through setting up **prebuilds** for GitHub Codespaces to dramatically speed up environment creation.

## 🚀 What are Prebuilds?

Prebuilds pre-build your development container so that when someone creates a Codespace, it starts in seconds instead of minutes. The prebuild process:

1. Runs your `postCreateCommand` 
2. Installs all dependencies
3. Builds the project
4. Caches the container image

## 📋 Prerequisites

- Repository must be public OR you need GitHub Pro/Team/Enterprise
- You must have admin access to the repository

## 🛠️ Setup Steps

### Step 1: Enable Prebuilds via GitHub UI

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Codespaces**
4. Click **Set up prebuild** button
5. Configure the prebuild:
   - **Configuration**: Select `/.devcontainer/devcontainer.json`
   - **Region(s)**: Select regions closest to your users (e.g., US East, EU West)
   - **Trigger**: Select "Every push" or "Scheduled"
   - **Template machine type**: 4-core (recommended for faster builds)

6. Click **Create**

### Step 2: Verify Prebuild Configuration

After creating the prebuild, GitHub will show:
- Prebuild status
- Last build time
- Success/failure status

### Step 3: Trigger First Prebuild

The first prebuild will trigger automatically on your next push to `main`. Or you can trigger it manually:

1. Go to **Settings** → **Codespaces**
2. Find your prebuild configuration
3. Click the **⋮** (three dots) menu
4. Select **Trigger prebuild**

### Step 4: Monitor Prebuild Progress

1. Go to **Actions** tab in your repository
2. Look for workflows named "Create Codespaces Prebuilds"
3. Click to view logs

The prebuild will:
- ✅ Clone the repository
- ✅ Build the devcontainer
- ✅ Run `postCreateCommand` (installs dependencies)
- ✅ Cache the result

**Expected Duration**: 10-15 minutes for first build

## 🎯 Using Prebuilds

Once the prebuild completes:

1. Click **Code** → **Codespaces** → **Create codespace on main**
2. The Codespace will start in **30-60 seconds** (instead of 10 minutes!)

## 💰 Cost Considerations

### Free Tier
- **Personal accounts**: 15 GB-month of storage included
- Prebuilds count against this storage

### Paid Plans
- **Pro**: 20 GB-month included
- **Team**: 50 GB-month per user
- Additional storage: $0.07/GB per day

### Cost Optimization Tips

1. **Limit prebuild regions**: Only enable regions you need
2. **Use scheduled builds**: Instead of "every push", use weekly builds
3. **Clean old prebuilds**: GitHub auto-deletes old prebuilds after 30 days

## 🔧 Advanced Configuration

### Custom Prebuild Script

Create `.devcontainer/prebuild.sh`:

```bash
#!/bin/bash
set -e

echo "Running prebuild optimizations..."

# Install dependencies
npm install --legacy-peer-deps

# Build all workspaces
npm run build

# Pull Docker images to cache them
docker-compose -f docker-compose.codespaces.yml pull

echo "Prebuild complete!"
```

Then update `devcontainer.json`:

```json
{
  "postCreateCommand": "./.devcontainer/prebuild.sh"
}
```

### Conditional Prebuilds

You can configure prebuilds to run only on specific branches:

1. In GitHub UI: **Settings** → **Codespaces** → **Edit prebuild**
2. Under **Triggers**, add branch filters:
   - `main`
   - `develop`
   - `release/*`

## 🐛 Troubleshooting

### Prebuild Fails

Check the Actions tab logs for errors. Common issues:

**Problem**: Dependencies fail to install
```
Solution: Add --legacy-peer-deps flag to npm install
```

**Problem**: Docker daemon not available
```
Solution: Ensure "docker-in-docker" feature is in devcontainer.json
```

**Problem**: Out of memory
```
Solution: Increase prebuild machine type to 8-core
```

### Codespace Still Slow

- Verify the prebuild completed successfully (green checkmark in Settings → Codespaces)
- Check that you're creating a Codespace on the branch with the prebuild (usually `main`)
- Clear browser cache and try again

### Prebuild Not Triggering

1. Verify the prebuild is enabled (Settings → Codespaces)
2. Check that your branch matches the configured trigger
3. Push a new commit to trigger the build

## 📊 Monitoring Prebuild Usage

To see prebuild usage and costs:

1. Go to **Settings** (your profile, not repository)
2. Click **Billing and plans**
3. Under **Codespaces**, click **Usage this month**
4. View **Prebuilds** section

## ✅ Verification Checklist

- [ ] Prebuild is enabled in Settings → Codespaces
- [ ] First prebuild has completed successfully
- [ ] Green checkmark appears next to prebuild configuration
- [ ] Creating a new Codespace takes < 2 minutes
- [ ] `postCreateCommand` runs quickly (dependencies are cached)

## 🎉 Next Steps

Once prebuilds are working:

1. Share the repository with your team
2. Add the Codespaces badge to your README
3. Document any custom setup steps

---

**Need Help?** Check the [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces/prebuilding-your-codespaces)
