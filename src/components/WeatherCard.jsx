import { useState, useEffect } from 'react';

const WeatherCard = ({ data, loading, error }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center dark:text-white">{data.name}</h2>
      <p className="text-center dark:text-indigo-900">Time: {time}</p>
      <p className="text-center dark:text-indigo-700">Temperature: {data.main.temp}°C</p>
      <p className="text-center dark:text-indigo-600">Condition: {data.weather[0].description}</p>
      <p className="text-center dark:text-indigo-500">Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;