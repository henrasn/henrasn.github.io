## MODIFIED Requirements

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
