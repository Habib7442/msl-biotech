import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsCatalog, { ProductsSkeleton } from "@/components/ProductsCatalog";
import { getAllProducts } from "@/lib/sanity/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products | MSL Biotech",
  description: "Browse MSL Biotech's certified pharmaceutical product catalog — tablets, capsules, syrups, nutraceuticals, and more. Medicine Save Life.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsCatalog products={products} />
    </Suspense>
  );
}
