import { Locator, Page } from '@playwright/test';



export class Footer {
  protected readonly _page: Page;
  public readonly isMobile: boolean;

  //Locators
  public readonly twitterLink: Locator;
  public readonly facebookLink: Locator;
  public readonly linkedinLink: Locator;
  
  public constructor(_page: Page, isMobile: boolean = false) {
    this._page = _page;
    this.isMobile = isMobile;
   
  }

  public async selectFooterLink(network: string): Promise<void> {
    const footerLink: Locator = this._page.locator(`//a[@data-test='social-${network}']`);
    await footerLink.scrollIntoViewIfNeeded();
    await footerLink.click();
  }

}
