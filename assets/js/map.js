// import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXN0cm91c2UiLCJhIjoiY20weDA1anBrMDdpOTJpcHNibW5ibnNqdiJ9.E3oVQIz8a3w4Dg1GQ_Ki-w';

const tags = JSON.parse(document.currentScript.getAttribute('tags'));
const tracks = document.currentScript.getAttribute('tracks') 
  ? JSON.parse(document.currentScript.getAttribute('tracks'))
  : [];
let center

if (tags.length === 1) {
  center = [parseFloat(tags[0].lng), parseFloat(tags[0].lat)]
} else {
  center = [-105.27, 40]
}

const newLngLat = {}

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center,
  zoom: 12,
  pitch: 70,
  bearing: 315,
});

// Event handlers
map.on('dblclick', (e) => {
  e.preventDefault();
  
  const markerHeight = 50;
  const markerRadius = 10;
  const linearOffset = 25;
  const popupOffsets = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
  };

  // Get rid of this html form crap, and use ajax?
  const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
    .setLngLat(e.lngLat)
    .setHTML(`
      <form class="popup-form" id="create-tag-form">
        <h1>Create new marker:</h1>
        <div class="popup-form">
          <label for="name">Name: </label>
          <input type="text" name="name" id="create-tag-name" value="blah" required />
        </div>
        <div class="popup-form">
          <label for="name">Latitude: </label>
          <input type="text" name="lat" id="create-tag-lat" value=${e.lngLat.lat} required />
        </div>
        <div class="popup-form">
          <label for="name">Longitude: </label>
          <input type="text" name="lng" id="create-tag-lng" value=${e.lngLat.lng} required />
        </div>
        <div class="popup-form">
          <input type="submit" />
        </div>
      </form>
    `)
    .setMaxWidth("300px")
    .addTo(map);

    const createTagForm = document.getElementById('create-tag-form');
    createTagForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('create-tag-name').value;
      const lat = document.getElementById('create-tag-lat').value;
      const lng = document.getElementById('create-tag-lng').value;
      const body = JSON.stringify({ name, lat, lng });
      console.log({body})

      const request = new Request('/api/map/tags', {
        method: 'POST',
        body,
      });

      fetch(request)
        .then(res => console.log(res));
    });
})

// Terrain
map.on('style.load', () => {
  map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
  });
  // add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
});

// Tags
const markers = tags.map(tag =>
  new mapboxgl.Marker({
    color: "#FD4F00",
    draggable: true
  })
    .setLngLat([parseFloat(tag.lng), parseFloat(tag.lat)])
    .setPopup(new mapboxgl.Popup().setHTML(`<h1>${tag.name}</h1>`))
    .addTo(map));

// Tracks
map.on('load', () => {
  tracks.forEach(({ data }) => {
    map.addSource('route', {
      type: 'geojson',
      data,
    });

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FD4F00',
        'line-width': 5
      }
    });
  });
});
