import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/loginPage.ts'
import { USERNAME , PASSWORD } from '../../Fixtures/constants.ts';
import * as dotenv from 'dotenv'
const fs = require('fs')

test.use({ storageState: { cookies: [], origins: [] } });

//load username and password from dotenv file
dotenv.config();

//load baseUrl from Json File
const data = JSON.parse(
  fs.readFileSync('./Fixtures/url.json', 'utf8')
)

test.describe('Login Page', ()=> {
     test('@Testcase - 001 login with valid credentials', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/')
        await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Username' }).fill('student')
        await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
        await page.getByRole('textbox', {name: 'Password' }).fill('Password123')
        await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.locator('h1.post-title')).toHaveText('Logged In Successfully')
        await expect(page.locator('text=Log out')).toBeEnabled()
        
      })
});