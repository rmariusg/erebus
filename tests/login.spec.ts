import { test, expect } from '@playwright/test';
import { getEnvVar } from '../src/config';

// Define a test suite for the login functionality
test.describe('Login to Moralis Dashboard', () => {
  test('should login and check the Moralis title', async ({ page }) => {
    // Load environment variables for credentials
    const MORALIS_USERNAME = getEnvVar('MORALIS_USERNAME');
    const MORALIS_PASSWORD = getEnvVar('MORALIS_PASSWORD');

    if (!MORALIS_USERNAME || !MORALIS_PASSWORD) {
      throw new Error('Environment variables MORALIS_USERNAME and MORALIS_PASSWORD must be set.');
    }

    await page.goto('/');

    // Verify if cookies popup present
    const cookiePopup = await page.locator('text=This website uses cookies').first();
    if (await cookiePopup.isVisible()) {
      await page.getByText('ACCEPT ALL').click();
    }

    // Fill in the login form
    await page.getByTestId('test-email').getByTestId('test-input-input').fill(MORALIS_USERNAME);

    await page.getByTestId('test-password').getByTestId('test-input-input').fill(MORALIS_PASSWORD);

    // Click the login button
    await page.getByTestId('test-button').getByText('Log in').click();

    // Check that the Moralis title exists on the page
    const title = await page.title();
    expect(title).toContain('Moralis');
  });
});
