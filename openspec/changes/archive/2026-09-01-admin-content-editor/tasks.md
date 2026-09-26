## 1. Dependencies & Write-Back Endpoint

- [x] 1.1 Add `slate`, `slate-react`, and `slate-history` to `package.json` (pin installed versions) and run `npm install`
- [x] 1.2 Extend `config/admin-save-plugin.ts` (from Change 2) with `POST /__admin/articles/:projectId` — validate body is `{ metadata, content }` with `content` a Slate node array, write pretty JSON to `src/data/content/articles/<projectId>.json`, return `{ ok, file }`; guard against path traversal in the projectId
- [x] 1.3 Ensure the plugin registers for both endpoints under `apply: "serve"` and is tested via curl in dev

## 2. Editor Core

- [x] 2.1 Create `src/pages/admin/editor/editorSchema.ts`: shared Slate custom types helper (deserialize/validate articles as `SlateNode[]`), `withHistory`, and a `withArticleSchema` editor enhance (enforces list/code-line nesting)
- [x] 2.2 Create `src/pages/admin/editor/EditorToolbar.tsx`: sticky toolbar matching the screen — H1/H2 · bold/italic/code-block/quote · link/image · bullet/numbered/checklist buttons with active states + "Saved" indicator slot
- [x] 2.3 Create `src/pages/admin/editor/elements.tsx` — Slate `renderElement`/`renderLeaf`: heading(1|2), paragraph, quote, lists, check-item (toggle via `ToggleEvent` + Material icons + strikethrough), link, image, and code-block card (traffic dots, filename label, language-select + filename input + convert-back controls when focused, lowlight-highlighted lines)
- [x] 2.4 Implement link insert (prompt URL, wrap selection in `link` node) and image insert (prompt URL + alt, insert `image` node) helpers
- [x] 2.5 Create `src/pages/admin/ContentEditor.tsx`: page layout per the screen (thin fixed header, editor card + toolbar, flex-row with w-80 right metadata aside), loads `metadata` + `SlateNode[]` from the article data by `:projectId`, title input bound to `metadata.title` above the doc, unsaved-changes awareness
- [x] 2.6 Create `src/pages/admin/editor/MetadataSidebar.tsx`: Post Title, URL Slug (`/post/` prefix display), Visibility select (Draft/Published/Private), Tags chips (add input + remove `close`), Featured Image (URL + preview + clear); all updates flow into the article `metadata` object

## 3. Save Flow & Integration

- [x] 3.1 Wire Save Draft / Publish buttons to POST `{ metadata, content }` to the article endpoint; on success show the transient `cloud_done Saved` indicator (error state otherwise)
- [x] 3.2 Add dev-only "Content Editor" entry to the DevAdmin sidebar (`src/admin/AdminRoot.tsx`) linking to `/admin/editor/` for the first article-backed project
- [x] 3.3 Add a project switcher (dropdown of article-backed projects) in the editor header navigating to `/admin/editor/:projectId`; register the route in `src/admin/AdminRoutes.tsx`
- [x] 3.4 Update `src/pages/ProjectDetail.tsx` guest hero: use `article.metadata.coverImage` when present, else `project.image`

## 4. Verification

- [x] 4.1 `npm run lint` and `npm run build` pass with no new errors
- [x] 4.2 Dev server: `/admin/editor/compose-it` loads the article (title, blockquote, code card with filename + highlighted Kotlin, checklist); toolbar actions apply marks/headings/lists; checklist toggles; code-block filename/language editing works; link and image insert render correctly; metadata sidebar edits reflect in the pane title and metadata
- [x] 4.3 Round-trip integrity: open the editor on the current article, make zero edits, click Publish, then `git diff` the article JSON — only formatting may differ if any; node content must be identical
- [x] 4.4 Save round-trip: make a real edit (add a paragraph, toggle a checklist item, add a tag), save, reload the page and the guest `/project/compose-it` — both reflect the change
- [x] 4.5 Production exclusion: `npm run build`, serve the build — `/admin/editor/compose-it` falls through to Home; grep `dist/` JS for "SlateEditor"/"ContentEditor" markers → zero hits; guest bundle has no slate runtime
- [x] 4.6 Guest hero: with `coverImage` set in the article JSON, `/project/compose-it` hero shows the featured image; removing it falls back to `project.image`
