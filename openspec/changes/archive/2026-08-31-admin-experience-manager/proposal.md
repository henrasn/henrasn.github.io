## Why

The public portfolio is a static site — no backend, no database — and experience entries are currently hardcoded in `src/data/experience.ts`. Editing a role means hand-editing TypeScript and rebuilding. The Stitch screen "Admin: Manage Experience" (`2985d72563054d428ef1da76219d1a8b`) defines a dev-only admin console to manage professional roles, achievements, and impact metrics. This change builds that console (admin shell + Experience Manager page) with changes written back to committed JSON data files in dev, so "save" edits the source of truth and the public timeline reflects it on the next reload/build.

## What Changes

- **Dev-only admin portal**: `/admin/*` routes registered only when `import.meta.env.DEV`, code-split into a lazy chunk so production builds exclude all admin code (production `/admin` falls through to Home).
- **DevAdmin shell**: fixed left sidebar (brand, Dashboard/Experience/Projects/Settings nav with active states, System section, user card) + fixed top bar (search, notifications, help, avatar), mirroring the Stitch screen.
- **Experience Manager page**: "Career Timeline" header with Add Position; overview stats (Total Roles, Years Exp., Skill Utilization bars); list/grid view toggle; search filter; position cards (company logo, role, "Current" badge, company • location, date range + employment type, achievement bullets, tech-stack chips, edit/delete/move-up/move-down actions); Add/Edit modal (role, company, location, start/end dates, Current Role checkbox, achievements textarea marked "Supports Markdown", comma-separated tech stack).
- **Experience data model extended**: `Experience` gains optional `location`, `employmentType`, `techStack`, and `current` fields. The raw array moves to `src/data/content/experience.json`; `experience.ts` imports it and re-exports typed data. The public `ExperienceTimeline` stays backward-compatible (markdown stored, rendered as plain bullet lines).
- **Dev write-back**: a Vite dev-only middleware plugin exposes `POST /__admin/experience` that pretty-prints the edited array into `src/data/content/experience.json`. Saving is "writing the data file"; publishing to GitHub remains a manual commit/push.
- **Placeholders**: Dashboard / Projects / Settings nav items render "not built" placeholder panels (screens are out of scope).

## Capabilities

### New Capabilities

- `admin-portal`: Dev-only admin console covering dev access gating, the DevAdmin shell layout, the experience management CRUD page, overview statistics, and dev write-back persistence of experience data.

### Modified Capabilities

_None — `portfolio-public` requirements are unchanged: the public Professional timeline and mock data layer contract still hold (experience records continue to include the existing required fields, now augmented with optional ones)._