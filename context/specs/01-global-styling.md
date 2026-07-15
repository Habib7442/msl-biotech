# Unit 01: Global Theme & Styling

## Goal
Configure Montserrat and Inter fonts in Next.js and map branding colors, border-radii, and shadow configurations in Tailwind CSS v4 to establish a consistent, premium scientific look and feel.

## Design
- **Primary Color**: `#184EA4` (Royal Blue)
- **Accent Color**: `#7FC700` (Lime Green)
- **Neutral Dark / Headings**: `#12213F` (Deep Navy)
- **Neutral Background**: `#F4F7FB` (Light Neutral Grey)
- **Card Tint**: `#EAF4DA` (Soft Green)
- **Card Radius**: `24px` (mapped to custom `rounded-24` or similar)
- **Button/Input Radius**: `12px` (mapped to custom `rounded-12` or similar)
- **Ambient Shadow**: `0 10px 30px rgba(18, 33, 63, 0.05)`

## Implementation

### 1. `app/layout.tsx`
- Load `Montserrat` from `next/font/google` with subset `latin` and variable name `--font-heading`.
- Ensure `Inter` is loaded as `--font-sans` (already exists, but verify it).
- Inject both variables onto the `html` element.
- Define proper metadata for the application title ("MSL Biotech | Medicine Save Life") and description.

### 2. `app/globals.css`
- Configure `@theme inline` or `@theme` overrides in Tailwind v4:
  - `--color-primary`: `#184EA4`
  - `--color-accent`: `#7FC700`
  - `--color-brand-navy`: `#12213F`
  - `--color-brand-bg`: `#F4F7FB`
  - `--color-brand-tint`: `#EAF4DA`
  - `--font-heading`: `var(--font-heading)`
  - `--font-sans`: `var(--font-sans)`
  - `--radius-card`: `24px`
  - `--radius-input`: `12px`
  - `--shadow-premium`: `0 10px 30px rgba(18, 33, 63, 0.05)`
- Add base layers matching `DESIGN.md` conventions (e.g. `body { @apply bg-brand-bg text-brand-navy font-sans; }`).

## Dependencies
None.

## Verify when done
- [ ] Next.js app compiles with `npm run build`
- [ ] Heading elements render in Montserrat, body elements in Inter
- [ ] CSS variables are visible in the browser developer tools console
