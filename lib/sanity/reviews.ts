import "server-only";

import { APPROVED_REVIEWS_QUERY } from "./queries";
import { hasServerToken, serverClient } from "./serverClient";

export interface PublicReview {
  _id: string;
  rating: number;
  authorName: string;
  title: string | null;
  body: string;
  submittedAt: string;
  verifiedPurchase: boolean;
  reply: string | null;
}

export interface ReviewSummary {
  reviews: PublicReview[];
  count: number;
  average: number | null;
  /** Count per star, index 0 = 1 star … index 4 = 5 stars. */
  distribution: number[];
}

/** Approved reviews only. Pending and rejected reviews are never read here. */
export async function getApprovedReviews(productId: string): Promise<ReviewSummary> {
  const empty: ReviewSummary = { reviews: [], count: 0, average: null, distribution: [0, 0, 0, 0, 0] };
  if (!hasServerToken) return empty;
  try {
    const reviews = await serverClient.fetch<PublicReview[]>(
      APPROVED_REVIEWS_QUERY,
      { productId },
      { next: { revalidate: 60, tags: ["review"] } }
    );
    const valid = reviews.filter((r) => r.rating >= 1 && r.rating <= 5);
    const distribution = [0, 0, 0, 0, 0];
    for (const r of valid) distribution[Math.round(r.rating) - 1]++;
    const average = valid.length ? valid.reduce((sum, r) => sum + r.rating, 0) / valid.length : null;
    return { reviews: valid, count: valid.length, average, distribution };
  } catch {
    // Reviews are secondary content: never take the product page down.
    return empty;
  }
}
