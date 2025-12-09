import { test, expect } from '@playwright/test';

test.describe('Platform Integration', () => {
  test('should navigate from dashboard to prompt shield', async ({ page }) => {
    // 1. Login to Core Platform
    await page.goto('http://localhost:5173/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('h1')).toContainText('Security Dashboard');

    // 2. Check for Launchpad links
    const promptShieldLink = page.locator('a[href="http://localhost:3002"]');
    await expect(promptShieldLink).toBeVisible();

    const redTeamLink = page.locator('a[href="http://localhost:3006"]');
    await expect(redTeamLink).toBeVisible();

    const complianceLink = page.locator('a[href="http://localhost:3004"]');
    await expect(complianceLink).toBeVisible();
  });
});
