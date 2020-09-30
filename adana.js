let skewerPin = L.icon({iconUrl: 'skewer.png', className: 'skewer'});

let pois = [
    {
        plusCode: '837H+V9 Stockholm',
        title: 'Amida kolgrill',
        taste: 3,
        heat: 2,
        juice: 2,
        overall: 8.2,
        lastUpdated: '2020-08-13'
    },
    {
        plusCode: 'CWHQ+97 Sollentuna',
        title: 'Kolgrill Habayeb',
        taste: 2,
        heat: 0,
        juice: 3,
        overall: 7.6,
        lastUpdated: '2020-08-30',
        accesories: ['tomato', 'lemon', 'parsley', 'green chilli'],
        extras: ['soup', 'sallad buffet', 'pickles'],
        carbs: ['huge bread', 'rice'],
        altName: 'shish'
    },
    {
        plusCode: '7W86+V4 Huddinge',
        title: 'Le Beirut',
        taste: 0,
        heat: 1,
        juice: 0,
        overall: 3.3,
        lastUpdated: '2020-09-12',
        accesories: ['salad', 'hummus', 'labneh', 'mohammara'],
        extras: [],
        carbs: ['frites'],
        altName: 'Shish Kebab Kafta'
    },
    {
        plusCode: '89CJ+P6 Gustavsberg',
        title: 'Arena Kolgrill',
        taste: 2,
        heat: 2,
        juice: 2,
        overall: 7.3,
        lastUpdated: '2020-09-29',
        accesories: ['salad', 'tzatziki', 'tomato', 'tomato/chilli/parsley sauce', 'salad'],
        extras: [],
        carbs: ['bulgur'],
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


let unicodeStarsMatchingScore = (score) => {
    let stars = ''
    let star = '★'
    for(let i = 0; i < 3; i++) {
        if( i == score ) {
            star = '☆'
        }
        stars += star
    }

    return stars
}

let oneRow = (title, score) => {
    return `<tr class="${title}"><td class="header">${title}</td><td class="score">${unicodeStarsMatchingScore(score)}</td></tr>`
}

let createPopupContent = (poi) => {
    return `
      <h1 class="headerStars">${poi.overall}</h1>
      <hr/>
      <h1>${poi.title}</h1>
      <table class="scoreMatrix">
        ${oneRow('heat', poi.heat)}
        ${oneRow('juice', poi.juice)}
        ${oneRow('taste', poi.taste)}
      </table>
      <hr/>
      <div>last updated on ${poi.lastUpdated}</div>
`
}

let createPopup = (poi) => {
    let popupOptions = { className: 'markerPopup' }
    let popupContent = createPopupContent(poi)
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
