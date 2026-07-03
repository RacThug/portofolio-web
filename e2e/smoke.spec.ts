import { test, expect } from "@playwright/test";

test("home page renders name and role", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Adi Sukma");
  await expect(page.getByText(/fullstack web developer/i).first()).toBeVisible();
});
