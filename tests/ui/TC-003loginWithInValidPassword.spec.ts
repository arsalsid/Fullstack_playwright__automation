import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });


test.describe('Login Page', ()=> {
    test('@Testcase - 003 login with invalid password', async ({page}) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/')
        await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
        await page.getByLabel('Username').fill('student')
        await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
        await page.getByLabel('Password').fill('incorrectPassword')
        await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
        await page.getByRole('button', { name: 'Submit'}).click();
        await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  
      })  
});