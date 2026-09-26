## Why

The current `personal-site` is a stock Vite template with no identity, no portfolio content, and no design system. Stitch project "Dual-Mode Android Engineer Portfolio" (Kinetic Engineering) provides a complete, high-fidelity design — dark IDE-like aesthetic, dual-mode personal/professional toggle, and portfolio screens — that directly serves the site's purpose as a Senior Android Engineer portfolio. Adopting it establishes brand, structure, and content architecture in one move.

## What Changes

- Replace current CSS tokens and layout with Kinetic Engineering design system (35 semantic colors, Space Grotesk + Inter, 8px scale, 1200px container, rounded scale)
- Add Tailwind CSS v4 with config mirroring Stitch `designTheme` (colors, typography, spacing, rounded)
- Replace `src/App.tsx` stock hero/counter with portfolio shell: sticky blurred nav, mode toggle pill, routed public screens
- Port public screens faithfully from Stitch HTML: Home/Landing, Professional Mode, Personal Mode, Project Detail (guest view)
- Add `react-router-dom`, client-side routing, and mode state (Professional ↔ Personal via pill toggle)
- Add mock data layer for projects/experience (static JSON) to drive ported screens
- Remove Vite demo assets and purple light-theme variables

## Capabilities

### New Capabilities
- `design-system`: Kinetic Engineering tokens, Tailwind config, fonts, dark-default theming, dual-mode emphasis (Electric Blue vs Teal→Blue gradient)
- `portfolio-public`: Public portfolio experience — routing, shell/nav, Home, Professional Mode, Personal Mode, Project Detail, mode toggle and shared components (ProjectCard, Chip, Timeline, Button)

### Modified Capabilities
- None — greenfield replacement of template content

## Impact

- Affected: `src/index.css`, `src/App.css`, `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts`, `package.json`, `src/assets/`, new `src/components/`, `src/pages/`, `src/data/`
- New dependencies: `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`
- Breaking: Visual overhaul; existing Vite demo UI removed
- No backend required for public-only scope; admin CMS deferred
