import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
    
    // CartPage locators
    public cartIcon: Locator = this._page.locator("//a[@data-test='shopping-cart-link']");
    public backpackText: Locator = this._page.locator("//div[@data-test='inventory-item-name']");
    public yourChartBlock: Locator = this._page.locator("//div[@data-test='secondary-header']");
    public checkoutButton: Locator = this._page.locator('#checkout');
    public firstNameField: Locator = this._page.locator("#first-name");
    public lastNameField: Locator = this._page.locator("#last-name");
    public zipCodeField: Locator = this._page.locator("//input[@data-test='postalCode']");
    public checkoutForm: Locator = this._page.locator("//div[@class='checkout_info']");
    public continueButton: Locator = this._page.locator('#continue');
    public itemName: Locator = this._page.locator("//div[@data-test='inventory-item-name']");
    public itemQuantity: Locator = this._page.locator("//div[@data-test='item-quantity']");
    public errorBox: Locator = this._page.locator("//button[@data-test='error-button']");

    // CartPage methods
    public async clickCheckoutButton(){
        await this.checkoutButton.click();
    }
    // Method to fill customer values
    public async fillInformation( firstName: string, lastName: string, zipCode: string ): Promise<void> {
        // Always use scroll in order to reach element on small resolution
        await this.firstNameField.scrollIntoViewIfNeeded();
        await this.firstNameField.fill(firstName);
        await this.lastNameField.scrollIntoViewIfNeeded();
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.scrollIntoViewIfNeeded();
        await this.zipCodeField.fill(zipCode);
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.continueButton.click();
    }

}