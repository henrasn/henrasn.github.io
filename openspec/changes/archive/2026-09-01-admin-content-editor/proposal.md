## Why

The Stitch screen "Admin: Content Editor (Slate.js)" (`543577085b8e436585011577a76880d2`) defines the article authoring experience for the portfolio. Once articles are stored as Slate JSON (Change 1) and the dev-only admin write-back + shell exist (Change 2), the missing piece is the editor itself: a Slate.js page where articles are authored and saved back to the committed data files — the static-site equivalent of a CMS (save locally, commit to publish).

## What Changes

- **Dev-only content editor page**: a standalone editor (thin header, no admin sidebar) reachable only in dev at `/admin/editor/:projectId`, lazy-loaded and absent from production builds, mirroring the Stitch screen: sticky toolbar (H1/H2 · bold/italic/code/quote · link/image · bullet/numbered/checklist) and a "Saved" status indicator.
- **Slate.js editing**: article content is edited as a Slate document using the shared `SlateNode` schema from Change 1 — headings, paragraphs, blockquotes, code blocks (filename header + syntax-highlighted via lowlight), bulleted/numbered lists, checklists (checked/unchecked with strikethrough), inline bold/italic/code marks, links, and images.
- **Metadata sidebar**: Post Title, URL Slug (shown as `/post/…`), Visibility (Draft/Published/Private), Tags chips with add/remove, and Featured Image (URL-based cover). `article.metadata` gains `slug`, `status`, and `coverImage` fields.
- **Save workflow**: Save Draft and Publish both POST the full article `{ metadata, content }` to a dev write-back endpoint that writes `src/data/content/articles/<projectId>.json`; on success the toolbar shows the `cloud_done Saved` indicator.
- **Guest integration**: the Project Detail page prefers `article.metadata.coverImage` when present for the hero (falling back to `project.image`).
- **Dependencies**: `slate`, `slate-react`, `slate-history` added (guest bundle untouched — the editor is a lazy admin chunk).

## Capabilities

### New Capabilities

- `admin-content-editor`: Dev-only Slate.js article editor — loading an article, rich-text editing (toolbar, code blocks, checklists, inline marks, links, images), metadata management (title, slug, visibility, tags, featured image), and dev write-back persistence of the article JSON.

### Modified Capabilities

- `portfolio-public`: The "Project Detail (guest)" requirement gains a scenario — the article hero uses the article's featured image when one is defined, falling back to the project image.