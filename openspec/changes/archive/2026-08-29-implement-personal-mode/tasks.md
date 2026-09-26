## 1. Personal gallery data

- [x] 1.1 Extend `src/data/` with Personal Mode gallery metadata: extend the existing `Project` type (or add a `PersonalProject` type) to include `categories: string[]` and per-card `accent`/`links` fields, covering the five cards — Compose-It, Neural Net Visualizer, Rusty API, HomeHub KMP, Glitch Art Generator — each matching the Stitch source's data-category set (android/oss/web/experiments)
- [x] 1.2 Reuse the existing `compose-it` entry where the title maps, and add the four new gallery entries with their Stitch descriptions, tech-stack chips (Kotlin/Jetpack Compose, Three.js/TypeScript, Rust/Actix, KMP/Ktor, Haskell/CLI), and per-card accent tint/materials-symbol links

## 2. Shared personal components

- [x] 2.1 Create a `PersonalCard` component in `src/components/` that renders the masonry card: varied thumbnail (image, gradient header, or typographic `GLITCH` block), title that tints toward the card accent on hover, Material Symbols link row (non-functional `#` placeholders), line-clamped description, and tinted tech-stack chips using existing `Chip`/tokens
- [x] 2.2 Create a `FilterChip` component that renders an inactive pill (`surface-container` bg, on-surface text) vs the glowing active pill (`secondary-fixed` bg, `on-secondary-fixed` text, `shadow-[0_0_15px_rgba(98,250,227,0.3)]`, `scale-105`)

## 3. Personal page rebuild

- [x] 3.1 Rebuild `src/pages/Personal.tsx`: header ("Digital Playground" with "Playground" in `secondary-fixed`, description), decorative blurred background shapes, and the filter chip row (All / Android / Web / Experiments / Open Source)
- [x] 3.2 Render the gallery with CSS `columns-1 md:columns-2 lg:columns-3 gap-6` masonry, `break-inside-avoid` cards, filtering via a single `useState` active filter compared against each card's categories
- [x] 3.3 Add hover/gradient/tint transitions on cards (glow shadows per accent) and remove the prior Personal "Journey"/"Beyond the IDE"/"Selected Works" sections
- [x] 3.4 Add the Personal footer block matching Stitch (name, © copyright, Material Symbols icon row database/public/send, "Built with" + "Stitch" in tertiary)

## 4. Verification

- [x] 4.1 Run `npm run lint` and `npm run build`; fix any errors
- [x] 4.2 Verify at `/personal`: header, all filter chips, masonry gallery of five cards; clicking each chip filters correctly and the active chip shows the glowing teal pill; navigating back to "All" restores all cards; footer renders at the bottom
