// Service Worker for Philippine Lottery Predictor PWA
const CACHE_NAME = 'lottery-predictor-v1'
const urlsToCache = ['/', '/manifest.json', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.error('PWA: Cache install failed:', error))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        return fetch(event.request).catch(() => {
          if (event.request.destination === 'document') return caches.match('/')
        })
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName)
      })
    ))
  )
})

self.addEventListener('sync', event => {
  if (event.tag === 'prediction-sync') event.waitUntil(syncPredictions())
})

async function syncPredictions() {
  try {
    console.log('PWA: Syncing offline predictions')
  } catch (error) {
    console.error('PWA: Sync failed:', error)
  }
}

self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json()
    const options = { body: data.body, icon: '/icon-192.png', badge: '/icon-192.png', tag: 'lottery-notification' }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(clients.openWindow('/'))
})
