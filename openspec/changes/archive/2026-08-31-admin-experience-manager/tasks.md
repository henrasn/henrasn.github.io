## 1. Experience Data Layer

- [x] 1.1 Extend `Experience` type in `src/data/experience.ts` with optional `location`, `employmentType`, `techStack`, and `current` fields
- [x] 1.2 Create `src/data/content/experience.json` containing the three existing positions converted to the new fields (mapping active→current, adding realistic location/employmentType/techStack)
- [x] 1.3 Update `src/data/experience.ts`: remove the inline array literal, import the JSON (typed via a small assertion), keep exporting `experiences` and the `Experience` type
- [x] 1.4 Confirm `src/components/ExperienceTimeline.tsx` still compiles and renders identically on `/professional` (no public behavior change)

## 2. Dev Write-Back Plugin

- [x] 2.1 Create `config/admin-save-plugin.ts`: a Vite plugin with `apply: "serve"` exposing `POST /__admin/experience` — parse JSON body, validate it is the experience array shape, pretty-print (2-space) to `src/data/content/experience.json` (resolved from the Vite root), return `{ ok, file }`; clear error if write fails
- [x] 2.2 Register the plugin in `vite.config.ts`

## 3. Admin Portal Shell

- [x] 3.1 Add dev-only admin route gating in `src/App.tsx`: `const AdminPortal = import.meta.env.DEV ? lazy(() => import("./admin/AdminRoutes")) : null`, with a Suspense fallback, mounting `/admin` and `/admin/:section` only on the dev conditional
- [x] 3.2 Create `src/admin/AdminRoutes.tsx`: `AdminRoot` shell with an `<Outlet/>` and routes for experience (default redirect), dashboard, projects, settings
- [x] 3.3 Create `src/admin/AdminRoot.tsx`: DevAdmin shell mirroring the Stitch screen — fixed `w-72` left sidebar (terminal brand block, nav Dashboard/Experience/Projects + System group Settings with active states, user card "Admin User / Root Access" + logout icon) and fixed top bar (search, notifications, help, avatar); layout uses Kinetic tokens
- [x] 3.4 Create placeholder panels for dashboard, projects, and settings sections ("not built" state)

## 4. Experience Manager Page

- [x] 4.1 Create `src/pages/admin/ExperienceManager.tsx`: page header (eyebrow "Experience Manager", h1 "Career Timeline", description, "Add Position" primary button), Overview stats panel (Total Roles count, Years Exp. derived, Skill Utilization bars static mapping), list/grid toggle, and search filter wiring (via a small admin UI context for the top-bar search)
- [x] 4.2 Create a `PositionCard` component: company logo (img with fallback icon), role + "Current" badge, company • location, date range + employment type, achievement bullets, tech-stack chips, and action buttons (edit / delete / move up / move down)
- [x] 4.3 Create the Add/Edit Position modal: fields role title, company name, location, start date, end date, "Current Role" checkbox, "Achievements & Impact" textarea (Supports Markdown label), comma-separated tech stack; required-field validation; Cancel / Save Position actions
- [x] 4.4 Wire mutations (add / update / delete / reorder up-down) to update local state and POST the full array to the write-back endpoint on every change; `current` flag derives from the Current Role checkbox; new ids via `crypto.randomUUID()`

## 5. Verification

- [x] 5.1 `npm run lint` and `npm run build` pass with no new errors
- [x] 5.2 Dev server: `/admin/experience` renders the shell + page; navigating Dashboard/Projects/Settings shows placeholders; top-bar search filters positions; list/grid toggle switches layout
- [x] 5.3 CRUD round-trip: add, edit (incl. Current Role), delete, and move a position — each POST updates `src/data/content/experience.json` (verify pretty JSON on disk) and `/professional` reflects the change after a reload
- [x] 5.4 Production exclusion: `npm run build` then serve the build — `/admin` falls through to Home; grep the `dist/` JS for the marker text ("DevAdmin") → zero hits