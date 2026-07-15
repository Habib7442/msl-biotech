# Architecture

## Stack Table

| Layer | Technology | Role |
|---|---|---|
| **Framework** | Next.js 16.2.10 (App Router) | Server-Side Rendering (SSR), page routing, layout optimization, API endpoints. |
| **Language** | TypeScript | Strong typing, code safety, and interfaces for data models. |
| **Styling** | Tailwind CSS v4 | Utility-first styling combined with `@theme` configurations. |
| **Components** | Base UI + Custom Shadcn | Core accessible elements (Dialogs, Buttons, Cards). |
| **Icons** | Lucide React | Clean, scalable vector icons. |
| **Data Store** | In-memory Mock Data (`lib/data.ts`) | Static database containing the product catalog, blogs, and testimonials. |

## System Boundaries

- `app/` - Handles routing and page layouts.
  - `app/api/` - Houses mock backend API endpoints (e.g. contact form logger).
  - `app/products/` - Product pages (listing + slug-based dynamic details).
  - `app/blog/` - Blog pages (listing + slug-based dynamic posts).
- `components/` - Houses reusable UI primitives (`components/ui`) and high-level components (`components/Header.tsx`, `components/Footer.tsx`, etc.).
- `lib/` - Shared utility functions (`lib/utils.ts`) and mock database (`lib/data.ts`).
- `public/` - Public assets (favicons, product images, hero graphics).

## Storage Model
- **Product Catalog & Blogs**: Managed statically inside `lib/data.ts` as structured JSON arrays.
- **Enquiry Form Submissions**: Posted to `app/api/enquiry/route.ts`, which validates inputs, logs the payload to the server-side console, and simulates a database write latency before returning a successful JSON response.

## Invariants (Rules That Must Never Be Violated)
1. **Disclaimers**: A medical disclaimer warning must be visible in the site footer and on every individual product detail page.
2. **Branding CSS**: Never hardcode colors like `#184EA4` or `#7FC700` in React inline styles or raw CSS files; use the Tailwind color classes or Tailwind-mapped variables (e.g., `text-primary`, `bg-accent`).
3. **No Checkout/Cart**: Do not implement shopping carts, checkout screens, payment integrations, or user login systems. Keep the website strictly catalog and enquiry-driven.
4. **Access Control & Safety**: Validate all form fields server-side in the API route, preventing empty payloads or bad formats. Ensure client forms have proper `aria-*` tags for screen-reader readability.
