## 1. Shell nav icons

- [x] 1.1 In `src/components/Shell.tsx`, replace the `terminal` icon `<Link to="/professional">` with an `<a>` linking to `https://github.com/henrasn` using an inline SVG GitHub icon (see 2.1), with `target="_blank"` and `rel="noopener noreferrer"`, keeping the existing `text-on-surface-variant hover:text-primary transition-colors` styling.
- [x] 1.2 Replace the inert `link` (`href="#"`) icon `<a>` with a LinkedIn link to `https://www.linkedin.com/in/henrasetianugraha/` using an inline SVG LinkedIn icon (see 2.1), with `target="_blank"` and `rel="noopener noreferrer"`, keeping the same styling.
- [x] 1.3 Remove the circular profile avatar block (the `w-8 h-8 rounded-full bg-primary` div with the `person` icon) from the nav.
- [x] 1.4 Confirm the `mail` icon (`mailto:`) is left unchanged. The `<Link to="/professional">` nav element was removed; the `Link` import remains in `Shell.tsx` because the brand block still uses `<Link to="/">`.

## 2. Verification

- [x] 2.1 Verified with the loaded font (`fontTools`): the Material Symbols Outlined font does NOT contain `github` or `linkedin` glyphs, so per design.md the icons use inline SVG (fill `currentColor`, `w-6 h-6`) so they inherit the nav text/hover colors and open in new tabs.
- [x] 2.2 Typecheck (`tsc -b`) and lint (`eslint .`) both pass. Confirmed the shared `Shell` renders on both `/personal` and `/professional` with the new external GitHub/LinkedIn links and no avatar.
