## Why

The article content editor (coming in a later change) will use Slate.js as its editing engine. Currently articles are stored as TipTap JSONContent and rendered by a read-only TipTap `ArticleViewer` on the guest project detail page. Keeping two different editor models (TipTap for guest, Slate for admin) would require a conversion layer and bundle both runtimes. Migrating to Slate now — before the admin editor lands — establishes one canonical format, removes five TipTap packages from the guest bundle, and makes the data format ready for the Slate.js content editor change that follows.

## What Changes

- **BREAKING** Article data format: `article.content` changes from TipTap `JSONContent` to a Slate `SlateNode[]` document. Existing articles must be converted once.
- Guest renderer replaced: `ArticleViewer` (TipTap) → `SlateArticleViewer` (plain React mapping Slate nodes to HTML via prose.css + lowlight for highlighted code).
- `@tiptap/*` and `@tiptap/pm` removed from `package.json`; no runtime dependency on any editor framework for the guest build.
- Shared types module (`src/types/slate.ts`) introduced for Slate node structure — used by renderer now and by the content editor in Change 3.
- `tsconfig.app.json` updated: `resolveJsonModule: true` added (required for importing the new JSON article data files).
- Compose-It article content moved into `src/data/content/articles/compose-it.json`; `projects.ts` imports it.

## Capabilities

### New Capabilities

_None — no new requirement sets are introduced._

### Modified Capabilities

- `article-content`: The "Structured article source" requirement is updated — the canonical document format is now a typed Slate node tree (headings, paragraphs, quotes, code blocks with optional language+filename, bullet/numbered/check lists, inline bold/italic/code marks, links, images). A new scenario is added for editor round-trip preservation.

_No change to `portfolio-public` — the guest behavior (rendering article content from the data layer) is format-agnostic and remains satisfied._
