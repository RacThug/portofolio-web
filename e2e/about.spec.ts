import { test, expect } from "@playwright/test";

test("about section renders bio and photo placeholder", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#about") });
  await expect(section.getByText(/I'm a fullstack web developer who enjoys/)).toBeVisible();
  await expect(
    section.getByText(/AI coding assistants are part of my daily workflow/),
  ).toBeVisible();
  await expect(section.getByTestId("profile-photo")).toBeVisible();
});
