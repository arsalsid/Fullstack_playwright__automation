import { test, expect, Page} from '@playwright/test'
import LoginPage from '../pages/loginPage.ts'
import { USERNAME , PASSWORD , INVALID_MSG } from '../Fixtures/constants.ts';
const fs = require('fs')

//load baseUrl from Json File
const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
  )

test.describe('Login with Invalid credentials by using POM pattern', ()=> {
    test("Login functionality", async ({page}) => {
        const loginPage = new LoginPage(page);
        await page.goto(`${data.baseUrl}${data.loginUrl}`)
        await loginPage.loginToApp(USERNAME,PASSWORD)
        await expect(loginPage.validation).toHaveText(INVALID_MSG);
    })
})