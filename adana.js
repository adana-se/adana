let skewerPin = L.icon({iconUrl: 'skewer.png'});

let markers = [
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

let map = createMap()


for(let m of markers) {
    let popupOptions = { className: 'markerPopup' }
    let popupContent = `<h1>${m.title}</h1>`
    let popup = L.popup(popupOptions).setLatLng(m.coordinates).setContent(popupContent)

    let markerOptions = { title: m.title, icon: skewerPin, alt: m.title }
    let marker = L.marker(m.coordinates, markerOptions)

    marker.bindPopup(popup).openPopup();
    marker.addTo(map);
}
