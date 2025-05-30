```javascript
// sw.js - Service Worker

self.addEventListener('install', (event) => {
  // Código de instalação do Service Worker
});

self.addEventListener('activate', (event) => {
  // Código de ativação do Service Worker
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar URLs que não sejam HTTP ou HTTPS
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Ignorar requests de extensões do Chrome
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.open('cache-name').then(cache => {
      return fetch(request).then(response => {
        if (response && response.status === 200 && request.method === 'GET') {
          cache.put(request, response.clone()).catch(err => {
            console.error('Erro ao armazenar no cache:', err);
          });
        }
        return response;
      }).catch(err => {
        console.error('Erro no fetch:', err);
        return caches.match(request).then(cachedResponse => cachedResponse || new Response(null, { status: 504, statusText: 'Gateway Timeout' }));
      });
    })
  );
});
```