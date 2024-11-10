<script>
  import { onMount, onDestroy } from "svelte";
  import { Map, NavigationControl } from "maplibre-gl";
  import MapboxDraw from "@mapbox/mapbox-gl-draw";
  import "maplibre-gl/dist/maplibre-gl.css";
  import * as turf from "@turf/turf";
  import { parkSugesstionList } from "../../data/parkSuggestionInfo";
  import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
  import { drawParkList } from "../../data/drawParkInfo";

  let map;
  let mapContainer;
  let tooltipContent = "";
  let tooltipPosition = { x: 0, y: 0 };
  let showTooltip = false;
  let calculatedArea = "";
  let index = null;
  let draw;
  let hoveredStateId = null;
  let drawFeatureId = 0;

  function updateArea(e) {
    const data = draw.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data);
      calculatedArea = Math.round(area * 100) / 100;
      index = Math.round(Math.random() * 5);

      // Clear previous draw layer if exists
      if (map.getLayer(`drawn-polygon-${drawFeatureId}`)) {
        map.removeLayer(`drawn-polygon-${drawFeatureId}`);
        map.removeSource(`drawn-polygon-${drawFeatureId}`);
      }

      // Update drawFeatureId for unique layer IDs
      drawFeatureId += 1;

      // Add the drawn polygon as a new layer
      const newPolygon = data.features[0];
      map.addSource(`drawn-polygon-${drawFeatureId}`, {
        type: "geojson",
        data: newPolygon,
      });

      map.addLayer({
        id: `drawn-polygon-${drawFeatureId}`,
        type: "fill",
        source: `drawn-polygon-${drawFeatureId}`,
        layout: {},
        paint: {
          "fill-color": "#277",
          "fill-opacity": 0.35,
        },
      });

      // Add hover functionality for drawn polygon
      map.on("mousemove", `drawn-polygon-${drawFeatureId}`, (e) => {
        tooltipContent = `Area: ${calculatedArea} sq meters`;
        tooltipPosition = { x: e.point.x, y: e.point.y };
        showTooltip = true;
        hoveredStateId = e.features[0].id;
      });

      map.on("mouseleave", `drawn-polygon-${drawFeatureId}`, () => {
        showTooltip = false;
        hoveredStateId = null;
      });
    } else {
      calculatedArea = "";
      index = null;
      if (e.type !== "draw.delete") {
        alert("Use the draw tools to draw a polygon!");
      }
    }
  }

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
      zoom: initialState.zoom,
    });

    draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(new NavigationControl(), "top-right");
    map.addControl(draw, "top-right");

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    map.on("load", () => {
      parkSugesstionList.forEach((data) => {
        map.addSource(data.id.toString(), {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [data.coordinates],
            },
            properties: {},
            id: data.id,
          },
        });

        map.addLayer({
          id: "testing-point" + data.id,
          type: "fill",
          source: data.id.toString(),
          layout: {},
          paint: {
            "fill-color": "#277",
            "fill-opacity": 0.35,
          },
        });

        // Show tooltip on mousemove for predefined polygons
        map.on("mousemove", "testing-point" + data.id, (e) => {
          tooltipContent = data.info;
          tooltipPosition = { x: e.point.x, y: e.point.y };
          showTooltip = true;
          hoveredStateId = e.features[0].id;
        });

        // Hide tooltip on mouse leave for predefined polygons
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
  {#if calculatedArea}
    <div class="calculation-box">
      <p>Drawn Area:</p>
      <p><strong>{calculatedArea}</strong></p>
      <p>square meters</p>
      <p>{drawParkList[index].population_density}</p>
      <p>{drawParkList[index].sunlight_hours}</p>
      <p>{drawParkList[index].environmental_data.vegetation_coverage}</p>
    </div>
  {/if}

  <!-- Tooltip div -->
  {#if showTooltip}
    <div
      class="tooltip"
      style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
    >
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
    color: #fff;
    border-radius: 3px;
    pointer-events: none;
    white-space: pre-wrap; /* Allows new lines */
    transform: translate(-50%, -150%);
    z-index: 10;
  }
</style>
