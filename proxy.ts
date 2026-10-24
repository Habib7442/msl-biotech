import { NextResponse, type NextRequest } from "next/server";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

// Redirects managed in the admin panel (Settings → Redirects; slug changes
// on published products and articles are added there automatically).
// fetch caching has no effect in Proxy, so the list is kept in memory for
// 60 s per instance and read from Sanity's public CDN (siteSettings is
// public data).

type Rule = { from: string; to: string; permanent: boolean | null };

const TTL_MS = 60_000;
let cache: { at: number; rules: Map<string, Rule> } | null = null;
let inflight: Promise<Map<string, Rule>> | null = null;

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path).toLowerCase();

async function loadRules(): Promise<Map<string, Rule>> {
  const query = encodeURIComponent(`*[_id == "siteSettings"][0].redirects[defined(from) && defined(to)]{ from, to, permanent }`);
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = (await res.json()) as { result: Rule[] | null };
  return new Map((result ?? []).filter((r) => r.from.startsWith("/")).map((r) => [normalize(r.from), r]));
}

async function getRules(): Promise<Map<string, Rule>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.rules;
  inflight ??= loadRules()
    .then((rules) => {
      cache = { at: Date.now(), rules };
      return rules;
    })
    .catch(() => {
      // Sanity unreachable: keep serving with the last known rules (or none)
      // and try again after the TTL rather than on every request.
      const rules = cache?.rules ?? new Map<string, Rule>();
      cache = { at: Date.now(), rules };
      return rules;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export async function proxy(request: NextRequest) {
  if (!projectId) return NextResponse.next();

  const rules = await getRules();
  if (!rules.size) return NextResponse.next();

  const rule = rules.get(normalize(request.nextUrl.pathname));
  if (!rule) return NextResponse.next();

  const target = rule.to.startsWith("/") ? new URL(rule.to, request.url) : new URL(rule.to);
  // Keep the visitor's query string (e.g. utm tags) unless the target sets its own.
  if (!target.search && request.nextUrl.search) target.search = request.nextUrl.search;
  return NextResponse.redirect(target, rule.permanent === false ? 307 : 308);
}

export const config = {
  // Pages only: skip Next internals, API routes, the embedded Studio and files.
  matcher: ["/((?!_next/|api/|admin|favicons/|images/|.*\\.[a-zA-Z0-9]+$).*)"],
};
