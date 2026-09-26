## MODIFIED Requirements

### Requirement: Portfolio shell and navigation

The system SHALL provide a sticky top navigation with backdrop-blur (12px, 80% surface opacity), brand block (name + "Senior Android Engineer"), nav icons including an external GitHub profile link, an external LinkedIn profile link, and a mail link (via Material Symbols), and max-width 1200px container. The shell persists across all public routes and SHALL NOT render a profile avatar.

#### Scenario: Sticky nav on scroll
- **WHEN** the user scrolls any public page
- **THEN** the nav remains fixed at the top with backdrop blur and 80% background opacity

#### Scenario: Brand visible
- **WHEN** any public route is rendered
- **THEN** the header shows the engineer's name and role label

#### Scenario: GitHub link opens profile
- **WHEN** the user clicks the GitHub icon in the nav
- **THEN** the app opens the engineer's GitHub profile (`https://github.com/henrasn`) in a new tab

#### Scenario: LinkedIn link opens profile
- **WHEN** the user clicks the LinkedIn icon in the nav
- **THEN** the app opens the engineer's LinkedIn profile (`https://www.linkedin.com/in/henrasetianugraha/`) in a new tab

#### Scenario: No avatar in nav
- **WHEN** any public route is rendered
- **THEN** the nav shows no profile avatar icon
