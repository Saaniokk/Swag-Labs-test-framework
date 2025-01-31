import { test } from "./base.fixture.ts";
import { expect } from "@playwright/test";
import { Urls } from "../utils/urls.enum.ts";

test.describe("Checkout", () => {
  const properUsername = "standard_user";
  const properPassword = "secret_sauce";
//   Go to inventory page for each case
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto(Urls.MainPage, { waitUntil: "load" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await loginPage.clickLoginButton();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
  });

  test("Valid Checkout", async ({ inventoryPage, cartPage, checkoutPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "8" });
    const lastName = "Oqasifjv";
    const firstName = "Manuel";
    const zipCode = "44601";
    // Add backpack to cart and check values
    await inventoryPage.addToCartBackpack();
    const cartItemsValue = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValue).toEqual('1');
    // await expect.soft(cartPage.cartIcon).toHaveText("1");
    const addedProductName = await inventoryPage.itemText.nth(0).innerText();
    const addedProductPrice = await inventoryPage.itemPrice.nth(0).innerText();
    await inventoryPage.clickOnCartIcon();
    const displayedProductName = await cartPage.itemName.nth(0).innerText();
    expect(addedProductName).toEqual(displayedProductName);
    // Go to checkout and verify values
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
    // Finish checkout and validate 'Thank you' message displayed
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
  test(
    "Checkout without products",
    async ({ inventoryPage, cartPage }) => {
      test.info().annotations.push({ type: "TestCaseID", description: "9" });
      await inventoryPage.clickOnCartIcon();
      expect.soft(cartPage.yourChartBlock).toBeVisible();
      expect(cartPage.itemQuantity).toBeHidden();
      await cartPage.clickCheckoutButton();
      const currentUrl = await cartPage.url();
      expect(currentUrl).toBe(Urls.Cart);
      expect(cartPage.errorBox).toHaveText("Cart is empty");
    },
  );
});
