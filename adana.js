let skewerPin = L.icon({iconUrl: 'skewer.png'});

let pois = [
    {
        coordinates: [59.33, 18.06],
        title: 'middle of things'
    }
]

let createMap = () => {
    let map = L.map('adanamap').setView([59.3346, 18.066], 13);
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

    return map
}


let createPopup = (poi) => {
    let popupOptions = { className: 'markerPopup' }
    let popupContent = `<h1>${poi.title}</h1>`
    return L.popup(popupOptions).setLatLng(poi.coordinates).setContent(popupContent)    
}

let createMarker = (poi) => {
    let markerOptions = {
        title: poi.title,
        icon: skewerPin,
        alt: poi.title
    }
    return  L.marker(poi.coordinates, markerOptions)    
}

let map = createMap()


for(let poi of pois) {
    let popup = createPopup(poi)
    let marker = createMarker(poi)

    marker.bindPopup(popup).openPopup();
    marker.addTo(map);
}
