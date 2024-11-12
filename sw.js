const cacheName = 'my-cache';
const cacheFiles = [
  '/',
  '/firebase-messaging-sw.js',
  '/images/sertifikat1.jpg',
  '/images/sertifikat2.jpg',
  '/images/sertifikat3.png',
  '/images/sertifikat4.jpg',
  '/images/sertifikat5.jpg',
  '/images/sertifikat6.jpg',
  '/images/profil.jpg',
  '/images/icon-pwa-192x192.png',
  '/images/icon-pwa-512x512.png',
  '/images/cover_bg_1.jpg',
  '/images/screenshot.png',
  '/images/ss.png',
  '/images/loader.gif',
  '/css/animate.css',
  '/css/style.css',
  '/js/jquery.min.js',
  '/js/main.js'
];
// Event 'install': caching resources
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                cache.addAll(cacheFiles);
            })
    );
});

// Event 'activate': cleaning up old caches
self.addEventListener("activate", (event) => {
    const cacheAllowlist = [cacheName]; // Only allow current cache

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (!cacheAllowlist.includes(name)) {
                        console.log(`Deleting old cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Event 'fetch': serve cached files or fallback to network
self.addEventListener('fetch',(event)=>{
    event.respondWith(caches.open(cacheName).then((cache)=>{
        return fetch(event.request.url).then((fetchResponse)=>{
            cache.put(event.request, fetchResponse.clone());

            return fetchResponse;
        }).catch(()=>{
            return cache.match(event.request.url);
        });
    }));

})

