import HomeClient from "@/components/HomeClient";
import { getAllProducts } from "@/lib/sanity/products";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.filter((p) => p.featured);

  return <HomeClient featuredProducts={featuredProducts} />;
}
