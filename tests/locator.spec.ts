import { test, expect } from '@playwright/test';

test.describe('Login Page', ()=> {
     test('@Testcase -001 login with valid credentials', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/')
        await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Username' }).fill('student')
        await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Password' }).fill('Password123')
        await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
        await page.getByRole('button', { name: 'Submit' }).click()
        // await page.getByPlaceholder('').fill('')
        // await page.getByLabel('').click()
        
      })
      
    test('@Testcase - 002 login with invalid username', async ({page}) => {
      await page.goto('https://practicetestautomation.com/practice-test-login/')
      await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
      await page.getByLabel('Username').fill('incorrectUser')
      await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
      await page.getByLabel('Password').fill('Password123')
      await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
      await page.getByRole('button', ).click();
      await expect(page.getByText('Your username is invalid!')).toBeVisible()

    }) 

    test('@Testcase - 003 login with invalid password', async ({page}) => {
      await page.goto('https://practicetestautomation.com/practice-test-login/')
      await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
      await page.getByLabel('Username').fill('student')
      await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
      await page.getByLabel('Password').fill('incorrectPassword')
      await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
      await page.getByRole('button', ).click();
      await expect(page.getByText('Your username is invalid!')).toBeVisible()

    })
});