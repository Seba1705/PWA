self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open('mi-pwa')
            .then(function(cache){
                cache.addAll(['/', '/index.html', 'https://fonts.googleapis.com/icon?family=Material+Icons'])
            })
    )
  })
  
  self.addEventListener("fetch", function(e){
    e.respondWith(caches.match(e.request)
        .then(function(res){
            if(res){
                return res
            } else {
                return fetch(e.request)
            }
        })
    )
  })
  