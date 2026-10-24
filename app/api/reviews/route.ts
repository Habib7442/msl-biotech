import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { clientIp, rateLimited } from "@/lib/rateLimit";
import { hasServerToken, serverClient } from "@/lib/sanity/serverClient";

// Public review submission (client spec §5). Every review is stored as
// "pending" under a private id (review.<uuid>) and only appears on the site
// after a moderator approves it in the admin panel. Validation here is the
// real check; the form's checks are only for quick feedback.

interface Payload {
  productId?: unknown;
  rating?: unknown;
  name?: unknown;
  title?: unknown;
  body?: unknown;
  consent?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
}

const text = (value: unknown) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "");
const multiline = (value: unknown) => (typeof value === "string" ? value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() : "");

function fail(error: string, status = 400, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, fieldErrors }, { status });
}

export async function POST(request: NextRequest) {
  if (!hasServerToken) return fail("Reviews are not available right now.", 503);

  if (rateLimited(`review:${clientIp(request.headers)}`, 5, 60 * 60 * 1000)) {
    return fail("You’ve sent several reviews recently. Please try again later.", 429);
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return fail("Invalid request.");
  }
  // Valid JSON can still be null, a number or an array; only an object is a payload.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return fail("Invalid request.");
  }
  const payload = parsed as Payload;

  // Bots fill the hidden field or submit instantly. Answer "ok" so they
  // don't learn which check caught them, but store nothing.
  const elapsed = typeof payload.elapsedMs === "number" ? payload.elapsedMs : 0;
  if (text(payload.website) || elapsed < 3000) {
    return NextResponse.json({ ok: true });
  }

  const productId = text(payload.productId);
  const rating = typeof payload.rating === "number" ? payload.rating : Number.NaN;
  const name = text(payload.name);
  const title = text(payload.title);
  const body = multiline(payload.body);

  const fieldErrors: Record<string, string> = {};
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fieldErrors.rating = "Choose a star rating.";
  if (name.length < 2 || name.length > 60) fieldErrors.name = "Enter a name of 2–60 characters.";
  if (/@|\d{6,}/.test(name)) fieldErrors.name = "Please don’t include an email address or phone number.";
  if (title.length > 100) fieldErrors.title = "Keep the title under 100 characters.";
  if (body.length < 10 || body.length > 2000) fieldErrors.body = "Write between 10 and 2000 characters.";
  if ((body.match(/https?:\/\/|www\./gi) ?? []).length > 2) fieldErrors.body = "Please remove the links from your review.";
  if (payload.consent !== true) fieldErrors.consent = "Please confirm so we can publish your review.";
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(productId)) return fail("This product could not be found.", 404);
  if (Object.keys(fieldErrors).length) return fail("Please fix the highlighted fields.", 400, fieldErrors);

  try {
    const exists = await serverClient.fetch<string | null>(
      `*[_type == "product" && _id == $id && coalesce(status, "published") == "published"][0]._id`,
      { id: productId }
    );
    if (!exists) return fail("This product could not be found.", 404);

    await serverClient.create({
      _id: `review.${randomUUID()}`,
      _type: "review",
      product: { _type: "reference", _ref: productId },
      rating,
      authorName: name,
      ...(title ? { title } : {}),
      body,
      consent: true,
      status: "pending",
      reportCount: 0,
      // There are no orders on this site, so a review is never "verified".
      verifiedPurchase: false,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return fail("Couldn’t save your review. Please try again.", 500);
  }
}
