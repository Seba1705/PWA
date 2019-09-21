// Calcula la distancia entre dos puntos en la tierra
function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radio de la tierra en km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distancia en km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

var restaurants = [
    { 
        name: "Sushi Shop", address: "Via Po 160",
        lat: 41.9156915, lng: 12.471871
    },
    { 
        name: "Gran Dragon", address: "Via Nomentana, 49",
        lat: 41.9054717, lng: 12.4758192
    },
    { 
        name: "Ale Carrete", address: "Via della Madonna dei Monti, 95",
        lat: 41.8865606, lng: 12.4588248
    },
    { 
        name: "Ristorante Scarpone", address: "Via di S. Pancrazio, 15",
        lat: 41.8814485, lng: 12.4234625
    },
    { 
        name: "Papetto", address: "Circonvallazione Gianicolense, 91",
        lat: 41.864448, lng: 12.4203726
    },
    { 
        name: "Ristorante Euro Bangla", address: "Via Eratostene, 44",
        lat: 41.8741583, lng: 12.5150818
    }                
];


// ApiKey
// AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM
// AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ
// AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8
// AIzaSyCroCERuudf2z02rCrVa6DTkeeneQuq8TA
// AIzaSyBkDYSVRVtQ6P2mf2Xrq0VBjps8GEcWsLU
// AIzaSyAu2rb0mobiznVJnJd6bVb5Bn2WsuXP2QI
// AIzaSyAZ7zantyAHnuNFtheMlJY1VvkRBEjvw9Y
// AIzaSyDSPDpkFznGgzzBSsYvTq_sj0T0QCHRgwM
// AIzaSyD4YFaT5DvwhhhqMpDP2pBInoG8BTzA9JY
// AIzaSyAbPC1F9pWeD70Ny8PHcjguPffSLhT-YF8