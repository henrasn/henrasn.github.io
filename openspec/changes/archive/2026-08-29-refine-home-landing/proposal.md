## Why

The current Home/Landing screen renders a bare centered hero followed by two small pill buttons, but the refined Stitch landing experience (`projects/16303680220794410027` / screen `04f7bdcce09f45ccb177cfa2d15365dd`) presents a richer "Choose your path" flow. Aligning the port to the refined design improves first-impression clarity by giving visitors two distinct, discoverable entry points into Professional and Personal content.

## What Changes

- Replace the two small CTA pill buttons on Home with a "Choose your path" section containing two large **path cards** (Professional Portfolio and Personal Sandbox), separated by an "OR" divider.
- Each path card has a title, description, an icon, and a trailing CTA ("View Work" / "Explore") that navigates to the corresponding mode screen.
- Keep the existing centered hero (name, role, tagline, floating decorative code snippets/shapes) and the dual-mode pill, matching the refined layout.
- Add a Home footer status line: "System status: Online | Location: San Francisco, CA".
- Preserve route targets (`/professional`, `/personal`) so navigation behavior from the landing cards is unchanged.

## Capabilities

### New Capabilities
- None — this change refines an existing capability.

### Modified Capabilities
- `portfolio-public`: The "Home / Landing screen" requirement changes to require the refined landing experience — a "Choose your path" section with Professional Portfolio and Personal Sandbox path cards (icon, title, description, CTA), an "OR" divider, and the footer status line, in addition to the existing hero and mode toggle.

## Impact

- Affected: `src/pages/Home.tsx` (layout restructure), possibly `src/components/` (new reusable path card), `src/pages/` CSS/tokens via existing design-system.
- Dependencies: relies on existing `design-system` tokens (surface-container cards, `rounded-2xl`, primary accents, Inter/Space Grotesk) — no new dependencies.
- No breaking change to public routes or other screens.
