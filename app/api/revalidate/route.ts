import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

// On-demand refresh. Called by the admin panel after every save, and
// optionally by a Sanity webhook (Projection: {_type}). Both sign the body
// with SANITY_REVALIDATE_SECRET. Expires the cache tag for that document
// type; without this route, ISR still refreshes every 60 s.
const TAGS = new Set(["product", "post", "review", "siteSettings"]);

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Not configured" }, { status: 401 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string; source?: string }>(request, secret, false);
    if (!isValidSignature) return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
    // The admin panel calls after its write has committed. Sanity webhooks
    // can arrive before queries see the change, so give those a moment.
    if (body?.source !== "admin") await new Promise((resolve) => setTimeout(resolve, 3000));

    const type = body?._type ?? "";
    if (!TAGS.has(type)) return NextResponse.json({ ok: true, revalidated: false });

    // Expire now: the next visit re-reads Sanity instead of serving stale data once more.
    revalidateTag(type, { expire: 0 });
    return NextResponse.json({ ok: true, revalidated: type });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
