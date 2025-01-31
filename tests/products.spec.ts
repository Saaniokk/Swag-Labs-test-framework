import { Urls } from "../utils/urls.enum.ts";
import { test } from "./base.fixture.ts";
import { expect } from "@playwright/test";

test.describe("Products Checks", () => {
  const propperUsername = "standard_user";
  const propperPassword = "secret_sauce";
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
      // Go to Inventory page for each of tests in describe   
    await loginPage.goto(Urls.MainPage, { waitUntil: "load" });
    await loginPage.fillLoginForm(propperUsername, propperPassword);
    await loginPage.clickLoginButton();
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
  });

  test("Sorting", async ({ inventoryPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "6" });
    // Verify sorting by price low to hight
    await inventoryPage.selectSorting("lohi");
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = prices.sort((a, b) => a - b);
    expect.soft(prices).toEqual(sortedPrices);
    // Verify sorting by price high to law
    await inventoryPage.selectSorting("hilo");
    const pricesHilo = await inventoryPage.getProductPrices();
    const sortedPricesHilo = prices.sort((a, b) => b - a);
    expect.soft(pricesHilo).toEqual(sortedPricesHilo);
    // Verify sorting by name from a to z
    await inventoryPage.selectSorting("az");
    const namesAz = await inventoryPage.getProductNames();
    const sortedNamesAz = namesAz.sort();
    expect.soft(namesAz).toEqual(sortedNamesAz);
    // Verify sorting by name from z to a
    await inventoryPage.selectSorting("za");
    const namesZa = await inventoryPage.getProductNames();
    const sortedNamesZa = namesZa.sort().reverse();
    expect(namesZa).toEqual(sortedNamesZa);
  });
});

