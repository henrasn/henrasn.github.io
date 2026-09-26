## MODIFIED Requirements

### Requirement: Project Detail (guest)

The system SHALL faithfully port the Project Detail guest view Compose-It article experience (`036f2de16adb454dad0bf8722d8ca4ed`): a guest-only header with share/mail actions and a "Back to Playground" link, a project hero, an article-header tags row (uppercase accent-tinted pill chips with an ordered primary/secondary/tertiary tint), and the full project write-up rendered as a rich article — prose sections with headings, syntax-highlighted code blocks, challenge task-lists, a verdict section, and a "Next Project" card with forward navigation. The page SHALL render article content and tags from the structured article source in the mock data layer (no backend), SHALL hide all admin edit affordances, and SHALL show a not-found state with navigation back to Home for unknown ids.

#### Scenario: Project detail populates from data
- **WHEN** the user opens `/project/:id` for a known project that defines an article
- **THEN** the page renders that project's title, hero, tech-stack chips, and full article content (headings, prose, code blocks, task-lists, verdict) from the data layer

#### Scenario: Project detail renders article from data
- **WHEN** the user opens `/project/:id` for a known project that defines an article
- **THEN** the article content (headings, prose, code blocks, task-lists, verdict) renders from the structured article source

#### Scenario: Article tags render
- **WHEN** the article header renders
- **THEN** the ordered tag pills appear above the article title as uppercase accent-tinted chips (primary, secondary, tertiary) matching the Stitch layout

#### Scenario: Code block highlights
- **WHEN** an article section contains a code block
- **THEN** the block renders with monospace styling and language-appropriate syntax highlighting matching the Kinetic theme

#### Scenario: Task list marks progress
- **WHEN** an article renders a task list
- **THEN** each item shows a check indicator with the content, matching the Stitch layout

#### Scenario: Next project navigates
- **WHEN** the user clicks the "Next Project" card at the end of an article
- **THEN** the app navigates to that project's `/project/:id`

#### Scenario: Guest hides editing
- **WHEN** Project Detail is rendered as guest (public route)
- **THEN** no admin edit controls are present

#### Scenario: Unknown project
- **WHEN** the user opens `/project/:id` for an unknown id
- **THEN** the app shows a not-found state and offers navigation back to Home