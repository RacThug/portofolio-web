import { test, expect } from "@playwright/test";

test("skills bento renders all 7 groups", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#skills") });
  for (const title of [
    "Frontend",
    "Backend",
    "Languages",
    "Databases",
    "DevOps & Tooling",
    "Testing & Quality",
    "Ways of working",
  ]) {
    await expect(section.getByRole("heading", { name: title })).toBeVisible();
  }
  await expect(section.getByText("Next.js (App Router)")).toBeVisible();
});
