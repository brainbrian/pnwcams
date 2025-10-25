'use client';

import { useEffect, useState } from 'react';
import type { WeatherData } from '../types';

interface UseWeatherParams {
  category: 'surf' | 'snow';
  latitude: string;
  longitude: string;
}

export function useWeather({ category, latitude, longitude }: UseWeatherParams) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const apiUrl = `/api/weather/${category}?lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setWeather(json);
      })
      .catch((reason) => {
        console.error(reason);
      });

    return () => {
      setWeather(null);
    };
  }, [category, latitude, longitude]);

  return [weather] as const;
}

