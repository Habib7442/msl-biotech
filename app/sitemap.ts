import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPostsForSitemap } from "@/lib/sanity/posts";
import { getAllProductsForSitemap } from "@/lib/sanity/products";
import { getSiteSettings } from "@/lib/sanity/settings";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No lastModified here: we don't track a real per-page edit history for
  // these static marketing pages. Stamping them with the sitemap's own
  // generation time would make every static URL look newly modified on
  // every regen even when nothing changed, which is exactly what the
  // sitemap protocol (sitemaps.org) says lastmod must not do — Google
  // stops trusting lastmod site-wide once it looks unreliable. Products
  // get a real lastModified below from Sanity's _updatedAt instead.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // noindex products and posts are already left out by their queries.
  const [products, posts, settings] = await Promise.all([
    getAllProductsForSitemap(),
    getPostsForSitemap(),
    getSiteSettings(),
  ]);
  const productRoutes: MetadataRoute.Sitemap = products.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Paths excluded in the admin panel (Settings → Sitemap).
  const excluded = new Set((settings?.sitemapExclude ?? []).map((path) => `${SITE_URL}${path}`));
  return [...staticRoutes, ...productRoutes, ...postRoutes].filter((route) => !excluded.has(route.url));
}
