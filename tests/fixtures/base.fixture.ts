import { test as baseTest } from "@playwright/test";
import { Faker, faker as baseFaker } from '@faker-js/faker';

import { BasePage } from "../../ pages/base.page";
import { LoginPage } from "../../ pages/login.page";
import { InventoryPage } from "../../ pages/inventory.page";
import { CartPage } from "../../ pages/cart.page";
import { CheckoutPage } from "../../ pages/checkout.page";


export type BaseTestFixture = {
  basePage: BasePage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage
  faker: Faker;

};

export const test = baseTest.extend<BaseTestFixture>({
  faker:
    async ({ browser: _ }, use: (r: Faker) => Promise<void>): Promise<void> => {
      await use(baseFaker);
    },
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
