import { useState, useEffect } from "react";
import {
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Loader2,
  AlertCircle,
  Clock,
} from "lucide-react";

const WeatherCard = ({ city = "Kigali" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        setData({
          city: name,
          country: country,
          temperature: Math.round(weatherData.current.temperature_2m),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          weatherCode: weatherData.current.weather_code,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherCondition = (code) => {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Showers";
    return "Stormy";
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400 dark:text-indigo-300" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
        <p className="text-red-500 dark:text-red-400 font-medium">
          Error: {error}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to fetch weather data
        </p>
      </div>
    );
  }

  return (
    <div className="transition-smooth shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30 rounded-lg p-4 hover:shadow-none bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 text-xl">
        <Cloud className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Current Weather
        </h2>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl mb-2">{getWeatherEmoji(data.weatherCode)}</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {data.city}, {data.country}
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {getWeatherCondition(data.weatherCode)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 p-4">
          <Thermometer className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
          <span className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-600 bg-clip-text text-transparent">
            {data.temperature}°C
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 justify-between">
          {/* Wind card */}
          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 shadow-md dark:shadow-indigo-900/20">
            <Wind className="h-7 w-7 text-violet-500 dark:text-violet-400" />
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold text-indigo-500 dark:text-indigo-300 leading-none">
                {data.windSpeed}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                km/h
              </p>
            </div>
          </div>

          {/* Humidity card */}
          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 shadow-md dark:shadow-indigo-900/20">
            <Droplets className="h-7 w-7 text-violet-700 dark:text-violet-400 mt-[2px]" />
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300 leading-none">
                {data.humidity}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                Humidity
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50">
          <Clock className="h-4 w-4 text-violet-700 dark:text-violet-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
