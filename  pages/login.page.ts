import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    // LoginPage locators
    public UsernameField: Locator = this._page.locator('#user-name');
    public PasswordField: Locator = this._page.locator('#password');
    public LoginButton: Locator = this._page.locator('#login-button');
    public redXButton: Locator = this._page.locator("//*[@data-icon='times-circle']");
    public errorBox: Locator = this._page.locator("//h3[@data-test='error']")

    // LoginPage methods
    public async fillLoginForm(user_name: string, user_password: string): Promise<void> {
        await this.UsernameField.fill(user_name);
        await this.PasswordField.fill(user_password);
    }
    
    public async clickLoginButton(): Promise<void> {
        await this.LoginButton.click();
    }
}