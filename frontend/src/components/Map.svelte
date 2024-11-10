<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map, NavigationControl, Marker } from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { parkSugesstionList } from '../../data/parkSuggestionInfo'

  let map;
  let mapContainer;

  onMount(() => {

    const { env } = _process;
    const apiKey = env.API_KEY;

    if (!apiKey) {
      throw new Error("You need to configure env API_KEY first, see README");
    }

    const initialState = { lng: -73.6875, lat: 42.728104, zoom: 14 };
  
    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    map.addControl(new NavigationControl(), 'top-right');
    // new Marker({color: "#FF0000"})
    //   .setLngLat([-73.6868, 42.7284])
    //   .addTo(map);
    
    map.on('load', () => {
      

      parkSugesstionList.forEach( (data) => {
        console.log(data.id)
        console.log((data.id).toString())
        map.addSource((data.id).toString(), {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [data.coordinates]
          }
        }
      })
      map.addLayer({
        'id': 'testing-point' + (data.id).toString(),
        'type': 'fill',
        'source': (data.id).toString(),
        'layout': {},
        'paint': {
          'fill-color': '#277',
          'fill-opacity': 0.35
        }
      });
      // map.addSource(data.id.toString(), {
      //   'type': 'geojson',
      //   'data': {
      //     'type': 'Feature',
      //     'geometry': {
      //       'type': 'Polygon',
      //       'coordinates': data.coordinates
      //     }
      //   }
      // });
      // map.addLayer({
      //   'id': data.id.toString(),
      //   'type': 'fill',
      //   'source': data.id.toString(),
      //   'layout': {},
      //   'paint': {
      //     'fill-color': '#277',
      //     'fill-opacity': 0.35
      //   }
      // })
  
  })
  })

  });

  onDestroy(() => {
		map.remove();
	});
</script>

<div class="map-wrap">
  <a href="https://www.maptiler.com" class="watermark"><img
      src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
  <div class="map" id="map" bind:this={mapContainer}></div>
</div>

<style>

.map-wrap {
  position: relative;
  width: 100%;
  height: 100vh; /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  visibility: hidden;
}
</style>
