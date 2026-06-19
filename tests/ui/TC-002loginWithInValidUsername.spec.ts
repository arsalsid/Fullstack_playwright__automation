import { test, expect } from '@playwright/test';

test.describe('login page', ()=>{
  test('@Testcase - 002 login with invalid username', async ({page}) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/')
    await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
    await page.getByLabel('Username').fill('incorrectUser')
    await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
    await page.getByLabel('Password').fill('Password123')
    await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
    await page.getByRole('button', { name: 'Submit'}).click();
    await expect(page.locator('#error')).toHaveText('Your username is invalid!');
  

  }) 
});
 