const CACHE_NAME = "ztap-arena-v3"; // ← Change this every update!

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./icon512.png"
];

self.addEventListener("install", (e) => {
  self.skipWaiting(); // ← force activate immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((resp) => {
      return resp || fetch(e.request);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
});
