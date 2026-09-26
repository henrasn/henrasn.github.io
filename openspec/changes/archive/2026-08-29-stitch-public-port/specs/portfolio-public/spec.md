## Purpose

Delivers the public portfolio experience — shell, navigation, mode toggle, and faithful ports of the four public Stitch screens — so visitors can browse a Senior Android Engineer's work with full Stitch fidelity.

## ADDED Requirements

### Requirement: Portfolio shell and navigation

The system SHALL provide a sticky top navigation with backdrop-blur (12px, 80% surface opacity), brand block (name + "Senior Android Engineer"), nav icons (terminal/link/mail via Material Symbols), avatar slot, and max-width 1200px container. The shell persists across all public routes.

#### Scenario: Sticky nav on scroll
- **WHEN** the user scrolls any public page
- **THEN** the nav remains fixed at the top with backdrop blur and 80% background opacity

#### Scenario: Brand visible
- **WHEN** any public route is rendered
- **THEN** the header shows the engineer's name and role label

### Requirement: Client-side routing

The system SHALL provide client-side routes for Home/Landing (`/`), Professional Mode (`/professional` or mode param), Personal Mode (`/personal` or mode param), and Project Detail (`/project/:id`) with a guest view that hides edit affordances. Unknown routes fall back to Home.

#### Scenario: Navigate to project detail
- **WHEN** the user clicks a Project Card
- **THEN** the app navigates to `/project/:id` and renders the guest Project Detail screen

#### Scenario: Guest detail hides editing
- **WHEN** Project Detail is rendered as guest (public route)
- **THEN** no admin edit controls are present

### Requirement: Dual-mode toggle

The system SHALL provide a pill-shaped mode toggle on the Home/Landing screen that switches between Professional and Personal modes with a 0.3s cubic-bezier(0.4,0,0.2,1) transition, persisting the selection for the session.

#### Scenario: Toggle switches mode
- **WHEN** the user clicks the mode toggle pill
- **THEN** the accent treatment switches between solid blue and teal→blue gradient and content emphasis updates

#### Scenario: Mode persists
- **WHEN** the user navigates between Home, Professional, and Personal after toggling
- **THEN** the selected mode remains active until changed

### Requirement: Home / Landing screen

The system SHALL faithfully port the Home/Landing Stitch screen (`04f7bdcce09f45ccb177cfa2d15365dd`): centered hero with name, role, tagline, floating blurred shapes and code snippets (`fun composeApp`, `@Composable`, `<constraintlayout>`), angle-bracket decoration, and dual-mode pill.

#### Scenario: Hero renders
- **WHEN** the user visits `/`
- **THEN** the hero shows the centered headline, tagline, and decorative floating elements matching the Stitch layout

### Requirement: Professional Mode screen

The system SHALL faithfully port the Professional Mode Stitch screen (`5ab008691bbd4b2c8b181c66df2dc406`): vertical timeline (2px line, 12px circles, glowing active), skills/metrics, and project grid with `rounded-2xl` cards and Electric Blue accents.

#### Scenario: Professional content visible
- **WHEN** Professional Mode is active
- **THEN** timeline milestones, skills, and project cards are rendered with slate/blue styling

### Requirement: Personal Mode screen

The system SHALL faithfully port the Personal Mode Stitch screen (`4ae67ed7e75140408948d11957a53762`): same structure as Professional but with Teal→Blue gradient washes and expressive personal copy.

#### Scenario: Personal styling differs
- **WHEN** Personal Mode is active
- **THEN** accent areas use the teal→blue gradient rather than solid blue

### Requirement: Project Detail (guest)

The system SHALL faithfully port the Project Detail guest view (`036f2de16adb454dad0bf8722d8ca4ed`): gallery/hero, description, architecture/tech-stack chips (pill, primary 10% bg / 100% text), and related sections. It SHALL map to data from the mock project store.

#### Scenario: Project detail populates from data
- **WHEN** the user opens `/project/:id` for a known project
- **THEN** the detail page shows that project's title, description, tech chips, and imagery from the data layer

#### Scenario: Unknown project
- **WHEN** the user opens `/project/:id` for an unknown id
- **THEN** the app shows a not-found state and offers navigation back to Home

### Requirement: Shared portfolio components

The system SHALL provide shared components matching DESIGN.md: `ProjectCard` (rounded-2xl, 1px border `#334155` → hover `#3b82f6`, lift shadow `0 20px 40px rgba(59,130,246,0.1)`), `Chip` (pill, primary 10% bg), `Button` (primary solid blue, secondary transparent+border), `Vertical Timeline` (2px line), all using Kinetic tokens.

#### Scenario: Card hover
- **WHEN** the user hovers a Project Card
- **THEN** the border transitions to `#3b82f6` and the soft blue shadow appears

### Requirement: Mock data layer

The system SHALL provide a static mock data source for projects and experience (JSON/TS) that drives the ported screens, with no backend required for the public-only scope.

#### Scenario: Data drives listing
- **WHEN** the Professional or Personal project grid renders
- **THEN** the number of cards equals the entries in the projects data source
