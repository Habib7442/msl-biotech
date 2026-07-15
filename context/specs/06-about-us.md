# Unit 06: About Us

## Goal
Implement the About Us page (`app/about/page.tsx`) detailing MSL Biotech's corporate background, mission, vision, core values, and leadership parameters.

## Design
- **Subpage Hero**: Background: Deep Navy `#12213F`, Text: White. Padding `py-16` / 60px. Display a large Montserrat header (*"About MSL Biotech"*) and breadcrumb links (*Home / About Us*).
- **Core Story Section**: Two columns. Left: Large typography highlighting the founding year (2011) and expansion timeline. Right: Narrative describing MSL Biotech's rise as a reliable pharmaceutical partner, styled with Inter body text.
- **Vision & Mission Cards**: Stacked or side-by-side cards with 24px corners. Mission card uses soft green tint (`bg-[#EAF4DA]`), Vision card uses soft blue tint.
- **Pillars / Values**: Detail why MSL Biotech maintains the motto *"Medicine Save Life"*, tying into the father-and-baby care theme.

## Implementation

### 1. `app/about/page.tsx`
- Define metadata statically:
  - title: "About Us | MSL Biotech"
  - description: "Learn about the mission, values, and compliance standards of MSL Biotech Private Limited."
- Lay out structured text panels representing:
  - Who We Are
  - Mission & Vision
  - Manufacturing Excellence (WHO-GMP, ISO, quality control overview)
  - Key Statistics strip (linking back to the 15+ years of trust theme)
- Add CTA leading to the Products page.

## Dependencies
None.

## Verify when done
- [ ] Subpage compiles warning-free.
- [ ] Breadcrumbs link back to the homepage correctly.
- [ ] Text maintains high readability contrast (body uses Inter, titles use Montserrat).
