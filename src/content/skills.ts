import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    featured: true,
    items: [
      "React",
      "Next.js (App Router)",
      "React 19",
      "Tailwind CSS",
      "Mantine UI",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Apollo Client (GraphQL)",
    ],
  },
  {
    title: "Backend",
    featured: true,
    items: [
      "NestJS",
      "Node.js",
      "Symfony",
      "REST APIs",
      "GraphQL",
      "Drizzle ORM",
      "Doctrine ORM",
      "NextAuth / BetterAuth (JWT, RBAC)",
    ],
  },
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"],
  },
  {
    title: "Databases",
    items: ["MySQL", "MariaDB", "PostgreSQL"],
  },
  {
    title: "DevOps & Tooling",
    items: [
      "Docker",
      "Git",
      "pnpm",
      "Turborepo",
      "PM2",
      "CI pipelines",
      "Cloudflare R2 / AWS S3 / MinIO",
    ],
  },
  {
    title: "Testing & Quality",
    items: [
      "Playwright (E2E)",
      "Bruno (API testing)",
      "PHPUnit",
      "Codeception",
      "ESLint",
      "Prettier",
      "PHPStan",
    ],
  },
  {
    title: "Ways of working",
    items: [
      "AI-first development",
      "Spec-first workflow",
      "Code review",
      "Cross-border team collaboration",
      "Bilingual (EN/JA) documentation",
    ],
  },
];
