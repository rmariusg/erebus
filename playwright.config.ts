import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'https://admin.moralis.io',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://admin.moralis.io' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], baseURL: 'https://admin.moralis.io' },
    },
  ],
  globalSetup: './setup.ts',
});
