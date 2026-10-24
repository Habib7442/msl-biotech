import "server-only";

// Best-effort, per-instance limiter for the public review endpoints. On
// serverless each instance has its own memory, so this slows down a single
// abuser rather than guaranteeing a global limit; moderation is the real
// safeguard (nothing is published without approval).
const hits = new Map<string, number[]>();

/**
 * Stores `key` as the most recently active entry. A Map keeps first-insertion
 * order even when an existing key is set again, so delete it first: the map
 * then runs from least to most recently active, and eviction below drops
 * idle keys, never ones still inside their window.
 */
function touch(key: string, timestamps: number[]) {
  hits.delete(key);
  hits.set(key, timestamps);
}

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    touch(key, recent);
    return true;
  }
  recent.push(now);
  touch(key, recent);
  if (hits.size > 5000) {
    // Drop the least recently active keys so the map can't grow without bound.
    for (const k of [...hits.keys()].slice(0, 1000)) hits.delete(k);
  }
  return false;
}

/**
 * The visitor's IP, for the per-IP limits above. Only trustworthy when the
 * host sets the header itself; a client-supplied value would let one caller
 * look like many and slip past the limits.
 *
 * - On Vercel (production): Vercel overwrites X-Forwarded-For and does not
 *   forward client-supplied IPs, to prevent spoofing. `x-vercel-forwarded-for`
 *   carries the same value and stays correct even if a proxy is ever put in
 *   front of Vercel and rewrites X-Forwarded-For, so it is read first.
 *   https://vercel.com/docs/headers/request-headers#x-forwarded-for
 * - Anywhere else: the reverse proxy must overwrite (not append to)
 *   X-Forwarded-For / X-Real-IP, or these limits can be bypassed.
 */
export function clientIp(headers: Headers): string {
  const first = (value: string | null) => value?.split(",")[0]?.trim() || null;
  if (process.env.VERCEL) {
    return first(headers.get("x-vercel-forwarded-for")) ?? first(headers.get("x-forwarded-for")) ?? "unknown";
  }
  return first(headers.get("x-forwarded-for")) ?? first(headers.get("x-real-ip")) ?? "unknown";
}
