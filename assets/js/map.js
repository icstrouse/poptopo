import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXN0cm91c2UiLCJhIjoiY20weDA1anBrMDdpOTJpcHNibW5ibnNqdiJ9.E3oVQIz8a3w4Dg1GQ_Ki-w';

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-77.0323, 38.9131], // starting position [lng, lat]
	zoom: 10, // starting zoom
});

map.addSource('station-data', {
  type: 'geojson',
  data: '../stations.geojson',
});

// map.on('load', () => {
  map.addLayer({
    id: 'stations',
    // References the GeoJSON source defined above
    // and does not require a `source-layer`
    source: 'stations-data',
    type: 'symbol',
    // slot: 'top',
    layout: {
        // Set the label content to the
        // feature's `name` property
        'text-field': ['get', 'name'],
    }
  });
// });