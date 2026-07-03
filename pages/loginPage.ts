import {Page, Locator} from '@playwright/test'

class LoginPage {

    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly buttonField: Locator;
    readonly validationError: Locator;
    readonly validationSuccessMsg: Locator;

//Locator defined in constructor 
    constructor(page: Page) {
        this.loginField = page.getByRole('textbox', {name: 'Username' })
        this.passwordField = page.getByRole('textbox', {name: 'Password' })
        this.buttonField = page.getByRole('button', { name: 'Submit' })
        this.validationError = page.locator('#error')
        this.validationSuccessMsg = page.locator('h1.post-title')
    }

    async loginToApp(username: string, password: string) {
        await this.loginField.fill(username)
        await this.passwordField.fill(password)
        await this.buttonField.click()
    }
}
export default LoginPage;