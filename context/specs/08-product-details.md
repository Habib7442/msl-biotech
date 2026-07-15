# Unit 08: Product Details Page

## Goal
Create dynamic, slug-based product details pages (`app/products/[id]/page.tsx`) illustrating detailed composition data, medical warnings, related products, and direct enquiry hooks.

## Design
- **Breadcrumbs**: Home / Products / Product Name (aligned left).
- **Two Column Main Layout**:
  - Left: Visual card container highlighting the formulation category.
  - Right: Category tag chip, Montserrat heading title, italicized salt composition, details key-value list (Packaging, Form, Storage).
- **Indications Checklist**: Bullets outlining clinical uses.
- **CTAs**:
  - Primary button: Lime Green fill, launches the EnquiryModal pre-loaded with the product name.
  - WhatsApp button: Outlined green button opening WhatsApp link with pre-filled product query details.
- **Disclaimer Banner**: Soft red border, light red background tint, displaying clear self-medication warnings.
- **Related Products Panel**: Shows 3 formulations in the same category.

## Implementation

### 1. `app/products/[id]/page.tsx` (Client Component wrapper / Dynamic Page)
- Check that the slug parameter matches a product inside `PRODUCTS` in `lib/data.ts`.
- If no matching product exists, trigger the Next.js `notFound()` handler.
- Define static dynamic param generation `generateStaticParams()` to support static page generation.
- Implement the "Enquire via WhatsApp" parameter mapping:
  - Target URI: `https://wa.me/919999999999?text=Hello%20MSL%20Biotech,%20I%27d%20like%20to%20enquire%20about%20[ProductName]%20(Composition:%20[Composition]).`
- Construct a Related Products panel that excludes the current product ID and filters for identical categories.

## Dependencies
None.

## Verify when done
- [ ] Navigating to `/products/paracit-500` displays the correct paracetamol composition.
- [ ] Navigating to a non-existent slug (e.g. `/products/invalid-slug`) redirects to the 404 handler.
- [ ] Click-to-WhatsApp pre-fills correct URL parameters.
- [ ] Related products list is correct and does not include the active product.
