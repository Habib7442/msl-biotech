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

// Fetch listener is required for PWA installation criteria
self.addEventListener("fetch", (event) => {
  // Let the browser fetch naturally, fallback to cache if offline
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
