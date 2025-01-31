import { Page } from "@playwright/test";
import { Response } from "@playwright/test";
import { Footer } from "./sections/footer.component";
import { GotoOptions, BasicWait } from "../utils/global.types";

export class BasePage {
    protected readonly _page: Page;
    private footer: Footer;
    
    public constructor(_page: Page) {
        this._page = _page;
    }

    public async goto(url: string, options: GotoOptions): Promise<Response | null> {
        return this._page.goto(url, options);
      }

    public async waitForLoadStage(option: BasicWait = 'domcontentloaded'): Promise<void> {
        await this._page.waitForLoadState(option);
    }
    
    public getFooter(): Footer {
        if (!this.footer) {
          this.footer = new Footer(this._page);
        }
    
        return this.footer;
      }

    public async url(): Promise<string> {
      return this._page.url();
  }
    
}