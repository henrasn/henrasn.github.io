## 1. Foundation — Tailwind + Kinetic tokens

- [x] 1.1 Install `tailwindcss` and `@tailwindcss/vite`, update `vite.config.ts` to register the plugin
- [x] 1.2 Replace `src/index.css` with Kinetic base layer: import `tailwindcss`, set dark-default `bg-[#0b1326]`, expose 35 named colors as CSS vars and Tailwind `theme` (colors, typography, spacing, rounded) matching `designTheme`
- [x] 1.3 Update `index.html` to load Google Fonts `Space Grotesk`, `Inter`, and `Material Symbols Outlined` with `display=swap`
- [x] 1.4 Remove stock Vite demo CSS variables, purple accents, and `prefers-color-scheme` light-first logic; verify `npm run build` and visual token check

## 2. Shell, routing, and shared state

- [x] 2.1 Install `react-router-dom` and wire router in `src/main.tsx` (`/` , `/professional`, `/personal`, `/project/:id`, fallback to `/`)
- [x] 2.2 Create `src/context/ModeContext.tsx` (professional ↔ personal, sessionStorage persist, route sync)
- [x] 2.3 Create `src/components/Shell.tsx` — sticky nav with backdrop-blur-xl, brand block, Material Symbols icons, avatar slot, max-w 1200px container (faithful to Stitch header)
- [x] 2.4 Create data layer `src/data/projects.ts` and `src/data/experience.ts` with `listProjects`/`getProject` helpers and placeholder content matching Stitch cards

## 3. Shared portfolio components

- [x] 3.1 Implement `Chip` (pill, primary 10% bg / 100% text) and `Button` (primary solid blue, secondary transparent+border)
- [x] 3.2 Implement `ProjectCard` (rounded-2xl 1.5rem, 1px border #334155 → hover #3b82f6, `0 20px 40px rgba(59,130,246,0.1)` lift)
- [x] 3.3 Implement `Timeline` (2px line + 12px circles + glowing active) and `ModeToggle` pill (0.3s cubic-bezier(0.4,0,0.2,1) transition)

## 4. Home / Landing

- [x] 4.1 Port Home/Landing Stitch screen (`04f7bdcce09f45ccb177cfa2d15365dd`) — centered hero, name/role/tagline, angle-bracket deco, floating blurred shapes + code snippets, ModeToggle pill
- [x] 4.2 Wire hero CTAs to navigate to `/professional` / `/personal`

## 5. Professional Mode

- [x] 5.1 Port Professional Mode screen (`5ab008691bbd4b2c8b181c66df2dc406`) — timeline, skills/metrics, project grid using `ProjectCard` + `Chip`, solid Electric Blue accents
- [x] 5.2 Connect project grid to `listProjects()` data

## 6. Personal Mode

- [x] 6.1 Port Personal Mode screen (`4ae67ed7e75140408948d11957a53762`) — same structure as Professional but with Teal→Blue gradient (`from-[#2DD4BF] to-[#3B82F6]`) washes
- [x] 6.2 Verify mode toggle switches accent treatment between solid and gradient

## 7. Project Detail (guest)

- [x] 7.1 Port Project Detail guest view (`036f2de16adb454dad0bf8722d8ca4ed`) — gallery/hero, description, architecture blocks, tech-stack chips, related sections
- [x] 7.2 Wire detail to `getProject(id)`, handle unknown id with not-found + back-to-home, ensure no edit affordances in public route
- [x] 7.3 Link `ProjectCard` clicks to `/project/:id`

## 8. Verification

- [x] 8.1 Run `npm run build` and `npm run lint` green
- [x] 8.2 Visual diff of each ported route against Stitch screenshots at 1280/768/375; verify nav blur, container cap 1200px, card radius/hover, mode gradient
