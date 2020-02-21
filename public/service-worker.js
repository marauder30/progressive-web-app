console.log("Hello from your service-worker.js file!");

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/index.js'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// Code to install and register the service worker.
self.addEventListener('install', function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );

    self.skipWaiting();
});

// Code to activate the service worker and remove old data from cache.
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );

    self.clients.claim();
});

// Enable the service worker to intercept network requests.
self.addEventListener('fetch', function(evt) {
    // Serve static files from the cache. Proceed with network request when the 
    // resource is not in cache. This code allows the page to be accessible offline.
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches.open(CACHE_NAME).then(cache => {
              return cache.match(evt.request).then(response => {
                return response || fetch(evt.request);
              });
            })
          );
    }

    evt.respondWith(
        caches.match(evt.request).then(function(response) {
          return response || fetch(evt.request);
        })
      );
});

