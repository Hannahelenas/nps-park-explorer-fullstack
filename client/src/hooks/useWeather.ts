import { useEffect, useState } from "react";
import { fetchWeather, type WeatherData } from "../api/weather";

export function useWeather(lat?: string | number, lon?: string | number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    setError(null);

    fetchWeather(lat, lon)
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { weather, loading, error };
}
