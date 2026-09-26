## 1. Shell header mode selector

- [x] 1.1 In `src/components/Shell.tsx`, add imports for `useMode` (from `../context/ModeContext`) and `useNavigate` (from `react-router-dom`).
- [x] 1.2 Insert a centered selector between the brand block and the social nav using a `flex-1 flex justify-center` slot: a pill container `bg-surface-container-high rounded-full p-1.5 shadow-inner w-60 hidden md:flex`.
- [x] 1.3 Render two segments labeled "Professional" and "Personal" inside the pill. The active segment derives from the current route via `useLocation()` — `pathname.startsWith("/professional")` → "Professional", otherwise "Personal" — and uses `bg-primary text-on-primary-container rounded-full`; the inactive segment uses `text-on-surface-variant hover:text-on-surface`. Each segment uses `flex-1 px-3 py-1.5 text-center` per design.md so the spacing is not too tight.
- [x] 1.4 Wire each segment's `onClick` to `setMode(...)` plus `navigate('/professional' | '/personal')` so clicking switches mode and routes accordingly. The active highlight remains route-derived (see 1.3) so it stays correct even when navigation happens without `setMode()` (e.g. from the Home cards or browser back/forward).
- [x] 1.5 Hide the header selector on the Home/Landing route: use `useLocation()` in `Shell.tsx` and conditionally render the selector only when the current pathname is not `/`.

## 2. Verification

- [x] 2.1 Run `tsc -b` and `eslint .` and confirm they pass.
- [x] 2.2 With the dev server, confirm the header shows the centered Professional/Personal selector on `/professional` and `/personal` (and not on `/`), that the active segment reflects the current route, that clicking a segment navigates to the other route and updates the active segment, and that navigating from Home via the "Personal" card (or opening a non-`/professional` route such as Project Detail) keeps "Personal" highlighted.
