// Redirect rules from the admin panel (Settings → Redirects), applied in
// proxy.ts. Shared here so the matching and the safety checks stay together.

import { SITE_URL } from "@/lib/seo";

/** "/Old-Page/" → "/old-page": trailing slashes and case don't matter. */
export function normalizePath(path: string) {
  return (path.length > 1 ? path.replace(/\/+$/, "") : path).toLowerCase();
}

/** "www.mslbiotech.in" and "mslbiotech.in" → "mslbiotech.in". */
const siteKey = (url: URL) => url.hostname.toLowerCase().replace(/^www\./, "");

/**
 * True when `target` is this website under any of its addresses. Vercel
 * 301-redirects the bare domain to www (lib/seo.ts), and http goes to https,
 * so https://mslbiotech.in/x and http://www.mslbiotech.in/x both land back on
 * https://www.mslbiotech.in/x. The host serving the request (e.g. a preview
 * URL or localhost) counts too.
 */
function isThisSite(target: URL, current: URL) {
  return siteKey(target) === siteKey(new URL(SITE_URL)) || siteKey(target) === siteKey(current);
}

export type RedirectRule = { from: string; to: string; permanent: boolean | null };

/** Same-site path a rule's `to` leads to (the next rule to look up), or null when it leaves the site or is unusable. */
function sitePathOf(to: string): string | null {
  const value = to.trim();
  if (!value || value.startsWith("//") || value.startsWith("/\\")) return null;
  try {
    const site = new URL(SITE_URL);
    const target = value.startsWith("/") ? new URL(value, site) : new URL(value);
    if (target.protocol !== "https:" && target.protocol !== "http:") return null;
    return siteKey(target) === siteKey(site) ? normalizePath(target.pathname) : null;
  } catch {
    return null;
  }
}

/** A chain longer than this is treated like a cycle (nobody needs 10 hops). */
const MAX_HOPS = 10;

/**
 * Turns the rule list into a lookup table keyed by normalised `from` path,
 * checking the rules together, not one at a time:
 * - Cycles across rules (/a → /b → /a, or longer) are dropped entirely. Each
 *   rule on its own looks fine, so the per-request check can't catch them,
 *   and browsers would bounce between cached 308s until they give up.
 * - Chains are collapsed: /a → /b → /c sends /a straight to /c in one hop.
 *   The result is permanent only if every hop is.
 * - The first rule wins when two share the same `from`.
 */
export function compileRules(rules: RedirectRule[]): Map<string, RedirectRule> {
  const byFrom = new Map<string, RedirectRule>();
  for (const rule of rules) {
    if (typeof rule?.from !== "string" || typeof rule.to !== "string" || !rule.from.startsWith("/")) continue;
    const key = normalizePath(rule.from);
    if (!byFrom.has(key)) byFrom.set(key, rule);
  }

  const compiled = new Map<string, RedirectRule>();
  for (const [from, rule] of byFrom) {
    const visited = new Set([from]);
    let to = rule.to;
    let permanent = rule.permanent !== false;
    let cycle = false;
    for (let hop = 0; ; hop++) {
      const path = sitePathOf(to);
      const next = path === null ? undefined : byFrom.get(path);
      if (!next || path === null) break;
      if (visited.has(path) || hop >= MAX_HOPS) {
        cycle = true;
        break;
      }
      visited.add(path);
      to = next.to;
      permanent &&= next.permanent !== false;
    }
    if (!cycle) compiled.set(from, { from: rule.from, to, permanent });
  }
  return compiled;
}

/**
 * Resolves a rule's `to` into a safe redirect URL, or null when it can't be
 * used. `to` is free text (the admin panel validates it, Studio does not):
 * - "/path" → same-site path; "//host" and "/\host" are rejected
 *   (browsers treat them as another site)
 * - otherwise it must be a full http(s) URL, so "example.com/page" or
 *   "javascript:…" are rejected instead of throwing or being followed
 * - a target that leads straight back to the requested path is rejected (loop),
 *   including via the bare domain or http, which the host sends back to
 *   https://www. A 308 is cached by browsers, so a loop would keep visitors
 *   locked out even after the rule is removed.
 */
export function redirectTarget(to: string, requestUrl: string): URL | null {
  const value = to.trim();
  if (!value || value.startsWith("//") || value.startsWith("/\\")) return null;
  let target: URL;
  try {
    target = value.startsWith("/") ? new URL(value, requestUrl) : new URL(value);
  } catch {
    return null;
  }
  if (target.protocol !== "https:" && target.protocol !== "http:") return null;
  const current = new URL(requestUrl);
  if (isThisSite(target, current) && normalizePath(target.pathname) === normalizePath(current.pathname)) {
    return null;
  }
  return target;
}
