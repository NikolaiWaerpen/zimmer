import test, { chromium } from "@playwright/test";
import { URL } from "../consts";

test.use({ storageState: "testState.json" });
test("greeting", async ({}) => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  await page.goto(`${URL.FRONTEND}/greeting`);
});
