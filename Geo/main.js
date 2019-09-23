
document.addEventListener('DOMContentLoaded', ()=>{

const linkAll = document.querySelector('#linkAll')
const linkNear = document.querySelector('#linkNear')
const linkMap = document.querySelector('#linkMap')

const mapContainer = document.querySelector('#mapContainer')
const list = document.querySelector('#list ul')
const listTitle = document.querySelector('#listTitle')

linkAll.addEventListener('click', (evt)=>{
    evt.preventDefault()
    let html = "";
    for(let r of restaurants){
        html += `
        <li>
            <h3> ${r.name} </h3>
            <p><address> ${r.address} </address></p>
        </li>`
    }
    list.innerHTML = html
    listTitle.innerHTML ='Todos los Restaurantes'
})

linkNear.addEventListener('click', (evt)=>{

        navigator.geolocation.getCurrentPosition( 
            (location)=>{
                let lat = location.coords.latitude
                let lng = location.coords.longitude
                listTitle.innerHTML = `Cerca de ${lat}, ${lng}`
                map.setCenter({lat: lat, lng: lng})
                let marker = new google.maps.Marker({
                    position: {
                        lat:lat, lng: lng
                    }, 
                    map: map,
                    title: "Usted esta aqui"
                })

                let html =""
                for(let r of restaurants){
                    let distance = getDistance(lat, lng, r.lat, r.lng)
                    html += `
                    <li>
                    <h3> ${r.name} </h3>
                    <p>
                        <address> ${r.address} </address>
                        <span class="distance">${distance.toFixed(1)} km </span>
                    </p>
                </li>`      
                }
                list.innerHTML = html
        }, 
        ()=>{
            alert("no puede usar geolocalizacion")
        }
        )

})

linkMap.addEventListener('click', (evt)=>{
    evt.preventDefault()
    if(mapContainer.className == 'nover'){
        //mapContainer.className = ""
        mapContainer.classList.remove('nover')
        linkMap.innerHTML = "Ocultar Mapa"
    } else {
        //mapContainer.className = "nover"
        mapContainer.classList.add('nover')
        linkMap.innerHTML = "Mostrar Mapa"        
    }
})

})


var map;

function initMap(){
    let ulHere = {
        lat: 41.9156915, 
        lng: 12.471871
    }

    map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 15,
        center: ulHere,
        click: hacerAlgo
    })
    // marcar puntos en el mapa
    for(let r of restaurants){
        let marker = new google.maps.Marker({
            position: {
                lat:r.lat, lng: r.lng
            }, 
            map: map,
            title: r.name
        })
    }
}

function hacerAlgo(){
    alert('click en el mapa')
}
