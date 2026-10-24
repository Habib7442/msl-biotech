# Unit 17: Website ↔ Admin Panel Integration

## Goal
Make the public website read everything the separate admin panel (`E:\Web Dev\msl_biotech-admin`) writes to Sanity, so the client's spec ("Website Developer Requirements: SEO, Products, Admin, Reviews", v1.0, 23 Oct 2026) takes visible effect on the site.

## Scope

### 17a. Products
- Hide products whose `status == "hidden"` everywhere (listing, homepage, detail → 404, sitemap, related).
- Detail page metadata uses `seo.title` / `seo.description` / `seo.canonical` when set and falls back to today's values; `seo.noindex` → `robots: noindex` and the product leaves the sitemap.
- Product JSON-LD (name, image, description, category, brand) on the detail page, plus `aggregateRating` only when there are approved reviews (spec §5).

### 17b. Blog (`post` documents)
- `/blog`: published posts (`status == "published" && publishedAt <= now()`), newest first, 9 per page with `?page=` pagination, cover image, category, title, excerpt, author, date.
- `/blog/[slug]`: one H1 (title), breadcrumbs, cover image with alt, category, author, published / updated dates, Markdown body (`react-markdown`, no raw HTML), related articles (same category, then latest), BlogPosting + BreadcrumbList JSON-LD.
- Metadata from `seo.*` / `og.*` with fallbacks to title, excerpt and cover; `noindex` respected. Published, indexable posts in the sitemap with `lastModified = updatedAt ?? publishedAt`.
- "Blog" link in the header and the footer.
- Remove the unused mock `BLOG_POSTS` from `lib/data.ts` (its images don't exist and its authors and products are placeholders).

### 17c. Reviews
- Approved reviews are private documents (`review.*`), so they're read server-side with the token (`lib/sanity/serverClient.ts`, `server-only`) and never fetched from the browser.
- Product page "Customer reviews" section: average, count, 5→1 distribution, list (sortable newest / highest / lowest, 5 at a time with "Show more"), moderator replies, "Verified purchase" only when the flag is set (never set by the site, because there are no orders).
- Review form: rating 1–5, name, optional title, text, required consent checkbox. Submitted to `POST /api/reviews` → stored as `status: "pending"`, and never shown until approved.
- Server validation and anti-spam: field limits, honeypot, minimum fill time (3 s), max 2 links, best-effort per-IP rate limit (5 per hour per instance), product must exist and be published.
- "Report" on each review → `POST /api/reviews/report` increments `reportCount` (rate-limited); the admin's Reported tab handles it.

### 17d. Site settings
- Redirects from `siteSettings.redirects` applied in `proxy.ts` (308 permanent / 307 temporary, which search engines treat like 301/302; the query string is kept), with a 60 s in-memory cache, since fetch caching has no effect in Proxy.
- `siteSettings.sitemapExclude` paths are dropped from the sitemap.

### 17e. On-demand refresh
- `POST /api/revalidate`: verifies the Sanity webhook signature (`next-sanity/webhook` `parseBody`, `SANITY_REVALIDATE_SECRET`) and expires the cache tag for the document type (`product`, `post`, `review`, `siteSettings`). Every Sanity fetch is tagged with its type. Without the secret, the route returns 401 and ISR (60 s) still applies.

### 17f. Studio
- Studio schema gains `product.sku`, `product.status`, `product.seo`, plus `post` and `siteSettings` types, so `/admin` stays a working fallback. Reviews and the activity log are managed only in the admin panel.

## Out of scope
- Photo uploads in public reviews (abuse risk; can be added later with moderation).
- Changing the fixed product category list.

## Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.
- Hidden product → 404 and absent from `/products` and the sitemap (verified with a temporary test product).
- Blog list / article render with a temporary test post; JSON-LD validates as JSON; the sitemap includes it.
- Review submit → pending doc in Sanity, not shown; approve → shown with average; report increments the count. Test data deleted afterwards.
- Redirect from settings returns 301.
- `/api/revalidate` rejects a bad signature and accepts a signed request.
- 375 px and 1280 px layouts checked for the blog list, article and reviews section.
