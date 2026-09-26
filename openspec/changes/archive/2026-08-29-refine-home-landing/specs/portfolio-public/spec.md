## MODIFIED Requirements

### Requirement: Home / Landing screen

The system SHALL faithfully port the refined Home/Landing Stitch screen (`04f7bdcce09f45ccb177cfa2d15365dd`): centered hero with name, role, tagline, floating blurred shapes and code snippets (`fun composeApp`, `@Composable`, `<constraintlayout>`), angle-bracket decoration, dual-mode pill, and a "Choose your path" section with two path cards (Professional Portfolio, Personal Sandbox) separated by an "OR" divider, plus a Home footer status line.

#### Scenario: Hero renders
- **WHEN** the user visits `/`
- **THEN** the hero shows the centered headline, role, tagline, and decorative floating elements matching the Stitch layout

#### Scenario: Path cards render
- **WHEN** the user visits `/`
- **THEN** below the hero a "Choose your path" section renders two large cards — Professional Portfolio and Personal Sandbox — each with an icon, title, description, and trailing CTA, separated by an "OR" divider

#### Scenario: Professional path navigates
- **WHEN** the user clicks the "View Work" CTA on the Professional Portfolio card
- **THEN** the app navigates to the Professional Mode screen

#### Scenario: Personal path navigates
- **WHEN** the user clicks the "Explore" CTA on the Personal Sandbox card
- **THEN** the app navigates to the Personal Mode screen

#### Scenario: Footer status line
- **WHEN** the user visits `/`
- **THEN** the Home screen shows a footer status line reading "System status: Online | Location: San Francisco, CA"
