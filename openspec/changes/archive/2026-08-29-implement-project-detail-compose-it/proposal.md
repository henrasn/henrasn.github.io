## Why

The current Project Detail page (`src/pages/ProjectDetail.tsx`) is a simple static card — hero image, description, tech chips, links. The Stitch project includes a far richer "Project Detail: Compose-It (Guest View)" screen (`036f2de16adb454dad0bf8722d8ca4ed`, 7500px) that presents the project as a full technical **article**: share/mail actions, a back link, hero, prose sections with headings (e.g. "The Catalyst for Change"), syntax-highlighted Kotlin code blocks, check-circle challenge lists, a verdict section, and a "Next Project" card with forward navigation. Porting it makes the portfolio's most important content — the deep project write-up — a first-class experience instead of a metadata card.

The article content must be render-able read-only (guest) and editable later (the same project has an "Admin: Content Editor" screen `7b1671b9c69d49c6b8da34dafb00b391`). Research selected **TipTap** (`@tiptap/react` + `@tiptap/starter-kit` + `@tiptap/extension-code-block-lowlight`) as the library: headless (pixels match the Kinetic design system), read-only render via `editable:false`, code-block highlighting, and a JSON/HTML document model that fits the no-backend mock-data layer.

## What Changes

- Add TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, plus `lowlight`) as project dependencies for article rendering (read-only) and future editing.
- Rebuild `src/pages/ProjectDetail.tsx` to faithfully port the Compose-It Guest View: share/mail header actions, "Back to Playground" link, hero, an article-header tags row (uppercase accent-tinted pill chips — Kotlin, Jetpack Compose, Coroutines), article prose, headings, syntax-highlighted code blocks, task-lists, verdict, bookmark/share action, and "Next Project" card.
- Add a structured article content model + data (`article` field on project data or a companion store) with TipTap-compatible JSON/HTML content per project, plus article metadata (title, date, reading time, ordered tags), driving the ported page.
- Add TipTap styling in the Kinetic dark theme (code block surfaces, syntax palette, drop-cap/typography defaults matching DESIGN.md) with no new design tokens.
- Keep existing behavior: `/project/:id` route, unknown-project not-found state with a back-to-home link, and the mock data layer (no backend).
- **BREAKING**: ProjectDetail's previous static "Back to projects" nav and metadata-only layout are replaced by the article-first Compose-It layout.

## Capabilities

### New Capabilities
- `article-content`: Structured article content model for project write-ups — TipTap-compatible JSON/HTML content plus metadata (title, date, reading time, ordered tags), read-only rendering with syntax highlighting and accent-tinted tag pills, and a data source per project. This is the render side now; the admin edit experience (Stitch "Admin: Content Editor") is a future change built on the same content model.

### Modified Capabilities
- `portfolio-public`: The "Project Detail (guest)" requirement changes to require the full Compose-It Guest View article experience — rich article content (headings, prose, code blocks, lists) rather than a metadata-only card, plus the guest-only header actions and next-project navigation, while preserving the unknown-project fallback.

## Impact

- Affected: `src/pages/ProjectDetail.tsx` (full rebuild), `src/data/projects.ts` (article content), new `src/components/` article renderer + code-block styling, `package.json` (TipTap deps), existing `design-system` tokens reused.
- New dependencies: `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `lowlight`.
- No backend required; content lives in the static data layer. No changes to routing config, Shell, or other screens.