import { chromium, expect, FullConfig } from "@playwright/test";
import { TEST_STATE_PATH, URL, TEST_EMAIL, TEST_PASSWORD } from "../consts";

// const { TEST_PASSWORD } = process.env;
// Can't figure out how to access .env files in spec files
// TODO: Figure it out

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  if (!TEST_PASSWORD) throw new Error("no e2e auth password");

  await page.goto(`${URL.FRONTEND}/login`);

  await page.locator("text=Continue with Google").click();

  const emailInput = page.locator("input[name='identifier']");
  await emailInput.fill(TEST_PASSWORD);
  await emailInput.press("Enter");

  const passwordInput = page.locator("input[name='password']");
  await passwordInput.fill(TEST_PASSWORD);
  await passwordInput.press("Enter");

  const user = await page.locator("text=Nikolai EndToEnd").textContent();
  expect(user).toBe("Nikolai EndToEnd");

  await page.context().storageState({ path: TEST_STATE_PATH });
  await browser.close();
}
