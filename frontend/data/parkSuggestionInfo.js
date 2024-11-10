const createParkInfo = (
  score,
  area,
  population_density,
  sunlight_hours,
  environmental_data,
  demographic_data,
  site_characteristics
) => {
  // Helper function to format data with uppercase keys and spaces instead of underscores
  const formatData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        return `${formattedKey}: ${value}`;
      })
      .join("\n");
  };

  // Format each data section
  const formattedEnvironmentalData = formatData(environmental_data);
  const formattedDemographicData = formatData(demographic_data);
  const formattedSiteCharacteristics = formatData(site_characteristics);

  return `Main Data:\nScore = ${score}\nArea = ${area}\nPopulation Density = ${population_density}\nSunlight Hours = ${sunlight_hours}\n\nEnvironmental Data:\n${formattedEnvironmentalData}\n\nDemographic Data:\n${formattedDemographicData}\n\nSite Characteristics:\n${formattedSiteCharacteristics}`;
};

export const parkSugesstionList = [
  {
    id: 0,
    lat: 1,
    lon: 1,
    area: 25000,
    info: createParkInfo(
      80,
      25000,
      12000,
      7.5,
      {
        vegetation_coverage: 15,
        soil_quality: "Good",
        water_sources: true,
        air_quality_index: 65,
      },
      {
        population_within_1km: 5700,
        median_age: 43,
        income_level: "Mixed",
        foot_traffic: "Medium",
      },
      {
        slope: "Flat",
        current_use: "Senior Housing",
        surrounding: ["Commercial", "Residential"],
        noise_level: "Medium",
      }
    ),
    population_density: 5700,
    existing_green_space: 1,
    sunlight_hours: 7.1,
    environmental_data: {
      vegetation_coverage: 56,
      soil_quality: "Good",
      water_sources: true,
      air_quality_index: 45,
    },
    demographic_data: {
      population_within_1km: 5700,
      median_age: 43,
      income_level: "Mixed",
      foot_traffic: "Medium",
    },
    site_characteristics: {
      slope: "Flat",
      current_use: "Senior Housing",
      surrounding: ["Commercial", "Residential"],
      noise_level: "Medium",
    },
    coordinates: [
      [-73.683025, 42.735188],
      [-73.684495, 42.735442],
      [-73.685517, 42.733754],
      [-73.684509, 42.733585],
      [-73.683424, 42.733853],
    ],
  },
  {
    id: 1,
    lat: 1,
    lon: 1,
    area: 19000,
    info: createParkInfo(
      61,
      19000,
      4300,
      7.3,
      {
        vegetation_coverage: 84,
        soil_quality: "Good",
        water_sources: true,
        air_quality_index: 65,
      },
      {
        population_within_1km: 4300,
        median_age: 37,
        income_level: "Mixed",
        foot_traffic: "Low",
      },
      {
        slope: "Heavily Sloped",
        current_use: "Parking Lot",
        surrounding: ["Commercial", "Residential"],
        noise_level: "Medium",
      }
    ),
    population_density: 4300,
    existing_green_space: 1,
    sunlight_hours: 7.3,
    environmental_data: {
      vegetation_coverage: 84,
      soil_quality: "Good",
      water_sources: true,
      air_quality_index: 65,
    },
    demographic_data: {
      population_within_1km: 4300,
      median_age: 37,
      income_level: "Mixed",
      foot_traffic: "Low",
    },
    site_characteristics: {
      slope: "Heavily Sloped",
      current_use: "Parking Lot",
      surrounding: ["Commercial", "Residential"],
      noise_level: "Medium",
    },
    coordinates: [
      [-73.683081, 42.729096],
      [-73.684247, 42.729338],
      [-73.684326, 42.729726],
      [-73.684144, 42.73032],
      [-73.68345, 42.730871],
      [-73.683658, 42.7304],
      [-73.683365, 42.730189],
      [-73.682808, 42.730105],
    ],
  },
  {
    id: 2,
    lat: 1,
    lon: 1,
    area: 7500,
    info: createParkInfo(
      82,
      7500,
      5900,
      7.7,
      {
        vegetation_coverage: 74,
        soil_quality: "Good",
        water_sources: true,
        air_quality_index: 63,
      },
      {
        population_within_1km: 5900,
        median_age: 27,
        income_level: "Mixed",
        foot_traffic: "High",
      },
      {
        slope: "Slightly Sloped",
        current_use: "Field",
        surrounding: ["Commercial", "Residential"],
        noise_level: "Medium",
      }
    ),
    population_density: 5900,
    existing_green_space: 1,
    sunlight_hours: 7.7,
    environmental_data: {
      vegetation_coverage: 74,
      soil_quality: "Good",
      water_sources: true,
      air_quality_index: 63,
    },
    demographic_data: {
      population_within_1km: 5900,
      median_age: 27,
      income_level: "Mixed",
      foot_traffic: "High",
    },
    site_characteristics: {
      slope: "Slightly Sloped",
      current_use: "Field",
      surrounding: ["Commercial", "Residential"],
      noise_level: "Medium",
    },
    coordinates: [
      [-73.677174, 42.727228],
      [-73.677938, 42.72746],
      [-73.677956, 42.727897],
      [-73.677256, 42.727797],
      [-73.677315, 42.727475],
    ],
  },
  {
    id: 3,
    lat: 1,
    lon: 1,
    area: 73000,
    info: createParkInfo(
      93,
      73000,
      5200,
      7.9,
      {
        vegetation_coverage: 93,
        soil_quality: "Good",
        water_sources: true,
        air_quality_index: 87,
      },
      {
        population_within_1km: 5200,
        median_age: 43,
        income_level: "Mixed",
        foot_traffic: "Low",
      },
      {
        slope: "Flat",
        current_use: "Parking Lot",
        surrounding: ["Residential"],
        noise_level: "Medium",
      }
    ),
    population_density: 5200,
    existing_green_space: 1,
    sunlight_hours: 7.9,
    environmental_data: {
      vegetation_coverage: 93,
      soil_quality: "Good",
      water_sources: true,
      air_quality_index: 87,
    },
    demographic_data: {
      population_within_1km: 5200,
      median_age: 43,
      income_level: "Mixed",
      foot_traffic: "Low",
    },
    site_characteristics: {
      slope: "Flat",
      current_use: "Parking Lot",
      surrounding: ["Residential"],
      noise_level: "Medium",
    },
    coordinates: [
      [-73.677078, 42.714563],
      [-73.676198, 42.71573],
      [-73.685209, 42.718602],
      [-73.685851, 42.716933],
      [-73.682025, 42.716528],
    ],
  },
  {
    id: 4,
    lat: 1,
    lon: 1,
    area: 21000,
    info: createParkInfo(
      96,
      21000,
      4900,
      8.1,
      {
        vegetation_coverage: 79,
        soil_quality: "Good",
        water_sources: true,
        air_quality_index: 78,
      },
      {
        population_within_1km: 4900,
        median_age: 34,
        income_level: "Mixed",
        foot_traffic: "High",
      },
      {
        slope: "Flat",
        current_use: "Field",
        surrounding: ["Commercial", "Residential"],
        noise_level: "Medium",
      }
    ),
    population_density: 4900,
    existing_green_space: 1,
    sunlight_hours: 8.1,
    environmental_data: {
      vegetation_coverage: 79,
      soil_quality: "Good",
      water_sources: true,
      air_quality_index: 78,
    },
    demographic_data: {
      population_within_1km: 4900,
      median_age: 34,
      income_level: "Mixed",
      foot_traffic: "High",
    },
    site_characteristics: {
      slope: "Flat",
      current_use: "Field",
      surrounding: ["Commercial", "Residential"],
      noise_level: "Medium",
    },
    coordinates: [
      [-73.673061, 42.736444],
      [-73.671714, 42.736174],
      [-73.671019, 42.736563],
      [-73.671389, 42.736997],
      [-73.672349, 42.737191],
      [-73.672167, 42.737906],
      [-73.672596, 42.737992],
    ],
  },
];
