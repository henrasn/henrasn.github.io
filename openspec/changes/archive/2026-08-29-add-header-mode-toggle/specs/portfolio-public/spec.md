## MODIFIED Requirements

### Requirement: Portfolio shell and navigation

The system SHALL provide a sticky top navigation with backdrop-blur (12px, 80% surface opacity), brand block (name + "Senior Android Engineer"), a centered pill-shaped mode selector with "Professional" and "Personal" segments, social/contact nav icons, and a max-width 1200px container. The shell persists across all public routes and SHALL NOT render a profile avatar. The mode selector SHALL NOT render on the Home/Landing route (`/`).

#### Scenario: Sticky nav on scroll
- **WHEN** the user scrolls any public page
- **THEN** the nav remains fixed at the top with backdrop blur and 80% background opacity

#### Scenario: Brand visible
- **WHEN** any public route is rendered
- **THEN** the header shows the engineer's name and role label

#### Scenario: Mode selector visible in header
- **WHEN** any public route other than the Home/Landing page is rendered
- **THEN** the header shows a centered pill with "Professional" and "Personal" segments, and the segment matching the current route is highlighted with the primary treatment: "Professional" when the path starts with `/professional`, otherwise "Personal"

#### Scenario: Mode selector hidden on Home
- **WHEN** the Home/Landing page (`/`) is rendered
- **THEN** the header does not show the mode selector

#### Scenario: Personal remains active on non-professional routes
- **WHEN** the user selects "Personal" and then opens any route that does not start with `/professional` (for example a Project Detail page)
- **THEN** the "Personal" segment of the header selector remains highlighted

#### Scenario: Select Professional
- **WHEN** the user clicks the "Professional" segment of the header selector
- **THEN** the app switches to professional mode and navigates to `/professional`

#### Scenario: Select Personal
- **WHEN** the user clicks the "Personal" segment of the header selector
- **THEN** the app switches to personal mode and navigates to `/personal`
