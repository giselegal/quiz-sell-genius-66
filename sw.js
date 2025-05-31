// Service Worker para subdiretório quiz-de-estilo
const CACHE_VERSION = 'v4';
const CACHE_NAME = `quiz-sell-genius-${CACHE_VERSION}`;
const BASE_PATH = '/quiz-de-estilo/';

// Lista de recursos para pré-cache
const STATIC_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`
];

// Evento de instalação
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Evento de ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});

// Evento de fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Estratégia para HTML e navegação
  if (url.pathname.endsWith('.html') || 
      url.pathname.endsWith('/') ||
      url.pathname === BASE_PATH.slice(0, -1)) {
    
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(`${BASE_PATH}index.html`);
      })
    );
    return;
  }
  
  // Estratégia para outros recursos
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});