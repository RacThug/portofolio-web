import { test, expect } from "@playwright/test";

test("head has title, description, OG tags, and JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Adi Sukma — Fullstack Web Developer/);
  expect(await page.locator('meta[name="description"]').getAttribute("content")).toContain(
    "Next.js",
  );
  expect(await page.locator('meta[property="og:title"]').count()).toBeGreaterThan(0);
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(ld!)["@type"]).toBe("Person");
});

test("sitemap and robots respond", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});
