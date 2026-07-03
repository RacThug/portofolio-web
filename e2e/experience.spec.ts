import { test, expect } from "@playwright/test";

test("experience timeline renders 3 roles and education", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#experience") });
  await expect(section.getByText("Grune Teknologi Indonesia")).toBeVisible();
  await expect(section.getByText("Bent Blackstone & Associates Limited")).toBeVisible();
  await expect(section.getByText("MSIB Kampus Merdeka (Dicoding Indonesia)")).toBeVisible();
  await expect(section.getByText("Institut Teknologi dan Bisnis STIKOM Bali")).toBeVisible();
});
