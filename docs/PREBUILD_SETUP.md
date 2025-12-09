# Codespaces Prebuild Configuration

To enable prebuilds for this repository, use the following configuration in the GitHub UI:

1.  Go to **Settings** > **Codespaces**.
2.  Click **Set up prebuild**.
3.  Select the branch: `main`.
4.  **Configuration file**: `.devcontainer/devcontainer.json`
5.  **Region**: Select the regions where your team is located (e.g., `US East`, `Europe West`).
6.  **Prebuild triggers**:
    *   [x] **Every push**: Triggers a prebuild for every push to the selected branch.
    *   [ ] **Configuration change**: Triggers when the configuration file changes.
7.  **Reduce prebuild availability**: (Optional) Set to `0` to keep prebuilds indefinitely or set a limit.
8.  Click **Create**.

## Why use Prebuilds?

Prebuilds will run the `postCreateCommand` defined in `.devcontainer/devcontainer.json`, which executes `scripts/setup-codespace.sh`. This script:
1.  Installs all NPM dependencies.
2.  Builds all workspaces.
3.  Sets up the environment.

This saves ~5-10 minutes of setup time when creating a new Codespace.
