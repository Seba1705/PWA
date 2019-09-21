let map,
    divMap = document.querySelector('#map');

function initMap(){
    let ulHere = {
        lat: -25.363,
        lng: 131.044
    }

    map = new google.maps.Map(divMap, {
        zoom: 15,
        center: ulHere,
        click : hacerAlgo
    });
    // Marcar puntos en el mapa
    for( let r of restaurants){
        let marker = new google.maps.Marker({
            position: {
                lat: r.lat, 
                lng: r.lng
            },
            map
        })
    }
}

function hacerAlgo(e){
    console.log(e)
}

document.addEventListener('DOMContentLoaded', () => {
    const linkAll = document.querySelector('#linkAll'),
          linkNear = document.querySelector('#linkNear'),
          linkMap = document.querySelector('#linkMap'),
          mapContainer = document.querySelector('#mapContainer'),
          list = document.querySelector('#list ul'),
          listTitle = document.querySelector('#listTitle');
    
    linkAll.addEventListener('click', evt => {
        let html = '';
        for(let r of restaurants){
            html += `<li>
                        <h3>${r.name}</h3>
                        <p><address>${r.address}</address></p>
                    </li>`;
            list.innerHTML = html;
            listTitle.innerHTML = 'Todos los restaurantes';
        }
    });

    linkNear.addEventListener('click', evt => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(location => {
                let lat = location.coords.latitude,
                    lng = location.coords.longitude;
                listTitle.innerHTML = `Cerca de ${lat}, ${lng}`;
                map.setCenter({lat, lng});
                let html;
                for(let r of restaurants){
                    let distance = getDistance(lat, lng, r.lat, r.lng);
                    html += `<li>
                                <h3>${r.name}</h3>
                                <p><address>${r.address}</address></p>
                                <span class="distance">${distance.toFixed(1)} km</span>
                            </li>`;
                }
                list.innerHTML = html;
            });
            
        }else
            console.log('Estamos en problemas');            
    });

    linkMap.addEventListener('click', evt => {
        evt.preventDefault()
        if(mapContainer.className == 'noVer'){
            mapContainer.className = ""
            linkMap.innerHTML = "Ocultar Mapa"
        } else {
            mapContainer.className = "noVer"
            linkMap.innerHTML = "Mostrar Mapa"        
        }
    });
});


////////////////////////////////////

