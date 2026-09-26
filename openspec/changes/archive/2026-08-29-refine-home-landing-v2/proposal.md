## Why

The Home/Landing screen currently shows a placeholder identity ("John Doe"), a pill mode toggle, and a "Choose your path" card pair that do not match the current Stitch design. The latest Stitch screen `d183f89f346d4b8d87680789555fb10f` ("Home: Refined Landing Experience") presents a stronger personal brand ("Henra Surya"), hard-skill proof quickly (skill tag pills, contact CTAs), a Portfolio Mode Selector grid, and a metrics stats bar — turning the landing page into a real acquisition asset.

## What Changes

- Replace the Home/Landing content with a faithful React port of Stitch screen `d183f89f346d4b8d87680789555fb10f`:
  - Availability status badge with animated ping dot ("Open to select Senior & Staff Android roles").
  - Hero typography: name "Henra Surya", role "Senior Android Engineer" in teal `secondary`, and a tagline with emphasized Kotlin / Jetpack Compose terms.
  - Skill tag row (Kotlin, Jetpack Compose, Coroutines & Flow, Clean Architecture & MVI, Baseline Profiles) as `code` pills with `primary/10` bg.
  - Contact CTAs: WhatsApp (primary solid, `chat` icon), LinkedIn and Email (surface-container, `work` / `mail` icons), each with hover lift.
  - Portfolio Mode Selector: "Select Portfolio Mode" label and a 1×2 responsive grid of cards (Professional → `/professional`, Personal → `/personal`). The Personal card is the active state: glowing teal ring/scale, gradient wash, "Gallery" badge, teal `auto_awesome` icon block.
  - Stats bar: 4 stats (8+ Years/Android Focus, 15M+ Production Installs, 99.94% Crash-Free Rate, 100% Modern Compose) with accent-highlighted numbers and divider lines; responsive arrangement (2-col on mobile, 4-col with dividers on md+).
  - Home footer strip with name, description, Material Symbols icon row, and copyright.
- Remove the now-unused `ModeToggle` and `PathCard` components and the old "Choose your path" / system-status footer code.
- Change the shell brand block name from "John Doe" to "Henra Surya" to match the design.

## Capabilities

### New Capabilities

- _none_

### Modified Capabilities

- `portfolio-public`: The "Home / Landing screen" requirement is replaced with the refined landing design (screen `d183f89f346d4b8d87680789555fb10f`), and the "Dual-mode toggle" requirement changes from a pill toggle to a Portfolio Mode Selector card grid that routes to `/professional` and `/personal`.

## Impact

- `src/pages/Home.tsx` — full rewrite of the landing section.
- `src/components/ModeToggle.tsx`, `src/components/PathCard.tsx` — removed (no longer used anywhere).
- `src/components/Shell.tsx` — brand name "John Doe" → "Henra Surya"; existing footer may be simplified/kept consistent with the new design.
- `src/index.css` — reuse existing Kinetic tokens (`primary/10`, `secondary`, `surface-container`, `surface-container-high`, `outline-variant`); add keyframes only if the ping animation needs a utility (Tailwind `animate-ping` already covers it).
- No new dependencies; hotlinked usercontent images already used elsewhere, none required here (icon-only design).