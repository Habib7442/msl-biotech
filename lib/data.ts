export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  gallery?: string[];
  hasPhoto?: boolean;
  composition: string;
  form: string;
  packaging: string;
  indications: string[];
  storage: string;
  featured: boolean;
  description: string;
  /** Sanity document id, used to attach reviews. */
  sanityId: string;
  updatedAt: string;
  seo?: ProductSeo;
}

/** Per-product SEO set in the admin panel; every field is optional. */
export interface ProductSeo {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}

export const CATEGORIES = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Nutraceuticals",
  "Pediatric Care",
  "Diabetes Care",
  "Gastro Care",
  "Personal Care"
];
