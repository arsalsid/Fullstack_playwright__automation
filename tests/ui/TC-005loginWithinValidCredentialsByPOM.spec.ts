import { test, expect, Page} from '@playwright/test'
import LoginPage from '../../pages/loginPage.ts'
import { VALID_MSG,INVALID_MSG } from '../../Fixtures/constants.ts';
import * as dotenv from 'dotenv'
const fs = require('fs')

test.use({ storageState: { cookies: [], origins: [] } });

//load username and password from dotenv file
dotenv.config();

//load baseUrl from Json File
const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
  )

test.describe('Login functionality', ()=> {

    test("Login with Valid credentials by using POM pattern", async ({page}) => {
        const loginPage = new LoginPage(page);
        await page.goto(`${data.baseUrl}${data.loginUrl}`)
        await loginPage.loginToApp(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!)
        await expect(loginPage.validationSuccessMsg).toHaveText(VALID_MSG);
    })

    test("Login with Invalid credentials by using POM pattern", async ({page}) => {
        const loginPage = new LoginPage(page);
        await page.goto(`${data.baseUrl}${data.loginUrl}`)
        await loginPage.loginToApp(process.env.INVALID_USERNAME!, process.env.INVALID_PASSWORD!)
        await expect(loginPage.validationError).toHaveText(INVALID_MSG);
    })
})