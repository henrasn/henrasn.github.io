## MODIFIED Requirements

### Requirement: Structured article source

The system SHALL provide a structured article source, per project, living in the static data layer (no backend). Each article SHALL be a document composed of a typed node tree — headings (levels 1–2), paragraphs, blockquotes, code blocks (optional language and filename attributes), bulleted lists, numbered lists, check lists (with a checked state), inline images, and text leaves supporting bold, italic, and inline code marks plus hyperlink inline elements. Articles SHALL carry metadata — title, publication date, reading time, and an ordered list of topic tags. The canonical document format SHALL be a Slate-compatible node tree so the same content can be loaded, edited, and saved by a Slate.js content editor without data loss.

#### Scenario: Known project defines article
- **WHEN** a project record includes an article
- **THEN** the article exposes its ordered node-tree content (headings, paragraphs, quotes, code blocks, lists, inline marks) and its metadata title/date/reading-time/tags

#### Scenario: Article renderable read-only
- **WHEN** the article source is rendered on the guest Project Detail page
- **THEN** content is presented read-only with no editor controls or caret

#### Scenario: Content round-trip through editor
- **WHEN** an existing article's Slate node content is loaded into the content editor and saved without user edits
- **THEN** the saved content is structurally identical to the original — no nodes, marks, or attributes are lost or reordered
