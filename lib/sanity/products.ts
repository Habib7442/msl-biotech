import { client } from "./client";
import { urlForImage } from "./image";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from "./queries";
import type { Product } from "@/lib/data";

interface RawSanityImage {
  _key?: string;
  alt?: string;
  asset?: { _ref: string; _type: "reference" };
}

interface RawSanityProduct {
  _id: string;
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
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const raw = await client.fetch<RawSanityProduct[]>(
    PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );
  return raw.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const raw = await client.fetch<RawSanityProduct | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );
  return raw ? toProduct(raw) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const slugs = await client.fetch<(string | null)[]>(
    PRODUCT_SLUGS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );
  return slugs.filter((slug): slug is string => Boolean(slug));
}
