## ADDED Requirements

### Requirement: Portfolio Mode Selector

The system SHALL render a "Select Portfolio Mode" section on the Home/Landing route with a responsive 1×2 grid (stack on mobile, two columns on `md`+) of mode cards: a Professional card (icon `work_history`, title "Professional", subtitle "Resume, Timeline & Skills") and a Personal card (icon `auto_awesome`, title "Personal", subtitle "Apps, Articles, Hobbies"). Clicking the Professional card SHALL navigate to `/professional`; clicking the Personal card SHALL navigate to `/personal`.

#### Scenario: Card navigates to mode page
- **WHEN** the user clicks the Professional card
- **THEN** the app navigates to `/professional`
- **WHEN** the user clicks the Personal card
- **THEN** the app navigates to `/personal`

#### Scenario: Personal card renders as active
- **WHEN** the Portfolio Mode Selector renders
- **THEN** the Personal card shows the active treatment: teal `secondary/50` ring, slight scale-up, gradient wash, and a "Gallery" badge with a glowing teal icon block

### Requirement: Home stats bar

The system SHALL render a stats bar on the Home/Landing route showing four metrics — "8+ Years / Android Focus", "15M+ Production Installs", "99.94% Crash-Free Rate", "100% Modern Compose" — with accent-highlighted numerals (primary for value-leading stats, `secondary` for crash-free) and vertical divider lines between columns on `md`+ screens.

#### Scenario: Stats render on desktop
- **WHEN** the Home screen renders on a screen of `md` width or wider
- **THEN** four stats display in a grid separated by divider lines with accent-colored numerals

#### Scenario: Stats stack on mobile
- **WHEN** the Home screen renders on a small screen
- **THEN** the stats bar shows a 2-column arrangement with the secondary metrics stacked below

## MODIFIED Requirements

### Requirement: Home / Landing screen

The system SHALL faithfully port the Home/Landing "Refined Landing Experience" Stitch screen (`d183f89f346d4b8d87680789555fb10f`) on the `/` route: an availability status badge with animated ping dot ("Open to select Senior & Staff Android roles"), centered hero typography, a skill tag row, a contact CTA row, the Portfolio Mode Selector, and the stats bar. The hero SHALL show the name "Henra Surya", the role "Senior Android Engineer" rendered in teal `secondary`, and a tagline emphasizing Kotlin and Jetpack Compose terms. The current "John Doe" placeholder hero, floating code snippets, and the "Choose your path" section are removed.

#### Scenario: Hero renders
- **WHEN** the user visits `/`
- **THEN** the centered hero shows the name "Henra Surya", the teal role line "Senior Android Engineer", and the tagline with emphasized Kotlin / Jetpack Compose terms matching the Stitch layout

#### Scenario: Status badge renders
- **WHEN** the Home screen renders
- **THEN** an availability pill with a pulsing teal dot and the text "Open to select Senior & Staff Android roles" appears above the hero

#### Scenario: Skill tags render
- **WHEN** the Home screen renders above the contact row
- **THEN** the skill pills Kotlin, Jetpack Compose, Coroutines & Flow, Clean Architecture & MVI, and Baseline Profiles render in `code` monospace with `primary/10` backgrounds

#### Scenario: Contact CTAs render
- **WHEN** the Home screen renders
- **THEN** the contact row shows a primary WhatsApp button and secondary LinkedIn and Email buttons, each with an icon and a lift-on-hover treatment

#### Scenario: Stats bar renders
- **WHEN** the user scrolls the Home screen to the stats bar
- **THEN** the four production metrics render in the resolved layout with accent-highlighted numerals

## REMOVED Requirements

### Requirement: Dual-mode toggle

**Reason**: The pill-shaped dual-mode toggle is replaced by the Portfolio Mode Selector card grid per the refined Home/Landing design; mode selection is now expressed as navigation to the `/professional` and `/personal` routes.

**Migration**: Users select a portfolio mode by clicking the corresponding Portfolio Mode Selector card on the Home screen instead of toggling a pill; no session-persisted toggle state is carried forward.