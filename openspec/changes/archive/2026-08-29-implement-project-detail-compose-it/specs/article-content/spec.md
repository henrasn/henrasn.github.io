## ADDED Requirements

### Requirement: Structured article source

The system SHALL provide a structured article source, per project, living in the static data layer (no backend). Each article SHALL be a document describing ordered content: section headings, paragraphs with inline formatting, bullet and task lists, and code blocks with an optional language label. Articles SHALL carry metadata — title, publication date, reading time, and an ordered list of topic tags. Articles are expressed in an editor-compatible format so the same content can later be opened in a content editor.

#### Scenario: Known project defines article
- **WHEN** a project record includes an article
- **THEN** the article exposes ordered headings, paragraphs, lists, code blocks with their content, and its metadata title/date/reading-time/tags

#### Scenario: Article renderable read-only
- **WHEN** the article source is rendered on the guest Project Detail page
- **THEN** content is presented read-only with no editor controls or caret

### Requirement: Article tags

The system SHALL expose an ordered list of topic tags on each article and render them in the guest article header as a horizontal row of uppercase pill chips, each tinted with an accent from the design system palette in order (primary, secondary, tertiary), keeping the tags row inside the design system and with no new tokens.

#### Scenario: Tags render as tinted pills
- **WHEN** an article defines tags (e.g. Kotlin, Jetpack Compose, Coroutines)
- **THEN** the header shows them as an ordered row of uppercase pills tinted in order (primary, secondary, tertiary)

### Requirement: Code block syntax highlighting

The system SHALL render code blocks with language-specific syntax highlighting whenever the block declares a language, using a stable grammar source, colorized to the Kinetic theme palette (code surface background, monospace, accent hues for tokens). Blocks without a declared language SHALL render as plain monospace text.

#### Scenario: Highlighted block
- **WHEN** a code block declares a language (e.g. Kotlin)
- **THEN** syntax tokens are colorized on a code surface background consistent with the design system

#### Scenario: Language-less block
- **WHEN** a code block declares no language
- **THEN** it renders as plain monospace text with no token colors

### Requirement: Article typography

The system SHALL present article prose with the Kinetic typography scale: section headings using the headline font/weight, body text in the design system body font with comfortable line height, and monospace styling for code and inline code. Nothing in the article layout introduces colors or fonts outside the design system.

#### Scenario: Headings and prose render
- **WHEN** an article renders section headings and paragraphs
- **THEN** headings use the headline treatment and paragraphs use the body treatment with adequate reading spacing

#### Scenario: Inline code styled
- **WHEN** an article uses inline code or code blocks
- **THEN** a monospace face is applied on a code surface