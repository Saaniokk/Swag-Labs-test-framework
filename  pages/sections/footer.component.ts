import { Locator, Page } from '@playwright/test';



export class Footer {
  protected readonly _page: Page;

  //Locators
  public readonly twitterLink: Locator;
  public readonly facebookLink: Locator;
  public readonly linkedinLink: Locator;
  
  public constructor(_page: Page) {
    this._page = _page;
  }

  public async selectFooterLink(network: string): Promise<void> {
    const footerLink: Locator = this._page.locator(`//a[@data-test='social-${network}']`);
    await footerLink.scrollIntoViewIfNeeded();
    await footerLink.click();
  }

}
