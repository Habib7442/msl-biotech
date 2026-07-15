const CACHE_NAME = "msl-biotech-cache-v1";

// Cache core files on installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/logo.webp",
        "/favicons/favicon.ico"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      if (event.request.mode === "navigate") {
        const shell = await caches.match("/");
        if (shell) return shell;
      }

      return new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain" },
      });
    })
  );
});
