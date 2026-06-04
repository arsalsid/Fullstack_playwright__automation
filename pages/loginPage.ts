import {Page, Locator} from '@playwright/test'

class LoginPage {

    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly buttonField: Locator;
    readonly validation: Locator;

//Locator defined in constructor 
    constructor(page: Page) {
        this.loginField = page.getByRole('textbox', {name: 'Username' })
        this.passwordField = page.getByRole('textbox', {name: 'Password' })
        this.buttonField = page.getByRole('button', { name: 'Submit' })
        this.validation = page.locator('#error')
    }

    async loginToApp(username: string, password: string) {
        await this.loginField.fill(username)
        await this.passwordField.fill(password)
        await this.buttonField.click()
    }
}
export default LoginPage;