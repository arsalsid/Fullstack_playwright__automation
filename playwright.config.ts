import { defineConfig, devices } from '@playwright/test';

const authFile = 'playwright/.auth/authentication.json';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  reporter: [
    ['list'], // Default reporter
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
  globalSetup: './global-setup.ts', // Add this line
  globalTeardown: './global-teardown.ts', // Include this if you also have global teardown

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
      },
    },
    {
      name: 'Chrome',
      testIgnore: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        // Removed redundant viewport property
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Firefox',
      testIgnore: /.*\.setup\.ts/,
      use: {
        browserName: 'firefox',
        viewport: { width: 1720, height: 850 },
        ignoreHTTPSErrors: true,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: 200
        },
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Safari',
      testIgnore: /.*\.setup\.ts/,
      use: {
        browserName: 'webkit',
        viewport: { width: 1720, height: 850 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Edge',
      testIgnore: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        viewport: { width: 1720, height: 850 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: 100
        },
        storageState: authFile,
      },
      dependencies: ['setup'],
    }
  ]
});
