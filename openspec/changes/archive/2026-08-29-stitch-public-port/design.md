## Context

`personal-site` is a Vite + React 19 SPA with vanilla CSS, no routing, no Tailwind, and a light-first token set. Stitch source ("Dual-Mode Android Engineer Portfolio") ships as Tailwind CDN HTML with an inline `tailwind.config` derived from `designTheme` (35 named colors, typography, spacing, rounded) plus 10 DESKTOP screens at 2560px. Public-only scope is 4 screens: Home/Landing, Professional Mode, Personal Mode, Project Detail guest view. Admin screens deferred.

See `proposal.md` for why full fidelity is required.

## Goals / Non-Goals

**Goals:**
- Pixel-faithful port of public screens using Kinetic tokens; Tailwind available for 1:1 class mapping from Stitch HTML
- Dark-default theming with dual-mode emphasis (solid vs gradient) via React state + Tailwind utilities
- Routed shell so Stitch HTML can be pasted with minimal translation (class names stay Tailwind)
- Static mock data driving listings/detail without backend

**Non-Goals:**
- Admin CMS, auth, persistence — deferred to follow-up change
- SSG/SSR, i18n, backend, image optimization pipeline
- Mobile-specific redesign beyond Stitch's responsive `lg:`/`md:` utilities
- Light-mode support (Kinetic is dark-only)

## Decisions

**Tailwind via `@tailwindcss/vite` (not CDN, not PostCSS-only).**
- Why: Stitch HTML is Tailwind classes + `tailwind.config` JS; Vite plugin gives build-time extraction, no CDN CSP issues, and `theme.extend` maps 1:1 to `designTheme.namedColors`/`typography`/`spacing`/`borderRadius`.
- Alternative: stay vanilla CSS and translate classes — rejected; high fidelity cost and manual mapping error-prone.

**Theme mapping: `index.css` CSS variables + `tailwind.config` (via `vite.config.ts`) both.**
- Why: CSS vars allow JS mode toggle (gradient swap) and non-Tailwind overrides; Tailwind config enables class-for-class paste from Stitch.
- Tokens: map `namedColors` kebab-case to vars `--color-primary` etc., typography to `fontFamily`/`fontSize` entries, spacing/rounded to Tailwind `spacing`/`borderRadius`. Base layer sets `bg-surface text-on-surface`.

**Routing: `react-router-dom` with mode as nested consideration, not separate domains.**
- Routes: `/` (Home), `/professional`, `/personal`, `/project/:id` (guest). Mode state is both route-driven and context-driven: visiting `/professional` sets mode=professional, pill toggle does `navigate` + context update. Context persisted to `sessionStorage` so nav preserves mode.
- Alternative: query param `?mode=` — rejected; shareable URLs and browser history favor path.

**Data: `src/data/projects.ts` + `src/data/experience.ts` static modules (not JSON fetch).**
- Why: import-time data, no async loading flash, easiest to wire Stitch content; detail page is lookup by `id`.
- Shape: `{ id, title, description, techStack: string[], image, highlights, links }` matching Stitch cards/chips. Timeline items in `experience.ts`.

**Component extraction: minimal shell components only.**
- `Shell` (nav + outlet), `ModeToggle` (pill with 0.3s cubic-bezier), `ProjectCard`, `Chip`, `Timeline`, `Button`. Other Stitch markup stays inline in page components to preserve fidelity; refactor only when reused.
- Fonts/icons: `index.html` adds `<link>` for `Space Grotesk`, `Inter`, `Material Symbols Outlined` with `display=swap`.

## Risks / Trade-offs

- **Tailwind class fidelity drift** → Mitigation: copy Stitch HTML verbatim first, then extract components; visual diff against Stitch screenshots before refactor
- **2560px DESKTOP HTML not responsive** → Mitigation: keep Stitch's `lg:`/`md:` breakpoints, verify at 1280/768/375; add `max-w-[1200px]` container already in tokens
- **Mock data vs real CMS later** → Mitigation: keep data layer behind `getProject(id)`/`listProjects()` helpers so admin change can swap storage without page edits
- **Gradient mode specificity** → Mitigation: mode classes on root (`data-mode="professional|personal"`) with gradient utilities `bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6]` only when `personal`; test both in Story-like manual check
- **Large Stitch HTML (5-8k heights)** → Mitigation: port section by section, not single giant file; split Home/Professional/Personal/Detail into route components

## Migration Plan

1. Add deps (`tailwindcss`, `@tailwindcss/vite`, `react-router-dom`), update `vite.config.ts`, `index.css`, `index.html` — `npm run build` must pass before any screen port
2. Introduce `src/components/Shell.tsx`, `src/context/ModeContext.tsx`, `src/data/*`, wire router in `src/main.tsx`
3. Port screens one route at a time (Home → Professional → Personal → Detail), each verified with `npm run build` + `npm run lint`
4. Rollback: revert `index.css`/`vite.config.ts` and `src/App.tsx` to template; public scope has no DB migration

## Open Questions

- Image asset strategy: hotlink Stitch `lh3.googleusercontent.com` vs commit to `public/` — default hotlink for MVP, can vendor later
- Exact project/experience copy: use Stitch placeholder text initially, replace with user content in follow-up?
