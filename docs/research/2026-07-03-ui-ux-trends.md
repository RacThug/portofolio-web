# UI/UX Trend Research — 2025–2026 (for the portfolio design)

*Deep-research run, 2026-07-03. 22 sources fetched (Figma, Webflow, Awwwards, MDN, Chrome dev blog, dev.to, portfolio-review guides, agency blogs). Verification pass was stopped early, so claims are labeled: ✅ verified against primary source · ⚠️ plausible but unverified · ❌ refuted by fact-check.*

## 1. Dark mode

- ✅ Dark mode is a **baseline expectation in 2026**, not a differentiator — Figma lists it as standard practice adopted by all major platforms (verified verbatim).
- ⚠️ Toggleable light/dark themes are becoming a default in new designs.
- ✅ Dark-mode craft rules (multiple sources agree): **no pure-black backgrounds** — graduated dark greys (#111117 / #111827 range), off-white text (not pure white), borders/rings instead of box-shadows for depth, dim images slightly.
- ⚠️ Next.js implementation: `next-themes` + `suppressHydrationWarning` to avoid theme flash.
- ❌ "82% of smartphone users use dark mode" and similar stats — refuted (uncited marketing numbers).
- ❌ "Dark interfaces dominate Awwwards winners" — refuted as stated (the claim over-read filter UI tags as data). Dark is common among winners but dominance is unproven.

## 2. Typography

- ✅ **Bold, oversized typography is a top 2026 trend** — Figma: "typography is taking center stage," including kinetic lettering and variable fonts (verified verbatim).
- ⚠️ Kinetic/animated type: keep it restrained — one animated headline per page, honor `prefers-reduced-motion`.
- ⚠️ Oversized type is specifically recommended for text-light portfolios to build hierarchy.
- ⚠️ Monospace typography is having a moment via the brutalist/dev-culture counter-current (v0.dev, Browser Company aesthetic).

## 3. Color & accents

- ✅ Webflow (verified): brands are moving from single accent colors toward **multi-value color systems** — in practice: a small ramp of accent shades rather than one flat hex.
- ⚠️ Figma: bright, saturated palettes (Y2K nostalgia) are replacing muted tones — but this is a general web trend; for hiring-facing portfolios restraint still wins (see §6).
- ⚠️ Monochrome + single accent is called "timeless" for portfolios; vivid accents recommended on dark greys — **mint green (#6ee7b7) and light blue explicitly named** as good dark-mode accents.
- Net: a dark monochrome base with one vivid accent (green or blue) is both current and safe.

## 4. Motion & micro-interactions

- ✅ Micro-interactions and scroll-triggered motion are named 2026 trends **with the explicit caveat: subtle and purposeful; heavy animation reads as dated** (Figma verified; multiple sources agree).
- ⚠️ Dominant portfolio motion patterns observed: scroll-triggered fade/ease-in reveals, hover states on cards/CTAs, cursor-following elements, section color transitions.
- ✅ Webflow (verified): "guided scrolling" (progress indicators, wayfinding tied to scroll) and animated text treatments are 2026 trends.
- ✅ CSS scroll-driven animations exist natively (MDN, primary source) — scroll/view progress timelines, `animation-range`, `scroll()`/`view()`.
- ❌ "Browser support is universal / GSAP ScrollTrigger is legacy" — refuted (overreach; support gaps remain). Practical takeaway: use Framer Motion `whileInView` or IntersectionObserver-based reveals; treat pure-CSS scroll timelines as progressive enhancement.
- ✅ `prefers-reduced-motion` support is treated as a requirement across sources.

## 5. Layout

- ⚠️ **Bento grids** are repeatedly named a mainstream 2026 layout pattern (Apple-popularized, CSS Grid, size hierarchy = importance, collapse to single column on mobile). ❌ The "bento is the default, +23% scroll depth" stat version was refuted (unverifiable agency numbers) — the pattern is real, the stats are not.
- ⚠️ Single-page layouts recommended as current best practice for dev portfolios; sticky header for long single pages.
- ⚠️ Projects should appear early (before or merged with About) — visitors come to see work first.
- ⚠️ Glassmorphism: survives only in restrained form (nav bars, modals); heavy use has performance costs. Aurora-style blurred gradient blobs (Stripe/Linear/Vercel look): limit to 2–3 for GPU performance.
- ⚠️ Heavy 3D/WebGL (Spline scenes etc.): reserved for creative-showcase sites; hurts Core Web Vitals on standard portfolios.

## 6. Hiring-manager reality check (counterweight to award-site aesthetics)

- ⚠️ Reviewers judge visual craft **within seconds**, based on typographic and layout discipline (coherence, spacing, hierarchy) — not on which style you picked.
- ⚠️ Over-designed portfolios where function is secondary are a **red flag**; "clean, functional UI" is the expectation. Visual clutter and lack of mobile responsiveness are named recruiter red flags.
- ⚠️ Hero copy should state a concrete specialization, not generic "passionate about code."
- ⚠️ 3–5 polished projects beat 10+ basic ones; quantified impact in project descriptions beats tech-stack lists; live demos are strongly preferred over repo links.
- ❌ Specific stats ("73% of hiring managers…", "15-second average") — plausible direction, but unverified/uncited; don't rely on the numbers.

## 7. What now looks dated

- Skill percentage bars / progress meters (replace with years or project counts)
- Dense text walls, no whitespace
- Cookie-cutter templates, hero stock photos
- Gratuitous heavy animation; decorative-only motion
- Overused glassmorphism; big WebGL scenes on non-creative sites
- Generic hero statements; checklist-style case studies

## Implications for this project (dark-minimal hybrid, Next.js + Tailwind)

1. **The chosen direction is validated**: dark base + minimalist restraint + oversized quiet typography sits exactly on the 2026 mainstream (dark = baseline, bold type = verified trend, minimalism = "universally safe", expressive-minimal accents = current).
2. **Accent**: use one vivid accent on graduated dark grey (never pure black), built as a small shade ramp, not a single hex. Green and blue are both trend-supported; green is more distinctive, blue more conservative.
3. **Motion budget**: scroll-triggered fade/rise reveals (Framer Motion `whileInView`, `viewport={{once:true}}`), hover micro-interactions on cards/CTAs, ~150–300ms, one animated hero headline max, full `prefers-reduced-motion` support. No heavy 3D, no cursor gimmicks.
4. **Layout**: single page with sticky header is current; consider a restrained bento-style grid for the skills section; projects section high on the page; 3 case-study projects is the right count.
5. **Content**: hero states the concrete specialization (already does); project cards keep quantified outcomes (already do); add live demo links when available.
6. **Monospace accents** (terminal touches) align with the current dev-culture aesthetic — keep them small (labels, statuses), not whole-page.
