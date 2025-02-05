import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";
import { Urls } from "../utils/urls.enum.ts";
import { completeLogin } from "./steps/sharedSteps.step.ts";

test.describe("Checkout", () => {
  test.beforeEach(async ({ loginPage }) => {
    await completeLogin(loginPage);
  });
  test("Valid Checkout", async ({ inventoryPage, cartPage, checkoutPage, faker }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "8" });
    const currentUrlAfterLogin = await inventoryPage.url();
    expect(currentUrlAfterLogin).toBe(Urls.Inventory);
    const lastName = faker.person.lastName();
    const firstName = faker.person.firstName();
    const zipCode = faker.location.zipCode();
    // Add backpack to cart and check values
    await inventoryPage.addToCartBackpack();
    const cartItemsValue = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValue).toEqual('1');
    const addedProductName = await inventoryPage.itemText.nth(0).innerText();
    const addedProductPrice = await inventoryPage.itemPrice.nth(0).innerText();
    await inventoryPage.getHeader().clickOnCartIcon();
    const displayedProductName = await cartPage.itemName.nth(0).innerText();
    expect(addedProductName).toEqual(displayedProductName);
    await cartPage.clickCheckoutButton();
    await expect(cartPage.checkoutForm).toBeVisible();
    await cartPage.fillInformation(firstName, lastName, zipCode);
    await expect.soft(cartPage.firstNameField).toHaveValue(firstName);
    await expect.soft(cartPage.lastNameField).toHaveValue(lastName);
    await expect.soft(cartPage.zipCodeField).toHaveValue(zipCode);
    await cartPage.clickContinueButton();
    // Validate checkout overview page and validate attributes
    const newPageUrl = await checkoutPage.url();
    expect
      .soft(newPageUrl)
      .toEqual(Urls.CheckoutTwo);
    await expect.soft(checkoutPage.checkoutOverview).toBeVisible();
    const invoiceProductName = await checkoutPage.itemNameInInvoice
      .nth(0)
      .innerText();
    expect.soft(addedProductName).toEqual(invoiceProductName);
    const totalPrice = await checkoutPage.subTotalPrice.innerText();
    const totalPriceNumber = totalPrice?.split('$')[1];
    expect.soft(addedProductPrice).toEqual(`$${totalPriceNumber}`);
    await checkoutPage.clickFinishButton();
    const nextPageUrl = await checkoutPage.url();
    expect
      .soft(nextPageUrl)
      .toEqual(Urls.CheckoutComplete);
    await expect
      .soft(checkoutPage.thankYouBox)
      .toHaveText("Thank you for your order!");
    // Validate redirect after Back home button click
    await checkoutPage.clickBackHomeButton();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
    await expect.soft(inventoryPage.itemDesc.nth(0)).toBeVisible();
    await expect.soft(inventoryPage.itemDesc.nth(2)).toBeVisible();
    await expect.soft(cartPage.cartIcon).toHaveText("");
  });

  // This test fails because Checkout page is opened instead of Cart page
  test("Checkout without products", async ({ inventoryPage, cartPage }) => {
      test.info().annotations.push({ type: "TestCaseID", description: "9" });
      const currentUrlAfterLogin = await inventoryPage.url();
      expect(currentUrlAfterLogin).toBe(Urls.Inventory);
      await inventoryPage.getHeader().clickOnCartIcon();
      expect.soft(cartPage.yourChartBlock).toBeVisible();
      expect(cartPage.itemQuantity).toBeHidden();
      await cartPage.clickCheckoutButton();
      const currentUrl = await cartPage.url();
      expect(currentUrl).toBe(Urls.Cart);
      expect(cartPage.errorBox).toHaveText("Cart is empty");
    },
  );
});
