## 1. Path card component

- [x] 1.1 Create reusable `PathCard` component in `src/components/` (icon, title, description, CTA label, and target route) styled with existing design-system tokens (`surface-container` background, `rounded-[1.5rem]`, 1px `#334155` border transitioning to primary on hover, primary CTA)
- [x] 1.2 Wire `PathCard` to navigate to its target route on CTA click using `react-router-dom`

## 2. Home page restructure

- [x] 2.1 Keep the existing centered hero markup (name, role, tagline, floating decorative elements) and `ModeToggle` in `src/pages/Home.tsx`
- [x] 2.2 Add a "Choose your path" section with an "OR" divider and two `PathCard`s: Professional Portfolio → `/professional` with "View Work" CTA, and Personal Sandbox → `/personal` with "Explore" CTA
- [x] 2.3 Remove the old single-row pill button group that linked to `/professional` and `/personal`
- [x] 2.4 Add the Home footer status line "System status: Online | Location: San Francisco, CA" at the bottom of the Home screen

## 3. Verification

- [x] 3.1 Run the dev server / typecheck / lint and confirm no errors
- [x] 3.2 Verify at `/` the hero, dual-mode pill, both path cards, "OR" divider, and footer status render, and that each card's CTA navigates to the correct mode screen
