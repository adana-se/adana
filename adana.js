let skewerPin = L.icon({iconUrl: 'skewer.png'});

let pois = [
    {
        plusCode: '837H+V9 Stockholm',
        title: 'Amida kolgrill'
    }
]

const startLat = 59.3346
const startLng = 18.066

let coordinatesFromPlusCode = (plusCode) => {
    let actualCode = plusCode.split(' ')[0]
    let fullCode = OpenLocationCode.recoverNearest(actualCode, startLat, startLng)
    let location = OpenLocationCode.decode(fullCode)
    return [location.latitudeCenter, location.longitudeCenter]
}

let startLocation = () => {
    let storedLat = localStorage.getItem("lat")
    let storedLng = localStorage.getItem("lng")
    if(storedLat == null || storedLng == null) {
        let defaultStart = L.latLng(startLat, startLng)
        return defaultStart
    }
    return L.latLng(storedLat, storedLng)
}

let saveLocation = (map) => {
    return () => {
        let currentLocation = map.getCenter()
        localStorage.setItem("lat", currentLocation.lat)
        localStorage.setItem("lng", currentLocation.lng)
    }
}

let createMap = () => {
    let map = L.map('adanamap').setView(startLocation(), 13);
    let anotherLayer = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'

    let attribution = () => {
        let osmAttribution = '&copy; '
            + '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            + ' contributors'
        let iconAttribution = 'Icons made by '
            + '<a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>'
            + ' from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>'

        return osmAttribution + ' | ' + iconAttribution
    }

    L.tileLayer(anotherLayer, { attribution: attribution() }).addTo(map);

    map.on("move", saveLocation(map))

    return map
}


let createPopup = (poi) => {
    let popupOptions = { className: 'markerPopup' }
    let popupContent = `<h1>${poi.title}</h1>`
    let coordinates = coordinatesFromPlusCode(poi.plusCode)
    return L.popup(popupOptions).setLatLng(coordinates).setContent(popupContent)
}

let createMarker = (poi) => {
    let markerOptions = {
        title: poi.title,
        icon: skewerPin,
        alt: poi.title
    }
    let coordinates = coordinatesFromPlusCode(poi.plusCode)
    console.log(coordinates)
    console.log(markerOptions)
    return  L.marker(coordinates, markerOptions)
}

let map = createMap()


for(let poi of pois) {
    let popup = createPopup(poi)
    let marker = createMarker(poi)

    marker.bindPopup(popup).openPopup();
    marker.addTo(map);
}
