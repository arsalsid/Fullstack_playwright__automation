import { test, expect, Page } from '@playwright/test';
import { USERNAME, PASSWORD } from '../Fixtures/constants.ts';
import { BASE_URL } from '../Fixtures/urlConstants.ts';

test.describe("functions" , ()=> {
    test('Login functionlity', async ({ page }) =>{

        //navigate to loginPage
        await navigateToLoginPage(page);

        //fill the value of login
        await fillLoginForm(page, USERNAME, PASSWORD);

        //submit form
        await submitLoginForm(page);

        //validate login success msgs
        await verifySucessfulLogin(page);

    })
})

async function navigateToLoginPage(page : Page) {
    await page.goto(`${BASE_URL}/practice-test-login/`)
}

async function fillLoginForm(page : Page, username: string, password: string) {
    await page.getByRole('textbox', {name: 'Username' }).fill(username)
    await page.getByRole('textbox', {name: 'Password' }).fill(password)
}

async function submitLoginForm(page: Page) {
    await page.getByRole('button', { name: 'Submit' }).click()
}

async function verifySucessfulLogin(page : Page) {
    await expect(page.getByRole('textbox', { name: 'Username'})).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password'})).toBeVisible()
    await expect(page.getByRole('button', { name: 'Submit'})).toBeEnabled()
}