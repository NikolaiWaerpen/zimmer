import test, { expect } from "@playwright/test";
import { TEST_EMAIL, TEST_PASSWORD, URL } from "../consts";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});
test.describe("Authentication", () => {
  // Test that playwright auth reuse works - more for dev
  test.describe("Playwright", () => {
    test("Authenticated", async ({ page }) => {
      const user = await page.locator("text=Nikolai EndToEnd").textContent();
      expect(user).toBe("Nikolai EndToEnd");
    });
  });
  test.describe("Playwright", () => {
    // Wrapped in own describe to set storageState only for this test as undefined - https://github.com/microsoft/playwright/issues/9613
    test.use({ storageState: undefined });

    test("Not authenticated", async ({ page }) => {
      const user = await page.locator("text=Sign in").textContent();
      expect(user).toBe("Sign in");
    });
  });

  // User flow
  test.describe("User", () => {
    test.use({ storageState: undefined });

    test("Sign in", async ({ page }) => {
      await page.click('button:has-text("Sign in")');

      // Same as in global setup
      await page.locator("text=Continue with Google").click();

      const emailInput = page.locator("input[name='identifier']");
      await emailInput.fill(TEST_EMAIL);
      await emailInput.press("Enter");

      const passwordInput = page.locator("input[name='password']");
      await passwordInput.fill(TEST_PASSWORD);
      await passwordInput.press("Enter");

      const user = await page.locator("text=Nikolai EndToEnd").textContent();
      expect(user).toBe("Nikolai EndToEnd");
    });
  });

  test.describe("User", () => {
    test("Sign out", async ({ page }) => {
      await page.click('button:has-text("Nikolai EndToEndLog out")');

      const user = await page.locator("text=Sign in").textContent();
      expect(user).toBe("Sign in");
    });
  });
});
