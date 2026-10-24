import { groq } from "next-sanity";

// Products the admin panel marks `status: "hidden"` never reach the site.
// Older products have no status and count as published.
const VISIBLE_PRODUCT = groq`_type == "product" && coalesce(status, "published") == "published"`;

const PRODUCT_FIELDS = groq`
  _id,
  _updatedAt,
  name,
  "slug": slug.current,
  category,
  images,
  description,
  composition,
  form,
  packaging,
  indications,
  storage,
  featured,
  seo { title, description, canonical, noindex }
`;

export const PRODUCTS_QUERY = groq`*[${VISIBLE_PRODUCT}] | order(featured desc, name asc){${PRODUCT_FIELDS}}`;

export const PRODUCT_BY_SLUG_QUERY = groq`*[${VISIBLE_PRODUCT} && slug.current == $slug][0]{${PRODUCT_FIELDS}}`;

export const PRODUCT_SLUGS_QUERY = groq`*[${VISIBLE_PRODUCT} && defined(slug.current)][].slug.current`;

export const PRODUCT_SITEMAP_QUERY = groq`*[${VISIBLE_PRODUCT} && defined(slug.current) && seo.noindex != true]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;

// ---------- Blog ----------

// Published and not scheduled for later. ISR picks up scheduled posts
// within a minute of their publish time.
const LIVE_POST = groq`_type == "post" && _id in path("*") && status == "published" && defined(slug.current) && publishedAt <= now()`;

const POST_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  publishedAt,
  updatedAt,
  coverImage
`;

export const POSTS_PAGE_QUERY = groq`{
  "items": *[${LIVE_POST}] | order(publishedAt desc) [$from...$to] {${POST_CARD_FIELDS}},
  "total": count(*[${LIVE_POST}])
}`;

export const POST_BY_SLUG_QUERY = groq`*[${LIVE_POST} && slug.current == $slug][0]{
  ${POST_CARD_FIELDS},
  body,
  tags,
  seo { title, description, canonical, noindex },
  og { title, description, image },
  "related": *[${LIVE_POST} && slug.current != $slug && category == ^.category] | order(publishedAt desc) [0...3] {${POST_CARD_FIELDS}},
  "latest": *[${LIVE_POST} && slug.current != $slug] | order(publishedAt desc) [0...3] {${POST_CARD_FIELDS}}
}`;

export const POST_SLUGS_QUERY = groq`*[${LIVE_POST}][].slug.current`;

export const POST_SITEMAP_QUERY = groq`*[${LIVE_POST} && seo.noindex != true]{
  "slug": slug.current,
  "updatedAt": coalesce(updatedAt, publishedAt)
}`;

// ---------- Reviews (private documents; server client only) ----------

export const APPROVED_REVIEWS_QUERY = groq`*[_type == "review" && _id in path("review.*") && status == "approved" && product._ref == $productId]
  | order(submittedAt desc) [0...100] {
    _id,
    rating,
    authorName,
    title,
    body,
    submittedAt,
    "verifiedPurchase": verifiedPurchase == true,
    "reply": reply.body
  }`;

// ---------- Site settings ----------

export const SITE_SETTINGS_QUERY = groq`*[_id == "siteSettings"][0]{
  defaultSeoTitle,
  defaultSeoDescription,
  defaultOgImage,
  "redirects": redirects[defined(from) && defined(to)]{ from, to, permanent },
  sitemapExclude
}`;
