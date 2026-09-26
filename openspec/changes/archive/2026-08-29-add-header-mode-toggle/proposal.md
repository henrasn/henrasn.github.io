## Why

In the Stitch design (project 16303680220794410027), the Professional and Personal Mode screens share a shell header that contains a centered pill selector switching between the professional view ("Work") and personal view ("Life"). The current implementation only has a mode toggle on the Home screen, so the mode must be switched from Home first. The shell header should expose this selector directly on every page, matching the Stitch design.

## What Changes

- Add a centered pill-shaped mode selector to the shared `Shell` header (between the brand block and the social nav icons), matching the Stitch header's centered selector layout.
- The selector has two segments labeled **Professional** and **Personal** (keeping the app's existing terminology, per user preference — the Stitch labels are "Work"/"Life").
- Clicking a segment navigates to `/professional` or `/personal` and updates the current mode via the existing `ModeContext`, so content emphasis follows the selection.
- The header's highlighted segment is derived from the current route (professional when the path starts with `/professional`, otherwise personal), so it stays correct even when the user navigates without explicitly switching mode — for example via the Home `<Link>` cards, the browser back/forward buttons, or a direct URL. Any non-professional page therefore keeps "Personal" highlighted.
- The active segment is highlighted with the primary treatment (solid primary pill on the active segment), the inactive segment uses on-surface-variant, matching the Stitch active/inactive styling.
- Because the selector lives in the shared `Shell`, it appears on all public routes **except the Home/Landing page (`/`)** — where the existing `ModeToggle` already provides mode switching — so it is shown on Professional, Personal, and Project Detail but hidden on Home.

## Capabilities

### New Capabilities
<!-- None introduced. -->

### Modified Capabilities
- `portfolio-public`: The "Portfolio shell and navigation" requirement is updated so the shell header includes a centered Professional / Personal mode selector (in addition to the existing nav icons), reflecting the Stitch shell design.

## Impact

- `src/components/Shell.tsx`: insert the centered mode selector between the brand block and the social nav, wired to `useMode`/`useNavigate`.
- Reuses existing `ModeContext` (`professional` | `personal`) and Material Symbols styling; no new dependencies.
- Note: the existing `ModeToggle` on the Home screen is left unchanged (out of scope).
