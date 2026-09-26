## 1. Project Setup

- [x] 1.1 Add `"resolveJsonModule": true` to `tsconfig.app.json` compilerOptions
- [x] 1.2 Create `src/types/slate.ts` exporting shared Slate node type definitions (SlateNode, TextLeaf, MarkType, etc.) covering the full document model: heading (1–2), paragraph, quote, code-block (language?, filename?), code-line, bulleted-list, numbered-list, list-item, check-list, check-item (checked), image (src, alt?), link (href), text with marks (bold, italic, code)
- [x] 1.3 Create `src/data/content/articles/` directory

## 2. Article Data Conversion

- [x] 2.1 Convert the existing Compose-It TipTap JSONContent from `src/data/projects.ts` to Slate `SlateNode[]` format and write it to `src/data/content/articles/compose-it.json`
- [x] 2.2 Update `src/data/projects.ts`: import the JSON file, re-export typed data, and change `article.content` type from `JSONContent` to `SlateNode[]`; remove the old inline `import type { JSONContent }` from `@tiptap/core`

## 3. Guest Renderer

- [x] 3.1 Create `src/components/article/SlateArticleViewer.tsx` — a plain-React component that recursively maps `SlateNode[]` to JSX elements: headings → `h2`/`h1`, paragraphs → `p`, blockquotes → `blockquote`, code-blocks → `<pre>` with `data-filename` attr + lowlight-highlighted `<code>` inside, bulleted/numbered lists → `ul`/`ol` + `li`, check-lists → disabled checkbox items with strikethrough on checked, images → `img`, links → `a`, inline marks (bold → `strong`, italic → `em`, code → `code`)
- [x] 3.2 Add an `unknown node type` dev-only console warning for any Slate node type the renderer does not recognize (no crash, no visible output in prod)
- [x] 3.3 Update `src/pages/ProjectDetail.tsx`: swap import from old `ArticleViewer` to `SlateArticleViewer`; pass `article.content` (now `SlateNode[]`)

## 4. Cleanup & Dependency Removal

- [x] 4.1 Delete `src/components/article/ArticleViewer.tsx` (the TipTap-based renderer)
- [x] 4.2 Remove from `package.json`: `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-task-item`, `@tiptap/extension-task-list`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`
- [x] 4.3 Run `npm install` to update `package-lock.json`

## 5. Verification

- [x] 5.1 Run `npm run lint` and `npm run build` — zero errors, no new warnings beyond the existing chunk-size note
- [x] 5.2 Dev server: visually confirm `/project/compose-it` renders identically — highlighted Kotlin code block with traffic-dot header + filename, task-list checkboxes, headings, inline code, prose typography
- [x] 5.3 Confirm `/project/sky-track` (fallback) and `/project/nope` (not-found) still render correctly
- [x] 5.4 Confirm `dist/` bundle no longer contains any `tiptap` references (grep the built JS for `StarterKit` or `EditorContent` → zero hits)
