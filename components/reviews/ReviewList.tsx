"use client";

import { BadgeCheck, Flag } from "lucide-react";
import { useMemo, useState } from "react";
import type { PublicReview } from "@/lib/sanity/reviews";
import { cn } from "@/lib/utils";
import Stars from "./Stars";

type Sort = "newest" | "highest" | "lowest";

const PAGE = 5;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(iso)
  );
}

interface ReviewListProps {
  reviews: PublicReview[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [sort, setSort] = useState<Sort>("newest");
  const [shown, setShown] = useState(PAGE);
  const [reported, setReported] = useState<string[]>([]);

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === "highest") list.sort((a, b) => b.rating - a.rating || b.submittedAt.localeCompare(a.submittedAt));
    else if (sort === "lowest") list.sort((a, b) => a.rating - b.rating || b.submittedAt.localeCompare(a.submittedAt));
    else list.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    return list;
  }, [reviews, sort]);

  async function report(id: string) {
    if (!window.confirm("Report this review to the moderators as inappropriate?")) return;
    setReported((ids) => [...ids, id]);
    try {
      await fetch("/api/reviews/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // A failed report is not worth alarming the visitor about.
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-sm text-gray-500">
          {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </p>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Sort by
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as Sort);
              setShown(PAGE);
            }}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </label>
      </div>

      <ul className="flex flex-col gap-4">
        {sorted.slice(0, shown).map((review) => (
          <li key={review._id} className="rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-[0_10px_30px_rgba(18,33,63,0.03)]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars rating={review.rating} />
              <span className="text-sm font-bold text-brand-navy">{review.authorName}</span>
              {review.verifiedPurchase ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  Verified purchase
                </span>
              ) : null}
              <time dateTime={review.submittedAt} className="text-xs text-gray-400 sm:ml-auto">
                {formatDate(review.submittedAt)}
              </time>
            </div>
            {review.title ? <p className="mt-3 text-sm font-bold text-brand-navy">{review.title}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-gray-600 whitespace-pre-line">{review.body}</p>
            {review.reply ? (
              <div className="mt-4 rounded-2xl bg-[#F4F7FB] px-4 py-3">
                <p className="text-xs font-bold text-primary">Reply from MSL Biotech</p>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{review.reply}</p>
              </div>
            ) : null}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => report(review._id)}
                disabled={reported.includes(review._id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-colors",
                  reported.includes(review._id) ? "text-gray-400" : "text-gray-400 hover:bg-red-50 hover:text-red-600"
                )}
              >
                <Flag className="size-3.5" aria-hidden="true" />
                {reported.includes(review._id) ? "Reported, thank you" : "Report"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {shown < sorted.length ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + PAGE)}
          className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-brand-navy hover:border-primary/30 hover:bg-primary/5 transition-colors"
        >
          Show more reviews ({sorted.length - shown} more)
        </button>
      ) : null}
    </div>
  );
}
