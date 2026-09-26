## Context

Articles are stored as Slate `SlateNode[]` in `src/data/content/articles/<projectId>.json` with `{ metadata, content }` shape (Change 1) and rendered by a plain-React `SlateArticleViewer` on the guest page. The dev-only admin infrastructure exists from Change 2: `import.meta.env.DEV`-gated lazy admin routes, the `DevAdmin` shell, and the write-back Vite plugin (`config/admin-save-plugin.ts`, `apply: "serve"`). This change builds the Slate.js editor screen (`543577085b8e436585011577a76880d2`) on top and extends the write-back plugin with an article endpoint. Repo-local OpenSpec root; `.openspec.yaml` per change.

## Goals / Non-Goals

**Goals:**
- Faithfully port the Stitch content editor screen: sticky toolbar, editing pane, metadata sidebar, Save Draft / Publish, Saved indicator.
- Edit articles as the shared Slate document with zero data loss on save (round-trip identical).
- Persist via the existing dev write-back pattern (article endpoint writes the article JSON file).
- Keep guest rendering unchanged except the hero cover fallback.

**Non-Goals:**
- Authentication — dev-only, localhost-only.
- Real cloud/DB persistence, auth, or CDN uploads; Featured Image is a URL (static-host friendly).
- Creating brand-new projects/articles end-to-end — the editor targets an existing article by project id (wiring a new project into `projects.ts` stays manual).
- Building a Dashboard/Projects admin — out of scope here (Change 2 placeholders).

## Decisions

**Library setup** — `slate`, `slate-react`, `slate-history` (verified: `slate-react@0.126.x` peers `react >=18.2.0`, so React 19 is fine; `slate-history@0.113.x` peers `slate >=0.65.3`). `slate-dom` comes transitively. The editor lives entirely in the lazy admin chunk so the guest bundle and public build are unaffected.

**Document model = Change 1 schema** — The editor works directly on the same `SlateNode[]` the guest renderer reads; no conversion layer. Node types: heading(1|2), paragraph, quote, code-block (language?, filename?, children = code-line text), bulleted/numbered-list → list-item, check-list → check-item (checked), image (src, alt?), link (href), text leaves with bold/italic/code marks. Toolbar buttons map 1:1 onto these.

**Editor architecture** — `src/pages/admin/ContentEditor.tsx`:
- Uses `withHistory` + a custom `withArticles` schema enhancer (constrains block nesting where needed, e.g. list-item only inside lists, code-lines inside code-block).
- `renderElement`/`renderLeaf` implement the visual panel: code-block card (traffic dots + filename + highlighted lines via the existing `lowlight`), check-item toggles, link rendering, image render.
- `SlateArticleViewer` styling (prose.css) is reused for a faithful look; the pane itself is styled like the editor card from the screen.
- The editing pane's first line is the article title as a styled input bound to `metadata.title` (the screen shows the title in the pane); it is not part of the Slate doc.

**Code block UX** — The toolbar "code" button converts the current block to a `code-block` node (children become `code-line` texts). When the selection is inside a code block, an inline control row appears: filename text input, language select (kotlin/javascript/xml/yaml — the registered lowlight grammars), and a close/convert-back action. Highlighting is render-time only (via lowlight tokenization), never stored.

**Checklist UX** — `check-item` nodes render a Material `check_circle`/`radio_button_unchecked` icon button; clicking toggles `checked` and applies strikethrough styling to checked items (matches prose.css task-list look).

**Link & image UX** — Link button wraps the selection in a `link` node, prompting for a URL (small in-app prompt input). Image button prompts for a URL and inserts an `image` node with an `alt` from the prompt. Featured Image is a separate metadata field (also URL). No file uploads.

**Metadata sidebar** — Post Title, URL Slug (`/post/` prefix shown, slug value stored without prefix), Visibility select (Draft/Published/Private) stored as `metadata.status`, Tags chip list (add via input, remove via `close` icon), Featured Image (URL input + cover preview; cleared via a button). All state lives in the article's `metadata` object.

**Save flow** — Save Draft and Publish both call `POST /__admin/articles/<projectId>` with `{ metadata, content }`. The plugin (extended in this change) validates the shape, writes pretty JSON to `src/data/content/articles/<projectId>.json`, returns `{ ok }`; the toolbar shows a transient `cloud_done Saved` indicator on success (error state otherwise). No draft vs published persistence difference in Dev — status is metadata only; publishing to the site remains the manual commit/rebuild step.

**Guest hero cover** — `ProjectDetail` uses `article.metadata.coverImage ?? project.image` for the hero `img` only; everything else unchanged.

**Reachability** — The editor is a standalone page (matching the screen's thin-header layout, no admin sidebar). Reach it via a dev-only "Content Editor" entry added to the DevAdmin sidebar (Change 2 shell) pointing at the first article-backed project, and via `/admin/editor/<projectId>` URL; a small project switcher dropdown lets the editor open any article-backed project.

## Risks / Trade-offs

**React 19 × slate-react** → Peer range allows React 19, but slate-react ecosystem lags; any runtime incompatibility shows only in the dev editor. Mitigation: isolate slate usage to the lazy admin chunk; smoke-test the editor in the verification phase and pin exact versions in package.json.

**No-diff round-trip** → A buggy editor could reorder/reshape nodes on a no-op save. Mitigation: verification task 5.3 saves an unedited article and diffs the file — it must be byte-identical (except formatting).

**Write-back plugin coupling** → Change 2 already ships the plugin; this change extends it with `/__admin/articles/:id`. Mitigation: additive endpoint only, shared helpers unchanged.

**Editor scope creep** → Metadata and content both stored in one JSON — the file is the single source of truth; a partial save could write old content with new metadata. Mitigation: save always sends complete `{ metadata, content }`.

## Migration Plan

1. Add `slate`, `slate-react`, `slate-history` to package.json.
2. Extend write-back plugin with the article endpoint.
3. Build editor infrastructure (toolbar components, element/leaf renderers, title input, metadata sidebar).
4. Wire ContentEditor page + admin nav entry + project switcher.
5. Guest hero cover fallback in ProjectDetail.
6. Verify (lint, tsc+build, save round-trip diff, prod exclusion grep).

Rollback: revert commits; delete plugin article endpoint and editor module; guest page unaffected (coverImage optional).

## Open Questions

- New-article authoring flow (creating a project entry + empty article JSON from the editor) is intentionally deferred; revisit if authoring new articles becomes painful.