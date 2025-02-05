import { Urls } from "../utils/urls.enum.ts";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";

const properUsername = "standard_user";
const properPassword = "secret_sauce";

test.describe("Login Checks", () => {

  // Go to main page for each of tests in describe   
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
  });

  // Block of separate tests
  test("Valid Login", async ({ loginPage, inventoryPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "1" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await expect.soft(loginPage.UsernameField).toHaveValue(properUsername);
    await expect
      .soft(loginPage.PasswordField)
      .toHaveAttribute("type", "password");
    await expect.soft(loginPage.PasswordField).toHaveValue(properPassword);
    await loginPage.clickLoginButton();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
    await expect.soft(inventoryPage.getHeader().cartIcon).toBeVisible();
    await expect(inventoryPage.productsBlock).toBeVisible();
  });

  test("Login with invalid password", async ({ loginPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "2" });
    const invalidPassword = "312312das";
    await loginPage.fillLoginForm(properUsername, invalidPassword);
    await expect.soft(loginPage.UsernameField).toHaveValue(properUsername);
    await expect.soft(loginPage.PasswordField).toHaveValue(invalidPassword);
    await expect
    .soft(loginPage.PasswordField)
    .toHaveAttribute("type", "password");
    await loginPage.clickLoginButton();
    // Validate error attributes are displayed
    await expect.soft(loginPage.redXButton.nth(0)).toBeVisible();
    await expect.soft(loginPage.redXButton.nth(1)).toBeVisible();
    await expect.soft(loginPage.errorBox).toBeVisible();
    await expect
      .soft(loginPage.errorBox)
      .toHaveText(
        "Epic sadface: Username and password do not match any user in this service",
      );
    await expect
      .soft(loginPage.UsernameField)
      .toHaveCSS("border-bottom-color", "rgb(226, 35, 26)");
    await expect
      .soft(loginPage.PasswordField)
      .toHaveCSS("border-bottom-color", "rgb(226, 35, 26)");
  });

  test("Login with invalid login", async ({ loginPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "3" });
    const InvalidUsername = "standarD_user";
    await loginPage.fillLoginForm(InvalidUsername, properPassword);
    await expect.soft(loginPage.UsernameField).toHaveValue(InvalidUsername);
    await expect.soft(loginPage.PasswordField).toHaveValue(properPassword);
    await expect
      .soft(loginPage.PasswordField)
      .toHaveAttribute("type", "password");
    await loginPage.clickLoginButton();
    // Validate error attributes are displayed
    await expect.soft(loginPage.redXButton.nth(0)).toBeVisible();
    await expect.soft(loginPage.redXButton.nth(1)).toBeVisible();
    await expect.soft(loginPage.errorBox).toBeVisible();
    await expect
      .soft(loginPage.errorBox)
      .toHaveText(
        "Epic sadface: Username and password do not match any user in this service",
      );
    await expect
      .soft(loginPage.UsernameField)
      .toHaveCSS("border-bottom-color", "rgb(226, 35, 26)");
    await expect
      .soft(loginPage.PasswordField)
      .toHaveCSS("border-bottom-color", "rgb(226, 35, 26)");
  });
});

// Used describe because we have precoditions and suite may be extended
test.describe("Logout", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await loginPage.clickLoginButton();
  });
  test("Logout", async ({ loginPage, inventoryPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "4" });
    await inventoryPage.getHeader().openBurgerMenu();
    await expect.soft(inventoryPage.getHeader().burgerMenuList).toHaveCount(4);
    await inventoryPage.getHeader().logoutFromBurgerMenu();
    // Verify user redirected to Login page
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.LoginPage);
    // Verify login page fields are empty
    await expect.soft(loginPage.UsernameField).toHaveValue("");
    await expect(loginPage.PasswordField).toHaveValue("");
  });
});
