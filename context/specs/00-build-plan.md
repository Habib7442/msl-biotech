# Build Plan

This document outlines the sequential construction order of the MSL Biotech website. Each unit builds on previous foundations to avoid context drift and redundant coding.

---

## 1. Unit Table of Contents

| Unit # | Unit Name | What it Builds | Dependencies |
|---|---|---|---|
| **01** | Global Theme & Styling | Font configurations, Tailwind v4 theme variables, layouts | None |
| **02** | Mock Database | Static JSON structure in `lib/data.ts` (catalog, blogs, testimonials) | None |
| **03** | Shared Global Layout | Header (desktop + mobile drawer), Footer, and Floating Action Buttons | Unit 01, Unit 02 |
| **04** | Form API & Enquiry Modal | Mock API handler and accessible modal form with validation | Unit 01, Unit 03 |
| **05** | Homepage | Complete structured page matching the reference layout | Unit 02, Unit 03, Unit 04 |
| **06** | About Us | Story overview, Mission & Vision blocks, core team placeholders | Unit 03 |
| **07** | Product Catalog Page | Sidebar/chip filters, query search bar, product card listings | Unit 02, Unit 03, Unit 04 |
| **08** | Product Details Page | Slug-based dynamic pages, detailed compositions, warnings, whatsapp pre-fills | Unit 02, Unit 03, Unit 04 |
| **09** | Contact Page | Visual map, support details, embedded contact form | Unit 03, Unit 04 |
| **10** | Utility Pages & 404 | Terms, Privacy, Medical Disclaimer, Custom 404 | Unit 03 |

---

## 2. Unit Decompositions

### Unit 01: Global Theme & Styling
- Install / import Montserrat for headings and wire it alongside Inter into standard CSS variables in `app/layout.tsx`.
- Configure Tailwind v4 `@theme` properties inside `app/globals.css` (primary color, accent colors, custom radii, ambient card shadows).
- Verify build compiling.

### Unit 02: Mock Database
- Formulate static list of ~12 pharmaceutical products with detailed composition, form, category, packaging format, indications, storage instructions, and image metadata.
- Define mock blogs, authors, and client testimonials.
- Implement strictly typed typescript interfaces.

### Unit 03: Shared Global Layout
- Build sticky Header with Hamburger drawer overlay.
- Build Footer containing categories index, office locations, and regulatory disclaimer.
- Place Floating WhatsApp floater.

### Unit 04: Form API & Enquiry Modal
- Build endpoint `app/api/enquiry/route.ts` that validates fields (name, email, phone, message) and logs submissions.
- Build accessible overlay dialog `<EnquiryModal />` pre-populating with item context.

### Unit 05: Homepage
- Construct hero section (with trust badges), statistics strip, product category selector, featured products grid, motivations/scientist panel, core values banner, partnership block, and testimonials block.

### Unit 06: About Us
- Implement "Company Story", "Mission & Vision", and values cards.

### Unit 07: Product Catalog Page
- Category filter widgets (sidebar/top chips), search text query filter, products results list, reset behaviors.

### Unit 08: Product Details Page
- Create `app/products/[id]/page.tsx`. Include salt compositions, packaging styles, indications list, official warnings, related products.

### Unit 09: Contact Page
- Standard contact form, address, WhatsApp click buttons, stylized Google Map embed placeholder.

### Unit 10: Utility Pages & 404
- Implement privacy guidelines, disclaimer texts, and custom 404 return path.
