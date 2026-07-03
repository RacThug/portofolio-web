import { test, expect } from "@playwright/test";

test("projects section renders 3 case-study cards with tech badges", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#projects") });
  await expect(section.getByRole("heading", { level: 3 })).toHaveCount(3);
  await expect(section.getByText("Construction Compliance Management System")).toBeVisible();
  await expect(section.getByText("Renovation Sales Platform")).toBeVisible();
  await expect(section.getByText("Specialty-Paper E-Commerce Platform")).toBeVisible();
  await expect(section.getByText("NestJS 10")).toBeVisible();
});
