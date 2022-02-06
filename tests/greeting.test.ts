import test, { expect } from "@playwright/test";
import { URL } from "../consts";
import { lorem } from "faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/greeting");
});

const MOCK_GREETING = {
  title: lorem.words(),
  newTitle: lorem.words(),
  comment: lorem.sentence(),
  newComment: lorem.sentence(),
};

const { title, newTitle, comment, newComment } = MOCK_GREETING;

test.describe("Greeting", () => {
  test.describe("Not authenticated", () => {
    // Look for modal
  });

  test.describe("Authenticated", () => {
    test.only("Add", async ({ page }) => {
      await page.fill('[placeholder="Hey\\ Nikolai\\!"]', title);
      await page.fill("textarea", comment);

      // TODO: pick up here - button is not clicked
      await page.click("text=TitleCommentGreeting comment >> button");

      const foundtitle = await page.locator(`text=${title}`).textContent();
      expect(foundtitle).toBe(title);

      const foundComment = await page.locator(`text=${comment}`).textContent();
      expect(foundComment).toBe(comment);
    });
    // test("Edit", async ({ page }) => {

    // });
    // test("Cancel edit", async ({ page }) => {

    // });
    // test("Delete", async ({ page }) => {

    // });

    // test.describe("Validation failed", () => {
    //   test("Title", () => {

    //   });
    //   test("Description", () => {

    //   });
    // })
  });
});
