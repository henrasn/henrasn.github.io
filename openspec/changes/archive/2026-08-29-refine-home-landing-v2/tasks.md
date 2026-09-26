## 1. Rebrand shell

- [x] 1.1 Update the brand block name in `src/components/Shell.tsx` from "John Doe" to "Henra Surya"
- [x] 1.2 Reconcile the shared `Shell` footer copy/links with the refined design (name, tagline, icon row, copyright) so no double footer appears on Home

## 2. Port the refined Home/Landing screen

- [x] 2.1 Replace the hero content in `src/pages/Home.tsx` with the refined hero: status badge (animated ping teal dot + "Open to select Senior & Staff Android roles"), name "Henra Surya", teal role line "Senior Android Engineer", and tagline with emphasized Kotlin / Jetpack Compose terms
- [x] 2.2 Add the skill tag row with pills awaiting the five code tags (Kotlin, Jetpack Compose, Coroutines & Flow, Clean Architecture & MVI, Baseline Profiles) with `primary/10` background in `font-code`
- [x] 2.3 Add the contact CTA row: primary WhatsApp button (`chat` icon, solid `primary`), secondary LinkedIn (`work` icon) and Email (`mail` icon) buttons on `surface-container`, each with hover lift
- [x] 2.4 Replace `ModeToggle`/`PathCard` section with the Portfolio Mode Selector: "Select Portfolio Mode" label and a 1×2 grid of `<Link>` cards — Professional (`work_history`, `/professional`, "Resume, Timeline & Skills") and Personal (`auto_awesome`, `/personal`, "Apps, Articles, Hobbies")
- [x] 2.5 Render the Personal card active state: `ring-2 ring-secondary/50`, `scale-[1.02]`, gradient wash `from-secondary/5`, top-right "Gallery" badge, and glowing teal `secondary` icon block
- [x] 2.6 Add the stats bar on `surface-container-low` with the four metrics, accent-highlighted numerals, and `md+` divider lines via `before:` pseudo-elements; honor the mobile stacking layout from the Stitch markup
- [x] 2.7 Remove the old "Choose your path" OR-divider section, decorative hero blobs/code snippets, and the system-status footer strip now superseded by the refined design

## 3. Cleanup and verification

- [x] 3.1 Delete `src/components/ModeToggle.tsx` and `src/components/PathCard.tsx` after confirming no remaining imports reference them
- [x] 3.2 Run `npm run build` (and lint if configured) and confirm the app compiles and `/` renders the refined landing faithful to Stitch screen `d183f89f346d4b8d87680789555fb10f`
- [x] 3.3 Manually verify routing: both Portfolio Mode Selector cards navigate to `/professional` and `/personal` respectively, and Home is reachable back from the shell brand block