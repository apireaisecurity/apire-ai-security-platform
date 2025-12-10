"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('has title', async ({ page }) => {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await (0, test_1.expect)(page).toHaveTitle(/Apire AI Security Platform/);
});
(0, test_1.test)('navigates to login', async ({ page }) => {
    await page.goto('/login');
    await (0, test_1.expect)(page.getByText('Login to your account')).toBeVisible();
});
(0, test_1.test)('shows login form elements', async ({ page }) => {
    await page.goto('/login');
    // Check that form elements are visible
    await (0, test_1.expect)(page.getByLabel('Email')).toBeVisible();
    await (0, test_1.expect)(page.getByLabel('Password')).toBeVisible();
    await (0, test_1.expect)(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
(0, test_1.test)('failed login shows error message', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('WrongPass123!');
    await page.getByRole('button', { name: 'Login' }).click();
    await (0, test_1.expect)(page.getByRole('alert')).toBeVisible();
});
(0, test_1.test)('dashboard scan flow', async ({ page }) => {
    await page.goto('/');
    // Should be on dashboard
    await (0, test_1.expect)(page.getByText('Security Dashboard')).toBeVisible();
    // Type in prompt
    await page.getByPlaceholder('Enter prompt to scan...').fill('Hello world');
    // Click scan
    await page.getByRole('button', { name: 'Scan Prompt' }).click();
});
