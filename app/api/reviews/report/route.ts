import { NextResponse, type NextRequest } from "next/server";
import { clientIp, rateLimited } from "@/lib/rateLimit";
import { hasServerToken, serverClient } from "@/lib/sanity/serverClient";

// "Report" on a published review: bumps reportCount so it shows in the admin
// panel's Reported tab. Only approved reviews can be reported.
export async function POST(request: NextRequest) {
  if (!hasServerToken) return NextResponse.json({ ok: false }, { status: 503 });
  const ip = clientIp(request.headers);
  if (rateLimited(`report:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let id = "";
  try {
    const payload = (await request.json()) as { id?: unknown };
    id = typeof payload.id === "string" ? payload.id : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!/^review\.[A-Za-z0-9_-]{1,100}$/.test(id)) return NextResponse.json({ ok: false }, { status: 400 });
  // One report per visitor per review.
  if (rateLimited(`report:${ip}:${id}`, 1, 24 * 60 * 60 * 1000)) return NextResponse.json({ ok: true });

  try {
    const approved = await serverClient.fetch<string | null>(
      `*[_type == "review" && _id == $id && status == "approved"][0]._id`,
      { id }
    );
    if (!approved) return NextResponse.json({ ok: false }, { status: 404 });
    await serverClient.patch(id).setIfMissing({ reportCount: 0 }).inc({ reportCount: 1 }).commit();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
