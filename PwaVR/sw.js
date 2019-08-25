self.addEventListener('fetch', e => {
    // console.log(e.request);
    if(e.request.url.includes('im.jpg')){
        let resImg = fetch('img.jpg');
        e.respondWith(resImg);
    }

    if( e.request.url.includes('style') ){
        console.log('Hay un style.css');
        let res = new Response(
            `body{
                background: red !important;
                color : white;
            }`, {
                headers : {
                    'Content-Type' : 'text/css'
                }
            }
        );
        e.respondWith(res);
    }
    
});