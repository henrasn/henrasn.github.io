# Design — Project Detail: Compose-It (Guest View)

## Context

See proposal.md. Current `src/pages/ProjectDetail.tsx` renders a metadata-only card (image, description, tech chips, links) for any `/project/:id`. The Stitch Guest View (`036f2de16adb454dad0bf8722d8ca4ed`) instead presents Compose-It as a long-form technical article: header actions (share / mail / "Back to Playground"), hero, prose sections, syntax-highlighted Kotlin code blocks, challenge task-lists, a verdict, and a "Next Project" → SyncEngine card. Content must be stored in the static data layer (no backend) and later be editable via an admin content editor (Stitch `7b1671b9c69d49c6b8da34dafb00b391`).

## Goals / Non-Goals

**Goals**
- Guest Project Detail faithfully ports the Compose-It article layout with Kinetic styling (no new design tokens).
- Article content is stored as TipTap JSON per project in the mock data layer, render-able read-only and editor-compatible for the future admin change.
- Syntax-highlighted code blocks, task lists, next-project navigation, not-found fallback.

**Non-Goals**
- No admin/content-editor UI in this change (same document model powers it later).
- No backend, no persistence, no SSR.
- No new design tokens or fonts (reuse `design-system`; Material Symbols already present in the app).

## Decisions

### 1. TipTap v3 + lowlight for rendering and future editing
Use `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-task-list`, `@tiptap/extension-task-item`, and `lowlight`.

- Chosen over **Lexical** (first-class, less hand-built node/plugin work for code + read-only), **Slate/Plate** (beta, highest effort), **BlockNote/Quill** (opinionated UI that fights the Kinetic aesthetic).
- TipTap **v3** has first-class React 19 support (the project is on React 19).
- Alternated over `generateHTML` (headless): real ProseMirror view is required for lowlight's decoration-based highlighting, and `editable:false` gives selectable-but-read-only text with no caret. Single `useEditor` instance per article.
- StarterKit's bundled `codeBlock` is disabled; `CodeBlockLowlight` replaces it.

### 2. Article content model (TipTap JSON) in the mock data layer
Add an optional `article?: Article` on `Project` in `src/data/projects.ts`. `Article` is `{ metadata: { title, date, readingTime, tags }, content }` where `content` is raw TipTap JSON nodes (headings `h2`, paragraphs with marks `bold/italic/code`, `codeBlock {language}`, `bulletList`, `taskList`/`taskItem`); `tags` is the ordered list rendered as the header pill row (see Decision 8). Compose-It (and the SyncEngine teaser) carry content authored from the fetched Stitch HTML.

- **Fallback**: projects without `article` keep the prior metadata layout (Personal-mode cards link to `/project/:id`; they must not 404). Deterministic `next` navigation: explicit `nextProjectId` on `Project`, else next item in the projects source order; default card references SyncEngine.

### 3. Read-only article component
New `src/components/article/ArticleViewer.tsx`:
- `useEditor({ editable: false, extensions: [StarterKit.configure({ codeBlock:false }), CodeBlockLowlight.configure({lowlight}), TaskList, TaskItem] , content })`, rendered via `<EditorContent/>`.
- TaskItem inputs are disabled/read-only in guest mode; the rest of the page is plain DOM.

### 4. Code highlighting with a bounded grammar set
Create the lowlight instance with only the grammars the articles use (Kotlin + `kt` alias, plus `xml`/`javascript`/`yaml` as sprinkle coverage) to cap bundle size (lowlight's `common` set is large).

### 5. Prose styling with existing Kinetic tokens
A dedicated CSS scope (e.g. `src/components/article/prose.css`) styled to `DESIGN.md`: headline font/weight for `h2`, body treatment and comfortable line-height for `p`, monospace + code-surface background for `pre`/`inline code`, and `.hljs-*` token classes mapped to the Kinetic palette (comments muted, keywords primary, strings secondary-teal, punctuation slate). No new tokens; no Tailwind-only prose plugin dependency.

### 6. Header actions and hero
- Share: `navigator.share()` when available, else clipboard fallback (Material Symbols `share`).
- Mail: `mailto:` prefilled subject/body (Material Symbols `mail`).
- "Back to Playground" → `Link` to `/` (Home).
- Hero: project art block derived from existing per-project thumbnail treatment (gradient/typographic), reusing `projects.ts` imagery rather than new image assets.

### 7. Not-found path unchanged
Unknown `/project/:id` keeps the existing not-found state with a link back to Home (covered by the preserved scenario).

### 8. Article-header tags row from ordered metadata
Article metadata carries an ordered `tags: string[]` (Kotlin, Jetpack Compose, Coroutines for Compose-It). The header renders them above the title as uppercase pill chips, tinted by cycling the accent palette primary → secondary → tertiary (`bg-<accent>/10 text-<accent>`, label-md, 12px, rounded-full), exactly matching the Stitch chips (Kotlin=primary, Jetpack Compose=secondary, Coroutines=tertiary). Tags live in the article metadata in the data layer, so no new design tokens or components beyond a small `ArticleTags` row.

## Risks / Trade-offs

- **TipTap v3 peer/API churn** → pin exact versions; v3 is React-19 native; if install peer warnings arise, use npm's default resolver and document versions in design (fallback `--legacy-peer-deps` only if blocked).
- **lowlight bundle weight** → register only needed grammars (`kotlin`/`kt`, plus small set) instead of importing `common`.
- **Hand-authored TipTap JSON drifts from the Stitch HTML** → author content directly from the fetched screen HTML; verify visually in dev against the screenshot.
- **`navigator.share` availability differs** → feature-detect; clipboard fallback; `mailto:` is always functional.
- **Projects without `article` link to detail routes** → fallback prior metadata layout keeps those routes functional (no regression).
- **Highlighting requires a real editor view** → use `editable:false` + `EditorContent` (not headless HTML) so lowlight decorations render.

## Migration Plan

- Single feature-branch change; no data migration (mock data only). Rollback = revert `src/pages/ProjectDetail.tsx`, article components, and data additions, and remove the four TipTap deps from `package.json`.
- Verify: `npm install` succeeds; `npm run build` + `npm run lint` pass; open `/project/compose-it` (article), a non-article project (fallback), and an unknown id (not-found) in the dev server.

## Open Questions

- None blocking: the future Admin "Content Editor" screen reuses this document model and is explicitly scoped to a later change.