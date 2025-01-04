import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  connect() {
    if (window.location.search) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
  
      const lat = urlParams.get('lat')
      const lng = urlParams.get('lng')
  
      const tagLat = document.getElementById('tag_lat');
      const tagLng = document.getElementById('tag_lng'); 
  
      tagLat.value = lat;
      tagLng.value = lng;
    }
  }
}
