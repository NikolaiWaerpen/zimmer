import test, { chromium, expect } from "@playwright/test";
import { URL } from "../consts";

// test("greeting", async ({ page }) => {
//   const browser = await chromium.launch({ headless: false, slowMo: 3000 });
//   const page = await browser.newPage();
//   await page.goto(`${URL.FRONTEND}/greeting`);

//   const user = await page.locator("text=Nikolai EndToEnd").textContent();
//   expect(user).toBe("Nikolai EndToEnd");
// });
