## Why

The portfolio shell currently shows neutral placeholder icons (terminal, an inert `#` link, mail) and a generic avatar that do not surface the engineer's real profiles. The user wants the shell nav to link directly to their GitHub and LinkedIn profiles and drop the placeholder avatar, so both Professional and Personal pages expose real social links.

## What Changes

- Replace the `terminal` icon (currently an in-app link to `/professional`) with an external GitHub link to `https://github.com/henrasn`, opening in a new tab.
- Replace the inert `link` (`href="#"`) icon with an external LinkedIn link to `https://www.linkedin.com/in/henrasetianugraha/`, opening in a new tab.
- Remove the circular profile avatar (`person` icon) from the shell nav. **BREAKING**: the shell no longer provides an in-shell link to the `/professional` route; the dual-mode toggle on Home remains the navigation path between modes.
- Keep the existing `mail` icon (`mailto:`) unchanged.
- The change applies to the shared `Shell` used by both Personal and Professional pages (and all public routes), so both modes reflect the new icons automatically.

## Capabilities

### New Capabilities
<!-- None introduced. -->

### Modified Capabilities
- `portfolio-public`: The "Portfolio shell and navigation" requirement is updated to replace the terminal icon with a GitHub profile link, replace the link icon with a LinkedIn profile link, and drop the avatar slot.

## Impact

- `src/components/Shell.tsx`: update the nav markup — swap icons, set external `href` targets with `target="_blank"`/`rel`, and remove the avatar block.
- No dependency additions (GitHub/LinkedIn icons use the already-loaded Material Symbols font: `github` and `linkedin` glyphs). Material Symbols `github` and `linkedin` glyphs are available in the currently loaded font weight.
- Routing: `Link` import for the `/professional` nav icon is no longer used by the shell (routing itself unchanged).
