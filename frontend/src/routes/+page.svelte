<script>
  // State management
  let selectedLocation = null;
  
  // Sample data - in real app would come from backend
  const metrics = {
    totalSpaces: 15,
    averageScore: 8.4,
    populationServed: 25000,
    totalArea: 45000
  };

  const sampleLocations = [
    { id: 1, name: "Central Park Area", score: 9.2, area: 12000, population: 8000 },
    { id: 2, name: "Riverside Zone", score: 7.8, area: 8500, population: 5500 },
    { id: 3, name: "Downtown Square", score: 8.5, area: 6000, population: 12000 }
  ];
</script>

<!-- SVG Icons -->
<svg style="display: none;">
  <symbol id="pin-icon" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11z 
      M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </symbol>
  
  <symbol id="tree-icon" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M12 3L4 15h16L12 3z M12 22v-7" />
  </symbol>
  
  <symbol id="people-icon" viewBox="0 0 24 24">
    <circle cx="9" cy="7" r="4" stroke-width="2" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2
      M16 3.13a4 4 0 0 1 0 7.75
      M21 21v-2a4 4 0 0 0-3-3.85" />
  </symbol>
  
  <symbol id="building-icon" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M3 21h18M3 7v14M21 7v14
      M6 11h.01M6 15h.01M6 19h.01M14 11h.01M14 15h.01M14 19h.01
      M10 11h.01M10 15h.01M10 19h.01M18 11h.01M18 15h.01M18 19h.01
      M3 7l9-4 9 4" />
  </symbol>
</svg>

<div class="p-6 max-w-6xl mx-auto">
  <!-- Summary Cards Grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
    <!-- Total Spaces Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium">Total Spaces</h3>
        <svg class="h-4 w-4 text-gray-500">
          <use href="#pin-icon" />
        </svg>
      </div>
      <div class="text-2xl font-bold">{metrics.totalSpaces}</div>
    </div>

    <!-- Average Score Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium">Average Score</h3>
        <svg class="h-4 w-4 text-green-500">
          <use href="#tree-icon" />
        </svg>
      </div>
      <div class="text-2xl font-bold">{metrics.averageScore}</div>
    </div>

    <!-- Population Served Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium">Population Served</h3>
        <svg class="h-4 w-4 text-blue-500">
          <use href="#people-icon" />
        </svg>
      </div>
      <div class="text-2xl font-bold">
        {metrics.populationServed.toLocaleString()}
      </div>
    </div>

    <!-- Total Area Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium">Total Area (m²)</h3>
        <svg class="h-4 w-4 text-purple-500">
          <use href="#building-icon" />
        </svg>
      </div>
      <div class="text-2xl font-bold">
        {metrics.totalArea.toLocaleString()}
      </div>
    </div>
  </div>

  <!-- Map Section -->
  <div class="bg-white rounded-lg shadow mb-6">
    <div class="p-4">
      <div class="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Map Integration Goes Here</p>
      </div>
    </div>
  </div>

  <!-- Location List -->
  <div class="bg-white rounded-lg shadow">
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Potential Locations</h2>
      <div class="divide-y">
        {#each sampleLocations as location (location.id)}
          <div 
            class="py-4 cursor-pointer hover:bg-gray-50"
            on:click={() => selectedLocation = location}
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-medium">{location.name}</h3>
                <p class="text-sm text-gray-500">
                  Area: {location.area.toLocaleString()} m² | Population: {location.population.toLocaleString()}
                </p>
              </div>
              <div class="text-lg font-bold text-green-600">
                {location.score}/10
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Add any component-specific styles here */
  svg {
    fill: none;
    stroke: currentColor;
  }
</style>