## Context

The site is a static React SPA deployed to GitHub Pages. Article content currently lives in `src/data/projects.ts` as TipTap `JSONContent` (doc → heading/paragraph/codeBlock/taskList/taskItem nodes) and is rendered on the guest project detail page by a read-only TipTap `ArticleViewer` backed by five `@tiptap/*` packages plus `lowlight`. The data layer is committed to git — there is no backend and no runtime persistence. An upcoming content editor change will use Slate.js; storing Slate JSON now avoids a dual-format conversion layer.

## Goals / Non-Goals

**Goals:**
- Establish Slate `SlateNode[]` as the single canonical article document format.
- Remove all `@tiptap/*` and `@tiptap/pm` dependencies from the guest production bundle.
- Provide a plain-React Slate-to-HTML guest renderer that reuses the existing Kinetic prose styles and lowlight-based code highlighting.
- Convert the existing Compose-It article data from TipTap JSON to Slate JSON without manual re-creation.
- Lay shared Slate type definitions (`src/types/slate.ts`) usable by both the guest renderer and the future editor.

**Non-Goals:**
- Building any editing UI — the content editor is a separate change.
- Changing the article metadata schema (title/date/readingTime/tags remain unchanged).
- Altering the guest project detail page layout or behavior — only the rendering engine underneath changes.
- Migrating experience data or any other non-article data.

## Decisions

**Slate node shape** — Adopt a straightforward Slate document model (`children: SlateNode[]`) using `type` discriminators: `paragraph`, `heading` (level 1–2), `quote`, `code-block` (with optional `language`/`filename` attrs; children are `code-line` blocks containing text leaves), `bulleted-list`/`numbered-list` → `list-item` children, `check-list` → `check-item` (boolean `checked` attr), `image` (`src`, `alt`). Text leaves carry `marks` arrays (`bold`, `italic`, `code`) and link nodes (`type: 'link', href`) wrap text. This mirrors what the Stitch editor screen exposes and is the smallest set that covers the existing Compose-It content plus the editor toolbar features.

**Guest renderer approach** — Write a `SlateArticleViewer` component that recurses over the Slate node tree and renders React elements directly (no Slate runtime needed). Reuse `lowlight.ts` (unchanged) for code-block syntax highlighting and `prose.css` for typography. Task-list items render as disabled checkboxes with line-through styling already defined in prose.css. This eliminates the TipTap EditorContent wrapper and avoids pulling in `slate-react` for guest pages.

**Code highlighting in renderer** — Parse code-block text via the existing lowlight instance to produce an array of highlighted `Token` objects per line, mapped to `<span>` elements with Kinetic theme color classes. The `filename` attribute is rendered via a `data-filename` attribute on `<pre>`, picked up by the existing CSS `::after` rule.

**Data file strategy** — Move the Compose-It article content from the inline TS literal in `projects.ts` into `src/data/content/articles/compose-it.json`. The TS file imports it with a typed wrapper. This enables Vite JSON imports and prepares for the dev write-back middleware in Change 2. Enable `resolveJsonModule` in `tsconfig.app.json`.

**Backward compatibility** — The `article.content` type changes from TipTap `JSONContent` to `SlateNode[]` — this is a one-time breaking change to the static data. All current articles are hand-converted; no runtime migration or fallback is needed since there is only one article.

## Risks / Trade-offs

**One-time data migration** → Convert the existing Compose-It TipTap JSON to Slate JSON by hand (scripted in tasks) and verify identical rendered output. Single article, low risk; can diff before/after.

**No Slate runtime in guest bundle** → The renderer handles only the Slate subset we define. If a future article uses an unsupported node type, it silently won't render. Mitigation: renderer includes a fallback that logs unknown node types in dev and renders nothing visible in prod; the spec node set is closed and reviewed before implementation.

**Bundle size trade-off** → Removing five TipTap packages shrinks the guest chunk; slate/slate-react will be added later only in the lazy-loaded admin chunk (Change 3). Net effect is a smaller production bundle after Change 1.

## Migration Plan

1. Add `resolveJsonModule` to `tsconfig.app.json`.
2. Create `src/types/slate.ts` with the shared type definitions.
3. Write `SlateArticleViewer` and export it from `src/components/article/`.
4. Create the Slate JSON article file and update `projects.ts` to import it.
5. Swap the import in `ProjectDetail.tsx` from old `ArticleViewer` to new `SlateArticleViewer`.
6. Remove `@tiptap/*` and `@tiptap/pm` from `package.json` and run `npm install`.
7. Delete `src/components/article/ArticleViewer.tsx`.
8. Verify lint + tsc + vite build pass; visual comparison of `/project/compose-it` against the current live rendering.

Rollback: revert the commits; TipTap deps and original ArticleViewer are restored from git history.

## Open Questions

_None — all decisions are settled for this scope._
