import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
    // InventoryPage locators
    public productsBlock: Locator = this._page.locator("//span[@data-test='title']");
    public logoutButtonInBurgerMenu: Locator = this._page.locator('#logout_sidebar_link');
    public backpackAddToChartButton: Locator = this._page.locator('#add-to-cart-sauce-labs-backpack');
    public itemText: Locator = this._page.locator("//div[@data-test='inventory-item-name']");
    public shoppingCartBadge: Locator = this._page.locator("//span[@data-test='shopping-cart-badge']");
    public sortContainer: Locator = this._page.locator("//*[@data-test='product-sort-container']");
    public productNames: Locator = this._page.locator("//div[@data-test='inventory-item-name']");
    public productPrices: Locator = this._page.locator("//div[@data-test='inventory-item-price']");
    public itemPrice: Locator = this._page.locator("//div[@data-test='inventory-item-price']");
    public itemDesc: Locator = this._page.locator("//div[@data-test='inventory-item-desc']");


    // InventoryPage methods

    public async addToCartBackpack(): Promise<void>{
        await this.backpackAddToChartButton.click()
    }

    public async selectSorting(optionValue: string): Promise<void> {
        await this.sortContainer.selectOption(optionValue);
    }

    public async getProductNames(): Promise<string[]> {
        return await this.productNames.allInnerTexts();
    }

    public async getProductPrices(): Promise<number[]> {
        const pricesText = await this.productPrices.allInnerTexts();
        return pricesText.map(price => parseFloat(price.replace('$', ''))); // Convert string to numbers removing removing $ sign
    }
}