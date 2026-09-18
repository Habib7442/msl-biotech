import { groq } from "next-sanity";

const PRODUCT_FIELDS = groq`
  _id,
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
  featured
`;

export const PRODUCTS_QUERY = groq`*[_type == "product"] | order(featured desc, name asc){${PRODUCT_FIELDS}}`;

export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0]{${PRODUCT_FIELDS}}`;

export const PRODUCT_SLUGS_QUERY = groq`*[_type == "product" && defined(slug.current)][].slug.current`;

export const PRODUCT_SITEMAP_QUERY = groq`*[_type == "product" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;
