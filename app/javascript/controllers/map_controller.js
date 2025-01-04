import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  connect() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXN0cm91c2UiLCJhIjoiY20zMXd5OGJ2MTI5YTJqcHpjeWZqazNxOCJ9.eIFUQ6YXkHt6kmKb_gLaQw';

    const mapElement = document.getElementById('map');

    let tags, tracks;
    if (mapElement.dataset.tags) {
      tags = JSON.parse(mapElement.dataset.tags);
    } else if (mapElement.dataset.tag) {
      tags = [JSON.parse(mapElement.dataset.tag)];
      tracks = JSON.parse(mapElement.dataset.tracks)
    }
    console.log({tags});
    console.log({tracks});

    //////////////////////////////////////// MAP ////////////////////////////////////////
    const mapOptions = {
      center: [0, 0],
      zoom: 12,
      pitch: 70,
      bearing: 0,
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
    };

    if (tags.length === 1) {
      mapOptions.center = [parseFloat(tags[0].lng), parseFloat(tags[0].lat)];
      mapOptions.zoom = 13;
    } else if (tags.length > 1) {
      const lat = tags.reduce((acc, cur) => parseFloat(cur.lat) + acc, 0.0) / tags.length;
      const lng = tags.reduce((acc, cur) => parseFloat(cur.lng) + acc, 0.0) / tags.length;
      
      mapOptions.center = [lng, lat];
      // TODO: calculate zoom based on multiple tags
      mapOptions.zoom = 10;
    }

    const map = new mapboxgl.Map(mapOptions);

    if (!tags.length) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        map.setCenter([coords.longitude, coords.latitude]);
      });
    }

    // Double click for new tag
    map.on('dblclick', (e) => {
      e.preventDefault();
      const title = 'Create a new tag?';
      const link = `http://localhost:3000/tags/new?lat=${e.lngLat.lat}&lng=${e.lngLat.lng}`;
      createPopup(e.lngLat, title, link).addTo(map);
    });


    //////////////////////////////////////// TAGS ////////////////////////////////////////
    tags.map(tag => {
      const marker = new mapboxgl.Marker({
        color: "#FD4F00",
        draggable: true
      })
        .setLngLat([parseFloat(tag.lng), parseFloat(tag.lat)])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <p>${tag.name}</p>
          <p><a href="http://localhost:3000/map/tags/${tag.id}">See on Map</a></p>
          <p><a href="http://localhost:3000/tags/${tag.id}">Edit Tag Info</a></p>
          <p><a href="http://localhost:3000/tracks/new?tag_id=${tag.id}">Add Track</a></p>
        `))
        .addTo(map);
        
      // Move existing tag to edit location
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        const title = 'Move tag location?';
        const link = `http://localhost:3000/tags/${tag.id}/edit?lat=${lngLat.lat}&lng=${lngLat.lng}`;
        createPopup(lngLat, title, link).addTo(map);

        // TODO: return tag to original location if canceled
      });
    });


    //////////////////////////////////////// TRACKS ////////////////////////////////////////
    map.on('load', () => {
      if (tracks) {
        tracks.forEach(({ data }) => {
          map.addSource('route', {
            type: 'geojson',
            data: JSON.parse(data),
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
      }
    });


    //////////////////////////////////////// TERRAIN ////////////////////////////////////////
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
  }
}


//////////////////////////////////////// UTILS ////////////////////////////////////////
function createPopup(lngLat, title, link) {
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

  return new mapboxgl.Popup({offset: popupOffsets, className: 'popup'})
    .setLngLat(lngLat)
    .setHTML(`
      <div>
        <h1>${title}</h1>
        <a href="${link}">GO</a>
      </div>
    `)
    .setMaxWidth('300px');
}