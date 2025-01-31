import { test as baseTest } from "@playwright/test";

import { BasePage } from "../ pages/base.page";
import { LoginPage } from "../ pages/login.page";
import { InventoryPage } from "../ pages/inventory.page";
import { CartPage } from "../ pages/cart.page";
import { CheckoutPage } from "../ pages/checkout.page";

export type BaseTestFixture = {
  basePage: BasePage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage
};

export const test = baseTest.extend<BaseTestFixture>({
  basePage: [
    async ({ page }, use): Promise<void> => {
      await use(new BasePage(page));
      await page.close();
    },
    { scope: "test" },
  ],
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
    await page.close();
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
    await page.close();
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
    await page.close();
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
    await page.close();
  },
});
