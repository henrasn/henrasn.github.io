## Context

The current `src/pages/Home.tsx` renders a placeholder hero ("John Doe"), the `ModeToggle` pill, and two `PathCard`s ("Choose your path") with a system-status footer strip. The `Shell` (nav + footer) has a hardcoded "John Doe" brand block. The Kinetic design tokens for the new screen already exist in `src/index.css` (`primary/10`, `secondary`, `surface-container`, `surface-container-high`, `outline-variant`, `code` font) and Material Symbols Outlined is already loaded in `index.html`. Routing is `react-router-dom` v7 with `Link`/`useNavigate` available; `src/pages/Professional.tsx` and `src/pages/Personal.tsx` already render at `/professional` and `/personal`.

## Goals / Non-Goals

**Goals:**
- Replace Home with a faithful static port of Stitch screen `d183f89f346d4b8d87680789555fb10f` using existing Kinetic Tailwind tokens.
- Wire the Portfolio Mode Selector cards to `<Link to="/professional">` / `<Link to="/personal">`.
- Remove `ModeToggle` and `PathCard` once unused; keep the codebase clean of dead components.
- Rebrand the shell brand block to "Henra Surya".

**Non-Goals:**
- No real external links or mailto behavior for WhatsApp/LinkedIn/Email CTAs (match Stitch `href="#"`).
- No session-persisted mode state (the removed toggle's persistence logic is not carried forward).
- No changes to Professional / Personal / Project Detail pages.

## Decisions

**1. Single `Home` component, sectioned JSX, no new subcomponents.**
The screen is a linear presentation page; extracting `StatusBadge`, `StatsBar`, etc. adds indirection without reuse. Keep markup colocated in `Home.tsx` following the existing per-page style (investigate only if the file grows unwieldy).
*Alternative considered:* dedicated components per section — rejected for premature abstraction; no section is reused elsewhere.

**2. Rely on Tailwind built-ins instead of custom keyframes.**
The ping dot uses Tailwind's `animate-ping` with `bg-secondary`; hover lifts use `hover:-translate-y-0.5 transition-all`; the Personal card active state uses `ring-2 ring-secondary/50 scale-[1.02]` + a `bg-gradient-to-br from-secondary/5` overlay. No new `@keyframes` in `src/index.css` required.
*Alternative considered:* hand-written animations — rejected, unnecessary with Tailwind utilities.

**3. Use semantic `<button>` for selectable mode cards, `<a>` for CTAs.**
Mode cards are navigation actions implemented as `<Link>` (router-aware) styled like buttons; contact CTAs are placeholder `<a href="#">` per the Stitch markup.
*Alternative considered:* plain `<button>` with `useNavigate` — rejected; `<Link>` preserves accessible href semantics and minimizes JS.

**4. Stats bar responsive layout mirrors the Stitch pattern.**
Desktop: `grid-cols-4` with `before:` divider pseudo-elements (`before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-outline-variant/30`). Mobile: first stat + `grid-cols-2` stacking for the remaining three (Stitch shows 2-col for the four values with "Production Installs" second). Implement per the source HTML structure so behavior in the spec's scenarios holds.

**5. Footer rebrand touches `Shell` only.**
Brand text "John Doe" → "Henra Surya" in the header block, and keep the shell footer consistent (the Stitch screen's alternate footer is the page-level Home port; to avoid double footers, resolve by keeping the shared `Shell` footer and, if needed, updating its copy/links to match the design rather than adding a second footer inside `Home`).

## Risks / Trade-offs

- **[Stale marketing copy]** Metrics ("15M+", "99.94%") are design placeholder values → Mitigation: rendered verbatim to match Stitch fidelity; flagged to the maintainer for real data later, but not changed in this scope.
- **[Dead code]** `ModeToggle`/`PathCard` removal must not break imports → Mitigation: grep for imports before deleting; the apply workflow verifies with `npm run build`.
- **[Scenario preservation on validation]** MODIFIED requirements must retain all existing scenarios → Mitigation: the delta spec keeps "Hero renders" and folds new behavior into companion ADDED requirements so `openspec validate` passes.
- **[Double footer]** Stitch screen shows its own footer while the Shell also renders one → Mitigation: keep the single shared `Shell` footer, updated to design copy, so the ported sections (badge → stats) sit inside `Home` under the shell's `<main>`.