// Mock data for ski resorts
// In production, this data would come from various APIs:
// - OpenWeatherMap API for weather data
// - Ski resort official APIs for snow depth and conditions
// - Web scraping for webcam URLs and piste maps

export interface SkiResort {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevation: {
    valley: number; // meters
    mountain: number; // meters
  };
  snowDepth: {
    valley: number; // cm
    mountain: number; // cm
    lastUpdated: string;
  };
  weather: {
    current: {
      temperature: number; // celsius
      condition: string;
      windSpeed: number; // km/h
      visibility: number; // km
    };
    forecast: Array<{
      date: string;
      tempHigh: number;
      tempLow: number;
      snowfall: number; // cm
      snowfallProbability: number; // percentage
      condition: string;
    }>;
  };
  liveCams: Array<{
    id: string;
    name: string;
    location: string;
    url: string;
    thumbnailUrl: string;
  }>;
  pisteMap: {
    url: string;
    officialLink: string;
  };
  stats: {
    totalPistes: number;
    openPistes: number;
    liftsTotal: number;
    liftsOpen: number;
    season: {
      start: string;
      end: string;
    };
  };
}

export const mockResorts: SkiResort[] = [
  {
    id: 'ischgl',
    name: 'Ischgl',
    country: 'Austria',
    region: 'Tyrol',
    coordinates: {
      lat: 47.0116,
      lng: 10.2991,
    },
    elevation: {
      valley: 1377,
      mountain: 2872,
    },
    snowDepth: {
      valley: 45,
      mountain: 125,
      lastUpdated: '2025-12-15T08:00:00Z',
    },
    weather: {
      current: {
        temperature: -5,
        condition: 'Snowing',
        windSpeed: 15,
        visibility: 3,
      },
      forecast: [
        {
          date: '2025-12-15',
          tempHigh: -3,
          tempLow: -8,
          snowfall: 15,
          snowfallProbability: 85,
          condition: 'Heavy Snow',
        },
        {
          date: '2025-12-16',
          tempHigh: -4,
          tempLow: -10,
          snowfall: 10,
          snowfallProbability: 70,
          condition: 'Light Snow',
        },
        {
          date: '2025-12-17',
          tempHigh: -2,
          tempLow: -7,
          snowfall: 5,
          snowfallProbability: 45,
          condition: 'Partly Cloudy',
        },
        {
          date: '2025-12-18',
          tempHigh: 0,
          tempLow: -6,
          snowfall: 0,
          snowfallProbability: 20,
          condition: 'Sunny',
        },
        {
          date: '2025-12-19',
          tempHigh: 1,
          tempLow: -5,
          snowfall: 2,
          snowfallProbability: 30,
          condition: 'Cloudy',
        },
      ],
    },
    liveCams: [
      {
        id: 'ischgl-idalp',
        name: 'Idalp Panorama',
        location: 'Idalp Mountain Station (2,320m)',
        url: 'https://example.com/ischgl-idalp-cam', // Placeholder
        thumbnailUrl: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop',
      },
      {
        id: 'ischgl-pardatschgrat',
        name: 'Pardatschgrat',
        location: 'Pardatschgrat Peak (2,624m)',
        url: 'https://example.com/ischgl-pardatschgrat-cam', // Placeholder
        thumbnailUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=300&fit=crop',
      },
      {
        id: 'ischgl-village',
        name: 'Village View',
        location: 'Ischgl Village Center',
        url: 'https://example.com/ischgl-village-cam', // Placeholder
        thumbnailUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
      },
    ],
    pisteMap: {
      url: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1200&h=800&fit=crop', // Placeholder
      officialLink: 'https://www.ischgl.com/en/piste-map',
    },
    stats: {
      totalPistes: 239,
      openPistes: 215,
      liftsTotal: 45,
      liftsOpen: 42,
      season: {
        start: '2025-11-28',
        end: '2026-05-01',
      },
    },
  },
  {
    id: 'st-anton',
    name: 'St. Anton am Arlberg',
    country: 'Austria',
    region: 'Tyrol',
    coordinates: {
      lat: 47.1275,
      lng: 10.2606,
    },
    elevation: {
      valley: 1304,
      mountain: 2811,
    },
    snowDepth: {
      valley: 38,
      mountain: 115,
      lastUpdated: '2025-12-15T08:00:00Z',
    },
    weather: {
      current: {
        temperature: -6,
        condition: 'Light Snow',
        windSpeed: 20,
        visibility: 5,
      },
      forecast: [
        {
          date: '2025-12-15',
          tempHigh: -4,
          tempLow: -9,
          snowfall: 12,
          snowfallProbability: 80,
          condition: 'Snow',
        },
        {
          date: '2025-12-16',
          tempHigh: -5,
          tempLow: -11,
          snowfall: 8,
          snowfallProbability: 65,
          condition: 'Light Snow',
        },
        {
          date: '2025-12-17',
          tempHigh: -3,
          tempLow: -8,
          snowfall: 3,
          snowfallProbability: 40,
          condition: 'Cloudy',
        },
        {
          date: '2025-12-18',
          tempHigh: -1,
          tempLow: -7,
          snowfall: 0,
          snowfallProbability: 15,
          condition: 'Partly Sunny',
        },
        {
          date: '2025-12-19',
          tempHigh: 0,
          tempLow: -6,
          snowfall: 5,
          snowfallProbability: 50,
          condition: 'Light Snow',
        },
      ],
    },
    liveCams: [
      {
        id: 'stanton-valluga',
        name: 'Valluga Summit',
        location: 'Valluga Peak (2,811m)',
        url: 'https://example.com/stanton-valluga-cam',
        thumbnailUrl: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=400&h=300&fit=crop',
      },
      {
        id: 'stanton-galzig',
        name: 'Galzig Station',
        location: 'Galzig (2,185m)',
        url: 'https://example.com/stanton-galzig-cam',
        thumbnailUrl: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=400&h=300&fit=crop',
      },
    ],
    pisteMap: {
      url: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1200&h=800&fit=crop',
      officialLink: 'https://www.stantonamarlberg.com/en/piste-map',
    },
    stats: {
      totalPistes: 305,
      openPistes: 285,
      liftsTotal: 88,
      liftsOpen: 82,
      season: {
        start: '2025-11-30',
        end: '2026-05-03',
      },
    },
  },
  {
    id: 'aspen',
    name: 'Aspen Snowmass',
    country: 'USA',
    region: 'Colorado',
    coordinates: {
      lat: 39.1911,
      lng: -106.8175,
    },
    elevation: {
      valley: 2399,
      mountain: 3813,
    },
    snowDepth: {
      valley: 52,
      mountain: 145,
      lastUpdated: '2025-12-15T07:00:00Z',
    },
    weather: {
      current: {
        temperature: -8,
        condition: 'Clear',
        windSpeed: 10,
        visibility: 15,
      },
      forecast: [
        {
          date: '2025-12-15',
          tempHigh: -5,
          tempLow: -12,
          snowfall: 0,
          snowfallProbability: 10,
          condition: 'Sunny',
        },
        {
          date: '2025-12-16',
          tempHigh: -4,
          tempLow: -11,
          snowfall: 8,
          snowfallProbability: 60,
          condition: 'Light Snow',
        },
        {
          date: '2025-12-17',
          tempHigh: -6,
          tempLow: -13,
          snowfall: 18,
          snowfallProbability: 90,
          condition: 'Heavy Snow',
        },
        {
          date: '2025-12-18',
          tempHigh: -7,
          tempLow: -14,
          snowfall: 12,
          snowfallProbability: 75,
          condition: 'Snow',
        },
        {
          date: '2025-12-19',
          tempHigh: -5,
          tempLow: -12,
          snowfall: 5,
          snowfallProbability: 45,
          condition: 'Light Snow',
        },
      ],
    },
    liveCams: [
      {
        id: 'aspen-ajax',
        name: 'Ajax Mountain',
        location: 'Aspen Mountain Summit',
        url: 'https://example.com/aspen-ajax-cam',
        thumbnailUrl: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop',
      },
      {
        id: 'aspen-snowmass',
        name: 'Snowmass Village',
        location: 'Snowmass Base',
        url: 'https://example.com/aspen-snowmass-cam',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=300&fit=crop',
      },
      {
        id: 'aspen-highlands',
        name: 'Highlands Bowl',
        location: 'Highland Bowl',
        url: 'https://example.com/aspen-highlands-cam',
        thumbnailUrl: 'https://images.unsplash.com/photo-1548690596-f2781cbbc18f?w=400&h=300&fit=crop',
      },
    ],
    pisteMap: {
      url: 'https://images.unsplash.com/photo-1548690596-f2781cbbc18f?w=1200&h=800&fit=crop',
      officialLink: 'https://www.aspensnowmass.com/ski-snowboard/trail-maps',
    },
    stats: {
      totalPistes: 337,
      openPistes: 320,
      liftsTotal: 43,
      liftsOpen: 40,
      season: {
        start: '2025-11-27',
        end: '2026-04-19',
      },
    },
  },
];

// Helper function to search resorts by name
export function searchResorts(query: string): SkiResort[] {
  const lowercaseQuery = query.toLowerCase().trim();
  return mockResorts.filter(
    (resort) =>
      resort.name.toLowerCase().includes(lowercaseQuery) ||
      resort.region.toLowerCase().includes(lowercaseQuery) ||
      resort.country.toLowerCase().includes(lowercaseQuery)
  );
}

// Helper function to get resort by ID
export function getResortById(id: string): SkiResort | undefined {
  return mockResorts.find((resort) => resort.id === id);
}
