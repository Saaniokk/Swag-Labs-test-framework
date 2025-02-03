import { Locator, Page } from '@playwright/test';

export class Header {
  protected readonly _page: Page;

  //Locators (Declared but not initialized here)
  public readonly cartIcon: Locator;
  public readonly burgerMenu: Locator;
  public readonly burgerMenuList: Locator;
  public readonly logoutButtonInBurgerMenu: Locator; 
  
  
  public constructor(_page: Page) {
    this._page = _page;

    // Initialize locators inside the constructor
    this.cartIcon = this._page.locator("//a[@data-test='shopping-cart-link']");
    this.burgerMenu = this._page.locator('#react-burger-menu-btn');
    this.burgerMenuList = this._page.locator("//a[@class='bm-item menu-item']");
    this.logoutButtonInBurgerMenu = this._page.locator('#logout_sidebar_link');
  }
  
  public async clickOnCartIcon(): Promise<void>{
    await this.cartIcon.click()
  }

  public async openBurgerMenu(): Promise<void>{
    await this.burgerMenu.click()
  }

  public async logoutFromBurgerMenu(): Promise<void>{
    await this.logoutButtonInBurgerMenu.click()
}


}
