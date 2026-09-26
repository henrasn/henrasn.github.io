## Context

The shared `Shell` (src/components/Shell.tsx) renders the sticky header used by every public route. Its header currently is `brand … social/contact icons`. The Stitch design (project 16303680220794410027) adds a centered pill selector in this header for switching between the professional ("Work") and personal ("Life") views. This change adds that centered selector to the shell using the app's existing `Professional` / `Personal` labels. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Add a centered pill mode selector to the shell header so the mode can be switched from any page.
- Match the Stitch header layout (centered selector between brand and nav icons) and its active/inactive pill styling.
- Reuse the existing `ModeContext` for state and routing via `react-router`.

**Non-Goals:**
- Not changing the Home screen's existing `ModeToggle` (out of scope).
- Not modifying page content (hero, sections, chips).
- No new dependencies or fonts.

## Decisions

- **Place the selector in the header's center using a `flex-1` spacer slot** — the Stitch header uses `flex-1 flex justify-center px-gutter` between the brand and the nav, so the selector is centered regardless of brand/nav width. This keeps the shared shell layout faithful to the design.
- **Derive the active segment from the current route, not the `mode` state** — the header highlight is computed from `useLocation()`: `pathname.startsWith("/professional")` → `professional`, otherwise `personal`. Reading the route guarantees the toggle always reflects the page you are on, no matter how you got there (header tap, the Home `<Link>` cards that navigate without calling `setMode()`, browser back/forward, or a direct URL), and satisfies the intent that any non-professional page keeps "Personal" highlighted. Clicking a segment still calls `setMode(...)` + `navigate('/professional' | '/personal')` via `useNavigate`, so content emphasis and the persisted mode stay in sync. No new state is introduced.
- **Render "Professional" and "Personal" labels** (user preference) inside a pill matching the Stitch treatment, loosened so the longer labels are not cramped: container `bg-surface-container-high rounded-full p-1.5 shadow-inner w-60`, active segment `bg-primary text-on-primary-container rounded-full`, inactive segment `text-on-surface-variant hover:text-on-surface`. Each segment uses `flex-1 px-3 py-1.5 text-center` so there is horizontal breathing room around the text and adequate gap between segments. (The earlier `p-1 w-48` made the 14px "Professional"/"Personal" text feel too tight.)
- **Hide the selector on narrow screens** — the header already carries brand + nav; adding a center toggle can crowd small viewports. The selector renders on `md+` and is hidden below, since the Home `ModeToggle` still provides mode switching on mobile. (Alternative considered: always show; rejected to avoid header crowding.)
- **Hide the selector on the Home/Landing route** — use `useLocation()` in the shell and conditionally render the selector only when `pathname !== "/"`. This avoids a duplicate toggle next to the Home `ModeToggle`, keeping a single mode control on Home while the selector appears on Professional, Personal, and Project Detail. (Alternative considered: render everywhere and leave two toggles on Home; rejected to avoid redundancy.)

## Risks / Trade-offs

- [Header crowding on small screens] → Selector hidden below `md`, mitigating overlap with brand/nav.
