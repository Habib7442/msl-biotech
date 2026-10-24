# Progress Tracker

## Current Phase
- Phase 1: Completed. All site pages and components are fully implemented.

## Current Goal
- Final review and handoff.

## Completed
- [x] Read PRD and design guidelines.
- [x] Create project context folder structure.
- [x] Create `project-overview.md`, `architecture.md`, `ui-context.md`, `code-standards.md`, and `ai-workflow-rules.md`.
- [x] Create `context/specs/00-build-plan.md`.
- [x] Create `context/specs/01-global-styling.md`.
- [x] Unit 01: Global Theme & Styling (Montserrat and Inter loaded, Tailwind v4 variables set, layout updated, verified compile).
- [x] Create `context/specs/02-mock-database.md`.
- [x] Unit 02: Mock Database (TypeScript interfaces and robust static data list in `lib/data.ts`).
- [x] Create `context/specs/03-shared-global-layout.md`.
- [x] Unit 03: Shared Global Layout (Created Header with drawer, premium Footer, and FloatingContact floater, integrated in layout.tsx).
- [x] Create `context/specs/04-enquiry-form.md`.
- [x] Unit 04: Form API & Enquiry Modal (Implemented `app/api/enquiry/route.ts` and `<EnquiryModal />`, integrated with layout.tsx).
- [x] Create `context/specs/05-homepage.md`.
- [x] Unit 05: Homepage (Fully refactored homepage with premium sections, statistics, ranges, and generated hero image).
- [x] Create `context/specs/06-about-us.md`.
- [x] Unit 06: About Us (Created About Us page `app/about/page.tsx` with mission, vision, values).
- [x] Unit 07: Product Catalog Page (Created responsive search and filter catalog page in `app/products/page.tsx`).
- [x] Create `context/specs/08-product-details.md`.
- [x] Unit 08: Product Details Page (Created dynamic slug pages `/products/[id]`, composition metrics, and related items lists).
- [x] Create `context/specs/09-contact-page.md` (renumbered from 11).
- [x] Unit 09: Contact Page (Created interactive contact page in `app/contact/page.tsx` with maps and validation forms).
- [x] Create `context/specs/10-utilities.md`.
- [x] Unit 10: Utility Pages & 404 (Created Privacy Policy, Terms & Conditions, Medical Disclaimer, and custom styled 404 page).
- [x] Unit 11: Real Product Photography (Flemosel & Flemosel-DS). Renamed client-supplied WhatsApp photos into SEO-friendly filenames under `public/images/products/` (e.g. `flemosel-tablets-trypsin-bromelain-rutoside.jpg`), added `flemosel-tablets` and `flemosel-ds-tablets` entries to `PRODUCTS` in `lib/data.ts`, and wired real photography into the homepage featured strip, products catalog grid, and product detail page (new `components/ProductGallery.tsx` client component for the detail-page image switcher). Each product already gets its own statically generated `/products/[id]` page with unique `generateMetadata` title/description (+ OpenGraph image for photographed products) for SEO.
- [x] Unit 11b: Removed all 12 placeholder mock products (Amoxigen, Paracit-500, Kof-Relief, Cal-D3 Max, Pedia-Safe Drops, Dia-Control 500, Gastro-Shield DSR, Aloe-Gentle Skin Gel, Azith-MSL 500, Multi-Vita Active, Cofi-Dry Cough Syrup, Pedia-Safe Zinc Solution) from `PRODUCTS` in `lib/data.ts` — they never had real photography and rendered as blank icon-placeholder cards. `PRODUCTS` now contains only the two real, photographed Flemosel items. `CATEGORIES` was left untouched (still lists all 8 category filters) even though most currently have zero matching products — add real products to those categories as they become available rather than re-adding mock data.
- [x] Unit 11c: Fixed washed-out real product photos on the homepage featured strip, products catalog grid, and product detail gallery — removed double padding around the `fill` images, switched `object-contain` to `object-cover`, and added a brightness/contrast/saturation boost so photos fill the card edge-to-edge instead of floating small inside a pale gradient frame.
- [x] Unit 11d: Removed the fake "Trusted by Professionals & Families" testimonials section from the homepage (`app/page.tsx`) along with the underlying `TESTIMONIALS` mock data and `Testimonial` interface in `lib/data.ts`, since none of those quotes/reviewers are real. No replacement content added — re-add a testimonials section only once real client/doctor/pharmacist quotes are available.
- [x] Unit 12: Sanity Studio admin panel scaffolded at `/admin` (embedded in this Next.js app, per user decision — see Open Questions/decisions below). Added `sanity`, `next-sanity`, `@sanity/vision`, `@sanity/image-url`, `styled-components` deps; `sanity.config.ts` / `sanity.cli.ts`; a `product` schema (`sanity/schemaTypes/productType.ts`) mirroring the existing `Product` interface (name, slug, category, images gallery, description, composition, form, packaging, indications, storage, featured) — reviews/wishlist/compare intentionally excluded (out of scope, no account/review system exists); `lib/sanity/{env,client,image,queries}.ts` plumbing; `components/SiteChrome.tsx` (skips marketing chrome for `/admin`) and `components/StudioClient.tsx` (isolates all Sanity imports inside a client component — required to avoid a real build/runtime crash documented in `context/architecture.md` under "Sanity Studio Embedding"). `.env.local.example` documents the two required env vars. Verified with `npm run build` + `next start` + Playwright screenshots: site pages unaffected, `/admin` renders a friendly "not configured" screen when env vars are absent (current committed state) and correctly reaches Sanity's real auth flow when a project ID is set.
- [x] Unit 13: Public site now reads the product catalog **only from Sanity** — `lib/data.ts`'s `PRODUCTS` array was removed entirely (kept: `Product`/`BlogPost` interfaces, `CATEGORIES`, `BLOG_POSTS`). Added `lib/sanity/products.ts` (`getAllProducts`, `getProductBySlug`, `getAllProductSlugs`) which fetches via `lib/sanity/queries.ts` GROQ queries and maps Sanity's raw image refs to CDN URLs via `urlForImage`, returning the same `Product` shape the UI already expected (minimal-diff: card/gallery components barely changed). `app/products/[id]/page.tsx` (already a Server Component) now calls these directly. `app/products/page.tsx` and `app/page.tsx` (both previously `"use client"`, which can't fetch server-side) were split: the interactive/animated UI moved verbatim into new client components `components/ProductsCatalog.tsx` and `components/HomeClient.tsx` (each takes `products`/`featuredProducts` as a prop), and the route files became thin async Server Components that fetch via `getAllProducts()` and pass the result down. Both list-driving pages use `export const revalidate = 60` for ISR. Verified against the user's real Sanity project (`lvc82bl1`/`production`, connected 2026-09-14): `npm run build` fetched over the network and correctly generated `/products/flemosel-tablets` from the one product the user had already entered via `/admin`; Playwright screenshots confirmed the homepage, catalog, and detail page all render the real Sanity-authored composition/indications/images with the working gallery thumbnail switcher, no console errors. Also hid the "Related Formulations" section entirely when there are no other products, instead of showing an empty heading (a real edge case now that the catalog can legitimately have 1 product).
- [x] Unit 14: Repositioned MSL Biotech as a **pharmaceutical marketing company, not a manufacturer** (client correction, 2026-09-28). Updated site-wide: default title/description/keywords (`lib/seo.ts`), Organization JSON-LD, web manifest, homepage hero/trust badge/range intro/motivation bullets/values, About page (metadata, founding card, narrative, mission, vision bullets, founder's message, values), Footer brand blurb, catalog banner, Terms §2, Disclaimer §1, and the unused `BLOG_POSTS` copy. WHO-GMP claims now refer to "WHO-GMP certified manufacturing partners" rather than the company itself; the footer's "WHO-GMP and ISO certified" claim was removed.
- [x] Unit 15: Fixed Search Console "Discovered – currently not indexed" on all 16 non-home URLs (2026-10-08). Vercel serves the site on `www.mslbiotech.in` and 301-redirects the bare domain to it, but the sitemap, robots.txt, every canonical tag, OG url and Organization JSON-LD pointed at the bare `mslbiotech.in` — so each page's canonical was a URL that redirected back to it and Google never crawled any of them. Added a single `SITE_URL` constant (`https://www.mslbiotech.in`) in `lib/seo.ts`, now used by `metadataBase`, `app/sitemap.ts`, `app/robots.ts` and `components/OrganizationJsonLd.tsx`. Never hardcode the domain elsewhere; if the primary domain is switched in Vercel, change only `SITE_URL`.
- [x] Unit 16: Replaced the company email `info@mslbiotech.com` with `ltdmslbiotechpvt@gmail.com` (client request, 2026-10-23) on the Contact page, Footer, Privacy Policy and Organization JSON-LD; added `break-all` to the two visible email links so the longer address wraps on narrow screens.

- [x] Unit 17 (2026-10-23): Website ↔ admin panel integration (`context/specs/17-admin-integration.md`).
  - **Products:** hidden products are excluded everywhere (404, listing, sitemap). The admin's `seo.*` drives detail-page metadata, and `noindex` sets robots and drops the page from the sitemap. Product + BreadcrumbList JSON-LD, with aggregateRating only when there are approved reviews.
  - **Blog:** `/blog` (paginated) and `/blog/[slug]` from Sanity `post`. Single H1, Markdown with no raw HTML, BlogPosting JSON-LD, sitemap entries, a medical disclaimer on articles, Blog links in the header and footer. The unused mock `BLOG_POSTS` was removed.
  - **Reviews:** product-page section (summary, distribution, sort, show more, report) and a submission form with consent. `POST /api/reviews` (validation, honeypot, 3 s minimum fill time, link limit, per-IP limit) stores private `review.*` docs as pending. `POST /api/reviews/report`.
  - **Settings:** SEO defaults in the root layout, redirects in `proxy.ts` (308/307, 60 s cache), `sitemapExclude` in the sitemap.
  - **Revalidation:** `POST /api/revalidate` (signed, expires tags `product`/`post`/`review`/`siteSettings`). All Sanity fetches are tagged.
  - **Studio:** new `post`, `siteSettings` and `seo` types; product gains `sku`/`status`/`seo`.
  - **Verified:** typecheck and build pass. A 24-check browser test ran against the local admin + site on live data: hide → 404 and back; SEO title and noindex; review submit → pending → approve → shown + JSON-LD → report; spam and invalid submissions rejected; article publish → list, page, sitemap; redirect 308; bad revalidate signature 401; 375 px with no horizontal scroll. All test data removed. `npm run lint` still **fails**: 9 errors and 4 warnings, all on lines older than this unit (checked with `git blame`). Most are `react/no-unescaped-entities` in about/contact/disclaimer/privacy/EnquiryModal, plus one `react-hooks/set-state-in-effect` in ProductsCatalog. The full list is in the spec's Verification section. They're queued under Next Up as a cleanup task.

- [x] Unit 18 (2026-10-24): Contact details from the admin panel.
  - **What:** phone, WhatsApp, email, office address and social links are read from `siteSettings` (admin → Settings) in `lib/contact.ts`. Every field falls back to the previous hard-coded value when empty.
  - **Where it's used:**
    - client components read it through `ContactProvider` / `useContact()`, which the root layout fills on the server
    - server pages (product detail, privacy) call `getSiteContact()`
    - header, footer, floating WhatsApp button, homepage WhatsApp link, contact page (including the distributor WhatsApp link), enquiry modal and product enquiry link all use these values, as does the Organization JSON-LD (telephone, email, address, `sameAs`)
    - the contact-page map switches to an address search when a custom address is set
    - social icons appear in the footer only when a link is set (`components/SocialLinks.tsx`)
  - **Admin side:** the Settings page was reduced to Contact details, Social media links and Moved pages (redirects) for non-technical staff. SEO defaults, share image and sitemap exclusions were removed from the form, are never touched by its save, and stay editable in Studio.
  - **Verified:** a 16-check end-to-end test (admin save → website on all pages + JSON-LD; fallback on clear; hidden field preserved).

## In Progress
- None.

## Next Up
- A separate custom admin panel now exists at `E:\Web Dev\msl_biotech-admin` (built 2026-10-23 from the client spec "Website Developer Requirements: SEO, Products, Admin, Reviews"). It writes to this site's Sanity dataset: products (+ `sku`, `status`, `seo`), `post` (blog), private `review.*` documents, `siteSettings` (SEO defaults, redirects) and a private activity log. Unit 17 wired all of it into this site.
- **Deploy checklist:** in Vercel, set `SANITY_API_WRITE_TOKEN` (needed for reviews) and `SANITY_REVALIDATE_SECRET` (same value as the admin's) on this project. Then, optionally, create a Sanity webhook (POST `https://www.mslbiotech.in/api/revalidate`, projection `{_type}`, same secret) so Studio edits refresh instantly too.
- **Lint cleanup (not started):** make `npm run lint` pass. These are the 9 errors and 4 warnings recorded in `context/specs/17-admin-integration.md` → Verification, each with its required fix:
  - `react/no-unescaped-entities` (8 errors). Replace the character with its entity (or a typographic one); the visible text stays the same:
    - `app/about/page.tsx:145`: `India's` → `India&apos;s`
    - `app/contact/page.tsx:168` (×2): `"Distributor Partnership"` → `&ldquo;Distributor Partnership&rdquo;`
    - `app/contact/page.tsx:192`: `We've` → `We&apos;ve`
    - `app/disclaimer/page.tsx:63` (×2): the two `"` around the quoted warning → `&ldquo;` … `&rdquo;`
    - `app/privacy/page.tsx:37`: `India's` → `India&apos;s`
    - `components/EnquiryModal.tsx:145`: `We've` → `We&apos;ve`
  - `react-hooks/set-state-in-effect` (1 error), `components/ProductsCatalog.tsx:29`: the effect at lines 27–39 copies `?category=` and `?search=` into state. Remove the effect.
    - Derive the category in render: `const activeCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "All"`, and drop that `useState`.
    - Keep `searchQuery` state for the controlled input, but resync it with the "adjust state while rendering" pattern: track the last seen `searchParam` in state, and call `setSearchQuery` during render when it changes.
    - Re-test filtering, search, the header search link and browser Back.
  - `@typescript-eslint/no-unused-vars` (3 warnings). All three are unused **imports**; delete each one:
    - `app/products/[id]/page.tsx:14`: `ExternalLink` from the `lucide-react` import list
    - `components/FloatingContact.tsx:4`: `MessageSquare` from `import { MessageSquare, ArrowUp } from "lucide-react"`
    - `components/Footer.tsx:5`: `import Image from "next/image"`. Resolved by the next fix, which uses it, rather than by deleting it.
  - `@next/next/no-img-element` (1 warning), `components/Footer.tsx:70`: replace the logo `<img src="/logo.webp" …>` with `<Image src="/logo.webp" alt="MSL Biotech Logo" width={317} height={289} className="h-12 w-auto object-contain rounded-xl overflow-hidden" />`. 317×289 is the file's real size; the class keeps the 48 px height. This also clears the unused `Image` warning above.
  - **Done when:** `npm run lint` exits 0, `npx tsc --noEmit` and `npm run build` pass, and the touched pages look the same at 375 px and 1280 px.

## Open Questions
- Resolved: admin panel CMS = Sanity, embedded at `/admin` in this app, schema scoped to catalog fields only (no reviews/wishlist/compare) — decided directly with the user on 2026-09-14.

## Architecture Decisions
- Adopted the Six-File Context Methodology from Javascript Mastery.
- Decided to use Next.js 16 App Router for static/server-side rendering and static json arrays for mock databases.
- Adopted Sanity as the product catalog CMS (2026-09-14), embedded as a Studio admin panel at `/admin` rather than a separate deployed project. `lib/data.ts` remains the live data source for the public site until Unit 13 rewires the product pages to Sanity — see `context/architecture.md` "Sanity Studio Embedding" for a required implementation gotcha.

## Session Notes
- Project has just been initialized. The baseline boilerplate exists. We are now preparing the build plan.
