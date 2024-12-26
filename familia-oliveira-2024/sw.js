const cacheName = 'familia-oliveira-cache-v1';
const assets = [
  './index.html',
  './familia.json',
  './img/ref.jpeg',
  './img/favicon.png',
  './audio/como_se_fosse_otem_-_vitor_kley.mp3',
  './css/styles.css', // Adicione todos os arquivos necessários
  './js/script.js'
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Intercepta solicitações e responde do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o cache ao ativar o novo Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
