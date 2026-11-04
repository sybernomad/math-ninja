/* Math Ninja Dojo service worker — makes the game work offline.
   When you change any game file, bump CACHE_VERSION so players get the update. */
const CACHE_VERSION = 'math-ninja-v3';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page loads: try the network first (so updates show up), fall back to the cached game offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Google Fonts: serve from cache, refresh in the background.
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async cache => {
        const cached = await cache.match(req);
        const fresh = fetch(req).then(res => { cache.put(req, res.clone()); return res; }).catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  // Everything else from this site: cache first.
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
