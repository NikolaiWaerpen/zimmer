import test, { expect } from "@playwright/test";

test.describe("navigation", () => {
  test("guest book", async ({ page, baseURL }) => {
    await page.goto(baseURL as string);

    const link = page.locator("a[href='/greeting']").first();
    await link.click();

    const text = page.locator("Leave me a greeting!");

    // TODO: pick up here to fix this test - it's always truthy

    expect(text).toBeTruthy();
  });
});
