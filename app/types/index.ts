export interface Camera {
  name?: string;
  image?: string;
  iframe?: string;
  youtube?: string;
}

export interface Link {
  name?: string;
  url: string;
}

export interface Location {
  name: string;
  latitude: string;
  longitude: string;
  link?: string;
  links?: Link[];
  cameras: Camera[];
  weather?: WeatherData;
}

export interface CategoryData {
  links: Link[];
  locations: Location[];
}

// Weather data types for surf (OpenWeatherMap)
export interface SurfWeatherData {
  coord?: {
    lat: number;
    lon: number;
  };
  main?: {
    temp: number;
  };
  wind?: {
    speed: number;
    deg: number;
  };
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  weather?: Array<{
    description: string;
    main: string;
  }>;
}

// Weather data types for snow (NOAA)
export interface SnowWeatherData {
  location?: {
    latitude: string;
    longitude: string;
    elevation: string;
  };
  weather?: {
    temperature?: string[];
    weather?: string[];
  };
  currentobservation?: {
    Winds?: string;
    Windd?: string;
  };
  data?: unknown;
}

export type WeatherData = SurfWeatherData | SnowWeatherData;

export interface ProcessedWeatherData {
  url: string | null;
  temp: number | string | null;
  windSpeed: number | string | null;
  windDirection: string | null;
  rain?: number | null;
  snow?: number | null;
  description: string | null;
  elevation?: string | null;
  clouds?: string | null;
}

