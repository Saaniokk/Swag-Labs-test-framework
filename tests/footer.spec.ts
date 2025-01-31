import { Urls } from "../utils/urls.enum.ts";
import { test } from "./base.fixture.ts";
import { expect } from "@playwright/test";

export enum FooterLinks{
    Twitter = 'twitter',
    Fb = 'facebook',
    Link = 'linkedin'
}

test.describe("Footer", () => {
  const propperUsername = "standard_user";
  const propperPassword = "secret_sauce";
  // Go to Inventory page for each of tests in describe   
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto(Urls.MainPage, { waitUntil: "load" });
    await loginPage.fillLoginForm(propperUsername, propperPassword);
    await loginPage.clickLoginButton();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
  });

  test("Footer Links", async ({ context, inventoryPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "7" });
    // Validate Twitter link
    const newPagePromiseTwitter = context.waitForEvent("page");
    await inventoryPage.getFooter().selectFooterLink(FooterLinks.Twitter);
    const newPageTwitter = await newPagePromiseTwitter;
    await newPageTwitter.waitForLoadState("load");
    const newPageUrlTwitter = newPageTwitter.url();
    expect(newPageUrlTwitter).toEqual(Urls.Twitter);
    await newPageTwitter.close();
    // Validate Facebook link
    const newPagePromiseFacebook = context.waitForEvent("page");
    await inventoryPage.getFooter().selectFooterLink(FooterLinks.Fb);
    const newPageFacebook = await newPagePromiseFacebook;
    await newPageFacebook.waitForLoadState("load");
    const newPageUrlFacebook = newPageFacebook.url();
    expect(newPageUrlFacebook).toEqual(Urls.Fb);
    await newPageFacebook.close();
    // Validate Linkedin link
    const newPagePromiseLinkedIn = context.waitForEvent("page");
    await inventoryPage.getFooter().selectFooterLink(FooterLinks.Link);
    const newPageLinkedIn = await newPagePromiseLinkedIn;
    await newPageLinkedIn.waitForLoadState("load");
    const newPageUrlLinkedIn = newPageLinkedIn.url();
    expect(newPageUrlLinkedIn).toEqual(Urls.Link);
    await newPageLinkedIn.close();
  });
});
