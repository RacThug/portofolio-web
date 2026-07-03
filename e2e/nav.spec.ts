import { test, expect } from "@playwright/test";

const links = ["projects", "about", "skills", "experience", "contact"];

test("desktop nav shows all anchor links", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop only");
  await page.goto("/");
  for (const name of links) {
    await expect(page.locator("header").getByRole("link", { name, exact: true })).toBeVisible();
  }
});

test("mobile nav opens overlay menu", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "projects" })).toBeVisible();
  await page.getByRole("dialog").getByRole("link", { name: "projects" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});
