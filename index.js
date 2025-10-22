// ===== 1. Types & Constants =====
const CITIES = [
    { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
    { name: 'Malmö', lat: 55.605, lon: 13.0038 },
    { name: 'Gothenburg', lat: 57.7089, lon: 11.9746 }
];
const WEATHER_ICON_PATHS = {
    1: 'icons/night/01.svg', 2: 'icons/night/02.svg', 3: 'icons/night/03.svg',
    4: 'icons/night/04.svg', 5: 'icons/night/05.svg', 6: 'icons/night/06.svg',
    7: 'icons/night/07.svg', 8: 'icons/night/08.svg', 9: 'icons/night/09.svg',
    10: 'icons/night/10.svg', 11: 'icons/night/11.svg', 12: 'icons/night/12.svg',
    13: 'icons/night/13.svg', 14: 'icons/night/14.svg', 15: 'icons/night/15.svg',
    16: 'icons/night/16.svg', 17: 'icons/night/17.svg', 18: 'icons/night/18.svg',
    19: 'icons/night/19.svg', 20: 'icons/night/20.svg', 21: 'icons/night/21.svg',
    22: 'icons/night/22.svg', 23: 'icons/night/23.svg', 24: 'icons/night/24.svg',
    25: 'icons/night/25.svg', 26: 'icons/night/26.svg', 27: 'icons/night/27.svg'
};
const WEATHER_DESCRIPTIONS = {
    1: 'Clear', 2: 'Nearly clear', 3: 'Variable clouds', 4: 'Halfclear', 5: 'Cloudy',
    6: 'Overcast', 7: 'Fog', 8: 'Light rain', 9: 'Rain showers', 10: 'Heavy rain',
    11: 'Thunder', 12: 'Sleet', 13: 'Light sleet', 14: 'Light snow', 15: 'Snow showers',
    16: 'Heavy snow', 17: 'Light freezing rain', 18: 'Rain', 19: 'Heavy rain',
    20: 'Storm', 21: 'Light snow showers', 22: 'Snow', 23: 'Heavy snow showers',
    24: 'Hail', 25: 'Drizzle', 26: 'Freezing drizzle', 27: 'Mixed precipitation'
};
// ===== 2. Utility Functions =====
function getSmhiForecastUrl(lat, lon) {
    return `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
}
function getParam(entry, paramName) {
    const param = entry.parameters.find((p) => p.name === paramName);
    return param ? param.values[0] : undefined;
}
function getWeatherIcon(code) {
    return WEATHER_ICON_PATHS[code] || '❓';
}
function getWeatherDescription(code) {
    return WEATHER_DESCRIPTIONS[code] || '⚠️';
}
function groupByDate(timeSeries) {
    const days = {};
    for (const entry of timeSeries) {
        const date = entry.validTime.split('T')[0];
        if (!days[date])
            days[date] = [];
        days[date].push(entry);
    }
    return days;
}
function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)] || "N";
}
// ===== 3. Rendering Functions =====
// 3.1 Today Weather View
function renderTodayWeatherView(cityName, data) {
    const section = document.querySelector('.today-weather-view .today-weather-title');
    if (!section)
        return;
    const now = data.timeSeries[0];
    const temp = getParam(now, 't');
    const code = getParam(now, 'Wsymb2');
    const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
    const desc = typeof code === 'number' ? getWeatherDescription(code) : 'Unknown';
    // Update UI
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
// 3.2 Today Hourly Forecast
function renderTodayWeatherForecast(data) {
    const container = document.querySelector('.today-weather-forecast .today-weather-cards');
    if (!container)
        return;
    container.innerHTML = '';
    const timeSeries = data.timeSeries.slice(0, 12);
    for (let i = 0; i < timeSeries.length; i += 2) {
        const entry = timeSeries[i];
        const time = entry.validTime.split('T')[1].slice(0, 5);
        const temp = getParam(entry, 't');
        const code = getParam(entry, 'Wsymb2');
        const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
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
// 3.3 7-Day Forecast
function renderWeakWeather(data) {
    const container = document.querySelector('.weak-weather-cards');
    if (!container)
        return;
    container.innerHTML = '';
    const days = groupByDate(data.timeSeries);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayIndex = 0;
    for (const date in days) {
        if (dayIndex >= 4)
            break;
        const entries = days[date];
        if (!entries || entries.length === 0)
            continue;
        const temps = entries.map((e) => getParam(e, 't')).filter((v) => typeof v === 'number');
        const minTemp = temps.length ? Math.min(...temps) : '?';
        const maxTemp = temps.length ? Math.max(...temps) : '?';
        const midEntry = entries[Math.floor(entries.length / 2)];
        const code = getParam(midEntry, 'Wsymb2');
        const icon = typeof code === 'number' ? getWeatherIcon(code) : '❓';
        const desc = typeof code === 'number' ? getWeatherDescription(code) : 'Unknown';
        const d = new Date(date);
        const dayName = dayIndex === 0 ? 'Today' : dayNames[d.getDay()];
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
// ===== 4. Main Event Handler =====
window.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect)
        return;
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
    citySelect.addEventListener('change', async () => {
        if (citySelect.value) {
            await loadAndRenderWeather(citySelect.value);
        }
    });
    citySelect.value = 'Stockholm';
    loadAndRenderWeather('Stockholm');
});
// ===== 5. Fetch Weather Data =====
async function fetchWeatherData(lat, lon) {
    const url = getSmhiForecastUrl(lat, lon);
    const response = await fetch(url);
    if (!response.ok)
        throw new Error('Network response was not ok');
    return response.json();
}
export {};
//# sourceMappingURL=index.js.map