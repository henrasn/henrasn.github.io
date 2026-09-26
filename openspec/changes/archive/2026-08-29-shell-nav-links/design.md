## Context

The shared `Shell` (src/components/Shell.tsx) renders the sticky header used by every public route, including Personal and Professional pages. Its nav currently has three Material Symbols icons (`terminal` as an in-app `<Link to="/professional">`, `link` as an inert `href="#"`, `mail` as `mailto:`) plus a circular avatar block. Material Symbols is already loaded project-wide, so the swap needs no new font/dependency. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Replace the shell icons with real external profile links (GitHub, LinkedIn) and remove the avatar.
- Keep the existing visual styling (icon size, hover transition, colors) unchanged.

**Non-Goals:**
- Not changing the dual-mode toggle, routing, or any page content.
- Not introducing new dependencies or font loads.

## Decisions

- **External links as plain `<a>` with `target="_blank"` and `rel="noopener noreferrer"`** — the GitHub and LinkedIn targets are off-site profile URLs, so they must not be client-side `Link`s. `rel="noopener noreferrer"` mitigates the reverse-tabnabbing risk of `target="_blank"`.
- **Reuse Material Symbols `github` and `linkedin` glyphs** for the new icons — keeps the design identical to the existing icon style (`material-symbols-outlined text-[24px]`) with zero new assets or dependencies. The `link`/`terminal` glyphs and the avatar block are removed.
- **Remove the `Link` usage for `/professional` from the shell** — the terminal icon previously served as the in-shell route to Professional. Because it becomes the GitHub link, the shell no longer links to `/professional`; mode navigation remains available through the dual-mode toggle on Home. (Alternative considered: keep an in-shell link to `/professional`, but that contradicts the user's explicit request to replace the icon with GitHub.)

## Risks / Trade-offs

- [Shell no longer contains a link to `/professional`] → Mode switching still works via the Home dual-mode toggle; routing unchanged.
- [GitHub/LinkedIn glyph rendering] → If a given Material Symbols font weight lacks the social glyphs, fall back to `link`-family glyphs or inline SVG; verify at implementation.
