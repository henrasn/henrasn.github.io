# admin-portal Delta

## MODIFIED Requirements

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

#### Scenario: Edit auto-fills the modal
- **WHEN** the user opens the modal to edit an existing position
- **THEN** every form field (role, company, location, start date, end date, Current Role flag, achievements, tech stack) is pre-filled with that position's current data, and opening the modal for any other position replaces the fields with that position's data

#### Scenario: Start/end dates use month and year selector
- **WHEN** the user edits the start or end date in the add/edit modal
- **THEN** the date is chosen from a month and year selector rather than free text, and the resulting date is composed into the same period string format ("Start — End" or "Start — Present") that the public site renders

#### Scenario: Current Role clears the end date
- **WHEN** the user enables the Current Role flag
- **THEN** the end date is treated as "Present" and no explicit end date is captured

#### Scenario: Delete requires confirmation
- **WHEN** the user presses Delete on a position
- **THEN** a confirmation popup appears identifying the position instead of deleting it immediately, and the position is removed and persisted only after the user confirms; canceling or dismissing the popup leaves the list unchanged
