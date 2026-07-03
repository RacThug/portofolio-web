import { test, expect } from "@playwright/test";

test("contact renders direct links and footer", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#contact") });
  await expect(section.getByRole("link", { name: /email/i })).toHaveAttribute(
    "href",
    "mailto:madeadisukmameta@gmail.com",
  );
  await expect(section.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/adi-sukma",
  );
  // githubUrl empty -> hidden
  await expect(section.getByRole("link", { name: /github/i })).toHaveCount(0);
  await expect(page.getByText("$ built with next.js + tailwind")).toBeVisible();
});
