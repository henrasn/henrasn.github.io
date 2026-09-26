# portfolio-public Specification

## Purpose

Delivers the public portfolio experience — shell, navigation, mode toggle, and faithful ports of the four public Stitch screens — so visitors can browse a Senior Android Engineer's work with full Stitch fidelity.

## Requirements

### Requirement: Portfolio shell and navigation

The system SHALL provide a sticky top navigation with backdrop-blur (12px, 80% surface opacity), brand block (name + "Senior Android Engineer"), a centered pill-shaped mode selector with "Professional" and "Personal" segments, nav icons including an external GitHub profile link, an external LinkedIn profile link, and a mail link (via Material Symbols), and max-width 1200px container. The shell persists across all public routes and SHALL NOT render a profile avatar. The mode selector SHALL NOT render on the Home/Landing route (`/`).

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

#### Scenario: GitHub link opens profile
- **WHEN** the user clicks the GitHub icon in the nav
- **THEN** the app opens the engineer's GitHub profile (`https://github.com/henrasn`) in a new tab

#### Scenario: LinkedIn link opens profile
- **WHEN** the user clicks the LinkedIn icon in the nav
- **THEN** the app opens the engineer's LinkedIn profile (`https://www.linkedin.com/in/henrasetianugraha/`) in a new tab

#### Scenario: No avatar in nav
- **WHEN** any public route is rendered
- **THEN** the nav shows no profile avatar icon

### Requirement: Client-side routing

The system SHALL provide client-side routes for Home/Landing (`/`), Professional Mode (`/professional` or mode param), Personal Mode (`/personal` or mode param), and Project Detail (`/project/:id`) with a guest view that hides edit affordances. Unknown routes fall back to Home.

#### Scenario: Navigate to project detail
- **WHEN** the user clicks a Project Card
- **THEN** the app navigates to `/project/:id` and renders the guest Project Detail screen

#### Scenario: Guest detail hides editing
- **WHEN** Project Detail is rendered as guest (public route)
- **THEN** no admin edit controls are present

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

### Requirement: Personal Mode screen

The system SHALL faithfully port the Personal Mode Stitch screen (`4ae67ed7e75140408948d11957a53762`) as a "Digital Playground": a header with "Digital Playground" (the word "Playground" in teal `secondary-fixed`), a description paragraph, and decorative blurred background shapes. It SHALL render an interactive filter row with chips All / Android / Web / Experiments / Open Source, where the active chip is a glowing teal pill (`secondary-fixed` background with `0 0 15px rgba(98,250,227,0.3)` glow). The gallery SHALL be a responsive masonry layout (1/2/3 columns) of five project cards with per-card varied thumbnails, Material Symbols links, descriptions, and tinted tech-stack chips. Cards SHALL carry category metadata used for filtering.

#### Scenario: Personal styling differs
- **WHEN** Personal Mode is active
- **THEN** accent text and the active filter chip use the teal (`secondary-fixed`) treatment rather than solid blue

#### Scenario: Filter chip filters the gallery
- **WHEN** the user clicks a filter chip (e.g. "Android") while the gallery is rendered
- **THEN** only cards whose category set includes that filter remain visible; clicking "All" shows every card, and the clicked chip renders as the glowing teal active pill

#### Scenario: Masonry gallery renders
- **WHEN** Personal Mode is rendered with no filter applied
- **THEN** the five project cards render in a 1/2/3-column masonry layout with per-card thumbnails (gradient header, image, or typographic block) and tinted tech tags

#### Scenario: Footer renders
- **WHEN** the Personal Mode page is scrolled to the bottom
- **THEN** the footer shows the name, copyright, Material Symbols icon row, and "Built with Stitch" line

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

### Requirement: Article hero uses featured image

The guest page hero SHALL show the article's featured image when the article metadata defines one, falling back to the project image when it does not.

#### Scenario: Hero prefers article cover
- **WHEN** an article defines a featured image in its metadata
- **THEN** the guest page hero renders that image instead of the project image

#### Scenario: Hero falls back to project image
- **WHEN** an article defines no featured image
- **THEN** the guest page hero renders the project's image

### Requirement: Shared portfolio components

The system SHALL provide shared components matching DESIGN.md: `ProjectCard` (rounded-2xl, 1px border `#334155` → hover `#3b82f6`, lift shadow `0 20px 40px rgba(59,130,246,0.1)`), `Chip` (pill, primary 10% bg), `Button` (primary solid blue, secondary transparent+border), `Vertical Timeline` (2px line), all using Kinetic tokens.

#### Scenario: Card hover
- **WHEN** the user hovers a Project Card
- **THEN** the border transitions to `#3b82f6` and the soft blue shadow appears

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
