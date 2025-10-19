// Main TypeScript file - Weather App
// Week 8-9 Bootcamp Level - DOM manipulation and basic functions
import { WeatherService } from '../weather-service';
import { WeatherData } from './weather-types';
import { formatTemperature, getWeatherIcon } from './formatters';
// Create weather service instance
const weatherService = new WeatherService();
// DOM elements (Week 4-5 knowledge)
const weatherApp = document.getElementById('weatherApp');
const temperatureElement = document.getElementById('temperature');
const cityNameElement = document.getElementById('cityName');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const weatherIconElement = document.getElementById('weatherIcon');
const sunriseTimeElement = document.getElementById('sunriseTime');
const sunsetTimeElement = document.getElementById('sunsetTime');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navArrow = document.getElementById('navArrow');
// App initialization function
async function initWeatherApp() {
    try {
        // Default coordinates for Stockholm (you can change this)
        const lat = 59.3293;
        const lon = 18.0686;
        // Fetch weather data
        const weatherResult = await weatherService.getCurrentWeather(lat, lon);
        // Check if we got weather data or an error
        if ('message' in weatherResult) {
            // Handle error (basic error handling)
            console.error('Weather fetch failed:', weatherResult.message);
            showErrorMessage();
        }
        else {
            // Update UI with weather data
            updateWeatherDisplay(weatherResult);
        }
    }
    catch (error) {
        console.error('App initialization failed:', error);
        showErrorMessage();
    }
}
// Update weather display function (Week 4-5 DOM manipulation)
function updateWeatherDisplay(weatherData) {
    const { current, forecast } = weatherData;
    // Update current weather
    temperatureElement.textContent = formatTemperature(current.temperature);
    cityNameElement.textContent = current.city;
    weatherDescriptionElement.textContent = current.description;
    weatherIconElement.textContent = getWeatherIcon(current.condition, current.timeOfDay);
    sunriseTimeElement.textContent = current.sunrise;
    sunsetTimeElement.textContent = current.sunset;
    // Update theme based on time of day
    updateTheme(current.timeOfDay);
    // Update forecast (basic loop as learned in Week 6)
    updateForecastDisplay(forecast);
}
// Update theme function (Week 4-5 CSS classes)
function updateTheme(timeOfDay) {
    if (timeOfDay === 'night') {
        weatherApp.className = 'weather-app theme-night';
    }
    else {
        weatherApp.className = 'weather-app theme-day';
    }
}
// Update forecast display
function updateForecastDisplay(forecast) {
    const forecastDays = document.querySelectorAll('.forecast-day');
    // Loop through forecast data (Week 6 array methods)
    forecast.forEach((day, index) => {
        if (forecastDays[index]) {
            const dayElement = forecastDays[index];
            const dayName = dayElement.querySelector('.day-name');
            const dayIcon = dayElement.querySelector('.forecast-icon');
            const dayTemps = dayElement.querySelector('.day-temps');
            dayName.textContent = day.day;
            dayIcon.textContent = day.icon;
            dayTemps.textContent = `${day.maxTemp}° / ${day.minTemp}°C`;
        }
    });
}
// Show error message function
function showErrorMessage() {
    temperatureElement.textContent = '--°C';
    cityNameElement.textContent = 'Error loading weather';
    weatherDescriptionElement.textContent = 'Please try again later';
}
// Basic event listeners (Week 4-5 knowledge)
hamburgerMenu.addEventListener('click', () => {
    // Hamburger menu functionality - placeholder for now
    console.log('Hamburger menu clicked');
});
navArrow.addEventListener('click', () => {
    // Navigation arrow functionality - placeholder for now
    console.log('Navigation arrow clicked');
});
// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initWeatherApp);
//# sourceMappingURL=main.js.map