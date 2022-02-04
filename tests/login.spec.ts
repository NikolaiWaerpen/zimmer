import { chromium, test } from "@playwright/test";

const EMAIL = "nikolaiendtoend@gmail.com";
const { ENDTOEND_PASSWORD } = process.env;

test("google authentication", async () => {
  if (!ENDTOEND_PASSWORD) throw new Error("no e2e auth password");

  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/login");

  await page.locator("text=Continue with Google").click();

  const emailInput = await page.locator("input[name='identifier']");
  await emailInput.fill(EMAIL);
  await emailInput.press("Enter");

  const passwordInput = await page.locator("input[name='identifier']");
  await passwordInput.fill(ENDTOEND_PASSWORD);
  await passwordInput.press("Enter");
});
