# Unit 05: Homepage

## Goal
Implement the main landing page (`app/page.tsx`) showcasing MSL Biotech's corporate image, stats strip, categories grid, featured products, values, and testimonials, styled strictly according to the tokens in `DESIGN.md`.

## Design
- **Section Spacing**: High vertical margins (`py-20` / 80px) to provide breathable layouts.
- **Hero Section**:
  - Left column: Lime Green eyebrow badge, strong Montserrat title (*"Caring for Life, From the Very First Breath"*), Inter descriptions, Primary button ("Explore Products") and Secondary button ("Learn More"). Inline rating tag + trust checkmarks.
  - Right column: Large container featuring a welcoming care image (father cradling baby) with smooth 24px rounded corners and a soft-accented gradient overlay. Floating circular "24/7 Care Support" badge.
- **Stats Strip**: Background color-mix or light grey, showing 4 counters: "15+ Years of Trust", "120+ Products Cataloged", "28+ Indian States Served", "50,000+ Happy Families".
- **Category Range**: 8 interactive cards representing categories, using Montserrat titles, custom SVG icons, and smooth hover elevation lifts.
- **Featured Products**: A 4-column dynamic grid drawing featured items from `lib/data.ts` showing name, therapeutic category badge, and a "View Details" button.
- **About/Why Us**: Two-column layout detailing "What Motivates Us", complete with checklist bullets (Certified Quality, Pan-India Distribution, Affordable Care).
- **Our Values**: 5 minimalist circular icons representing Quality, Empathy, Integrity, Innovation, and Customer First.
- **Care Band**: Reassuring full-width green banner ("Let Us Take Care of Your Health") with quick click-to-WhatsApp link.
- **Testimonials Section**: Carousel/grid listing 3 client quotes, 5-star ratings, names, and patient/pharmacist titles.

## Implementation

### 1. `app/page.tsx`
- Refactor the boilerplate home page into a modular compilation of landing sections.
- Import `PRODUCTS` and `TESTIMONIALS` from `@/lib/data`.
- Implement client interactions for card clicks and custom event dispatches to trigger the global enquiry form modal.
- Dispatch custom event to trigger `<EnquiryModal />` when "Enquire Now" is clicked:
  ```typescript
  window.dispatchEvent(new CustomEvent("open-enquiry"));
  ```
- Generate mock abstract SVGs for products or category visuals using inline SVG icons.

## Dependencies
None.

## Verify when done
- [ ] Responsive layout adapts cleanly across mobile (single-column) and desktop (multi-columns).
- [ ] Clicking "Enquire Now" CTA launches the Enquiry modal.
- [ ] Product items load dynamic data fields from the static mock store.
