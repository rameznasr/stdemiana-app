const CACHE_NAME = 'stdemiana-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Handle incoming push notification
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'St. Demiana Church', body: 'New Announcement!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'https://images.squarespace-cdn.com/content/v1/6977f27ec8f0f152582f7c9b/a621195e-7455-4657-a5ef-f23fb4f9ad36/seventhgen-5.jpg',
      badge: 'https://images.squarespace-cdn.com/content/v1/6977f27ec8f0f152582f7c9b/a621195e-7455-4657-a5ef-f23fb4f9ad36/seventhgen-5.jpg'
    })
  );
});