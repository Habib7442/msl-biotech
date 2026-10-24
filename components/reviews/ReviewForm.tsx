"use client";

import { CheckCircle2, LoaderCircle, Star } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  productId: string;
  productName: string;
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-red-400";

export default function ReviewForm({ productId, productName }: ReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // When the form was opened: the server rejects submissions made too fast.
  const openedAt = useRef(0);

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 text-sm text-emerald-800">
        <CheckCircle2 className="size-6 text-emerald-600 mb-2" aria-hidden="true" />
        <p className="font-bold">Thank you for your review!</p>
        <p className="mt-1">It will appear here once our team has checked it. This usually takes a day or two.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          openedAt.current = Date.now();
          setOpen(true);
        }}
        className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 text-sm transition-colors"
      >
        Write a review
      </button>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const name = String(form.get("name") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    if (!rating) next.rating = "Choose a star rating.";
    if (name.length < 2) next.name = "Enter your name.";
    if (body.length < 10) next.body = "Write at least a sentence (10+ characters).";
    if (!form.get("consent")) next.consent = "Please confirm so we can publish your review.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          name,
          title: String(form.get("title") ?? "").trim(),
          body,
          consent: Boolean(form.get("consent")),
          website: String(form.get("website") ?? ""),
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus({ kind: "sent" });
      else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Couldn't send your review. Check your connection and try again." });
    }
  }

  const shownRating = hover || rating;

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-gray-100 p-6 flex flex-col gap-4 shadow-[0_10px_30px_rgba(18,33,63,0.03)]">
      <div>
        <h3 className="font-heading text-base font-bold text-brand-navy">Review {productName}</h3>
        <p className="mt-1 text-xs text-gray-400">
          Share your experience with the product. Please don’t include personal medical details. Reviews are not medical advice.
        </p>
      </div>

      <fieldset>
        <legend className="text-xs font-bold text-brand-navy mb-2">
          Your rating <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="peer sr-only"
                aria-describedby={errors.rating ? "review-rating-error" : undefined}
              />
              <Star
                className={cn(
                  "size-8 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary rounded",
                  n <= shownRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                )}
                aria-hidden="true"
              />
              <span className="sr-only">{n} star{n === 1 ? "" : "s"}</span>
            </label>
          ))}
        </div>
        {errors.rating ? <p id="review-rating-error" className="mt-1 text-xs text-red-600">{errors.rating}</p> : null}
      </fieldset>

      <div>
        <label htmlFor="review-name" className="text-xs font-bold text-brand-navy">
          Your name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="review-name"
          name="name"
          maxLength={60}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "review-name-error" : "review-name-hint"}
          className={cn(inputClass, "mt-1.5")}
        />
        {errors.name ? (
          <p id="review-name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>
        ) : (
          <p id="review-name-hint" className="mt-1 text-xs text-gray-400">Shown with your review. A first name is fine.</p>
        )}
      </div>

      <div>
        <label htmlFor="review-title" className="text-xs font-bold text-brand-navy">Title (optional)</label>
        <input id="review-title" name="title" maxLength={100} className={cn(inputClass, "mt-1.5")} />
      </div>

      <div>
        <label htmlFor="review-body" className="text-xs font-bold text-brand-navy">
          Your review <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="review-body"
          name="body"
          rows={4}
          maxLength={2000}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? "review-body-error" : undefined}
          className={cn(inputClass, "mt-1.5 resize-y")}
        />
        {errors.body ? <p id="review-body-error" className="mt-1 text-xs text-red-600">{errors.body}</p> : null}
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "review-consent-error" : undefined}
            className="mt-0.5 size-4 accent-primary shrink-0"
          />
          <span>
            I agree that my name and review may be published on this website after moderation, as described in the{" "}
            <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
          </span>
        </label>
        {errors.consent ? <p id="review-consent-error" className="mt-1 text-xs text-red-600">{errors.consent}</p> : null}
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">{status.message}</p>
      ) : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-bold py-3.5 px-6 text-sm transition-colors"
        >
          {status.kind === "sending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
          {status.kind === "sending" ? "Sending…" : "Submit review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-gray-200 px-5 text-sm font-bold text-gray-500 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
