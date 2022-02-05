import test, { expect } from "@playwright/test";
import { NAVIGATION } from "../consts";

const { main, social } = NAVIGATION;

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test.describe("Navigation", () => {
  test.describe("Header", () => {
    main.map(({ name, href }) => {
      test(name, async ({ page }) => {
        await page.click(`text=${name}`);
        await expect(page).toHaveURL(href);
      });
    });
  });

  test.describe("Footer", () => {
    main.map(({ name, href }) => {
      test(name, async ({ page }) => {
        await page.click(`[aria-label="Footer"] >> text=${name}`);
        await expect(page).toHaveURL(href);
      });
    });
  });

  test.describe("Social", () => {
    social.map(({ name, href }) => {
      test(name, async ({ page, context }) => {
        // https://playwright.dev/docs/pages#handling-new-pages
        const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          page.click(`a:has-text("${name}")`),
        ]);

        await expect(newPage).toHaveURL(href);
      });
    });
  });

  test.describe("Auxillary", () => {
    test("Sign in", async ({ page }) => {
      await page.click('button:has-text("Sign in")');
      await expect(page).toHaveURL("/login");
    });
    test("Logo", async ({ page }) => {
      await page.click('img[alt="logo"]');
      await expect(page).toHaveURL("");
    });
  });
});
