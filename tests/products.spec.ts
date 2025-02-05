import { Urls } from "../utils/urls.enum.ts";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";
import { completeLogin } from "./steps/sharedSteps.step.ts";

test.describe("Products Checks", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
      // Go to Inventory page for each of tests in describe   
      await completeLogin(loginPage);
  });

  test("Sorting", async ({ inventoryPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "6" });
    const currentUrl = await inventoryPage.url();
    expect(currentUrl).toBe(Urls.Inventory);
    await inventoryPage.selectSorting("lohi");
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = prices.sort((a, b) => a - b);
    expect.soft(prices).toEqual(sortedPrices);
    await inventoryPage.selectSorting("hilo");
    const pricesHilo = await inventoryPage.getProductPrices();
    const sortedPricesHilo = prices.sort((a, b) => b - a);
    expect.soft(pricesHilo).toEqual(sortedPricesHilo);
    await inventoryPage.selectSorting("az");
    const namesAz = await inventoryPage.getProductNames();
    const sortedNamesAz = namesAz.sort();
    expect.soft(namesAz).toEqual(sortedNamesAz);
    await inventoryPage.selectSorting("za");
    const namesZa = await inventoryPage.getProductNames();
    const sortedNamesZa = namesZa.sort().reverse();
    expect(namesZa).toEqual(sortedNamesZa);
  });
});

