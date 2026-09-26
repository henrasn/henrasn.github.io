---
name: Kinetic Engineering
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered to reflect the precision and technical depth of a Senior Android Engineer. The personality is "Technical Minimalist"—a blend of high-utility functionality and expressive, forward-leaning aesthetics. It targets hiring managers and technical recruiters who value clean code and sophisticated architectural thinking.

The style utilizes a refined **Dark Mode Minimalism** approach. It leverages deep slate surfaces to reduce eye strain, while using high-energy electric blue accents to guide the user's eye toward key calls to action and career milestones. The interface should feel like a high-end IDE: focused, efficient, and subtly powerful.

## Colors

The palette is anchored by **Deep Slate (#0F172A)**, providing a sophisticated foundation that surpasses pure black in depth and readability. 

- **Professional Mode:** Primary interactions and states use **Electric Blue (#3B82F6)**. This color represents stability and technical competence.
- **Personal Mode:** Shifts the visual language toward a dynamic **Teal-to-Blue gradient** (from #2DD4BF to #3B82F6), introducing an expressive, creative layer to the engineering persona.
- **Accents:** Use low-opacity versions of the primary color (10-15%) for subtle background washes on active states or tags.

## Typography

The typographic hierarchy prioritizes technical clarity. **Space Grotesk** is used for all headings to provide a geometric, slightly futuristic character that feels "engineered." Its wide proportions and distinctive apertures create high visual interest even in minimalist layouts.

**Inter** serves as the workhorse for body copy and labels. It is highly legible at small sizes, ensuring that technical project descriptions and metadata are easily consumable. Labels and tech-stack tags should use the `label-md` style with uppercase transformations to distinguish them from narrative text.

## Layout & Spacing

This design system follows a **Fluid Grid** philosophy within a max-width container of 1200px. A strict 8px spacing scale ensures mathematical consistency across the UI.

- **Desktop:** 12-column grid with 24px gutters. Use generous 120px vertical gaps between major sections (Experience, Projects, About) to allow the content to breathe.
- **Mobile:** 4-column grid with 20px side margins. Typography scales down specifically for headers to ensure they don't break awkwardly on narrow viewports.
- **Alignment:** Left-aligned content is preferred to mimic the structure of code and technical documentation.

## Elevation & Depth

Depth is achieved through **Tonal Layering** rather than traditional heavy shadows. 

1. **Base Layer:** Deep Slate (#0F172A).
2. **Surface Layer:** Cards and containers use a slightly lighter slate (#1E293B) with a subtle 1px border (#334155).
3. **Interactive Layer:** On hover, cards should lift slightly using a soft, extra-diffused shadow tinted with the primary blue (e.g., `0 20px 40px rgba(59, 130, 246, 0.1)`).

This creates a sense of "physical" stacks without cluttering the interface with high-contrast drop shadows.

## Shapes

The design system uses a very soft, modern radius. Most components follow the `rounded-lg` (1rem) standard, but top-level Project Cards use **rounded-2xl (1.5rem)** to create a friendly, approachable container for technical content. 

Small elements like tech-stack chips use the **Pill-shaped** radius to distinguish them from interactive buttons or layout cards.

## Components

### Buttons
- **Primary:** Solid Electric Blue with Inter SemiBold text. 1rem horizontal padding. 1px glow on hover.
- **Secondary:** Transparent background with a 1px Slate-400 border.

### Project Cards
Cards use the `rounded-2xl` variable. They feature a 1px subtle border. On hover, the border color transitions from #334155 to the primary #3B82F6.

### Tech-Stack Tags (Chips)
Small, pill-shaped indicators. Background is primary blue at 10% opacity; text is the primary blue at 100% opacity. No border.

### Vertical Timeline
A 2px wide line in Slate-700. Milestones are marked by 12px circles. The active (current) milestone uses a glowing Blue center.

### Input Fields
Dark backgrounds (#0F172A) with a Slate-700 border. Upon focus, the border glows Electric Blue with a 2px outer ring at 20% opacity.

### Navigation
A sticky top-nav with a backdrop-blur (12px) and 80% background opacity to maintain visibility over scrolling content.
