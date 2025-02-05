import { Urls } from "../utils/urls.enum.ts";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";
import { completeLogin } from "./steps/sharedSteps.step.ts";

test.describe("Cart Checks", () => {
  test("Saving the cart after logout", async ({ loginPage, inventoryPage, cartPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "5" });
    await completeLogin(loginPage);
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
    // Validate backpack added to cart and save its name to variable for further validation
    await inventoryPage.addToCartBackpack();
    const backpackName = await inventoryPage.itemText.nth(0).innerText();
    const cartItemsValue = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValue).toEqual('1');
    await inventoryPage.getHeader().openBurgerMenu();
    await expect.soft(inventoryPage.getHeader().burgerMenuList).toHaveCount(4);
    await inventoryPage.getHeader().logoutFromBurgerMenu();
    const currentUrlAfterLogout = await loginPage.url();
    expect(currentUrlAfterLogout).toEqual(Urls.LoginPage);
    await expect.soft(loginPage.UsernameField).toHaveValue("");
    await expect.soft(loginPage.PasswordField).toHaveValue("");
    // Log in again and check if cart contains the same item
    await completeLogin(loginPage);
    const currentUrlAfterRelogin = await inventoryPage.url();
    expect(currentUrlAfterRelogin).toBe(Urls.Inventory);
    await inventoryPage.getHeader().clickOnCartIcon();
    const backpackNameInCart = await cartPage.backpackText.nth(0).innerText();
    expect(backpackName).toEqual(backpackNameInCart);
    const cartItemsValueUpdated = await inventoryPage.shoppingCartBadge.innerText();
    expect(cartItemsValueUpdated).toEqual('1');
  });
});
