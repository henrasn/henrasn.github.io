## Context

Current `src/pages/Home.tsx` renders a centered hero plus a `ModeToggle` and two small pill `<Link>` buttons for `/professional` and `/personal`. The refined Stitch landing (screen `04f7bdcce09f45ccb177cfa2d15365dd`) keeps the hero and mode toggle but replaces the pill buttons with a "Choose your path" grid of two path cards and adds a footer status line. The existing `design-system` capability already provides the tokens needed (surface containers, `rounded-2xl`, primary/secondary accents, Inter/Space Grotesk). See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Restructure the Home page to the refined landing layout with minimal, localized changes.
- Reuse existing design-system tokens and shared components (ModeToggle).
- Preserve existing route targets so navigation behavior is unchanged.

**Non-Goals:**
- No changes to other screens, routing config, mode state, or the design system.
- No new dependencies or data-model changes.

## Decisions

- **Reusable PathCard component**: Extract a `PathCard` component (icon, title, description, CTA, navigate-on-click) so the two cards are consistent and easily adjustable. Alternative (inline two card blocks) rejected: duplication and harder to keep visually consistent.
- **Keep `Link`-based navigation**: Reuse `react-router-dom` `<Link>`/`useNavigate` for the card CTAs to preserve the existing route behavior. No shared-mode target change.
- **Reuse existing tokens/design-system**: Style cards with `surface-container` background, `rounded-2xl`, primary border emphasis and hover lift (per DESIGN.md project-card guidance). No new token additions.
- **Rendered hero unchanged**: Keep hero markup and floating decorative elements as-is to limit blast radius.

## Risks / Trade-offs

- Visual fidelity vs. DOM simplicity → Mirror the Stitch HTML structure directly for the "Choose your path" block, then style with tokens; verify against the screenshot.
- Mode toggle unchanged: the refined screen still shows the dual-mode pill, so keep `ModeToggle` in place above the path section.
