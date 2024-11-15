import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  connect() {
    if (window.location.search) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
  
      const tagId = urlParams.get('tag_id')
  
      const trackTagId = document.getElementById('track_tag_id');
  
      trackTagId.value = tagId;
    }
  }
}
