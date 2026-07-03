import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import path from 'node:path';
import * as dotenv from 'dotenv';
import { VALID_MSG } from '../Fixtures/constants.ts';

const fs = require('fs');

dotenv.config();

const authFile = path.resolve('playwright/.auth/authentication.json');

const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
);

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(`${data.baseUrl}${data.loginUrl}`);
    await loginPage.loginToApp(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await expect(loginPage.validationSuccessMsg).toHaveText(VALID_MSG);

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});
