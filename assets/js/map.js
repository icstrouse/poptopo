// import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXN0cm91c2UiLCJhIjoiY20weDA1anBrMDdpOTJpcHNibW5ibnNqdiJ9.E3oVQIz8a3w4Dg1GQ_Ki-w';

const tags = JSON.parse(document.currentScript.getAttribute('tags'));
const tracks = document.currentScript.getAttribute('tracks') 
  ? JSON.parse(document.currentScript.getAttribute('tracks'))
  : [];
let center

console.log(tracks)
if (tags.length === 1) {
  center = [parseFloat(tags[0].lng), parseFloat(tags[0].lat)]
} else {
  center = [-105.27, 40]
}

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center,
  zoom: 12,
  pitch: 70,
  bearing: 315,
});

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
