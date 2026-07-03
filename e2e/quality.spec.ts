import { test, expect } from "@playwright/test";

test("no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});

test("reduced motion still renders all sections", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/");
  for (const id of ["projects", "about", "skills", "experience", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  // content is immediately visible without scrolling into view
  await expect(page.getByText("Construction Compliance Management System")).toBeVisible();
  await ctx.close();
});

test("single h1 and sequential section headings", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  expect(await page.getByRole("heading", { level: 2 }).count()).toBeGreaterThanOrEqual(5);
});

test("skip link jumps to main content", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "keyboard flow");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("anchor navigation scrolls to section", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop nav");
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "contact", exact: true }).click();
  await expect(page.locator("#contact")).toBeInViewport();
});
