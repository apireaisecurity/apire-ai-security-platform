import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Apire AI Security Platform/);
});

test('navigates to login', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText('Login to your account')).toBeVisible();
});

test('shows login form elements', async ({ page }) => {
  await page.goto('/login');

  // Check that form elements are visible
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('dashboard scan flow', async ({ page }) => {
  await page.goto('/');

  // Should be on dashboard
  await expect(page.getByText('Security Dashboard')).toBeVisible();

  // Type in prompt
  await page.getByPlaceholder('Enter prompt to scan...').fill('Hello world');

  // Click scan
  await page.getByRole('button', { name: 'Scan Prompt' }).click();
});
