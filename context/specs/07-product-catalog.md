# Unit 07: Product Catalog Page

## Goal
Implement the main product directory listing page (`app/products/page.tsx`) enabling search query parsing and responsive category filtering.

## Design
- **Subpage Header Banner**: Background: Deep Navy `#12213F`, Text: White. Title: *"Our Product Portfolio"*, subtitle: *"Quality formulations complying with WHO-GMP rules."*
- **Layout**: Two columns on desktop (1/4 width sidebar for category selection, 3/4 width grid for products). On mobile, collapse sidebar into a horizontal scrollable category chip bar at the top of the list.
- **Search Bar**: Text input field (`rounded-xl` / 12px) with search icon, styled with light grey background.
- **Product Card**:
  - White background, 24px radius, ambient shadow.
  - Image block showing category tag.
  - Title, salt composition, short description.
  - CTAs: "View Details" (white outline), "Enquire Now" (Lime Green).

## Implementation

### 1. `app/products/page.tsx` (Client Component)
- Mount a search query parser checking the URL Search Parameters for initial filter loading (e.g. `?category=Tablets`).
- React state to manage active search keywords (`searchQuery`) and selected category (`activeCategory`).
- Filter the `PRODUCTS` list dynamically on client side.
- Handle zero search result states by showing a friendly "No products found" panel with a reset filters CTA.
- Wire up the "Enquire Now" CTA on cards to dispatch custom event triggers for the global `<EnquiryModal />`.

## Dependencies
None.

## Verify when done
- [ ] Direct navigation to `/products?category=Capsules` successfully pre-filters capsules.
- [ ] Typing inside the search bar immediately updates the product results list.
- [ ] Selecting different categories displays the correct product count.
- [ ] Small screens display horizontal category chips cleanly.
