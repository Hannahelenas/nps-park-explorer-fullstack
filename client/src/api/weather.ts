const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  main: string;
  icon: string;
  localTime: string;
}

export async function fetchWeather(
  lat: string | number,
  lon: string | number
): Promise<WeatherData> {
  const url = new URL(OPENWEATHER_BASE_URL);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("units", "metric");
  url.searchParams.set("appid", OPENWEATHER_API_KEY);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  const data = await response.json();

  const localDate = new Date((data.dt + data.timezone) * 1000);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const localTime = `${localDate.toLocaleDateString(
    "en-US",
    dateOptions
  )}, ${localDate.toLocaleTimeString("en-US", timeOptions)}`;

  return {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    main: data.weather[0].main,
    icon: data.weather[0].icon,
    localTime,
  };
}
