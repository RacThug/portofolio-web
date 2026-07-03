# Portfolio Website — Design Spec

**Date:** 2026-07-03
**Owner:** Adi Sukma
**Status:** Approved sections 1–4 (architecture, design system, page structure, motion & quality + responsive)
**Content source:** `docs/portfolio-content-reference.md`
**Research basis:** `docs/research/2026-07-03-ui-ux-trends.md`

## 1. Goal & Scope

A general-purpose personal portfolio website for Adi Sukma, fullstack web developer. Single scrolling page, no project detail pages, no blog, no contact form, no CMS. Optimized to read well for recruiters and anyone else within seconds, on any device.

**Out of scope (explicit):** project detail routes, contact form/backend, headless CMS or admin dashboard, i18n, blog, analytics dashboards, light-mode toggle (dark-only for v1).

## 2. Architecture

- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion. Deployed on Vercel (free tier), GitHub repo `RacThug/portofolio-web`.
- **Rendering:** fully static — every section prerendered at build time. No database, no API routes, no auth.
- **Content-as-code:** all copy in typed content files. Updating the site = edit a content file, push, Vercel auto-deploys.

```
src/
  content/
    site.ts         # name, role, tagline, one-liner, links, availability, SEO meta
    skills.ts       # skill groups (SkillGroup[])
    projects.ts     # 3 case studies (Project[])
    experience.ts   # work timeline + education (ExperienceEntry[], Education)
  components/
    sections/       # Hero, Projects, About, Skills, Experience, Contact
    ui/             # Button, SectionHeading, ProjectCard, TechBadge, NavBar, ...
  app/
    layout.tsx      # fonts, metadata, JSON-LD
    page.tsx        # composes sections in order
```

- **Types:** `Project { label, title, type, role, problem, built, highlights[], tech[], links? }`, `ExperienceEntry { role, company, employment, location, period, summary, stack? }`. Content files export typed constants; build fails on malformed content.
- **SEO:** title/description/keywords from content reference §9; Open Graph + Twitter card image; `sitemap.xml`; `robots.txt`; JSON-LD `Person` schema.

## 3. Design System — "Quiet Terminal"

Dark-minimal hybrid: GitHub-dark developer feel with minimalist restraint. Dark-only in v1.

### Colors (Tailwind theme tokens)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0B0E14` | page background (graduated dark grey, never pure black) |
| `surface` | `#111623` | cards, nav bar |
| `border` | `#1E293B` | 1px card/nav borders, dividers |
| `text-primary` | `#F8FAFC` | headings, primary text |
| `text-secondary` | `#94A3B8` | body text |
| `text-muted` | `#64748B` | labels, meta text |
| `accent-400` | `#60A5FA` | links, hover states, mono accents |
| `accent-500` | `#3B82F6` | primary buttons, active states, status dot |
| `accent-600` | `#2563EB` | pressed states |
| `accent-subtle` | `rgba(59,130,246,0.12)` | tech-badge/tag backgrounds |

Rules: no box-shadows for depth on dark — use borders/rings; accent used as a ramp, not one flat hex; all text pairs ≥4.5:1 contrast; images slightly dimmed if needed.

### Typography

| Role | Font | Notes |
|---|---|---|
| Headings | **Space Grotesk** (600) | tight tracking (-0.03em), oversized hero via `clamp()` |
| Body | **Inter** (400/500) | 16px base, line-height 1.6–1.75, max ~70ch |
| Mono accents | **JetBrains Mono** | section labels (`## projects`), tech badges, status line, footer `$` flourish |

Scale: 12.5 / 14 / 16 / 20 / 28 / 44 / hero `clamp(2.5rem, 8vw, 5.5rem)`. All via `next/font` (self-hosted, zero CLS).

### Components

- **Buttons:** primary = accent-500 bg, white text; secondary = 1px border, transparent bg; radius 8px; ≥44px touch height; press scales 0.97.
- **Project cards:** surface bg + 1px border, radius 12px; mono index label (`01 — B2B PLATFORM`), title, problem/built summary, highlight bullets, tech badges; hover: border → accent-500, `translateY(-2px)`, 200ms ease-out.
- **Tech badges:** JetBrains Mono 11px, accent-subtle bg, accent-400 text, 1px accent border at 25% alpha, radius 5px.
- **Nav:** sticky, surface bg with slight translucency + backdrop-blur, 1px bottom border; anchor links with active-section highlight (accent underline/dot).
- **Icons:** Lucide SVG only — no emoji as icons.

## 4. Page Structure (single page, order A — projects first)

1. **Nav (sticky):** wordmark `adi.dev`-style; links: projects · about · skills · experience · contact; CV button.
2. **Hero:** mono status line (`● open to work — denpasar, bali`, blue dot), oversized headline (name + quiet second line), one-liner from content doc, CTAs: View Projects (primary) / Get in Touch (secondary) / Download CV (text link). Pure typography — no photo.
3. **Projects:** section label `## projects`; 3 case-study cards (Compliance system, Renovation sales platform, E-commerce) with problem → built → highlights → tech. Live/demo links when available.
4. **About:** professional photo (rounded rect, 1px border) beside long bio; AI-first working style paragraph. Photo above bio on mobile.
5. **Skills:** restrained bento grid — cells: Frontend / Backend / Databases / DevOps & Tooling / Testing & Quality / Ways of working; card sizes reflect priority (Frontend/Backend larger); single column on mobile.
6. **Experience:** vertical timeline — Grune Teknologi (Jun 2025–present) → Bent Blackstone (Feb–May 2025) → MSIB Dicoding (2023); compact Education block (ITB STIKOM Bali, BSc Information Systems) at the end of this section.
7. **Contact:** big CTA heading, short availability line, direct-link buttons: Email · LinkedIn · GitHub. Footer: mono `$ built with next.js + tailwind` + copyright.

Anchors: `#projects #about #skills #experience #contact`. Smooth scroll; nav highlights active section.

## 5. Motion

- Sections fade-and-rise on scroll: Framer Motion `whileInView`, `viewport={{ once: true }}`, ~250ms ease-out, 40–60ms stagger within card grids.
- Hero: one subtle headline entrance animation — the only "featured" motion.
- Micro-interactions: card border-glow + lift on hover; button press scale; nav active-state transitions. All 150–300ms.
- **Reduced motion:** `prefers-reduced-motion` disables all entrance animations and lifts (content renders immediately); implemented globally (Framer Motion `useReducedMotion` + CSS media query).
- No: heavy 3D/WebGL, cursor followers, parallax, scroll-jacking, skill percentage bars.

## 6. Responsive (mobile-first)

- Tailwind mobile-first; verified at 375 / 768 / 1024 / 1440.
- Hero type via `clamp()`; `min-h-dvh` not `100vh`.
- Nav: desktop full links → mobile compact bar + hamburger opening full-screen overlay (44px+ targets).
- Projects grid 3→1 columns; Skills bento →1 column; About photo stacks above bio.
- Body ≥16px on mobile; no horizontal scroll; container `max-w-6xl` on desktop.

## 7. Accessibility

- Contrast ≥4.5:1 everywhere (palette pre-checked); visible blue focus rings; skip-to-content link.
- Single `h1` (hero), `h2` per section, sequential hierarchy; `aria-label` on icon-only links; semantic `nav/main/section/footer`.
- Full keyboard navigability; touch targets ≥44px.

## 8. Performance

- Static prerender; `next/font` (3 fonts, subset); `next/image` for photo/screenshots (WebP/AVIF, lazy below fold, dimensions declared — CLS < 0.1).
- Only runtime dependency beyond React/Next: Framer Motion.
- Target: Lighthouse ≥95 performance/accessibility/best-practices/SEO.

## 9. Testing & CI

- **Playwright smoke suite:** page renders all 7 nav landmarks; anchor navigation scrolls to sections; external links (LinkedIn, GitHub, mailto) present and well-formed; mobile viewport (375px) renders without horizontal scroll; reduced-motion mode renders all content.
- ESLint + Prettier; `tsc --noEmit` type check.
- GitHub Action: lint + typecheck + build + Playwright on every push to `master`.

## 10. Deployment

- Vercel connected to `RacThug/portofolio-web`, auto-deploy on push to `master`; preview deploys on branches.
- Custom domain: optional later (content doc lists website URL as TBD — site works on `*.vercel.app` until then).

## 11. Content gaps (not blockers — placeholders in v1)

- Professional photo (About uses a styled placeholder until provided)
- GitHub profile URL (content doc has it empty — footer/contact GitHub button hidden until filled)
- CV PDF file for the Download CV button
- Education graduation year; live/demo links per project

## 12. Decisions log

| Decision | Choice | Why |
|---|---|---|
| Audience | General portfolio | User preference |
| Content management | Content-as-code | Free, fast, version-controlled; content changes rarely |
| Scope | Single page only | User preference; content fits |
| Contact | Direct links, no form | Zero backend/spam; recruiters prefer email |
| Framework | Next.js over React SPA | SEO/prerendering, built-in optimization, showcases headline skill |
| Visual direction | Dark-minimal hybrid ("Quiet Terminal") | User exploration (browser mockups) + 2026 trend research |
| Accent | Electric blue ramp (#3B82F6) | User choice; trend-supported on dark greys |
| Photo | About section, not hero | Keeps typographic hero; user choice |
| Section order | Projects before About | Research: reviewers want work first; user approved |
| Theme | Dark-only v1 | Hybrid direction; light toggle deferred |
