import 'babel-polyfill';
import { difference } from 'lodash';

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// List of URLs of resources we want to always serve from the cache.
const PRECACHE_URLS = [
  'https://use.fontawesome.com/releases/v5.6.0/css/all.css',
  'https://use.fontawesome.com/releases/v5.6.0/webfonts/fa-brands-400.woff2',
  'https://use.fontawesome.com/releases/v5.6.0/webfonts/fa-solid-900.woff2',
  'https://use.fontawesome.com/releases/v5.6.0/webfonts/fa-regular-400.woff2',
  'https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,500',
];

// On install of the Service Worker, precache all the resources that need to.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// On activation of the Service Worker, remove the old cache buckets.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => difference(cacheNames, currentCaches))
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
