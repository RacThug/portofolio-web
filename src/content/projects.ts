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
      "TypeScript",
      "Next.js 15",
      "React 19",
      "Mantine UI",
      "TanStack Query",
      "NestJS 10",
      "Drizzle ORM",
      "MariaDB",
      "NextAuth",
      "Puppeteer",
      "Cloudflare R2",
      "Docker",
      "Turborepo",
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
      "TypeScript",
      "Next.js 16",
      "React 19",
      "NestJS 11",
      "GraphQL",
      "REST",
      "Apollo Client",
      "Drizzle ORM",
      "MySQL",
      "BetterAuth",
      "Tailwind CSS 4",
      "Playwright",
      "Bruno",
      "AWS S3",
      "Docker",
      "Turborepo",
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
      "PHP 8.3",
      "Symfony 6.4",
      "EC-CUBE 4.3",
      "Doctrine ORM",
      "MySQL 8",
      "Twig",
      "Webpack 5",
      "Sass",
      "Tailwind CSS 3",
      "Docker",
      "PHPStan",
      "Codeception",
    ],
  },
];
