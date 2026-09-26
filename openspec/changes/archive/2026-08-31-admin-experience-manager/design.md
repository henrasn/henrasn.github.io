## Context

The site is a static React SPA (no backend, no DB) deployed to GitHub Pages; all content lives in committed data files. Experience entries are currently a hardcoded type + array in `src/data/experience.ts` consumed by the public `ExperienceTimeline` on `/professional`. Change 1 (`migrate-articles-to-slate`) will already have added `resolveJsonModule` and established the `src/data/content/` JSON convention used here. `.openspec.yaml` root is repo-local (no OpenSpec store).

## Goals / Non-Goals

**Goals:**
- Ship a dev-only admin portal whose code is completely absent from production bundles.
- Faithfully port the Stitch "Admin: Manage Experience" screen: shell, stats, position cards, list/grid toggle, search, and Add/Edit modal.
- Persist admin edits by writing `src/data/content/experience.json` via a dev-only Vite middleware — no DB, no remote API.
- Keep the public Professional timeline rendering unchanged.

**Non-Goals:**
- Building Dashboard, Projects, or Settings screens — placeholders only.
- Rendering Markdown in the public timeline (achievements are stored as markdown-capable strings but rendered as plain bullets).
- Any authentication scheme — the portal is dev-only on localhost; production never ships it.
- The Slate.js article content editor — that is Change 3.

## Decisions

**Production exclusion strategy** — Register the admin route group as a lazy-loaded module referenced only inside an `import.meta.env.DEV` guard:

```ts
// App.tsx
const AdminPortal = import.meta.env.DEV ? lazy(() => import("./admin/AdminRoutes")) : null
```

Rolldown/Vite statically replaces `import.meta.env.DEV` with `false` in production, dead-code-eliminating the guard and the dynamic import, so no admin chunk ships. In changed files this is verified by grepping the built JS for a `DevAdmin` marker. React Router declarative `<Routes>` stays as-is; an extra Suspense-wrapped admin subtree is added for dev. This beats CSS/route hiding — the payload is genuinely excluded.

**Write-back mechanism** — A Vite plugin `config/admin-save-plugin.ts` with `apply: "serve"` (never in build) hooks the dev server's `configureServer` middleware. Endpoint `POST /__admin/experience` validates the JSON body against the experience shape, writes it pretty-printed (2-space indent, trailing newline) to `src/data/content/experience.json` resolved via `process.cwd()`, and returns `{ ok, file }`. Module-style imports mean the public page already reads from the same committed JSON — editing the file is the persistence. Chosen over alternatives:
- *LocalStorage + manual export*: too manual, no single source of truth.
- *Writing TS modules from the browser*: fragile formatting, breaks type-checking.
- *A "real" write path in prod*: impossible by design (static hosting, committed content).

**Data model extension** — `Experience` grows only optional fields (`location`, `employmentType`, `techStack`, `current`). Existing records convert by filling obvious values (active→current, company stays, add placeholder location/employmentType) rather than leaving them empty; `ExperienceTimeline` ignores the new fields. `current` replaces the `active` flag's *meaning* for the admin badge while `active` stays for the public glowing milestone; the two coexist (admin set one implied from the other on write).

**In-page state & save flow** — The page keeps the working copy in React state; every mutating action (add/edit/delete/reorder) updates state then immediately POSTs the full array (small data, simplest consistency model). "Saved" UX: a transient indicator on successful POST (mirrors the editor's `cloud_done` later). No optimistic UI beyond local state, since dev write-back is nearly instant.

**Skill Utilization & stats** — Stats compute from data: Total Roles = length; Years Exp. derived from the earliest start to present; Skill Utilization bars come from a static hardcoded mapping (Kotlin/Android SDK 95%, System Architecture 85%, CI/CD & DevOps 70%) matching the screen — data-driven derivation of skill percentages is out of scope.

**Random vs deterministic ids** — New positions get `crypto.randomUUID()` ids (dev-only). Stable across saves because ids persist in the JSON, avoiding duplicate keys for React lists.

## Risks / Trade-offs

**Middlewrite path depends on cwd** → The plugin resolves `src/data/content/experience.json` relative to `process.cwd()`; Vite dev is normally run from the repo root. Mitigation: plugin resolves relative to the Vite config `root` (defaults to cwd) and errors clearly if the file can't be found.

**Repo gets modified by dev saves** → That is the intended workflow (commit = publish), but a stray save can dirty the tree. Mitigation: the plugin logs the written path; the change doc states that saving is deliberate and commits are manual.

**Ordering conflict with other changes** → The plugin and `App.tsx` gating are also touched by Change 3. Mitigation: implement Change 2 fully before Change 3 in a separate session; Change 3 extends the same plugin with an article endpoint rather than rewriting it.

**`import.meta.env.DEV` dead-code elimination** → If the admin routes module is statically imported anywhere reachable in prod, it survives into the bundle. Mitigation: only the guarded lazy import references it; task 5.4 greps the built output for admin markers.

## Migration Plan

1. Extend `Experience` type and move the array to `src/data/content/experience.json`; update `experience.ts` to import it; confirm public page still compiles/renders.
2. Add `config/admin-save-plugin.ts` + register in `vite.config.ts`.
3. Add dev-gated lazy admin routes + `AdminRoot` shell + placeholder sections in `App.tsx`/`src/admin/`.
4. Build the Experience Manager page (header, stats, cards, toggle, search, modal).
5. Verify (lint, tsc+build, dev flows, prod exclusion grep).

Rollback: revert the feature commits; the public site needs no changes and `experience.json` remains valid data either way.

## Open Questions

_None — auth, data provenance, and skill metrics are settled for this scope._