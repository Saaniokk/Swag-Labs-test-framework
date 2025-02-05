import { Urls } from "../utils/urls.enum.ts";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";
import { completeLogin } from "./steps/sharedSteps.step.ts";

export enum FooterLinks {
    Twitter = 'twitter',
    Fb = 'facebook',
    Link = 'linkedin'
}

test.describe("Footer", () => {
    test("Footer Links", async ({ context, loginPage, inventoryPage }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "7" });
        await completeLogin(loginPage);
        const currentUrl = await inventoryPage.url();
        expect(currentUrl).toBe(Urls.Inventory);
        const linksToCheck = [
            { type: FooterLinks.Twitter, expectedUrl: Urls.Twitter },
            { type: FooterLinks.Fb, expectedUrl: Urls.Fb },
            { type: FooterLinks.Link, expectedUrl: Urls.Link }
        ];
        for (const link of linksToCheck) {
            const newPagePromise = context.waitForEvent("page");
            await inventoryPage.getFooter().selectFooterLink(link.type);
            const newPage = await newPagePromise;
            await newPage.waitForLoadState("load");
            const newPageUrl = newPage.url();
            expect(newPageUrl).toEqual(link.expectedUrl);
            await newPage.close();
        }
    });
});
