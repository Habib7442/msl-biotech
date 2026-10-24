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

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
