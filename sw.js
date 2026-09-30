const CACHE_NAME = 'l5r-sheet-v9';
const ASSETS = [
    './',
    './index.html'
];

// Установка Service Worker и кэширование файлов листа персонажа
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Активация и очистка старого кэша
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Перехват запросов: если сети нет, файл мгновенно берётся из памяти телефона (кэша)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
