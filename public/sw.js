const CACHE_NAME = "omega-po-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Never interfere with API requests.
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
