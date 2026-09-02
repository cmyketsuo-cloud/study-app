const CACHE_NAME = 'wakuwaku-learning-v37';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './quiz_data.js',
  './writing_data.js',
  './math_data.js',
  './typing_data.js',
  './character_guide.png',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // 為替API・手書き認識APIなどの外部通信はネットワーク優先、ローカルアセットはキャッシュ優先
  if (
    event.request.url.includes('open.er-api.com') ||
    event.request.url.includes('api.exchangerate-api.com') ||
    event.request.url.includes('inputtools.google.com') ||
    event.request.url.includes('googleapis.com') ||
    event.request.url.includes('gstatic.com')
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          if (event.request.method === 'GET' && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    }).catch(() => {
      if (event.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
