<script>
    import { onMount, onDestroy } from 'svelte';
    import { Map, NavigationControl } from 'maplibre-gl';
    import MapboxDraw from '@mapbox/mapbox-gl-draw';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import * as turf from '@turf/turf';
    import { parkSugesstionList } from '../../data/parkSuggestionInfo';
    import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
    import { drawParkList} from '../../data/drawParkInfo'
    import { API_KEY } from '../constants';
  
    let map;
    let mapContainer;
    let tooltipContent = ''; // To hold the tooltip content
    let tooltipPosition = { x: 0, y: 0 };
    let showTooltip = false;
    let calculatedArea = '';
    let index = null;
    let draw;
    let customParkIds = []; // Add this to track custom parks

    function clearCustomParks() {
        console.log('Clearing custom parks');
        console.log('Current custom parks:', customParkIds);
        
        customParkIds.forEach(id => {
            if (map.getLayer('testing-point' + id)) {
                map.removeLayer('testing-point' + id);
                console.log('Removed layer:', 'testing-point' + id);
            }
            if (map.getSource(id)) {
                map.removeSource(id);
                console.log('Removed source:', id);
            }
        });
        
        customParkIds = [];
        calculatedArea = '';
        index = null;
        console.log('Parks cleared');
    }


  
    function updateArea(e) {
        if (e.type === 'draw.delete') {
            // When trash button is clicked, clear custom parks
            clearCustomParks();
            calculatedArea = '';
            index = null;
            return;
        }

        const data = draw.getAll();
        if (data.features.length > 0) {
            const area = turf.area(data);
            calculatedArea = Math.round(area * 100) / 100;
            index = Math.round(Math.random() * 5);

            // Only create new park if this is a create event
            if (e.type === 'draw.create') {
                const lastFeature = data.features[data.features.length - 1];
                const newParkId = `custom-park-${Date.now()}`;
                customParkIds.push(newParkId); // Add to tracking array

                map.addSource(newParkId, {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': lastFeature.geometry,
                        'properties': {},
                        'id': newParkId
                    }
                });

                map.addLayer({
                    'id': 'testing-point' + newParkId,
                    'type': 'fill',
                    'source': newParkId,
                    'layout': {},
                    'paint': {
                        'fill-color': '#277',
                        'fill-opacity': 0.35
                    }
                });

                map.on('mousemove', 'testing-point' + newParkId, (e) => {
                    tooltipContent = `New Park Area\nArea: ${calculatedArea} square meters\nPopulation Density: ${drawParkList[index].population_density}\nSunlight Hours: ${drawParkList[index].sunlight_hours}\nVegetation Coverage: ${drawParkList[index].environmental_data.vegetation_coverage}`;
                    tooltipPosition = { x: e.point.x, y: e.point.y };
                    showTooltip = true;
                });

                map.on('mouseleave', 'testing-point' + newParkId, () => {
                    showTooltip = false;
                });

                // Clear the drawing after creating the park
                draw.deleteAll();
            }
        } else {
            calculatedArea = '';
            index = null;
            if (e.type !== 'draw.delete') {
                alert('Use the draw tools to draw a polygon!');
            }
        }
    }

onMount(() => {
      const apiKey = API_KEY;
  
      if (!apiKey) {
        throw new Error("You need to configure env API_KEY first, see README");
      }
  
      const initialState = { lng: -73.6875, lat: 42.728104, zoom: 14 };
  
      MapboxDraw.constants.classes.CONTROL_BASE  = 'maplibregl-ctrl';
      MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
      MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';
  
      map = new Map({
        container: mapContainer,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      });
  
      draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
  
      map.addControl(new NavigationControl(), 'top-right');
      map.addControl(draw, 'top-right');

      map.on('draw.delete', (e) => {
            console.log('Trash button clicked!');
            console.log('Current custom parks:', customParkIds);
            console.log('Current area:', calculatedArea);
            clearCustomParks();
            console.log('After clearing, custom parks:', customParkIds);
        });

    map.on('draw.create', (e) => {
        console.log('draw.create event fired');
        updateArea({ ...e, type: 'draw.create' });
    });

    map.on('draw.update', (e) => {
        console.log('draw.update event fired');
        updateArea({ ...e, type: 'draw.update' });
    });

  
      let hoveredStateId = null;
  
      map.on('load', () => {
        setTimeout(() => {
                const trashButton = document.querySelector('.mapbox-gl-draw_trash');
                if (trashButton) {
                    console.log('Found trash button');
                    
                    // Add click event with capture
                    trashButton.addEventListener('click', (e) => {
                        e.stopPropagation(); // Stop event from bubbling
                        console.log('Trash button clicked!');
                        console.log('Current custom parks:', customParkIds);
                        clearCustomParks();
                        draw.deleteAll(); // Make sure to clear the drawing too
                        console.log('After clearing, custom parks:', customParkIds);
                    }, true); // Added capture phase

                    // Add mousedown event as backup
                    trashButton.addEventListener('mousedown', (e) => {
                        console.log('Trash button mousedown!');
                    });

                    // Visual feedback that listener is attached
                    // trashButton.style.border = '2px solid red';
                    
                    // Log button properties
                    console.log('Trash button properties:', {
                        classList: Array.from(trashButton.classList),
                        style: trashButton.style,
                        disabled: trashButton.disabled,
                        visible: trashButton.offsetParent !== null
                    });
                } else {
                    console.log('Trash button not found - please check selector');
                }
            }, 1000);

        parkSugesstionList.forEach((data) => {
          // Ensure each feature has a unique `id`
          map.addSource(data.id.toString(), {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [data.coordinates]
              },
              'properties': {},
              'id': data.id // Add a unique id for each feature
            }
          });
  
          map.addLayer({
            'id': 'testing-point' + data.id,
            'type': 'fill',
            'source': data.id.toString(),
            'layout': {},
            'paint': {
              'fill-color': '#277',
              'fill-opacity': 0.35
            }
          });
  
          // Show tooltip on mousemove
          map.on("mousemove", "testing-point" + data.id, (e) => {
          tooltipContent = data.info;
          tooltipPosition = { x: e.point.x, y: e.point.y };
          showTooltip = true;
          hoveredStateId = e.features[0].id;
        });
  
          // Hide tooltip on mouse leave
          map.on("mouseleave", "testing-point" + data.id, () => {
          showTooltip = false;
          hoveredStateId = null;
        });
        });
      });
    });
  
    onDestroy(() => {
      map.remove();
    });
  </script>
  
  <div class="map-wrap">
    <div class="map" id="map" bind:this={mapContainer}></div>
  
    <!-- Tooltip div -->
    {#if showTooltip}
      <div class="tooltip" style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;">
        {tooltipContent}
      </div>
    {/if}
  </div>
  
  <style>
  .calculation-box {
    height: 75px;
    width: 150px;
    position: absolute;
    bottom: 40px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    text-align: center;
  }
  .map-wrap {
    width: 100%;
    height: 100vh;
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .tooltip {
    position: absolute;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 3px;
    pointer-events: none;
    white-space: pre-wrap; /* Allows new lines */
    transform: translateX(-50%);
    z-index: 10;
  }
  </style>
  