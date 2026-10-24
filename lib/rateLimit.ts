import "server-only";

// Best-effort, per-instance limiter for the public review endpoints. On
// serverless each instance has its own memory, so this slows down a single
// abuser rather than guaranteeing a global limit; moderation is the real
// safeguard (nothing is published without approval).
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // Drop the oldest keys so the map can't grow without bound.
    for (const k of [...hits.keys()].slice(0, 1000)) hits.delete(k);
  }
  return false;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
