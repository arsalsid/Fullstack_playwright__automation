import { test, expect } from '@playwright/test';

test.describe('Login Page', ()=> {
     test('login with valid credentials', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Username' }).fill('student')
        await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Password' }).fill('Password123');
        await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
        await page.getByRole('button', { name: 'Submit' }).click();
        
      
        // Expect a title "to contain" a substring.
      //   await expect(page).toHaveTitle(/Playwright/);
      });
})