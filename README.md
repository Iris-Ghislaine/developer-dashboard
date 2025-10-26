# Developer Dashboard

## Description
The **Developer Dashboard** is a responsive React application that displays real-time data from the GitHub and OpenWeatherMap APIs. It features a GitHub Profile Card showing user statistics (avatar, repositories, followers, following) and a Weather Card displaying current weather data (temperature, condition, wind speed, humidity, and time) for a specified city. The dashboard includes a Light/Dark mode toggle with persistent theme storage, built using Tailwind CSS for a modern, responsive design.

## APIs Used
- **GitHub API**: `https://api.github.com/users/Iris-Ghislaine`  
  Fetches user profile data, including avatar, repository count, followers, and following.
- **OpenWeatherMap API**: `https://api.openweathermap.org/data/2.5/weather`  
  Provides current weather data for a specified city (e.g., Kigali).

## Technologies Used
- **React**: For building reusable components and managing state.
- **Tailwind CSS**: For responsive, modern styling with dark mode support.
- **Axios**: For making API requests to GitHub and OpenWeatherMap.
- **Lucide-React**: For icons used in the UI.
- **Vite**: As the build tool for fast development and hot module replacement.

## Screenshots
# Light Mode
![alt text](public/LightMode.png)

# Dark Mode
![alt text](public/Darkmode.png)

## Deployment Link

*Live Demo : https://devop-dashboard.netlify.app/*

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Iris-Ghislaine/developer-dashboard.git
   cd developer-dashboard