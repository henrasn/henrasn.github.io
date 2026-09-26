## Why

The current Personal Mode page (`041` in the repo, `src/pages/Personal.tsx`) is a thin reuse of the professional layout — a hero, a generic timeline, and a card grid — that does not match the richer Stitch design. The Stitch project `16303680220794410027` defines a dedicated **Personal Mode / "Digital Playground"** screen (`4ae67ed7e75140408948d11957a53762`) with an expressive teal→blue identity, category filter chips, and a masonry gallery of side-project cards. Porting that screen faithfully gives the Personal mode the distinct, visually separated experience the dual-mode concept promises.

## What Changes

- Rebuild `src/pages/Personal.tsx` to the "Digital Playground" layout: a "Digital Playground" headline (`Playground` in teal `secondary-fixed`), a description paragraph, and decorative blurred background shapes.
- Add an interactive **filter chip row** (All, Android, Web, Experiments, Open Source) that filters the gallery with the active chip styled as a glowing teal pill (`secondary-fixed` background, `0 0 15px rgba(98,250,227,0.3)` glow).
- Replace the current uniform grid with a **masonry gallery** of five project cards (Compose-It, Neural Net Visualizer, Rusty API, HomeHub KMP, Glitch Art Generator), each with a varied thumbnail (gradient header, image, typographic `GLITCH` block), title, links (Material Symbols), description, and tech-stack chips tinted per-card.
- Add a footer matching the refined Stitch footer (name, copyright, Material Symbols icons, "Built with Stitch").
- Card category data (`data-category`) drives the filtering; filtering animates cards in/out.
- **BREAKING**: the previous Personal "Journey" timeline / "Beyond the IDE" / "Selected Works" sections are removed in favor of the gallery.

## Capabilities

### New Capabilities
- None — this change refines an existing capability.

### Modified Capabilities
- `portfolio-public`: The "Personal Mode screen" requirement changes to require the "Digital Playground" layout — filter chips (All/Android/Web/Experiments/Open Source) with filtering behavior, a masonry gallery of five project cards with per-card thumbnails and tech tags, and the matching footer — replacing the previous shared professional-style layout.

## Impact

- Affected: `src/pages/Personal.tsx` (full rebuild), new reusable component(s) in `src/components/` (masonry project card, filter chip), possibly a small extension to `src/data/` for personal-mode project/category metadata.
- Depends on existing `design-system` tokens: `surface-container`, `primary`/`secondary` (teal `#2dd4bf` → `#3b82f6`), `secondary-fixed`, `rounded-2xl`, Inter/Space Grotesk, Material Symbols — no new dependencies.
- No breaking change to public routes or the Professional/Home screens.

## Assumptions

- Personal-mode cards map to existing project entries where titles match (`compose-it`); the additional gallery entries (Neural Net Visualizer, Rusty API, HomeHub KMP, Glitch Art Generator) are added to the personal data set with categories/tech tags matching the Stitch source. Project cards link to `/project/:id` where a detail page exists.
- Filtering is client-side only (no URL params), matching the Stitch interaction.
