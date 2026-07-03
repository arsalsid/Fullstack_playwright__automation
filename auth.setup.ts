import { test as setup } from '@playwright/test';
import LoginPage from './pages/loginPage';
import path from 'node:path';
import * as dotenv from 'dotenv';

const fs = require('fs');

dotenv.config();

const authFile = 'playwright/.auth/authentication.json';

const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
);

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(`${data.baseUrl}${data.loginUrl}`);
    await loginPage.loginToApp(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await page.context().storageState({ path: path.resolve(authFile) });
}); 