import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  size?: string;
  className?: string;
}

/** Read-only 5-star display, rounded to whole stars; the label carries the exact value. */
export default function Stars({ rating, size = "size-4", className }: StarsProps) {
  const filled = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className={size} aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9z"
            className={n <= filled ? "fill-amber-400" : "fill-gray-200"}
          />
        </svg>
      ))}
    </span>
  );
}
