import { defineConfig, devices } from '@playwright/test';

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
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        // Removed redundant viewport property
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ...devices['Desktop Chrome'],
          //storageState: 'playwright/.auth/hrUser.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'Firefox',
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
        }
      }
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        viewport: { width: 1720, height: 850 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'Edge',
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
        }
      }
    }
  ]
});
