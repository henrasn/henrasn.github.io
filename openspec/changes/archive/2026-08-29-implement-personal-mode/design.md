## Context

See `proposal.md` for motivation. The repo is a Vite + React (TypeScript) static site with `react-router-dom`, Tailwind v4 (`@import "tailwindcss"` + `@theme` tokens in `src/index.css`), and a shared `Shell` component that renders the sticky nav and a simple centered footer. The current `src/pages/Personal.tsx` reuses the professional layout (hero + timeline + uniform grid). The Stitch Personal Mode screen (`4ae67ed7`) is a standalone "Digital Playground" gallery page with its own rich footer. Personal-mode styling uses the teal `secondary-fixed` (`#62fae3`) family rather than solid blue, matching the design-system's dual-mode emphasis requirement.

## Goals / Non-Goals

**Goals:**
- Faithfully port the Stitch Personal Mode screen: header, filter chips with live filtering, masonry gallery of five cards, and matching footer.
- Keep Personal content fully separate from Professional (per AGENT.md), reusing only shared tokens/components.
- Reuse existing Tailwind tokens (`surface-container`, `secondary-fixed`, `rounded-2xl`, fonts, Material Symbols) with no new dependencies.

**Non-Goals:**
- No URL-parameter persistence for the active filter (client-side state only, matching Stitch).
- No changes to Professional, Home, or the shared nav.
- No new backend/data source; filtering works on the static data set.

## Decisions

- **Rebuild `Personal.tsx` as a self-contained page** rather than splitting into many subcomponents. The gallery card and filter chip become small reusable components (`PersonalCard`, `FilterChip`) in `src/components/` (or colocated under `src/pages/`), keeping them out of Professional's internals. Alternative considered: one shared `ProjectCard` for both modes — rejected because the Personal cards have distinct thumbnails (gradient/typographic/`GLITCH`), per-card hover tints, and Material Symbols link rows that don't fit the professional card contract.
- **Extend the data layer with personal-mode metadata.** Add a `personal` project set (or extend the existing `Project` type with optional `categories` and `accent`/`links` fields) so the gallery renders from data and the filter reads a `categories: string[]` per card. Reuse existing `projects.ts` entries where titles map (`compose-it`); add the four new gallery entries. Alternative: hardcode the five cards in JSX — rejected to keep filtering data-driven and cards linkable.
- **Filtering is a single useState `activeFilter`** read against each card's category set. Filter transitions use opacity/scale/display timing to mirror the Stitch script's 300ms animation. Alternative: a routing/filter-search param — rejected as overkill for a static page.
- **Masonry via CSS `columns-*`** (`columns-1 md:columns-2 lg:columns-3 gap-6`) with `break-inside-avoid` cards and `space-y-6`, matching the Stitch layout. Alternative: CSS Grid — rejected because columns gives the natural masonry flow the Stitch design uses.
- **Footer:** render a Personal-mode footer block within `Personal.tsx` matching Stitch (name, copyright, Material Symbols icons, "Built with Stitch" in tertiary). The shared `Shell` footer remains as the global fallback; whether to upgrade the global footer is out of scope. Alternative considered: move footer into `Shell` for all pages — rejected to keep this change scoped to Personal Mode.
- **Images:** keep the Stitch-provided remote image URLs and gradient/typographic thumbnails as-is (no local asset pipeline), consistent with the existing `projects.ts` which already embeds remote `lh3.googleusercontent.com` and `picsum.photos` URLs.

## Risks / Trade-offs

- [Remote image URLs may be large/third-party] → Reuse existing remote-image convention already in `projects.ts`; no new loading infra needed for a static site.
- [Masonry `columns` reorders vertically (top-to-bottom per column), differing from row-wise reading] → Acceptable and matches the Stitch source; mitigates visual complexity.
- [Filter animation timing mismatch with test determinism] → Keep the state transition synchronous for filtering logic; use CSS transition classes, not imperative timeouts, to avoid flaky behavior.
- [Removing the timeline/"Beyond the IDE" sections regresses prior content] → Intentional BREAKING change recorded in the proposal; supersedes the old Personal layout per the redesigned Stitch screen.

## Migration Plan

- Replace `src/pages/Personal.tsx` content; add supporting components/data. Route `/personal` unchanged, so no router or deploy changes. Rollback = revert the Personal page/data additions; other screens unaffected.

## Open Questions

None. (Resolved: gallery cards and their Material Symbols link icons render as non-functional `#` placeholders, faithfully matching the Stitch mock.)
