// Redirect rules from the admin panel (Settings → Redirects), applied in
// proxy.ts. Shared here so the matching and the safety checks stay together.

/** "/Old-Page/" → "/old-page": trailing slashes and case don't matter. */
export function normalizePath(path: string) {
  return (path.length > 1 ? path.replace(/\/+$/, "") : path).toLowerCase();
}

/**
 * Resolves a rule's `to` into a safe redirect URL, or null when it can't be
 * used. `to` is free text (the admin panel validates it, Studio does not):
 * - "/path" → same-site path; "//host" and "/\host" are rejected
 *   (browsers treat them as another site)
 * - otherwise it must be a full http(s) URL, so "example.com/page" or
 *   "javascript:…" are rejected instead of throwing or being followed
 * - a target that leads straight back to the requested path is rejected (loop)
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
  if (target.origin === current.origin && normalizePath(target.pathname) === normalizePath(current.pathname)) {
    return null;
  }
  return target;
}
