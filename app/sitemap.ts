import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProductsForSitemap } from "@/lib/sanity/products";


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
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const products = await getAllProductsForSitemap();
  const productRoutes: MetadataRoute.Sitemap = products.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
