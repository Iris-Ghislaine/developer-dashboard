import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GitHubCard from './components/GithubCard';
import WeatherCard from './components/WeatherCard';
import axios from 'axios';

function App() {
  const [githubData, setGithubData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [githubError, setGithubError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    console.log('Applied theme:', theme, 'HTML has dark class:', document.documentElement.classList.contains('dark'));  // Keep for now, remove later
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Fetch GitHub Data
  useEffect(() => {
    setGithubLoading(true);
    axios
      .get('https://api.github.com/users/Iris-Ghislaine')
      .then((response) => {
        setGithubData(response.data);
        setGithubLoading(false);
      })
      .catch((error) => {
        setGithubError('Error fetching GitHub data');
        setGithubLoading(false);
      });
  }, []);

  // Fetch Weather Data (OpenWeatherMap example)
  useEffect(() => {
    setWeatherLoading(true);
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=Kigali&appid=[YOUR_API_KEY]&units=metric'
      )
      .then((response) => {
        setWeatherData(response.data);
        setWeatherLoading(false);
      })
      .catch((error) => {
        setWeatherError('Error fetching weather data');
        setWeatherLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar onToggleTheme={toggleTheme} currentTheme={theme} />
      <div className="container mx-auto py-25 grid grid-cols-1 md:grid-cols-2 gap-4">
        <GitHubCard data={githubData} loading={githubLoading} error={githubError} />
        <WeatherCard data={weatherData} loading={weatherLoading} error={weatherError} />
      </div>
    </div>
  );
}

export default App;