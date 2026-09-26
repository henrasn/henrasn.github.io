# implement-professional-mode Delta

## MODIFIED Requirements

### Requirement: Professional Mode screen

The system SHALL faithfully port the Professional Mode Stitch screen (`5ab008691bbd4b2c8b181c66df2dc406`) as the `/professional` route: a CTA hero (headline-xl tagline, body-lg description, primary "Download Resume" pill button and secondary "View LinkedIn" pill button, and a right-column decorative Kotlin/Android illustration with a gradient blur glow on `lg`+), an Experience section with a sticky left header beside a vertical 2px timeline of detailed milestone cards (company logo, role, company + dates, achievement bullets with Material Symbols icons, glowing active state), and a full-width "Technical Arsenal" band of three skill-category cards (Languages, Frameworks, Architecture) with icon, decorative blur blob, and accent-tinted pill chips. The Professional page SHALL NOT render a project grid or the placeholder metric cards.

#### Scenario: Hero renders CTA
- **WHEN** the user visits `/professional`
- **THEN** the hero shows the headline, description, and "Download Resume" / "View LinkedIn" buttons

#### Scenario: Professional content visible
- **WHEN** Professional Mode is active
- **THEN** hero, timeline milestones, and Technical Arsenal skills are rendered with slate/blue styling

#### Scenario: Timeline milestones render
- **WHEN** the Experience section renders
- **THEN** each milestone card shows logo, role, company, dates, and achievement bullets, and the active milestone glows with the primary accent

#### Scenario: Technical Arsenal renders
- **WHEN** the user reaches the Technical Arsenal section
- **THEN** the three skill categories render with icon, category accent, and accent-tinted pill chips

#### Scenario: No project grid
- **WHEN** the Professional page renders
- **THEN** no project cards are shown on the page

### Requirement: Mock data layer

The system SHALL provide static mock data sources (TS) for projects, experience, and skills that drive the ported screens, with no backend required for the public-only scope. Experience records SHALL include role, company, period, company logo, achievement bullets, accent, and active state. The skills source SHALL organize skills into named categories, each with an icon, accent color, and per-chip highlighting.

#### Scenario: Data drives listing
- **WHEN** the Professional or Personal project grid renders
- **THEN** the number of cards equals the entries in the projects data source

#### Scenario: Experience data drives timeline
- **WHEN** the Professional Experience timeline renders
- **THEN** each milestone's role, company, period, logo, accent, and bullets come from the experience data source

#### Scenario: Skills data drives arsenal
- **WHEN** the Technical Arsenal section renders
- **THEN** the categories, icons, accents, and chips match the skills data source