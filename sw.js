const CACHE_NAME = "orbit-hen-space-v050";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=049",
  "./app.js?v=049",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(error => {
        console.error("ORBIT service worker install/cache failed:", error);
        throw error;
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy))
              .catch(error => console.error("ORBIT cache write failed:", error));
          }
          return response;
        })
        .catch(error => {
          console.warn("ORBIT network request failed:", url.pathname, error);

          // Only navigations may fall back to the dashboard shell. Never disguise
          // a missing script, stylesheet, manifest, or other asset as index.html.
          if (event.request.mode === "navigate") {
            return caches.match("./index.html").then(page =>
              page || new Response("ORBIT offline: dashboard page is not cached.", {
                status: 503,
                headers: { "Content-Type": "text/plain; charset=utf-8" }
              })
            );
          }

          return new Response(
            "ORBIT offline: requested resource is unavailable: " + url.pathname,
            {
              status: 503,
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store"
              }
            }
          );
        })
    )
  );
});
