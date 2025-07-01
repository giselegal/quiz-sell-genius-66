#!/bin/bash
set -e

cd dist || { echo '[ERRO] Diretório dist não encontrado!'; exit 2; }

# Corrigir o .htaccess para domínio raiz
cat << 'HTACCESS' > .htaccess
# Configurações otimizadas para React app no domínio raiz
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    # Se o arquivo/diretório não existir, redirecionar para index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L,QSA]
</IfModule>

# Otimização de Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/json "access plus 0 seconds"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>
HTACCESS

# Corrigir o Service Worker para domínio raiz
cat << 'SERVICEWORKER' > sw.js
// Service Worker para domínio raiz
const CACHE_VERSION = 'v1';
const CACHE_NAME = `quiz-estilo-${CACHE_VERSION}`;
const BASE_PATH = '/';
// Lista de recursos essenciais para cache
const STATIC_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`
];
// Instalar Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});
// Ativar Service Worker
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
// Interceptar requisições
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Estratégia para HTML (navegação)
  if (url.pathname.endsWith('/') || 
      url.pathname.endsWith('.html') || 
      url.pathname === BASE_PATH.slice(0, -1)) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(`${BASE_PATH}index.html`))
    );
    return;
  }
  // Estratégia para arquivos estáticos
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match(`${BASE_PATH}index.html`);
          }
          return new Response('Not found', { status: 404 });
        });
      })
  );
});
SERVICEWORKER

# Corrigir referências no index.html para o domínio raiz giselegalvao.com.br
if [ -f "index.html" ]; then
  sed -i 's|/quiz-de-estilo/|/|g' index.html
  echo "<!-- Configurado para domínio: giselegalvao.com.br -->" >> index.html
fi
