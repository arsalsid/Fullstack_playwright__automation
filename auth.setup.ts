import {test as setup, expect, Page} from '@playwright/test';
import LoginPage from './pages/loginPage';

// Constant file for storing user session:
const authFile = 'playwright/.auth/authentication.json';

setup('Login with Valid credentials by using POM pattern', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginToApp(page, process.env.USERNAME!, process.env.PASSWORD!)
    await page.context().storageState({ path: authFile });
  }); 