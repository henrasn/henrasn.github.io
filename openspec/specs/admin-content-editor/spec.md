# admin-content-editor Specification

## Purpose

Provides the dev-only Slate.js content editor for authoring portfolio articles: a rich-text editing surface with formatting toolbar and code/checklist support, an article metadata panel, and dev write-back persistence to the article data files.

## Requirements

### Requirement: Dev-only content editor access

The system SHALL expose the content editor only during development. The editor page and its code SHALL be excluded from production builds; visiting the editor route in production SHALL fall through to the public fallback.

#### Scenario: Editor reachable in dev
- **WHEN** the dev server runs and the user opens the editor route for a known project
- **THEN** the content editor renders with that project's article loaded

#### Scenario: Editor absent from production
- **WHEN** a production build is served and the user opens the editor route
- **THEN** no editor UI appears and the request falls through to the public not-found/Home behavior

### Requirement: Rich article editing

The system SHALL provide a Slate.js editing surface for the article document supporting: toggling H1/H2 headings; bold, italic, inline code, and blockquote marks; bulleted, numbered, and checklist lists; code blocks with an optional language and filename (syntax-highlighted); hyperlinks; and inline images. Content SHALL be edited as the shared Slate node document, preserving structure and marks across edits.

#### Scenario: Formatting via toolbar
- **WHEN** the user selects text and applies a toolbar action (heading, bold, italic, code, blockquote, link, bullet/numbered list)
- **THEN** the selection transforms into the corresponding Slate node/mark and the change is undoable

#### Scenario: Code block with header
- **WHEN** the user inserts or edits a code block
- **THEN** it renders as a code card with a filename label, language-aware syntax highlighting, and monospace styling

#### Scenario: Checklist toggles
- **WHEN** the user clicks a checklist item
- **THEN** the item toggles between checked and unchecked, optionally reflecting task-complete styling

### Requirement: Article metadata management

The system SHALL render a metadata sidebar for the article: Post Title, URL Slug (displayed with a leading `/post/` prefix), Visibility (Draft/Published/Private), a tag list with add/remove interactions, and a Featured Image with a cover preview. The edited values SHALL be stored in the article metadata alongside the content.

#### Scenario: Metadata edits persist
- **WHEN** the user changes the title, slug, visibility, tags, or featured image and saves
- **THEN** the article JSON stores the updated metadata

### Requirement: Save and publish workflow

The system SHALL provide Save Draft and Publish actions that write the current article — content and metadata — back to the article data file via the dev server, and SHALL show a saved confirmation state after a successful write.

#### Scenario: Save writes article data
- **WHEN** the user saves a draft or publishes
- **THEN** the dev server writes the updated `{ metadata, content }` to the article's data file and the editor shows a saved indicator

#### Scenario: Guest reflects saved content
- **WHEN** the saved article data is loaded by the guest Project Detail page
- **THEN** the page renders the edited content

#### Scenario: No backend storage
- **WHEN** the editor saves
- **THEN** it does not use a database or remote API; the only persistence is the local article data file
