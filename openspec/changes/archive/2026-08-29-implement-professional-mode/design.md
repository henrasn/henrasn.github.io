## Context

The current `src/pages/Professional.tsx` renders a placeholder (label-hero, simple `Timeline`, three metric cards, and a project grid) that does not match the refined Stitch "Professional Mode" screen (`5ab008691bbd4b2c8b181c66df2dc406`, project `projects/16303680220794410027`). The Stitch screen's actual structure is: CTA hero → Experience (sticky header + detailed timeline cards) → Technical Arsenal (skills band). It contains no project grid and no metric cards. See proposal.md — Why.

The shared `Shell` (`src/components/Shell.tsx`) already provides the sticky nav and a consolidated footer, and `design-system` tokens already cover all needed colors (`surface-container`/`-low`/`-lowest`/`-highest`, `primary`, `secondary`, `tertiary`, `outline`, `outline-variant`) and typography (`headline-xl`/`lg`/`md`, `body-lg`/`md`, `label-md`, `code`). Material Symbols font is already loaded (used by `Shell`). `projects.ts`, `experience.ts`, and `Chip.tsx` show the existing data + component conventions.

## Goals / Non-Goals

**Goals:**
- Faithfully port the Stitch Professional screen as `/professional` with three sections (hero, experience, technical arsenal).
- Reuse `design-system` tokens and the shared `Shell`; add no new dependencies or fonts.
- Keep the Personal page, Home, and Project Detail behavior completely unchanged.

**Non-Goals:**
- No personalization/themization of the Professional page; it always uses the solid-blue professional accent.
- No project grid and no placeholder metric cards on the Professional page.
- No new routes, no changes to mode state or `ModeToggle`, no backend.
- The Stitch footer ("Built with Stitch" block) is not ported — the shared `Shell` footer already satisfies footer needs.

## Decisions

- **Restructure `Professional.tsx` into three sections, dropping the placeholder content.** The page becomes a straight port of the Stitch sections, ordered hero → experience → technical arsenal, inside the standard `max-w-[1200px]` container (except the full-width arsenal band). Route stays `/professional`. No project grid.

- **Author the hero directly in `Professional.tsx`** (headline-lg/xl, body-lg description, "Download Resume" primary pill with `download` icon, "View LinkedIn" secondary pill, decorative illustration with gradient glow, `hidden lg:block` image column). It is used only on this page, so a dedicated component adds indirection without reuse. Alternative (extract `Hero`) rejected: single-use.

- **New `ExperienceTimeline` component for the professional milestone cards instead of modifying the shared `Timeline`.** The Stitch experience layout (logo + `headline-md` role + `label-md` company/dates + bullet list + glowing active marker + card hover lift) is a different rendering than `Timeline`, which Personal still uses. Keeping `Timeline` intact isolates the blast radius to Professional. Alternative (variant prop on `Timeline`) rejected: it couples two divergent layouts and risks breaking Personal.

- **Enrich `experience.ts` records with optional rich fields** (`logo`, `bullets: string[]`, `accent: "primary" | "tertiary" | "outline"`, `active`), keeping `description` so the Personal `Timeline` keeps working unchanged. `active` drives the glowing primary marker / `surface-container` card with `border-primary` emphasis; non-active milestones use `surface-container-low` or `-lowest` with `outline` markers.

- **Accent key → className lookup map, not dynamic class assembly.** Tailwind can't see classes built at runtime, so the experience/skills components map an accent key (`primary`/`secondary`/`tertiary`/`outline`) to a literal className set (text/bg/border/glow). All class strings are statically present in the bundle.

- **New `skills.ts` data source + `SkillCategoryCard` component for Technical Arsenal.** Data model: `{ title, icon, accent, skills: { label, highlighted }[] }`. Highlighted chips render `bg-<accent>/10 text-<accent> font-code`; non-highlighted render `bg-outline-variant/20 text-on-surface-variant`. Cards use `rounded-3xl`, `surface-container`, a decorative blurred accent blob, and `group-hover:-translate-y-2` lift.

- **Hotlink the Stitch-generated hero image URL** (the `aida-public` illustration), matching how `projects.ts` already references remote `aida` images. No local asset pipeline change.

- **CTA anchors stay inert (`href="#"`)** since no resume/LinkedIn files exist yet; they render the Stitch buttons (`<a>` for LinkedIn, `<button>` styling for resume) without breaking navigation. Note: `#` anchors are placeholders — recording so real URLs can be dropped in later.

## Risks / Trade-offs

- Remote image hotlink could break if Stitch-hosted asset is removed → Render a gradient-blur placeholder behind the image; the column still lays out correctly if the URL 404s.
- Personal page regression from enriched experience data → New fields are optional and additive; `Timeline.tsx` reads only the existing fields; verified by keeping Personal untouched and running the dev build.
- Tailwind purge dropping lookups → Mitigated by the explicit className map decision above.
- Fidelity drift on the timeline markers/glow → Mirror the Stitch classes exactly (`w-0.5` line, 22px circles, `[0_0_10px_rgba(173,198,255,0.5)]` glow) and verify against the screenshot.

## Migration Plan

- Single-commit change; no backend, no data migration. Rollback is a revert of the commit. Nothing else consumes the removed placeholder markup.