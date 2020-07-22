let skewerPin = L.icon({iconUrl: 'skewer.png'});

let markers = [
    {
        coordinates: [59.33, 18.06],
        title: 'middle of things',
        icon: skewerPin
    }
]

let map = L.map('adanamap').setView([59.3346, 18.066], 13);
let anotherLayer = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
let osmAttribution = '&copy; '
    + '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    + ' contributors'
let iconAttribution = 'Icons made by '
    + '<a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>'
    + ' from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>' 

L.tileLayer(anotherLayer, {
    attribution: osmAttribution + ' | ' + iconAttribution
}).addTo(map);

for(let m of markers) {
    let markerOptions = {
        title: m.title,
        icon: m.icon
    }

    L.marker(m.coordinates, markerOptions).addTo(map);
}

