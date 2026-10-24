import { MessageSquareText } from "lucide-react";
import type { ReviewSummary } from "@/lib/sanity/reviews";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import Stars from "./Stars";

interface ProductReviewsProps {
  productId: string;
  productName: string;
  summary: ReviewSummary;
}

// Customer reviews (client spec §5). Only moderator-approved reviews are
// read; new submissions go to the admin panel's moderation queue first.
export default function ProductReviews({ productId, productName, summary }: ProductReviewsProps) {
  const { count, average, distribution, reviews } = summary;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-white py-16 border-t border-gray-100 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="reviews-title" className="font-heading text-xl font-bold text-brand-navy mb-8 uppercase tracking-wider">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-3xl bg-[#F4F7FB] p-6">
              {count > 0 && average !== null ? (
                <>
                  <div className="flex items-end gap-3">
                    <span className="font-heading text-5xl font-bold text-brand-navy leading-none">{average.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 pb-1">out of 5</span>
                  </div>
                  <Stars rating={average} size="size-5" className="mt-3" />
                  <p className="mt-2 text-sm text-gray-500">
                    Based on {count} review{count === 1 ? "" : "s"}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2" aria-label="Rating breakdown">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const n = distribution[star - 1];
                      const pct = count ? Math.round((n / count) * 100) : 0;
                      return (
                        <li key={star} className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="w-10 shrink-0">{star} star</span>
                          <span className="h-2 flex-1 overflow-hidden rounded-full bg-white" aria-hidden="true">
                            <span className="block h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                          </span>
                          <span className="w-8 text-right tabular-nums">{n}</span>
                          <span className="sr-only">{`${n} reviews with ${star} stars`}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div className="flex items-start gap-3">
                  <MessageSquareText className="size-6 text-primary shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-500">
                    No reviews yet for {productName}. Used it? Share your experience below.
                  </p>
                </div>
              )}
            </div>
            <ReviewForm productId={productId} productName={productName} />
          </div>

          <div className="lg:col-span-8">
            {reviews.length > 0 ? (
              <ReviewList reviews={reviews} />
            ) : (
              <p className="rounded-3xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
                Approved reviews will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
