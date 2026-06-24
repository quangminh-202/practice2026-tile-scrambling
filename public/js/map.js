/**
 * Initialize map with scrambled tile layer
 */
function initMap() {
  console.log('Initializing map...');

  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded!');
    document.getElementById('map').innerHTML = 
      '<h1 style="color:red;padding:20px;">Error: Leaflet library failed to load!</h1>';
    return;
  }

  // Create map instance
  const map = L.map('map').setView(CONFIG.MAP_CENTER, CONFIG.DEFAULT_ZOOM);
  console.log('Map created successfully');

  // Create scrambled tile layer
  const scrambledLayer = new ScrambledTileLayer('', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: CONFIG.MAX_ZOOM,
    offsetX: CONFIG.OFFSET_X,
    offsetY: CONFIG.OFFSET_Y,
    debug: true // Set to false in production
  });

  // Add layer to map
  scrambledLayer.addTo(map);
  console.log('Scrambled tile layer added');

  return map;
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}
