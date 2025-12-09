# Web UI Guide: APIRE Prompt Shield

## Overview
The Web UI is your command center for managing prompt security. This guide walks you through the key features.

## Navigation
- **Dashboard**: High-level metrics.
- **Test Builder**: Create and run tests.
- **History**: View past test runs.
- **Rules**: Configure custom detection rules.
- **Settings**: Manage API keys and users.

## Feature Tutorials

### 1. Creating a Prompt Injection Test
1.  Go to **Test Builder**.
2.  **Input**: Enter the prompt you want to test (e.g., a user query).
3.  **Attack Vectors**: Select "Injection" and "Jailbreak".
4.  **Model**: Choose the target model (simulated or real API).
5.  Click **Run**.
6.  Watch the progress bar as the worker analyzes the prompt.

### 2. Analyzing Results
The results page shows a breakdown of each check:
- **Safe**: Green checkmark.
- **Suspicious**: Yellow warning.
- **Unsafe**: Red alert.

Click on any flag to see the detailed reasoning and confidence score.

### 3. Configuring Custom Rules
1.  Go to **Rules**.
2.  Click **New Rule**.
3.  **Type**: Choose "Regex".
4.  **Pattern**: Enter your regex (e.g., `\b(internal|confidential)\b`).
5.  **Action**: Select "Block".
6.  Save. Now any prompt matching this pattern will be flagged.

### 4. Managing API Keys
1.  Go to **Settings**.
2.  See the list of active keys.
3.  Revoke any key that might be compromised.
4.  Generate new keys for different environments (Dev, Staging, Prod).

## Customization
- **Theme**: Toggle Dark/Light mode in the top right corner.
- **Dashboard Layout**: Drag and drop widgets to rearrange your dashboard view.

## Troubleshooting UI Issues
- **"Network Error"**: Check if the API server is running and reachable.
- **"WebSocket Disconnected"**: Check your internet connection or proxy settings.
- **Empty Charts**: Run some tests to generate data!
