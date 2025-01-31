import { Urls } from "../utils/urls.enum.ts";
import { test } from "./base.fixture.ts";
import { expect } from "@playwright/test";

test.describe("Cart Checks", () => {
  const properUsername = "standard_user";
  const properPassword = "secret_sauce";
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Go to main page and log in
    await loginPage.goto(Urls.MainPage, { waitUntil: "load" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await loginPage.clickLoginButton();
    // Check if redirected to inventory page
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
  });

  test("Saving the card after logout ", async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "5" });
    // Validate backpack added to cart and save its name to variable for further validation
    await inventoryPage.addToCartBackpack();
    const backpackName = await inventoryPage.itemText.nth(0).innerText();
    const cartItemsValue = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValue).toEqual('1');
    // Validate burger menu items and complete log out 
    await inventoryPage.openBurgerMenu();
    await expect.soft(inventoryPage.burgerMenuList).toHaveCount(4);
    await inventoryPage.logoutFromBurgerMenu();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toEqual(Urls.MainPage);
    await expect.soft(loginPage.UsernameField).toHaveValue("");
    await expect.soft(loginPage.PasswordField).toHaveValue("");
    // Log in and check if cart contains the same item
    await loginPage.fillLoginForm(properUsername, properPassword);
    await loginPage.clickLoginButton();
    await inventoryPage.clickOnCartIcon();
    const backpackNameInCart = await cartPage.backpackText.nth(0).innerText();
    expect(backpackName).toEqual(backpackNameInCart);
    const cartItemsValueUpdated = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValueUpdated).toEqual('1');
  });
});
