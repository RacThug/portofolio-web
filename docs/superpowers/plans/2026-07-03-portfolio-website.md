# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Adi Sukma's single-page dark-minimal portfolio website per the approved spec (`docs/superpowers/specs/2026-07-03-portfolio-website-design.md`).

**Architecture:** Fully static Next.js 15 App Router site. All copy lives in typed files under `src/content/`; section components under `src/components/sections/` consume them; `app/page.tsx` composes sections in order Hero → Projects → About → Skills → Experience → Contact. Design tokens are Tailwind 4 `@theme` CSS variables.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS 4, framer-motion, lucide-react, Playwright, GitHub Actions, Vercel.

## Global Constraints

- Node 20+, package manager: **npm**. Working dir for all commands: repo root `portofolio-web/` (the Next app lives at the root, NOT in a subfolder).
- Runtime deps beyond Next/React: **framer-motion and lucide-react only**.
- Colors (verbatim, dark-only): bg `#0B0E14`, surface `#111623`, line/border `#1E293B`, fg `#F8FAFC`, fg-secondary `#94A3B8`, fg-muted `#64748B`, accent-400 `#60A5FA`, accent-500 `#3B82F6`, accent-600 `#2563EB`, accent-subtle `rgba(59,130,246,0.12)`.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels/badges) — all via `next/font/google`.
- No emoji as icons (Lucide SVG only). No box-shadows for depth — borders/rings. Touch targets ≥44px. Text contrast ≥4.5:1.
- Mobile-first; must be clean at 375 / 768 / 1024 / 1440. No horizontal scroll. `min-h-dvh` not `100vh`.
- All entrance animation via the shared `Reveal` component; `prefers-reduced-motion` must render everything with no motion.
- Anchors: `#projects #about #skills #experience #contact`.
- Commit messages: conventional style (`feat: …`, `test: …`, `chore: …`) ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Empty-string content fields (`githubUrl`, `cvUrl`, project `links`) mean "hide that UI element" — never render dead links.

---

### Task 1: Scaffold Next.js app with design tokens and fonts

**Files:**
- Create: Next.js scaffold at repo root (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, configs)
- Modify: `.gitignore` (scaffold will append; keep existing entries)

**Interfaces:**
- Produces: Tailwind utilities `bg-bg`, `bg-surface`, `border-line`, `text-fg`, `text-fg-secondary`, `text-fg-muted`, `text-accent-400/500/600`, `bg-accent-500/600`, `bg-accent-subtle`, `font-heading`, `font-mono` (body font is default). Layout with `<main id="main">` slot.

- [ ] **Step 1: Scaffold**

Run from `C:\Users\madea\Documents\portofolio-web`:

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
npm install framer-motion lucide-react
```

Note: `create-next-app` may warn the directory is non-empty (docs/, .gitignore) — conflicts are only `.gitignore` (it appends) — proceed. Delete boilerplate assets: `public/*.svg`, and clear `src/app/page.tsx` content in Step 3.

- [ ] **Step 2: Replace `src/app/globals.css` with tokens**

```css
@import "tailwindcss";

@theme {
  --color-bg: #0b0e14;
  --color-surface: #111623;
  --color-line: #1e293b;
  --color-fg: #f8fafc;
  --color-fg-secondary: #94a3b8;
  --color-fg-muted: #64748b;
  --color-accent-400: #60a5fa;
  --color-accent-500: #3b82f6;
  --color-accent-600: #2563eb;
  --color-accent-subtle: rgb(59 130 246 / 0.12);
  --font-sans: var(--font-inter);
  --font-heading: var(--font-grotesk);
  --font-mono: var(--font-jbmono);
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: var(--color-bg);
  color: var(--color-fg);
}

::selection {
  background: var(--color-accent-600);
  color: var(--color-fg);
}

:focus-visible {
  outline: 2px solid var(--color-accent-400);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Replace `src/app/layout.tsx` and `src/app/page.tsx`**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Adi Sukma — Fullstack Web Developer (Next.js · NestJS · TypeScript)",
  description:
    "Fullstack web developer in Bali building production web apps with Next.js, NestJS, and TypeScript. Open to frontend, backend, and fullstack roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

`src/app/page.tsx` (placeholder until sections land):

```tsx
export default function Home() {
  return (
    <main id="main" className="min-h-dvh">
      <h1 className="font-heading text-4xl p-8">Adi Sukma</h1>
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: compiles with no errors; route `/` prerendered as static.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: scaffold Next.js 15 app with Quiet Terminal design tokens and fonts"
```

---

### Task 2: Typed content files

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/content/projects.ts`, `src/content/skills.ts`, `src/content/experience.ts`

**Interfaces:**
- Produces (consumed by every section task):
  - `site: SiteContent` — `{ name, role, heroLine, oneLiner, statusLine, location, email, linkedinUrl, githubUrl, cvUrl, availability }` (all `string`; empty string = hide)
  - `projects: Project[]` — `{ label, title, type, role, problem, built, highlights: string[], tech: string[], liveUrl?: string }`
  - `skillGroups: SkillGroup[]` — `{ title, items: string[], featured?: boolean }`
  - `experience: ExperienceEntry[]` — `{ role, company, employment, period, summary, stack?: string }`
  - `education: Education` — `{ school, degree }`

- [ ] **Step 1: Write `src/content/types.ts`**

```ts
export interface SiteContent {
  name: string;
  role: string;
  heroLine: string;
  oneLiner: string;
  statusLine: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  availability: string;
}

export interface Project {
  label: string;
  title: string;
  type: string;
  role: string;
  problem: string;
  built: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
  featured?: boolean;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  employment: string;
  period: string;
  summary: string;
  stack?: string;
}

export interface Education {
  school: string;
  degree: string;
}
```

- [ ] **Step 2: Write content files (copy from `docs/portfolio-content-reference.md`)**

`src/content/site.ts`:

```ts
import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Adi Sukma",
  role: "Fullstack Web Developer",
  heroLine: "builds for the web.",
  oneLiner:
    "Fullstack web developer building production web applications end to end — React / Next.js on the front, NestJS / Node.js (and PHP / Symfony) on the back, TypeScript throughout.",
  statusLine: "open to work — denpasar, bali",
  location: "Denpasar, Bali, Indonesia",
  email: "madeadisukmameta@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/adi-sukma",
  githubUrl: "",
  cvUrl: "",
  availability:
    "Open to frontend, backend, and fullstack roles — on-site, hybrid, or remote.",
};
```

`src/content/projects.ts` — all three projects, condensed faithfully from the reference doc:

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    label: "01 — B2B PLATFORM",
    title: "Construction Compliance Management System",
    type: "Full-stack B2B web platform",
    role: "Fullstack Developer",
    problem:
      "Strict regulatory requirements handled with manual paperwork — inspection surveys, work plans, reports, and site signage all filled in by hand.",
    built:
      "Monorepo platform that digitizes the inspection-survey workflow and auto-generates 8 types of regulatory PDF documents from structured data, with RBAC, hourly SaaS sync, and automated backups.",
    highlights: [
      "Automated regulatory document generation (Puppeteer-rendered PDFs)",
      "Role-based access control and admin user management",
      "Scheduled backup jobs with tiered retention",
      "OAuth-based sync with a third-party SaaS",
    ],
    tech: [
      "TypeScript", "Next.js 15", "React 19", "Mantine UI", "TanStack Query",
      "NestJS 10", "Drizzle ORM", "MariaDB", "NextAuth", "Puppeteer",
      "Cloudflare R2", "Docker", "Turborepo",
    ],
  },
  {
    label: "02 — MULTI-APP PLATFORM",
    title: "Renovation Sales Platform",
    type: "8 frontends + shared API",
    role: "Fullstack Developer",
    problem:
      "A renovation company ran its sales workflow across scattered tools and paperwork, making estimates inconsistent and data hard to manage.",
    built:
      "Monorepo of 8 Next.js apps served by one NestJS API (GraphQL reads, REST mutations) covering the full customer journey, plus a ~50-page role-based management console with cross-subdomain session sharing.",
    highlights: [
      "8 separately deployable frontends sharing one API and one login session",
      "~50-page admin console with per-row / per-action permissions",
      "Spec-first workflow: every page has a spec, mockup, and source docs",
      "Playwright E2E per page/role and Bruno API test flows",
    ],
    tech: [
      "TypeScript", "Next.js 16", "React 19", "NestJS 11", "GraphQL", "REST",
      "Apollo Client", "Drizzle ORM", "MySQL", "BetterAuth", "Tailwind CSS 4",
      "Playwright", "Bruno", "AWS S3", "Docker", "Turborepo",
    ],
  },
  {
    label: "03 — E-COMMERCE",
    title: "Specialty-Paper E-Commerce Platform",
    type: "Customized e-commerce (B2C/B2B)",
    role: "Web Developer",
    problem:
      "Thousands of products with industry-specific attributes a generic store can't express, plus B2B behavior like sample orders and quotations.",
    built:
      "Deep EC-CUBE 4.3 (Symfony/PHP) customization: paper-industry product model, mini-sample ordering, B2B quotation module, headless-CMS content, bulk CSV import, PDF receipts, and multiple payment gateways.",
    highlights: [
      "30+ custom domain entities and 75+ database migrations",
      "B2B quotation module on top of the standard cart flow",
      "Headless-CMS integration for editorial content",
      "Multiple payment gateways (card + B2B invoice)",
    ],
    tech: [
      "PHP 8.3", "Symfony 6.4", "EC-CUBE 4.3", "Doctrine ORM", "MySQL 8",
      "Twig", "Webpack 5", "Sass", "Tailwind CSS 3", "Docker", "PHPStan", "Codeception",
    ],
  },
];
```

`src/content/skills.ts`:

```ts
import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    featured: true,
    items: [
      "React", "Next.js (App Router)", "React 19", "Tailwind CSS", "Mantine UI",
      "TanStack Query", "React Hook Form", "Zod", "Apollo Client (GraphQL)",
    ],
  },
  {
    title: "Backend",
    featured: true,
    items: [
      "NestJS", "Node.js", "Symfony", "REST APIs", "GraphQL", "Drizzle ORM",
      "Doctrine ORM", "NextAuth / BetterAuth (JWT, RBAC)",
    ],
  },
  { title: "Languages", items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"] },
  { title: "Databases", items: ["MySQL", "MariaDB", "PostgreSQL"] },
  {
    title: "DevOps & Tooling",
    items: ["Docker", "Git", "pnpm", "Turborepo", "PM2", "CI pipelines", "Cloudflare R2 / AWS S3 / MinIO"],
  },
  {
    title: "Testing & Quality",
    items: ["Playwright (E2E)", "Bruno (API testing)", "PHPUnit", "Codeception", "ESLint", "Prettier", "PHPStan"],
  },
  {
    title: "Ways of working",
    items: [
      "AI-first development", "Spec-first workflow", "Code review",
      "Cross-border team collaboration", "Bilingual (EN/JA) documentation",
    ],
  },
];
```

`src/content/experience.ts`:

```ts
import type { Education, ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    role: "Programmer / Web Developer",
    company: "Grune Teknologi Indonesia",
    employment: "Full-time · Hybrid · Denpasar, Bali",
    period: "Jun 2025 – Present",
    summary:
      "Building production web applications end to end — from feature planning through implementation, testing, and delivery — working AI-first with AI coding assistants. Delivered features across frontend and backend for full-scale platforms including a compliance system with automated document generation, a multi-app sales platform, and a customized e-commerce store.",
    stack: "TypeScript, Next.js, React, NestJS, Node.js, PHP/Symfony",
  },
  {
    role: "Sourcing Associate",
    company: "Bent Blackstone & Associates Limited",
    employment: "Freelance · On-site · Bali",
    period: "Feb 2025 – May 2025",
    summary:
      "Sourced qualified legal candidates across the APAC region and maintained a structured candidate database. Managed and updated the company website across AU, APAC, and UK regions.",
  },
  {
    role: "Front-End & Back-End Web Developer",
    company: "MSIB Kampus Merdeka (Dicoding Indonesia)",
    employment: "Full-time · Remote",
    period: "Feb 2023 – Jul 2023",
    summary:
      "Completed an intensive front-end and back-end web development program, building web applications and learning modern JavaScript, HTML/CSS, and backend fundamentals through hands-on projects.",
  },
];

export const education: Education = {
  school: "Institut Teknologi dan Bisnis STIKOM Bali",
  degree: "Bachelor's, Information Systems",
};
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```powershell
git add src/content; git commit -m "feat: add typed content files from portfolio content reference"
```

---

### Task 3: Playwright setup with first smoke test

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`
- Modify: `package.json` (scripts), `.gitignore` (Playwright artifacts)

**Interfaces:**
- Produces: `npm run test:e2e`; two Playwright projects: `desktop` (1280×720) and `mobile` (375×812). Later tasks append specs to `e2e/`.

- [ ] **Step 1: Install and configure**

```powershell
npm install -D @playwright/test
npx playwright install chromium
```

`playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 720 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
});
```

Append to `.gitignore`: `test-results/`, `playwright-report/`. Add script to `package.json`: `"test:e2e": "playwright test"`.

- [ ] **Step 2: Write the failing smoke test** — `e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("home page renders name and role", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Adi Sukma");
  await expect(page.getByText("Fullstack Web Developer").first()).toBeVisible();
});
```

- [ ] **Step 3: Run to verify current state**

Run: `npm run test:e2e`
Expected: h1 assertion passes (placeholder page has it), "Fullstack Web Developer" assertion FAILS — placeholder lacks it.

- [ ] **Step 4: Make it pass minimally** — update `src/app/page.tsx` placeholder:

```tsx
export default function Home() {
  return (
    <main id="main" className="min-h-dvh p-8">
      <h1 className="font-heading text-4xl">Adi Sukma</h1>
      <p className="text-fg-secondary">Fullstack Web Developer</p>
    </main>
  );
}
```

- [ ] **Step 5: Run to verify pass**

Run: `npm run test:e2e`
Expected: 2 passed (desktop + mobile).

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m "test: add Playwright smoke test with desktop and mobile projects"
```

---

### Task 4: UI primitives (Container, SectionHeading, Button, TechBadge, Reveal)

**Files:**
- Create: `src/components/ui/Container.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/TechBadge.tsx`, `src/components/ui/Reveal.tsx`

**Interfaces:**
- Produces:
  - `Container({ children, className? })` — `max-w-6xl mx-auto px-5 sm:px-8`
  - `SectionHeading({ id, label, title })` — renders mono `## label` + h2 `title`; `id` is the anchor target
  - `Button({ href, variant: "primary" | "secondary" | "link", children, external? })` — anchor styled as button, ≥44px
  - `TechBadge({ children })` — mono 11px blue badge
  - `Reveal({ children, delay?, className? })` — client component; fade+rise `whileInView` once; renders plain div under reduced motion

- [ ] **Step 1: Write the components**

`src/components/ui/Container.tsx`:

```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

`src/components/ui/SectionHeading.tsx`:

```tsx
export function SectionHeading({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-24 mb-10">
      <p className="font-mono text-sm text-accent-400 mb-2">## {label}</p>
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
```

`src/components/ui/Button.tsx`:

```tsx
// Primary sits on accent-600, not 500: white on #3B82F6 is ~3.7:1 (fails AA);
// white on #2563EB is ~5.2:1 (passes). Hover lightens to 500.
const variants = {
  primary:
    "bg-accent-600 text-fg hover:bg-accent-500 active:bg-accent-600 font-semibold",
  secondary:
    "border border-line text-fg hover:border-accent-500",
  link: "text-accent-400 underline underline-offset-4 hover:text-accent-500 px-0",
} as const;

export function Button({
  href, variant = "primary", children, external = false,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm transition-colors duration-200 cursor-pointer ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
```

`src/components/ui/TechBadge.tsx`:

```tsx
export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[5px] border border-accent-500/25 bg-accent-subtle px-2 py-0.5 font-mono text-[11px] leading-5 text-accent-400">
      {children}
    </span>
  );
}
```

`src/components/ui/Reveal.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ui; git commit -m "feat: add UI primitives (Container, SectionHeading, Button, TechBadge, Reveal)"
```

---

### Task 5: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`, `e2e/hero.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `site` from `@/content/site`; `Container`, `Button`, `Reveal` from Task 4.
- Produces: `<Hero />` — full-viewport hero; the page's single `h1`.

- [ ] **Step 1: Write the failing test** — `e2e/hero.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("hero shows status, headline, one-liner, and CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("open to work — denpasar, bali")).toBeVisible();
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Adi Sukma");
  await expect(h1).toContainText("builds for the web.");
  await expect(page.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "#projects");
  await expect(page.getByRole("link", { name: "Get in Touch" })).toHaveAttribute("href", "#contact");
  // cvUrl is empty -> no CV link rendered
  await expect(page.getByRole("link", { name: /download cv/i })).toHaveCount(0);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/hero.spec.ts`
Expected: FAIL (status line and CTAs not found).

- [ ] **Step 3: Implement** — `src/components/sections/Hero.tsx`:

```tsx
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="flex min-h-dvh items-center">
      <Container>
        <Reveal>
          <p className="mb-6 font-mono text-sm text-fg-muted">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent-500 align-middle" aria-hidden />
            {site.statusLine}
          </p>
          <h1 className="font-heading font-semibold tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,8vw,5.5rem)]">
            {site.name}
            <br />
            <span className="text-fg-muted">{site.heroLine}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
            {site.oneLiner}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">Get in Touch</Button>
            {site.cvUrl && (
              <Button href={site.cvUrl} variant="link" external>Download CV</Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main id="main">
      <Hero />
    </main>
  );
}
```

Note: `e2e/smoke.spec.ts` still passes — h1 contains "Adi Sukma"; role text appears in the one-liner. If the "Fullstack Web Developer" assertion fails because the exact phrase moved, update the smoke test to `page.getByText(/fullstack web developer/i).first()`.

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass on both projects.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add typographic hero section"
```

---

### Task 6: Sticky NavBar with mobile menu and active-section highlight

**Files:**
- Create: `src/components/ui/NavBar.tsx`, `e2e/nav.spec.ts`
- Modify: `src/app/layout.tsx` (render NavBar above children), `src/app/page.tsx` (add temporary stub sections so anchors exist)

**Interfaces:**
- Consumes: `site` from `@/content/site`.
- Produces: `<NavBar />` client component. Nav items constant: `[["projects","#projects"],["about","#about"],["skills","#skills"],["experience","#experience"],["contact","#contact"]]`. Active link gets `data-active="true"` + accent color via IntersectionObserver.

- [ ] **Step 1: Write the failing test** — `e2e/nav.spec.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/nav.spec.ts`
Expected: FAIL (no header).

- [ ] **Step 3: Implement** — `src/components/ui/NavBar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

const NAV = [
  ["projects", "#projects"],
  ["about", "#about"],
  ["skills", "#skills"],
  ["experience", "#experience"],
  ["contact", "#contact"],
] as const;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map(([, href]) => document.querySelector(href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const linkCls = (href: string) =>
    `font-mono text-sm transition-colors duration-200 hover:text-accent-400 ${
      active === href ? "text-accent-400" : "text-fg-secondary"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#main" className="font-mono text-sm font-semibold text-fg">
          adi<span className="text-accent-400">.dev</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map(([name, href]) => (
            <a key={href} href={href} data-active={active === href} className={linkCls(href)}>
              {name}
            </a>
          ))}
          {site.cvUrl && (
            <a href={site.cvUrl} target="_blank" rel="noopener noreferrer"
               className="rounded-lg border border-line px-3 py-1.5 font-mono text-sm text-fg hover:border-accent-500">
              cv
            </a>
          )}
        </div>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-fg md:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>
      </nav>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur md:hidden">
          <div className="flex h-14 items-center justify-end px-5">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-fg cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV.map(([name, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                 className="font-heading text-2xl font-semibold text-fg hover:text-accent-400">
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

In `src/app/layout.tsx`, import and render `<NavBar />` as the first child of `<body>`, preceded by the skip link (spec §7):

```tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
>
  Skip to content
</a>
``` In `src/app/page.tsx`, add temporary stubs after `<Hero />` so anchors exist (replaced by real sections in Tasks 7–11):

```tsx
{["projects", "about", "skills", "experience", "contact"].map((id) => (
  <section key={id} id={id} className="scroll-mt-24 p-8 text-fg-muted">{id}</section>
))}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass (desktop nav on desktop project, overlay on mobile project).

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add sticky nav with mobile overlay menu and active-section highlight"
```

---

### Task 7: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectCard.tsx`, `e2e/projects.spec.ts`
- Modify: `src/app/page.tsx` (replace `projects` stub)

**Interfaces:**
- Consumes: `projects` from `@/content/projects`; `SectionHeading`, `TechBadge`, `Reveal`, `Container`.
- Produces: `<Projects />` with anchor `#projects`.

- [ ] **Step 1: Write the failing test** — `e2e/projects.spec.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/projects.spec.ts`
Expected: FAIL (stub has no cards).

- [ ] **Step 3: Implement**

`src/components/ui/ProjectCard.tsx`:

```tsx
import type { Project } from "@/content/types";
import { TechBadge } from "@/components/ui/TechBadge";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="font-mono text-[11px] text-fg-muted">{project.label}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold">{project.title}</h3>
      <p className="mt-1 font-mono text-xs text-fg-muted">{project.type} · {project.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
        <span className="text-fg">Problem — </span>{project.problem}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
        <span className="text-fg">Built — </span>{project.built}
      </p>
      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-fg-secondary">
            <span className="text-accent-400" aria-hidden>▸</span>{h}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
      </div>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
           className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-accent-400 hover:text-accent-500">
          <ExternalLink size={14} aria-hidden /> Live site
        </a>
      )}
    </article>
  );
}
```

`src/components/sections/Projects.tsx`:

```tsx
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="projects" label="projects" title="Flagship work" />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

In `src/app/page.tsx`: replace the `projects` stub with `<Projects />`.

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add projects section with three case-study cards"
```

---

### Task 8: About section (photo placeholder + bio)

**Files:**
- Create: `src/components/sections/About.tsx`, `e2e/about.spec.ts`
- Modify: `src/app/page.tsx` (replace `about` stub)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `Reveal`.
- Produces: `<About />` with anchor `#about`. Photo slot: renders `next/image` with `/profile.jpg` if `public/profile.jpg` exists is NOT checkable at runtime — instead use a `PHOTO_URL` constant set to `""`; empty renders the styled placeholder block. When Adi provides a photo: drop it at `public/profile.jpg` and set `PHOTO_URL = "/profile.jpg"`.

- [ ] **Step 1: Write the failing test** — `e2e/about.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("about section renders bio and photo placeholder", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#about") });
  await expect(section.getByText(/I'm a fullstack web developer who enjoys/)).toBeVisible();
  await expect(section.getByText(/AI coding assistants are part of my daily workflow/)).toBeVisible();
  await expect(section.getByTestId("profile-photo")).toBeVisible();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/about.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/sections/About.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PHOTO_URL = ""; // set to "/profile.jpg" once the photo is added to public/

const BIO = [
  "I'm a fullstack web developer who enjoys turning messy, manual processes into clean, reliable software. Over the past year I've contributed to several production systems — from a compliance platform that automates regulatory document generation, to a multi-app sales platform covering a full customer journey, to a customized e-commerce store.",
  "My core stack is TypeScript with Next.js / React on the frontend and NestJS / Node.js on the backend, and I'm comfortable in PHP / Symfony environments too. I care about shipping features end to end: understanding the spec, building the frontend and backend, writing tests, and getting it to production.",
  "I work AI-first — AI coding assistants are part of my daily workflow, which lets me ramp quickly on unfamiliar codebases and deliver production-quality code at pace. I graduated in Information Systems from Institut Teknologi dan Bisnis STIKOM Bali, and I'm open to frontend, backend, and fullstack roles, on-site, hybrid, or remote.",
];

export function About() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="about" label="about" title="Who I am" />
        <div className="flex flex-col gap-10 md:flex-row">
          <Reveal className="shrink-0">
            {PHOTO_URL ? (
              <Image src={PHOTO_URL} alt="Portrait of Adi Sukma" width={224} height={272}
                     data-testid="profile-photo"
                     className="rounded-xl border border-line object-cover" />
            ) : (
              <div data-testid="profile-photo" role="img" aria-label="Portrait of Adi Sukma (photo coming soon)"
                   className="flex h-[272px] w-[224px] items-center justify-center rounded-xl border border-line bg-surface">
                <span className="font-mono text-xs text-fg-muted">photo — soon</span>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.05} className="max-w-2xl space-y-4">
            {BIO.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-fg-secondary">{p}</p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

In `src/app/page.tsx`: replace the `about` stub with `<About />`.

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add about section with bio and photo placeholder"
```

---

### Task 9: Skills bento section

**Files:**
- Create: `src/components/sections/Skills.tsx`, `e2e/skills.spec.ts`
- Modify: `src/app/page.tsx` (replace `skills` stub)

**Interfaces:**
- Consumes: `skillGroups` from `@/content/skills`; `Container`, `SectionHeading`, `TechBadge`, `Reveal`.
- Produces: `<Skills />` with anchor `#skills`. Bento: 4-col grid on `lg`; `featured` groups span 2 columns; single column on mobile.

- [ ] **Step 1: Write the failing test** — `e2e/skills.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("skills bento renders all 7 groups", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#skills") });
  for (const title of ["Frontend", "Backend", "Languages", "Databases", "DevOps & Tooling", "Testing & Quality", "Ways of working"]) {
    await expect(section.getByRole("heading", { name: title })).toBeVisible();
  }
  await expect(section.getByText("Next.js (App Router)")).toBeVisible();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/skills.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/sections/Skills.tsx`:

```tsx
import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="skills" label="skills" title="What I work with" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04} className={g.featured ? "sm:col-span-2" : ""}>
              <div className="h-full rounded-xl border border-line bg-surface p-5">
                <h3 className="font-mono text-sm text-accent-400">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((item) => <TechBadge key={item}>{item}</TechBadge>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

In `src/app/page.tsx`: replace the `skills` stub with `<Skills />`.

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add skills bento grid section"
```

---

### Task 10: Experience timeline with education block

**Files:**
- Create: `src/components/sections/Experience.tsx`, `e2e/experience.spec.ts`
- Modify: `src/app/page.tsx` (replace `experience` stub)

**Interfaces:**
- Consumes: `experience`, `education` from `@/content/experience`; `Container`, `SectionHeading`, `Reveal`.
- Produces: `<Experience />` with anchor `#experience`; vertical timeline + compact education block.

- [ ] **Step 1: Write the failing test** — `e2e/experience.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("experience timeline renders 3 roles and education", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#experience") });
  await expect(section.getByText("Grune Teknologi Indonesia")).toBeVisible();
  await expect(section.getByText("Bent Blackstone & Associates Limited")).toBeVisible();
  await expect(section.getByText("MSIB Kampus Merdeka (Dicoding Indonesia)")).toBeVisible();
  await expect(section.getByText("Institut Teknologi dan Bisnis STIKOM Bali")).toBeVisible();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/experience.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/sections/Experience.tsx`:

```tsx
import { education, experience } from "@/content/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GraduationCap } from "lucide-react";

export function Experience() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="experience" label="experience" title="Where I've worked" />
        <ol className="relative ml-1 space-y-10 border-l border-line pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent-500 bg-bg" aria-hidden />
                <p className="font-mono text-xs text-fg-muted">{e.period}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  {e.role} <span className="text-fg-muted">— {e.company}</span>
                </h3>
                <p className="font-mono text-xs text-fg-muted">{e.employment}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-secondary">{e.summary}</p>
                {e.stack && <p className="mt-2 font-mono text-xs text-accent-400">{e.stack}</p>}
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center gap-4 rounded-xl border border-line bg-surface p-5">
            <GraduationCap className="shrink-0 text-accent-400" size={20} aria-hidden />
            <div>
              <h3 className="font-heading text-base font-semibold">{education.school}</h3>
              <p className="text-sm text-fg-secondary">{education.degree}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

In `src/app/page.tsx`: replace the `experience` stub with `<Experience />`.

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add experience timeline with education block"
```

---

### Task 11: Contact section and footer

**Files:**
- Create: `src/components/sections/Contact.tsx`, `e2e/contact.spec.ts`
- Modify: `src/app/page.tsx` (replace `contact` stub; page now complete)

**Interfaces:**
- Consumes: `site` from `@/content/site`; `Container`, `SectionHeading`, `Reveal`.
- Produces: `<Contact />` with anchor `#contact` + site footer.

- [ ] **Step 1: Write the failing test** — `e2e/contact.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("contact renders direct links and footer", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.locator("#contact") });
  await expect(section.getByRole("link", { name: /email/i })).toHaveAttribute(
    "href", "mailto:madeadisukmameta@gmail.com",
  );
  await expect(section.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href", "https://www.linkedin.com/in/adi-sukma",
  );
  // githubUrl empty -> hidden
  await expect(section.getByRole("link", { name: /github/i })).toHaveCount(0);
  await expect(page.getByText("$ built with next.js + tailwind")).toBeVisible();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/contact.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/sections/Contact.tsx`:

```tsx
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading id="contact" label="contact" title="Let's build something" />
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-fg-secondary">{site.availability}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>Email me</Button>
            <Button href={site.linkedinUrl} variant="secondary" external>LinkedIn</Button>
            {site.githubUrl && (
              <Button href={site.githubUrl} variant="secondary" external>GitHub</Button>
            )}
          </div>
        </Reveal>
      </Container>
      <footer className="mt-24 border-t border-line py-8">
        <Container className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-fg-muted">$ built with next.js + tailwind</p>
          <p className="font-mono text-xs text-fg-muted">© {new Date().getFullYear()} {site.name}</p>
        </Container>
      </footer>
    </section>
  );
}
```

In `src/app/page.tsx`, final composition (all stubs gone):

```tsx
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm run test:e2e`
Expected: all pass (full page now).

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add contact section and footer; complete page composition"
```

---

### Task 12: SEO — metadata, JSON-LD, OG image, sitemap, robots

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx` (full metadata + JSON-LD)
- Test: `e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `site` from `@/content/site`.
- Produces: `SITE_URL` constant `https://portofolio-web.vercel.app` (update when custom domain exists) exported from `src/content/site.ts` as `siteUrl`.

- [ ] **Step 1: Write the failing test** — `e2e/seo.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("head has title, description, OG tags, and JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Adi Sukma — Fullstack Web Developer/);
  expect(await page.locator('meta[name="description"]').getAttribute("content")).toContain("Next.js");
  expect(await page.locator('meta[property="og:title"]').count()).toBeGreaterThan(0);
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(ld!)["@type"]).toBe("Person");
});

test("sitemap and robots respond", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test e2e/seo.spec.ts`
Expected: FAIL (no OG/JSON-LD/sitemap yet).

- [ ] **Step 3: Implement**

Add to `src/content/site.ts`: `export const siteUrl = "https://portofolio-web.vercel.app";`

Update `src/app/layout.tsx` metadata + JSON-LD:

```tsx
import { site, siteUrl } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adi Sukma — Fullstack Web Developer (Next.js · NestJS · TypeScript)",
  description:
    "Fullstack web developer in Bali building production web apps with Next.js, NestJS, and TypeScript. Open to frontend, backend, and fullstack roles.",
  keywords: [
    "fullstack developer", "web developer", "Next.js", "NestJS", "React",
    "TypeScript", "Node.js", "PHP", "Symfony", "Bali", "Indonesia", "remote developer",
  ],
  openGraph: {
    title: "Adi Sukma — Fullstack Web Developer",
    description: "Production web apps with Next.js, NestJS, and TypeScript.",
    url: siteUrl,
    siteName: "Adi Sukma",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: siteUrl,
  sameAs: [site.linkedinUrl, site.githubUrl].filter(Boolean),
  address: { "@type": "PostalAddress", addressLocality: "Denpasar", addressRegion: "Bali", addressCountry: "ID" },
};
```

In the layout body, before `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
/>
```

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
```

`src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80, background: "#0B0E14", color: "#F8FAFC",
        fontFamily: "sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748B", fontSize: 24 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3B82F6" }} />
          open to work — denpasar, bali
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>Adi Sukma</div>
        <div style={{ fontSize: 42, color: "#64748B" }}>builds for the web.</div>
        <div style={{ fontSize: 26, color: "#94A3B8", marginTop: 28 }}>
          Next.js · NestJS · TypeScript — fullstack, end to end.
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npx playwright test e2e/seo.spec.ts && npm run build`
Expected: tests pass; build stays fully static.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: add SEO metadata, JSON-LD person schema, OG image, sitemap, robots"
```

---

### Task 13: Quality gate — responsive, reduced-motion, accessibility checks

**Files:**
- Create: `e2e/quality.spec.ts`

**Interfaces:**
- Consumes: the complete page.

- [ ] **Step 1: Write the tests** — `e2e/quality.spec.ts`:

```ts
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
```

- [ ] **Step 2: Run full suite on both viewports**

Run: `npm run test:e2e`
Expected: all specs pass on `desktop` and `mobile` projects. If the reduced-motion visibility check fails, the `Reveal` reduced-motion branch is broken — fix `Reveal`, not the test.

- [ ] **Step 3: Manual Lighthouse spot-check (informational)**

Run: `npm run build; npm run start` then open `http://localhost:3000` in Chrome → DevTools → Lighthouse (mobile). Expected ≥95 on all categories. Record scores in the commit message.

- [ ] **Step 4: Commit**

```powershell
git add e2e/quality.spec.ts; git commit -m "test: add responsive, reduced-motion, and a11y quality gates"
```

---

### Task 14: CI workflow and push

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the workflow**

```yaml
name: CI
on:
  push:
    branches: [master]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
      - run: npm run build
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
        env:
          CI: "true"
```

- [ ] **Step 2: Commit and push**

```powershell
git add .github; git commit -m "chore: add CI workflow (typecheck, lint, build, e2e)"
git push origin master
```

- [ ] **Step 3: Verify CI**

Run: `gh run watch --exit-status` (or `gh run list --limit 1`)
Expected: workflow concludes `success`.

- [ ] **Step 4: Deploy to Vercel (user step)**

Adi: log in at vercel.com with GitHub → "Add New Project" → import `RacThug/portofolio-web` → framework auto-detected (Next.js) → Deploy. Then update `siteUrl` in `src/content/site.ts` if the assigned domain differs from `https://portofolio-web.vercel.app`, commit, push.

---

## Post-plan content follow-ups (no code)

- Add `public/profile.jpg` + set `PHOTO_URL` in `About.tsx`
- Fill `githubUrl`, `cvUrl` (drop `public/cv.pdf`), project `liveUrl`s in `src/content/`
- Education graduation year in `src/content/experience.ts`
