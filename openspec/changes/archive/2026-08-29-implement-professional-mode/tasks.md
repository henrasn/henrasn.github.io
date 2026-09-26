## 1. Data layer

- [x] 1.1 Extend `Experience` in `src/data/experience.ts` with optional `logo`, `bullets: string[]`, `accent: "primary" | "tertiary" | "outline"`, and `active`; update the three records to the Stitch content (TechNova Solutions / Lead Android Engineer / 2021 — Present / active / primary, FinApp Global / Senior Android Developer / 2018 — 2021 / tertiary, BlueSky Logistics / Android Developer / 2015 — 2018 / outline) with their bullets and logo image URLs — keeping `description` so the Personal `Timeline` still renders
- [x] 1.2 Create `src/data/skills.ts` with `SkillCategory` records for Languages (code_blocks, primary), Frameworks (extension, secondary), Architecture (architecture, tertiary), each with `{ label, highlighted }[]` chips matching the Stitch Technical Arsenal

## 2. Components

- [x] 2.1 Create `src/components/ExperienceTimeline.tsx`: vertical 2px line (`surface-container-highest`), 22px milestone markers (glowing primary for the active record, `surface` + `surface-container-highest` border otherwise), and milestone cards (logo img 48px `rounded-lg`, role `headline-md`, company + dot + dates in `label-md` accent, bullet list with Material Symbols `check_circle`/`arrow_right`), with hover lift + blue shadow; accent key → className lookup map
- [x] 2.2 Create `src/components/SkillCategoryCard.tsx`: icon + title `headline-md`, decorative blurred accent blob, `rounded-3xl` `surface-container` card with `group-hover:-translate-y-2` lift, and pill chips — highlighted chips `bg-<accent>/10 text-<accent> font-code`, secondary chips `bg-outline-variant/20 text-on-surface-variant`; accent key → className lookup map

## 3. Professional page restructure

- [x] 3.1 In `src/pages/Professional.tsx`, add the hero section: `headline-xl` tagline, `body-lg` description, primary "Download Resume" pill (with `download` icon) and secondary "View LinkedIn" pill, plus a `hidden lg:block` right-column with the gradient blur glow and the Stitch illustration image
- [x] 3.2 Add the Experience section: sticky left header ("Experience" + body description) in a 4-col column beside the `ExperienceTimeline` in the 8-col column (12-col grid, `container-max` padded container)
- [x] 3.3 Add the full-width Technical Arsenal band (`bg-surface-container-low`): centered header ("Technical Arsenal" + description) and a 3-col grid of `SkillCategoryCard`s
- [x] 3.4 Remove the placeholder label-hero, metric cards, project grid, `Timeline`, and `ProjectCard` usage from the Professional page; keep route mounted at `/professional` unchanged

## 4. Verification

- [x] 4.1 Run `npm run build` (typecheck) and `npm run lint` and confirm no errors
- [x] 4.2 Run the dev server and verify at `/professional`: hero + both CTAs + illustration (lg+), timeline milestone cards with glowing active, Technical Arsenal with three aligned skill cards and accent-tinted chips, no project grid, and that `/personal`, `/`, and `/project/:id` are unchanged