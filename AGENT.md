# AGENTS.md

This file tells AI coding agents (Claude Code, Cursor, Copilot, Codex, etc.) how
to work in this repository. It is the machine-facing counterpart to README.md —
humans read the README, agents read this. Every agent listed above reads
AGENTS.md automatically; nested AGENTS.md files in subfolders override this one
for that subtree.

## Project overview

Personal website with two clearly separated sections:

- **Professional** — work experience, resume-style content
- **Personal** — portfolio of personal projects / things built

Built with React, deployed as a static site to GitHub Pages (`<username>.github.io`
or a project page). UI design originates from Google Stitch mockups — see
`docs/design.md` before styling or building new components (see below).

## Dev environment tips

- Use `npm create vite@latest . -- --template react-ts` (or `react` if not using
  TypeScript) if the project isn't scaffolded yet. Vite is the default choice for
  a static React site like this — fast dev server, simple GitHub Pages build.
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build` (outputs to `dist/`)
- Preview the production build locally: `npm run preview`
- Set `base` in `vite.config.ts` to match the GitHub Pages repo path (e.g.
  `/repo-name/`) or asset paths will 404 once deployed.

## Folder structure

```
src/
├── assets/          # images, icons, fonts
├── components/       # small reusable UI pieces (Button, Card, NavBar)
│   └── Button/
│       ├── Button.tsx
│       └── index.ts
├── sections/         # the two top-level areas of the site
│   ├── professional/ # work experience content + components
│   └── personal/     # portfolio/projects content + components
├── layout/           # Header, Footer, page shell
├── pages/            # route-level components
├── hooks/            # shared custom hooks
├── styles/           # global styles, design tokens, theme
├── data/             # static content (experience.json, projects.json, etc.)
└── main.tsx
docs/
└── design.md         # design system reference (see below)
```

Keep `professional/` and `personal/` genuinely separate — don't let one import
internals from the other. Shared pieces (buttons, layout, tokens) belong in
`components/`, `layout/`, or `styles/`, not duplicated in both sections.

## Using `docs/design.md`

Before adding or restyling a component, check `docs/design.md` first. It should
capture the decisions pulled from the Google Stitch mockups: color palette,
type scale, spacing scale, and component variants. If `docs/design.md` doesn't
exist yet, create it as design decisions are made — treat it as the source of
truth for style, so new components stay visually consistent instead of each
one inventing its own spacing/colors. When a Stitch export changes an existing
pattern, update `docs/design.md` in the same PR as the code change.

## Code style

- TypeScript strict mode (if using TS)
- Functional components + hooks only, no class components
- One component per file, colocated with its own styles/tests if any
- Named exports for components; default export only for pages/routes if the
  router requires it
- Prefer composition over prop-drilling; lift state only as high as needed
- Use the design tokens from `styles/` (or `docs/design.md`) instead of
  hardcoding colors/spacing in components

## Testing instructions

- Run `npm run lint` before committing — fix all ESLint errors
- If tests exist: `npm run test`, or `npm run test -- <pattern>` to scope to one
  file/suite
- No tests yet is fine for a portfolio site, but any interactive
  logic (forms, filters, toggles) should get at least a smoke test as it's added

## PR / commit guidelines

- Commit messages: short imperative summary line (e.g. `Add project card
  component`), body only if the "why" isn't obvious
- Keep PRs scoped to one section (professional *or* personal *or* shared) where
  possible
- Run `npm run lint` and `npm run build` before opening a PR — a broken build
  means a broken GitHub Pages deploy
- Update `docs/design.md` in the same PR whenever a design decision changes

## Deployment notes (GitHub Pages)

- Confirm `vite.config.ts`'s `base` matches the repo's Pages URL path
- Client-side routing needs care on GitHub Pages (no server-side rewrites) —
  either use `HashRouter`, or add the standard 404.html redirect trick if using
  `BrowserRouter`
- Verify the production build with `npm run preview` before pushing to the
  deploy branch/workflow
