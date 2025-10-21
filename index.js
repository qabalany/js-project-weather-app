// ===== Weather App Core Types and Constants =====
// List of supported cities (can be extended)
const CITIES = [
    { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
    { name: 'Malmö', lat: 55.605, lon: 13.0038 },
    { name: 'Gothenburg', lat: 57.7089, lon: 11.9746 }
];
// --- 2. SMHI API Endpoint Generator ---
/**
 * Returns the SMHI forecast API endpoint for a given latitude and longitude.
 * Uses the pmp3g category (hourly forecasts) and API v2.
 */
function getSmhiForecastUrl(lat, lon) {
    return `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
}
// --- 3. Weather Code Mappings ---
/**
 * Maps SMHI Wsymb2 weather codes to SVG icon paths (daytime only).
 */
const WEATHER_ICON_PATHS = {
    1: 'icons/night/01.svg', // Clear sky
    2: 'icons/night/02.svg', // Nearly clear
    3: 'icons/night/03.svg', // Variable clouds
    4: 'icons/night/04.svg', // Halfclear
    5: 'icons/night/05.svg', // Cloudy
    6: 'icons/night/06.svg', // Overcast
    7: 'icons/night/07.svg', // Fog
    8: 'icons/night/08.svg', // Light rain
    9: 'icons/night/09.svg', // Rain showers
    10: 'icons/night/10.svg', // Heavy rain
    11: 'icons/night/11.svg', // Thunder
    12: 'icons/night/12.svg', // Sleet
    13: 'icons/night/13.svg', // Light sleet
    14: 'icons/night/14.svg', // Light snow
    15: 'icons/night/15.svg', // Snow showers
    16: 'icons/night/16.svg', // Heavy snow
    17: 'icons/night/17.svg', // Light freezing rain
    18: 'icons/night/18.svg', // Rain
    19: 'icons/night/19.svg', // Heavy rain
    20: 'icons/night/20.svg', // Storm
    21: 'icons/night/21.svg', // Light snow showers
    22: 'icons/night/22.svg', // Snow
    23: 'icons/night/23.svg', // Heavy snow showers
    24: 'icons/night/24.svg', // Hail
    25: 'icons/night/25.svg', // Drizzle
    26: 'icons/night/26.svg', // Freezing drizzle
    27: 'icons/night/27.svg' // Mixed precipitation
};
/**
 * Maps SMHI Wsymb2 weather codes to descriptions.
 */
const WEATHER_DESCRIPTIONS = {
    1: 'Clear',
    2: 'Nearly clear',
    3: 'Variable clouds',
    4: 'Halfclear',
    5: 'Cloudy',
    6: 'Overcast',
    7: 'Fog',
    8: 'Light rain',
    9: 'Rain showers',
    10: 'Heavy rain',
    11: 'Thunder',
    12: 'Sleet',
    13: 'Light sleet',
    14: 'Light snow',
    15: 'Snow showers',
    16: 'Heavy snow',
    17: 'Light freezing rain',
    18: 'Rain',
    19: 'Heavy rain',
    20: 'Storm',
    21: 'Light snow showers',
    22: 'Snow',
    23: 'Heavy snow showers',
    24: 'Hail',
    25: 'Drizzle',
    26: 'Freezing drizzle',
    27: 'Mixed precipitation'
};
/**
 * Emoji icons for weather details grid: [Feel, Rain, Wind, UV]
 */
const WEATHER_DETAIL_EMOJIS = ['🌡️', '💧', '💨', '🔆'];
// --- 4. Helper Functions ---
// Helper: Get a parameter value by name from an entry
function getParam(entry, paramName) {
    const param = entry.parameters.find((p) => p.name === paramName);
    return param ? param.values[0] : undefined;
}
// Helper: Get icon path for a weather code
function getWeatherIcon(code) {
    // If the code is not found, show a question mark emoji
    return WEATHER_ICON_PATHS[code] || '❓';
}
// Helper: Get description for a weather code
function getWeatherDescription(code) {
    // If the code is not found, show a warning emoji
    return WEATHER_DESCRIPTIONS[code] || '⚠️';
}
// --- 5. Group weather data by date ---
// This function takes a list of weather entries and puts them into groups by date (YYYY-MM-DD)
function groupByDate(timeSeries) {
    let days = {};
    for (let i = 0; i < timeSeries.length; i++) {
        let entry = timeSeries[i];
        // Get the date part (like "2025-10-21") from the time string
        let date = entry.validTime.split('T')[0];
        if (!days[date]) {
            days[date] = [];
        }
        days[date].push(entry);
    }
    return days;
}
// --- 6. Rendering Functions ---
// 6.1 Render Today Weather View
// This function updates the "today-weather-view" section
// It shows the city name, current temperature, icon, and a short description
function renderTodayWeatherView(cityName, data) {
    // 1. Find the section for today’s weather
    const section = document.querySelector('.today-weather-view .today-weather-title');
    if (!section)
        return;
    // 2. Get the first timeSeries entry ("now")
    const now = data.timeSeries[0];
    // 3. Get temperature and weather code
    const temp = getParam(now, 't');
    const code = getParam(now, 'Wsymb2');
    const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
    const desc = typeof code === 'number' ? getWeatherDescription(code) : 'Unknown';
    // 4. Update city name, icon, temp, desc in the HTML
    const h1 = section.querySelector('h1');
    if (h1)
        h1.textContent = `Sweden, ${cityName}`;
    const img = section.querySelector('img.today-weather-icon');
    if (img && typeof icon === 'string' && icon.endsWith('.svg')) {
        img.src = icon;
        img.alt = desc;
    }
    const h2 = section.querySelector('h2');
    if (h2)
        h2.textContent = `${temp}\u00b0C`;
    const p = section.querySelector('p');
    if (p)
        p.textContent = desc;
}
// 6.2 Render Today Weather Forecast (next 12 hours, every 2–3 hours)
// This function updates the hourly forecast section ("today-weather-forecast")
// It shows the temperature and icon for the next 12 hours, every 2–3 hours
function renderTodayWeatherForecast(data) {
    // 1. Find the container for the hourly forecast
    const container = document.querySelector('.today-weather-forecast .today-weather-cards');
    if (!container)
        return;
    container.innerHTML = '';
    // 2. Get the first 12 hours, every 2 steps (0, 2, 4, ...)
    const timeSeries = data.timeSeries.slice(0, 12);
    // 3. For each time point, build a forecast card
    for (let i = 0; i < timeSeries.length; i += 2) {
        const entry = timeSeries[i];
        // 4. Get the time (HH:MM), temperature, and weather code
        const time = entry.validTime.split('T')[1].slice(0, 5); // 'HH:MM'
        const temp = getParam(entry, 't');
        const code = getParam(entry, 'Wsymb2');
        const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
        // 5. Build and add the card to the container
        const card = document.createElement('div');
        card.className = 'today-weather-card' + (i === 0 ? ' active' : '');
        card.innerHTML = `
			<p class="today-time">${time}</p>
			${typeof icon === 'string' && icon.endsWith('.svg') ? `<img class='today-icon-img' src='${icon}' alt='' style='width:32px;height:32px;vertical-align:middle;'/>` : `<icon class='today-icon'>${icon}</icon>`}
			<p class="today-degree">${temp}\u00b0C</p>
		`;
        container.appendChild(card);
    }
}
// 6.3 Render 7-Day Forecast (weak-weather)
// This function updates the 7-day forecast section ("weak-weather")
// It shows the day name, icon, description, and min/max temperature for each day
function renderWeakWeather(data) {
    // 1. Find the container for the 7-day forecast
    const container = document.querySelector('.weak-weather-cards');
    if (!container)
        return;
    container.innerHTML = '';
    // 2. Group all weather entries by date (YYYY-MM-DD)
    const days = groupByDate(data.timeSeries);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayIndex = 0;
    // 3. For each day, build a forecast card
    for (const date in days) {
        if (dayIndex >= 7)
            break; // Only show 7 days
        const entries = days[date];
        if (!entries || entries.length === 0)
            continue;
        // 4. Get all temperatures for the day
        const temps = entries.map((e) => getParam(e, 't')).filter((v) => typeof v === 'number');
        const minTemp = temps.length ? Math.min(...temps) : '?';
        const maxTemp = temps.length ? Math.max(...temps) : '?';
        // 5. Use the middle entry for icon/desc (represents the day)
        const midEntry = entries[Math.floor(entries.length / 2)];
        const code = getParam(midEntry, 'Wsymb2');
        const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
        const desc = typeof code === 'number' ? getWeatherDescription(code) : 'Unknown';
        // 6. Get the day name (e.g., Mon, Tue)
        const d = new Date(date);
        const dayName = dayIndex === 0 ? 'Today' : dayNames[d.getDay()];
        // 7. Build and add the card to the container
        const card = document.createElement('div');
        card.className = 'weak-weather-card';
        card.innerHTML = `
			<p class="weak-day">${dayName}</p>
			<div class="weak-two">
				${typeof icon === 'string' && icon.endsWith('.svg') ? `<img class='weak-icon-img' src='${icon}' alt='${desc}' style='width:32px;height:32px;vertical-align:middle;'/>` : `<icon class='weak-icon'>${icon}</icon>`}
				<p class="weak-weather-info">${desc}</p>
			</div>
			<p class="weak-degree">${minTemp} / ${maxTemp}</p>
		`;
        container.appendChild(card);
        dayIndex++;
    }
}
// --- 7. Main Event Handler ---
// This code runs when the page loads. It sets up the city dropdown to fetch and show weather when changed.
window.addEventListener('DOMContentLoaded', () => {
    // 1. Find the city dropdown
    const citySelect = document.getElementById('citySelect');
    if (!citySelect)
        return;
    // Helper to load and render weather for a city
    async function loadAndRenderWeather(cityName) {
        const selectedCity = CITIES.find(city => city.name === cityName);
        if (selectedCity) {
            try {
                const data = await fetchWeatherData(selectedCity.lat, selectedCity.lon);
                renderTodayWeatherView(selectedCity.name, data);
                renderTodayWeatherForecast(data);
                renderWeakWeather(data);
            }
            catch (err) {
                console.error('Failed to fetch weather data:', err);
            }
        }
    }
    // 2. When the user selects a city, fetch and show weather
    citySelect.addEventListener('change', async () => {
        await loadAndRenderWeather(citySelect.value);
    });
    // 3. On page load, show Stockholm by default
    citySelect.value = 'Stockholm';
    loadAndRenderWeather('Stockholm');
});
// --- 8. Fetch Weather Data ---
// This function gets the weather forecast for a city using its latitude and longitude.
// It returns the data as a JavaScript object.
async function fetchWeatherData(lat, lon) {
    // Build the API URL using the helper function
    const url = getSmhiForecastUrl(lat, lon);
    // Use fetch to get the data from the internet
    const response = await fetch(url);
    // If the response is not OK, show an error
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Convert the response to JSON (JavaScript object)
    return response.json();
}
export {};
//# sourceMappingURL=index.js.map