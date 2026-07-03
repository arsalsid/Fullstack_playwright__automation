import { test, expect } from '@playwright/test';
import { VALID_MSG } from '../../Fixtures/constants.ts';
const fs = require('fs')

//load baseUrl from Json File
const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
  )

// Uses storageState from auth.setup.ts — no login steps in this test.
test('should access logged-in page using saved session', async ({ page }) => {
    await page.goto(`${data.successloginUrl}`);
    await expect(page.locator('h1.post-title')).toHaveText(VALID_MSG);
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});
