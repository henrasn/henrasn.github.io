## Purpose

Provides the dev-only admin console for the static portfolio: an authenticated-by-environment gate, the DevAdmin shell layout, an Experience Manager page for editing professional roles, and write-back persistence that saves changes into the committed mock data files.

## ADDED Requirements

### Requirement: Dev-only admin access

The system SHALL expose the admin portal only during development. Admin routes SHALL be registered only in a dev build; a production build SHALL NOT ship admin routes or admin code, and visiting `/admin` in production SHALL fall through to the public Home fallback.

#### Scenario: Admin reachable in dev
- **WHEN** the dev server runs and the user opens an admin route
- **THEN** the admin portal renders

#### Scenario: Admin absent from production
- **WHEN** a production build is served and the user opens `/admin`
- **THEN** no admin UI appears and the request falls through to the public not-found/Home behavior

### Requirement: DevAdmin shell

The system SHALL render the admin portal inside a DevAdmin shell mirroring the Stitch screen: a fixed left sidebar (brand block, navigation items Dashboard, Experience, Projects, and a System group with Settings, plus a user card with name/role/logout icon) and a fixed top bar (search, notifications, help, avatar). The nav SHALL show an active state for the current section, and only the Experience section SHALL delegate to a functional page — Dashboard, Projects, and Settings SHALL render clearly-marked "not built" placeholders.

#### Scenario: Shell renders with active nav
- **WHEN** the user is on the Experience section
- **THEN** the sidebar marks Experience as active and the top bar is visible

#### Scenario: Unbuilt sections show placeholder
- **WHEN** the user opens the Dashboard, Projects, or Settings section
- **THEN** a placeholder panel indicates the section is not implemented

### Requirement: Experience management page

The system SHALL render an Experience Manager page on the Experience section: a page header (repeated eyebrow, "Career Timeline" title, description, and an "Add Position" primary button); a statistics panel (Total Roles, Years Exp., and a Skill Utilization bar list); a toggle between list and grid layouts; a search filter over positions; and a list/grid of position cards. Each position card SHALL show company logo, role, a "Current" indicator when the position is the current role, company and location, date range and employment type, achievement bullets, tech-stack chips, and actions to edit, delete, move up, and move down.

#### Scenario: Overview stats compute
- **WHEN** the Experience Manager renders
- **THEN** Total Roles equals the number of positions and Years Exp. reflects the collected seniority span of the positions

#### Scenario: List/grid toggle and search
- **WHEN** the user toggles the view or types into the search field
- **THEN** the positions render in the chosen layout filtered by the query

#### Scenario: Position CRUD and reorder
- **WHEN** the user adds, edits, deletes, or moves a position up/down
- **THEN** the list reflects the change immediately in memory and the change is persisted via write-back

#### Scenario: Add/Edit form fields
- **WHEN** the user adds or edits a position
- **THEN** the modal captures role title, company name, location, start/end dates, a Current Role flag, achievements & impact text (marked as supporting Markdown), and a comma-separated tech stack, with required-field validation before saving

### Requirement: Dev write-back persistence

The system SHALL persist admin edits by writing the full experience array back to the committed mock data file on the dev server (`src/data/content/experience.json`), formatted deterministically. The public site SHALL continue to render experience from that same data source.

#### Scenario: Save writes the data file
- **WHEN** the user saves a position change in the admin portal
- **THEN** the dev server writes the updated experience array to the data file, and the public timeline renders the new data on its next load

#### Scenario: No backend storage
- **WHEN** the admin portal saves changes
- **THEN** it does not use a database or remote API; the only persistence is the local data file