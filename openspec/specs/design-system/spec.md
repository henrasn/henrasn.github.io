# design-system Specification

## Purpose

Provides the Kinetic Engineering design system as the single source of truth for colors, typography, spacing, shapes, and dual-mode theming so all portfolio screens render with faithful Stitch fidelity.

## Requirements

### Requirement: Kinetic color tokens

The system SHALL expose the full Kinetic Engineering palette as CSS variables and Tailwind theme colors matching Stitch `designTheme.namedColors` (surface, on-surface, primary, secondary, tertiary, error, outline, etc. — 35 tokens) with dark-default `background #0b1326` and `on-background #dae2fd`.

#### Scenario: Dark default renders
- **WHEN** the app loads without user preference override
- **THEN** the page background is `#0b1326` and body text is `#dae2fd`

#### Scenario: Token completeness
- **WHEN** a component references any Stitch named color (e.g. `primary`, `surface-container-high`, `secondary`)
- **THEN** the corresponding CSS variable / Tailwind color resolves without fallback

### Requirement: Typography tokens

The system SHALL provide typography scales `headline-xl` (Space Grotesk 64/700/-0.02em/1.1), `headline-lg` (40/600/-0.01em/1.2), `headline-lg-mobile` (32/600), `headline-md` (24/500), `body-lg` (Inter 18/400/1.6), `body-md` (16/400/1.5), `label-md` (Inter 14/600/0.05em), `code` (Inter 14/400/1.5) via Tailwind `fontFamily`/`fontSize` and CSS where applicable.

#### Scenario: Headline uses Space Grotesk
- **WHEN** an `h1` uses `headline-xl`
- **THEN** the computed font-family is Space Grotesk at 64px and weight 700

#### Scenario: Body uses Inter
- **WHEN** body copy uses `body-md`
- **THEN** the computed font-family is Inter at 16px line-height 1.5

### Requirement: Spacing and shape tokens

The system SHALL expose spacing `unit 8px`, `container-max 1200px`, `gutter 24px`, `margin-mobile 20px`, `section-gap 120px` and rounded `sm 0.25rem`, `DEFAULT 0.5rem`, `md 0.75rem`, `lg 1rem`, `xl 1.5rem`, `full 9999px` as Tailwind `spacing`/`borderRadius` and CSS variables.

#### Scenario: Container respects max width
- **WHEN** viewport exceeds 1200px
- **THEN** the main container is capped at 1200px and centered

#### Scenario: Project card rounding
- **WHEN** a Project Card is rendered
- **THEN** its border radius is `1.5rem` (xl)

### Requirement: Fonts and icons

The system SHALL load Google Fonts `Space Grotesk` (headlines) and `Inter` (body/label/code) and `Material Symbols Outlined` for nav icons, with `display=swap`.

#### Scenario: Fonts load
- **WHEN** the app loads
- **THEN** Space Grotesk and Inter are available and no FOIT blocking occurs

### Requirement: Dual-mode emphasis

The system SHALL support two visual modes with distinct emphasis while sharing the same base palette: Professional (solid Electric Blue `#3b82f6` / token `primary` `#adc6ff` interactions) and Personal (Teal-to-Blue gradient `#2DD4BF → #3B82F6` for expressive accents). Mode is reflected via CSS variables or gradient utilities toggled by app state.

#### Scenario: Professional mode accent
- **WHEN** mode is Professional and a primary CTA is rendered
- **THEN** its accent is solid Electric Blue without gradient

#### Scenario: Personal mode accent
- **WHEN** mode is Personal and the accent area is rendered
- **THEN** the accent uses the Teal→Blue gradient
