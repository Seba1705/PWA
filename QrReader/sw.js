let urlsStatic = ['/', 'index.html', 'main.js', 'qrcode-lib.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'];

self.addEventListener( 'install', evt => {
    evt.waitUntil(caches.open('cacheEstatico')  //Espera a que este cargado el evento | Abre el cache si existe, o lo crea.
        .then( cache => {
            cache.addAll(urlsStatic)
        })
    )
            
}); 

self.addEventListener('activate', evt => {
    console.log(evt);
});


// Estrategias de cache

// FirstCache

// self.addEventListener( 'fetch', evt => {
//     evt.respondWith(caches.match(evt.request)
//         .then( respuesta => {
//             if(respuesta){
//                 // Devolver lo que hay en cache
//                 return respuesta;
//             }else{
//                 // Traelo de la red
//                 fetch(evt.request);
//             }
//         })
//     )
// })


// FirstNetwork

// self.addEventListener( 'fetch', evt => {
//     evt.respondWith(
//         fetch(evt.request).catch(err => {
//             return caches.open('cacheEstatico').then(cache => {
//                 return cache.match(evt.request);
//             })
//         })
//     )
// })

// Satale while revalidate

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
            .then(respuesta => {
                let peticion = fetch(evt.request)
                    .then(respuestaRed => {
                        caches.open('cacheEstatico')
                            .then(cache => {
                                cache.put(evt.request, respuestaRed.clone())
                                return respuestaRed;
                            })
                    })
                    return respuesta || peticion;
            })
            .catch(err => console.error('Fallo', err))
    )
}); 


// Check estado de red

// self.addEventListener('fetch', evt => {
//     let isOnline = navigator.onLine;
//     console.log('Esta online', isOnline);

//     let isOnCelullar = navigator.connection.type == 'celullar';
//     let is2G = navigator.connection.downLinkMax < 0.5;
//     let is3G = navigator.connection.downLinkMax < 15;
//     let is4G = navigator.connection.downLinkMax >= 15;

//     console.log('Celullar', isOnCelullar);
//     console.log('2G', is2G);
//     console.log('3G', is2G);
//     console.log('4G', is4G);
    
// })