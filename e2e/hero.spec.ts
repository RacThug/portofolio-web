import { test, expect } from "@playwright/test";

test("hero shows status, headline, one-liner, and CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("open to work — denpasar, bali")).toBeVisible();
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Adi Sukma");
  await expect(h1).toContainText("builds for the web.");
  await expect(page.getByRole("link", { name: "View Projects" })).toHaveAttribute(
    "href",
    "#projects",
  );
  await expect(page.getByRole("link", { name: "Get in Touch" })).toHaveAttribute(
    "href",
    "#contact",
  );
  // cvUrl is empty -> no CV link rendered
  await expect(page.getByRole("link", { name: /download cv/i })).toHaveCount(0);
});
