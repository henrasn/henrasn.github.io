## Why

The current Professional page (`src/pages/Professional.tsx`) is a simplified placeholder — a small label-hero, metric cards, and a project grid — that drifts from the refined Stitch design ("Professional Mode" screen `5ab008691bbd4b2c8b181c66df2dc406` in project `projects/16303680220794410027`). The Stitch screen delivers the hire-me experience: a strong CTA hero, a detailed experience timeline, and a "Technical Arsenal" skills band. Porting it faithfully strengthens the page's impact on hiring managers and keeps the site consistent with the refined landing work.

## What Changes

- Replace the Professional page content with a faithful port of the Stitch "Professional Mode" screen:
  - **Hero**: `headline-xl` tagline, `body-lg` description, "Download Resume" primary pill button and "View LinkedIn" secondary pill button, plus a right-column decorative Kotlin/Android illustration with a gradient blur glow (hidden below `lg`).
  - **Experience**: sticky left header ("Experience" + description) beside a vertical 2px timeline of detailed milestone cards — company logo, role (`headline-md`), company + dates (`label-md`, accent-colored), and achievement bullets with Material Symbols icons. The current milestone glows primary; past milestones use outline accents and muted styling.
  - **Technical Arsenal**: full-width `surface-container-low` band, centered header, and three skill-category cards (Languages, Frameworks, Architecture) — icon, decorative blur blob, and pill chips (category accent at 10% bg for highlighted skills, `outline-variant`/20 for secondary skills).
- Remove the current placeholder metrics cards and the project grid from the Professional page (the Stitch screen shows no project grid).
- Enrich the mock experience data (role, company, period, bullets, logo, active state, accent) and add a skills data source to drive the Technical Arsenal.
- Keep route `/professional`, the shared `Shell` (nav/footer), and the dual-mode toggle behavior unchanged.

## Capabilities

### New Capabilities
- None — this change refines an existing capability.

### Modified Capabilities
- `portfolio-public`: The "Professional Mode screen" requirement changes from the simplified hero + metrics + project grid to a faithful port of the Stitch screen `5ab008691bbd4b2c8b181c66df2dc406` — CTA hero (headline, description, Download Resume / View LinkedIn buttons, decorative illustration), a sticky-header Experience section with detailed timeline milestone cards, and a "Technical Arsenal" band of three skill-category cards with accent-tinted pill chips; the project grid is no longer shown on this screen.
- `portfolio-public`: The "Mock data layer" requirement extends so experience records include company logo, achievement bullets, accent, and active-state, and a skills data source drives the Technical Arsenal categories and chips.

## Impact

- Affected: `src/pages/Professional.tsx` (layout restructure), `src/data/experience.ts` (richer records + logos + bullets), `src/data/` (new `skills.ts`), `src/components/` (timeline milestone / experience card as a reusable component, Technical Arsenal skill card).
- Dependencies: relies on existing `design-system` tokens (`surface-container` family, `primary`/`secondary`/`tertiary` accents, `label-md`/`font-code` typography, `rounded-2xl`, `outline-variant`) — no new dependencies. Uses the existing Material Symbols icon font already loaded by the design system.
- No breaking change to public routes or other screens; Personal page, project detail, and home are untouched.