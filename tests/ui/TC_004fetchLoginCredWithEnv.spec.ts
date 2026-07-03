import { test, expect, Page} from '@playwright/test'
import * as dotenv from 'dotenv'
const fs = require('fs')

//load username and password from dotenv file
dotenv.config();

//load baseUrl from Json File
const data = JSON.parse(
    fs.readFileSync('./Fixtures/url.json', 'utf8')
)

test.describe("fetch login cred from env file and json file", ()=> {
    test('Login Functionality', async ({ page }) =>{

         //navigate to loginPage
                await navigateToLoginPage(page);
        
                //fill the value of login
                await fillLoginForm(page, process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
        
                //submit form
                await submitLoginForm(page);
        
                //validate login success msgs
                await verifySucessfulLogin(page);
        
            })
    })

    async function navigateToLoginPage(page : Page) {
        await page.goto(`${data.baseUrl}${data.loginUrl}`)
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