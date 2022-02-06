import { chromium, expect, FullConfig } from "@playwright/test";
import { TEST_STATE_PATH, URL } from "../consts";

const EMAIL = "nikolaiendtoend@gmail.com";
const ENDTOEND_PASSWORD = "WFiha2t7QwTqCTj"; // TODO: remove this & change password

// const { ENDTOEND_PASSWORD } = process.env;
// Can't figure out how to access .env files in spec files
// To whomever is sifting through my code: don't steal the password to my test account, thanks <3

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  if (!ENDTOEND_PASSWORD) throw new Error("no e2e auth password");

  await page.goto(`${URL.FRONTEND}/login`);

  await page.locator("text=Continue with Google").click();

  const emailInput = page.locator("input[name='identifier']");
  await emailInput.fill(EMAIL);
  await emailInput.press("Enter");

  const passwordInput = page.locator("input[name='password']");
  await passwordInput.fill(ENDTOEND_PASSWORD);
  await passwordInput.press("Enter");

  const user = await page.locator("text=Nikolai EndToEnd").textContent();
  expect(user).toBe("Nikolai EndToEnd");

  await page.context().storageState({ path: TEST_STATE_PATH });
  await browser.close();
}
