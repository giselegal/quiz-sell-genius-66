// Service Worker para o projeto Quiz Sell Genius
const CACHE_VERSION = 'v5';
const CACHE_NAME = `quiz-sell-genius-${CACHE_VERSION}`;
const BASE_PATH = '/';

// Caminhos principais da aplicação
const APP_ROUTES = [
  '/',
  '/resultado',
  '/admin',
  '/quiz-descubra-seu-estilo'
];

// Lista de recursos para pré-cache
const STATIC_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  ...APP_ROUTES
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
  const pathname = url.pathname;
  
  // Estratégia para rotas SPA - sempre retorna index.html
  if (pathname.endsWith('.html') || 
      pathname.endsWith('/') ||
      pathname === '' ||
      APP_ROUTES.includes(pathname) ||
      pathname.startsWith('/resultado') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/quiz-descubra-seu-estilo')) {
    
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(`${BASE_PATH}index.html`);
      })
    );
    return;
  }
  
  // Estratégia para outros recursos (assets, imagens, etc.)
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