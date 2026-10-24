import JsonLd from "@/components/JsonLd";
import type { Product } from "@/lib/data";
import type { ReviewSummary } from "@/lib/sanity/reviews";
import { SITE_URL } from "@/lib/seo";

interface ProductJsonLdProps {
  product: Product;
  reviews: ReviewSummary;
}

// schema.org Product built only from facts visible on the page. There are no
// prices on this site, so there is no `offers`. `aggregateRating` and
// `review` appear only when real, moderator-approved reviews are shown below.
export default function ProductJsonLd({ product, reviews }: ProductJsonLdProps) {
  const url = `${SITE_URL}/products/${product.id}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url,
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "MSL Biotech" },
    ...(product.hasPhoto ? { image: product.gallery ?? [product.image] } : {}),
  };

  if (reviews.count > 0 && reviews.average !== null) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(reviews.average.toFixed(1)),
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    };
    data.review = reviews.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      datePublished: r.submittedAt.slice(0, 10),
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      ...(r.title ? { name: r.title } : {}),
      reviewBody: r.body,
    }));
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}
