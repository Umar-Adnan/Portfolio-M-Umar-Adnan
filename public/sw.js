const CACHE_NAME = 'umar-portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/avatar.webp',
  '/particles.min.js',
  '/particlesjs-config.json'
];
const MAX_CACHE_ITEMS = 50;

// FIFO Cache Eviction (cap at 50 entries to protect mobile storage)
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      await cache.delete(keys[0]);
      await trimCache(cacheName, maxItems);
    }
  } catch (err) {}
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// SKIP_WAITING protocol for instant SW activation
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Navigation requests (HTML): Network-first with cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
            trimCache(CACHE_NAME, MAX_CACHE_ITEMS);
          });
          return res;
        })
        .catch(() => caches.match('/index.html') || caches.match(req))
    );
    return;
  }

  // 2. Google Fonts & CDN resources: Cache-first with background revalidation
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((networkRes) => {
            if (networkRes.status === 200 || networkRes.type === 'opaque') {
              const resClone = networkRes.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, resClone);
                trimCache(CACHE_NAME, MAX_CACHE_ITEMS);
              });
            }
            return networkRes;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // 3. Static Assets: Stale-while-revalidate
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/certificates/') ||
      url.pathname.match(/\.(webp|svg|png|jpg|jpeg|js|css|json)$/))
  ) {
    event.respondWith(
      caches.match(req).then((cachedRes) => {
        const fetchPromise = fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              const resClone = networkRes.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, resClone);
                trimCache(CACHE_NAME, MAX_CACHE_ITEMS);
              });
            }
            return networkRes;
          })
          .catch(() => cachedRes);

        return cachedRes || fetchPromise;
      })
    );
    return;
  }

  // Default network fetch
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
