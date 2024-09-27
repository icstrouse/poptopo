// import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXN0cm91c2UiLCJhIjoiY20weDA1anBrMDdpOTJpcHNibW5ibnNqdiJ9.E3oVQIz8a3w4Dg1GQ_Ki-w';

const tags = JSON.parse(document.getElementById('map').getAttribute('tags'));
const tracks = JSON.parse(document.getElementById('map').getAttribute('tracks'));

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-105, 40],
  zoom: 13,
});

// Tags
const markers = tags.map(tag =>
  new mapboxgl.Marker({
    color: "#555555",
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
        'line-color': '#555555',
        'line-width': 8
      }
    });
  });
});
