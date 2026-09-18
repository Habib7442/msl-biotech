# Architecture

## Stack Table

| Layer | Technology | Role |
|---|---|---|
| **Framework** | Next.js 16.2.10 (App Router) | Server-Side Rendering (SSR), page routing, layout optimization, API endpoints. |
| **Language** | TypeScript | Strong typing, code safety, and interfaces for data models. |
| **Styling** | Tailwind CSS v4 | Utility-first styling combined with `@theme` configurations. |
| **Components** | Base UI + Custom Shadcn | Core accessible elements (Dialogs, Buttons, Cards). |
| **Icons** | Lucide React | Clean, scalable vector icons. |
| **Data Store** | In-memory Mock Data (`lib/data.ts`) | Static database containing only the blog posts (`BLOG_POSTS`) and shared constants (`CATEGORIES`). |
| **CMS / Admin Panel** | Sanity (`sanity`/`next-sanity`), embedded Studio at `/admin` | Live data source for the product catalog — products are authored in Sanity and fetched server-side via `lib/sanity/products.ts`, not stored in this repo. |

## System Boundaries

- `app/` - Handles routing and page layouts.
  - `app/products/` - Product pages (listing + slug-based dynamic details).
  - `app/blog/` - Blog pages (listing + slug-based dynamic posts).
  - `app/admin/[[...tool]]/` - Embedded Sanity Studio (admin panel) catch-all route, mounted at `/admin`. Rendered entirely inside a client component (`components/StudioClient.tsx`) so the Sanity/React module graph never crosses into the Server Component tree (see Sanity Studio Embedding note below).
- `components/` - Houses reusable UI primitives (`components/ui`) and high-level components (`components/Header.tsx`, `components/Footer.tsx`, etc.). `components/SiteChrome.tsx` conditionally skips the marketing chrome (Header/Footer/Preloader/SmoothScroll/FloatingContact/EnquiryModal) for `/admin` routes, since the Studio needs full control of the viewport. `components/HomeClient.tsx` and `components/ProductsCatalog.tsx` hold the interactive/animated UI for the homepage and product listing respectively — both are `"use client"` and receive already-fetched products as a prop from their Server Component route file (`app/page.tsx` / `app/products/page.tsx`), since client components can't fetch from Sanity server-side.
- `lib/` - Shared utility functions (`lib/utils.ts`) and blog/category mock data (`lib/data.ts` — no product data here anymore).
  - `lib/sanity/` - Sanity client (`client.ts`), env/config resolution (`env.ts`), image URL builder (`image.ts`), GROQ queries (`queries.ts`), and the product fetch/mapping layer (`products.ts`) that's the only way product data enters the app.
- `sanity/schemaTypes/` - Sanity Studio content schema definitions (currently `productType.ts`).
- `sanity.config.ts` / `sanity.cli.ts` - Studio configuration and CLI targeting (project ID/dataset), read from `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
- `public/` - Public assets (favicons, product images, hero graphics).

## Storage Model
- **Product Catalog**: Lives entirely in Sanity (`product` document type, `sanity/schemaTypes/productType.ts`), edited through the admin panel at `/admin`. There is no local product data anymore — `lib/data.ts` no longer exports a `PRODUCTS` array. All product reads go through `lib/sanity/products.ts` (`getAllProducts`, `getProductBySlug`, `getAllProductSlugs`), which fetches via GROQ (`lib/sanity/queries.ts`) and maps Sanity's image references to ready-to-render CDN URLs (`lib/sanity/image.ts`), returning the same shape the UI components expect (see `Product` in `lib/data.ts`). Pages that read products (`app/page.tsx`, `app/products/page.tsx`, `app/products/[id]/page.tsx`) are Server Components using `export const revalidate = 60` (ISR) — client-side interactivity (filtering, search, animation) lives in `components/HomeClient.tsx` / `components/ProductsCatalog.tsx`, which receive already-fetched products as props rather than fetching themselves.
- **Blogs**: Still managed statically inside `lib/data.ts` (`BLOG_POSTS`) — not migrated to Sanity.
- **Enquiry Form Submissions**: No server or database involved — both the product-enquiry modal (`components/EnquiryModal.tsx`) and the Contact page form (`app/contact/page.tsx`) validate client-side, then build a pre-filled WhatsApp message via `lib/whatsapp.ts` (`buildEnquiryWhatsAppLink`) and open it as a `wa.me/919859757710` link in a new tab. The visitor must hit Send inside WhatsApp themselves — the site cannot deliver the message on their behalf — and both success screens say so explicitly rather than implying the enquiry was recorded server-side. There used to be a mock `app/api/enquiry/route.ts` that only `console.log`-ed submissions and stored nothing; it's been removed since nothing calls it anymore.

## Sanity Studio Embedding (Important Gotcha)
Do not import `sanity.config.ts` (or anything from `sanity`/`next-sanity/studio`) directly inside a Server Component. Importing it in `app/admin/[[...tool]]/page.tsx` directly caused a real, reproducible build/runtime failure (`swr`'s `react-server` export missing a default export at build time; `useSyncExternalStore` on a null React at runtime) under both Turbopack and webpack — it is not a Turbopack-specific bug. The fix is to keep the Server Component page free of any Sanity imports and do `import config from "@/sanity.config"` + `<NextStudio config={config} />` only inside a `"use client"` component (`components/StudioClient.tsx`), which the server page merely renders. Preserve this structure in any future edits to the admin route.

## Invariants (Rules That Must Never Be Violated)
1. **Disclaimers**: A medical disclaimer warning must be visible in the site footer and on every individual product detail page.
2. **Branding CSS**: Never hardcode colors like `#184EA4` or `#7FC700` in React inline styles or raw CSS files; use the Tailwind color classes or Tailwind-mapped variables (e.g., `text-primary`, `bg-accent`).
3. **No Checkout/Cart**: Do not implement shopping carts, checkout screens, payment integrations, or user login systems. Keep the website strictly catalog and enquiry-driven.
4. **Access Control & Safety**: Validate all form fields server-side in the API route, preventing empty payloads or bad formats. Ensure client forms have proper `aria-*` tags for screen-reader readability.
