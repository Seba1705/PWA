self.addEventListener('fetch', function(event){
    event.respondWith( console.log("<h1>Hola Mundo</h1>") );
})