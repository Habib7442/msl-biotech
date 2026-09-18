import type { MetadataRoute } from "next";
import { getAllProductsForSitemap } from "@/lib/sanity/products";

const baseUrl = "https://mslbiotech.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Shared "as of this sitemap generation" timestamp for the static
  // marketing pages, since we don't track a real per-page edit history for
  // them. Products get their real Sanity _updatedAt below instead.
  const generatedAt = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: generatedAt, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: generatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: generatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: generatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: generatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: generatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: generatedAt, changeFrequency: "yearly", priority: 0.3 },
  ];

  const products = await getAllProductsForSitemap();
  const productRoutes: MetadataRoute.Sitemap = products.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
