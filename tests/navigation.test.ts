import test, { expect } from "@playwright/test";
import { NAVIGATION } from "../consts";

const { main } = NAVIGATION;

test.describe("Navigation", () => {
  test.describe("Header", () => {
    main.map(({ name, href }) => {
      test(name, async ({ page }) => {
        await page.goto("");

        await page.click(`text=${name}`);
        await expect(page).toHaveURL(href);
      });
    });
  });
  test.describe("Footer", () => {
    main.map(({ name, href }) => {
      test(name, async ({ page }) => {
        await page.goto("");

        await page.click(`[aria-label="Footer"] >> text=${name}`);
        await expect(page).toHaveURL(href);
      });
    });
  });
});
