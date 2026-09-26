## 1. Dependencies

- [x] 1.1 Add TipTap dependencies to `package.json`: `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-task-list`, `@tiptap/extension-task-item`, and `lowlight` (TipTap v3, React-19 compatible); run `npm install` and confirm the build resolves.

## 2. Article content data

- [x] 2.1 Add the `article` field (metadata: title, date, reading time, ordered `tags`; content: TipTap JSON document) to the `Project` type in `src/data/projects.ts` and a `nextProjectId` (or next-by-order) reference field.
- [x] 2.2 Add the Compose-It article content (headings, prose, Kotlin code blocks, challenge task-lists, verdict) and metadata with ordered tags `["Kotlin", "Jetpack Compose", "Coroutines"]`, authored from the fetched Stitch Guest View HTML.

## 3. Article rendering components

- [x] 3.1 Implement `src/components/article/ArticleViewer.tsx` rendering read-only TipTap content (`useEditor` with `editable: false`, StarterKit with `codeBlock` disabled, `CodeBlockLowlight`, `TaskList`, `TaskItem`) via `EditorContent`.
- [x] 3.2 Create a lowlight instance registering only the used grammars (Kotlin with `kt` alias, plus small set) and wire it into `CodeBlockLowlight`.
- [x] 3.3 Add `src/components/article/prose.css` styling article typography and `.hljs-*` syntax tokens with existing Kinetic tokens (headline headings, body paragraphs, code-surface block/inline code, task-list check marks), no new tokens.
- [x] 3.4 Implement the article-header tags row (`ArticleTags`): ordered uppercase pill chips tinted via the accent palette primary/secondary/tertiary (`bg-<accent>/10 text-<accent>`).

## 4. Project Detail page rebuild

- [x] 4.1 Rebuild `src/pages/ProjectDetail.tsx`: guest header actions (share via `navigator.share` w/ clipboard fallback, `mailto:` mail, "Back to Playground" to `/`), hero using existing per-project thumbnail art, and the article rendered via `ArticleViewer`.
- [x] 4.2 Add the "Next Project" card at the end of the article wired to the `nextProjectId` reference (SyncEngine), navigating to its `/project/:id`.
- [x] 4.3 Preserve the not-found state for unknown ids (with link back to Home) and the prior metadata layout as the fallback for known projects without an `article`.

## 5. Verification

- [x] 5.1 Run `npm run lint` and `npm run build`; verify no errors.
- [x] 5.2 Visually verify in dev server: `/project/compose-it` (article with highlighted Kotlin blocks, task-lists, Next Project → SyncEngine), a non-article project (fallback layout), and an unknown id (not-found). Found during verification: Personal-mode Compose-It card did not navigate; fixed by linking `PersonalCard` to `/project/:id` when a detail record exists.