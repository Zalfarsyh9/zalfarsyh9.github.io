const cacheName = 'my-cache';
const cacheFiles = [
  '/index.html',
  '/firebase-messaging-sw.js',
  '/sw.js',
  '/indexedDB.js',
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
  '/images/loader.gif',
  '/css/animate.css',
  '/css/bootstrap.css',
  '/css/bootstrap.css.map',
  '/css/flexslider.css',
  '/css/icomoon.css',
  '/css/style.css',
  '/css/style.css.map',
  '/fonts/bootstrap/glyphicons-halflings-regular.eot',
  '/fonts/bootstrap/glyphicons-halflings-regular.svg',
  '/fonts/bootstrap/glyphicons-halflings-regular.ttf',
  '/fonts/bootstrap/glyphicons-halflings-regular.woff',
  '/fonts/bootstrap/glyphicons-halflings-regular.woff2',
  '/fonts/icomoon/icomoon/demo-files/demo.css',
  '/fonts/icomoon/icomoon/demo-files/demo.js',
  '/fonts/icomoon/icomoon/fonts/icomoon.eot',
  '/fonts/icomoon/icomoon/fonts/icomoon.svg',
  '/fonts/icomoon/icomoon/fonts/icomoon.ttf',
  '/fonts/icomoon/icomoon/fonts/icomoon.woff',
  '/fonts/icomoon/icomoon/demo.html',
  '/fonts/icomoon/icomoon/Read Me.txt',
  '/fonts/icomoon/icomoon/selection.json',
  '/fonts/icomoon/icomoon/style.css',
  '/fonts/icomoon/icomoon.eot',
  '/fonts/icomoon/icomoon.svg',
  '/fonts/icomoon/icomoon.ttf',
  '/fonts/icomoon/icomoon.woff',
  '/js/bootstrap.min.js',
  '/js/jquery.easing.1.3.js',
  '/js/jquery.easypiechart.js',
  '/js/jquery.min.js',
  '/js/jquery.stellar.min.js',
  '/js/jquery.waypoints.min.js',
  '/js/main.js',
  '/js/modernizr-2.6.2.min.js',
  '/js/respond.min.js',
  
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

