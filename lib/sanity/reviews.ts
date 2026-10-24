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

/**
 * The website's reviews always come from POST /api/reviews, which sets every
 * field. But nothing in Sanity enforces that (a document written through the
 * API or Vision could be incomplete), and these values are rendered on the
 * server (Product JSON-LD) and in the client list (date sorting/formatting).
 * So each record is checked here, and one that would crash rendering is
 * dropped rather than taking the product page down.
 */
function toPublicReview(value: unknown): PublicReview | null {
  if (!value || typeof value !== "object") return null;
  const r = value as Record<string, unknown>;
  const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

  if (typeof r._id !== "string") return null;
  if (typeof r.rating !== "number" || !Number.isInteger(r.rating) || r.rating < 1 || r.rating > 5) return null;
  if (typeof r.submittedAt !== "string" || Number.isNaN(Date.parse(r.submittedAt))) return null;
  const body = text(r.body);
  if (!body) return null;

  return {
    _id: r._id,
    rating: r.rating,
    authorName: text(r.authorName) ?? "Customer",
    title: text(r.title),
    body,
    submittedAt: r.submittedAt,
    verifiedPurchase: r.verifiedPurchase === true,
    reply: text(r.reply),
  };
}

/** Approved reviews only. Pending and rejected reviews are never read here. */
export async function getApprovedReviews(productId: string): Promise<ReviewSummary> {
  const empty: ReviewSummary = { reviews: [], count: 0, average: null, distribution: [0, 0, 0, 0, 0] };
  if (!hasServerToken) return empty;
  try {
    const raw = await serverClient.fetch<unknown[]>(
      APPROVED_REVIEWS_QUERY,
      { productId },
      { next: { revalidate: 60, tags: ["review"] } }
    );
    const valid = raw.map(toPublicReview).filter((r): r is PublicReview => r !== null);
    const distribution = [0, 0, 0, 0, 0];
    for (const r of valid) distribution[Math.round(r.rating) - 1]++;
    const average = valid.length ? valid.reduce((sum, r) => sum + r.rating, 0) / valid.length : null;
    return { reviews: valid, count: valid.length, average, distribution };
  } catch {
    // Reviews are secondary content: never take the product page down.
    return empty;
  }
}
