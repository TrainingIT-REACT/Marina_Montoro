// const cacheName = "app-files-v1";

// const filesToCache = [
//   '/',
//   '/main.js',
//   'images',
//   '/api/images/cover.jpg',
//   'img/cover.18jaO.jpg'
// ];

// Esperamos al evento "install" para confirmar que el service-worker se ha
// instalado.
self.addEventListener('install', (event) => {
  console.log("El service worker ha sido instalado!");
  // Forzamos al evento install a esperar la instalación de la cache antes
  // de marcar el service worker como instalado
  // event.waitUntil(
  //   // Abrimos la caché
  //   caches.open(cacheName)
  //     .then(cache => {
  //       console.log("Cache abierta");
  //       // Forzamos la caché de los distintos ficheros
  //       return cache.addAll(filesToCache);
  //     })
  // )
});

// Interceptamos las peticiones
// self.addEventListener('fetch', function(event) {
//     // Respondemos al a petición
//     event.respondWith(
//       // Comprobamos si existe este elemento en la caché
//       caches.match(event.request)
//         .then(function(response) {
//           // Si existe la petición en la cache, la devolvemos
//           if (response) {
//             return response;
//           }
//           // Si no, retornamos la petición fetch
//           return fetch(event.request);
//         }
//       )
//     );
//   });

// Inicializamos workbox
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  //Evento activate
  self.addEventListener('activate', function(e) {
    console.log('activado');
  });

  self.addEventListener('message', (e) => {
    if(e.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  })
  