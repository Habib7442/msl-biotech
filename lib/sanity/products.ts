import { client } from "./client";
import { urlForImage } from "./image";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY, PRODUCT_SITEMAP_QUERY } from "./queries";
import type { Product, ProductSeo } from "@/lib/data";

export interface ProductSitemapEntry {
  slug: string;
  updatedAt: string;
}

interface RawSanityImage {
  _key?: string;
  alt?: string;
  asset?: { _ref: string; _type: "reference" };
}

interface RawSanityProduct {
  _id: string;
  _updatedAt: string;
  name: string;
  slug: string | null;
  category: string;
  images?: RawSanityImage[] | null;
  description: string;
  composition: string;
  form: string;
  packaging: string;
  indications?: string[] | null;
  storage: string;
  featured?: boolean | null;
  seo?: { title?: string | null; description?: string | null; canonical?: string | null; noindex?: boolean | null } | null;
}

// Every product read is tagged "product": /api/revalidate expires it the
// moment the admin panel saves, and ISR re-reads it every 60 s regardless.
const productFetch = { next: { revalidate: 60, tags: ["product"] } };

function toSeo(raw: RawSanityProduct["seo"]): ProductSeo | undefined {
  if (!raw) return undefined;
  return {
    title: raw.title ?? undefined,
    description: raw.description ?? undefined,
    canonical: raw.canonical ?? undefined,
    noindex: raw.noindex === true,
  };
}

function toProduct(raw: RawSanityProduct): Product {
  const imageUrls = (raw.images ?? [])
    .filter((img): img is RawSanityImage & { asset: NonNullable<RawSanityImage["asset"]> } => Boolean(img.asset))
    .map((img) => urlForImage(img).width(1000).fit("max").auto("format").url());

  return {
    id: raw.slug ?? raw._id,
    name: raw.name,
    category: raw.category,
    image: imageUrls[0] ?? "",
    gallery: imageUrls.length > 0 ? imageUrls : undefined,
    hasPhoto: imageUrls.length > 0,
    composition: raw.composition,
    form: raw.form,
    packaging: raw.packaging,
    indications: raw.indications ?? [],
    storage: raw.storage,
    featured: Boolean(raw.featured),
    description: raw.description,
    sanityId: raw._id,
    updatedAt: raw._updatedAt,
    seo: toSeo(raw.seo),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const raw = await client.fetch<RawSanityProduct[]>(PRODUCTS_QUERY, {}, productFetch);
  return raw.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const raw = await client.fetch<RawSanityProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug }, productFetch);
  return raw ? toProduct(raw) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const slugs = await client.fetch<(string | null)[]>(PRODUCT_SLUGS_QUERY, {}, productFetch);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

export async function getAllProductsForSitemap(): Promise<ProductSitemapEntry[]> {
  return client.fetch<ProductSitemapEntry[]>(PRODUCT_SITEMAP_QUERY, {}, productFetch);
}
