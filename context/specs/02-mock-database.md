# Unit 02: Mock Database

## Goal
Establish a structured, typed, and comprehensive mock database in `lib/data.ts` to power the product directory, blog posts, and client testimonials across the website.

## Design
No direct visual UI components are built in this unit. The design centers on clean data structures that can support features like category filtering, text searching, related item suggestions, and key regulatory disclaimers.

## Implementation

### 1. File Path: `lib/data.ts`
Define interfaces for:
- `Product`:
  - `id`: string (URL-safe slug, e.g. `msl-paracetamol-500`)
  - `name`: string (e.g. `Paracetamol 500mg Tablets`)
  - `category`: string (e.g. `Tablets`, `Syrups`, etc.)
  - `image`: string (placeholder or custom image path)
  - `composition`: string (active salts, e.g. `Paracetamol IP 500 mg`)
  - `form`: string (e.g. `Tablet`, `Syrup`, `Capsule`)
  - `packaging`: string (e.g. `10 x 10 Blister Pack`, `60ml Bottle`)
  - `indications`: string[] (list of uses, e.g. `Fever reduction`, `Mild pain relief`)
  - `storage`: string (e.g. `Store in a cool, dry place below 30°C`)
  - `featured`: boolean (for homepage spotlight)
  - `description`: string (a brief explanation of the product)
- `BlogPost`:
  - `id`: string
  - `title`: string
  - `category`: string
  - `excerpt`: string
  - `content`: string
  - `image`: string
  - `date`: string
  - `readTime`: string
  - `author`: string
- `Testimonial`:
  - `id`: string
  - `name`: string
  - `role`: string
  - `quote`: string
  - `rating`: number (1-5 stars)
  - `avatar`: string

Generate and export:
- `PRODUCTS: Product[]` (12 products covering all 8 categories)
- `BLOG_POSTS: BlogPost[]` (3 relevant health & pharma articles)
- `TESTIMONIALS: Testimonial[]` (3 reviews from pharmacists, patients, and doctors)
- `CATEGORIES: string[]` (the 8 defined product categories)

## Dependencies
None.

## Verify when done
- [ ] TypeScript compiles without type check errors
- [ ] The file imports cleanly into components without errors
