// Default city dataset with precise coordinates for API accuracy
const cities = [
    { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
    { name: 'Malmö', lat: 55.605, lon: 13.0038 },
    { name: 'Gothenburg', lat: 57.7089, lon: 11.9746 }
];
// SMHI API endpoint generator for point forecasts
// Uses pmp3g category (optimized for hourly forecasts) and API v2
const SMHI_POINT = (lat, lon) => `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
// ===== SECTION 2: WEATHER MAPPINGS =====
// SMHI weather codes → SVG icon paths
const weatherIcons = {
    1: 'icons/day/01.svg', // Clear sky
    2: 'icons/day/02.svg', // Nearly clear
    3: 'icons/day/03.svg', // Variable clouds
    4: 'icons/day/04.svg', // Halfclear
    5: 'icons/day/05.svg', // Cloudy
    6: 'icons/day/06.svg', // Overcast
    7: 'icons/day/07.svg', // Fog
    8: 'icons/day/08.svg', // Light rain
    9: 'icons/day/09.svg', // Rain showers
    10: 'icons/day/10.svg', // Heavy rain
    11: 'icons/day/11.svg', // Thunder
    14: 'icons/day/14.svg', // Light snow
    15: 'icons/day/15.svg', // Snow showers
    16: 'icons/day/16.svg' // Heavy snow
};
// Weather code text mapping for accessibility
// Converts SMHI Wsymb2 codes to human-readable descriptions
// Comprehensive mapping including rare weather conditions
const weatherText = {
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
// Emoji icons for weather details grid
const detailEmojis = ['🌡️', '💧', '💨', '🔆']; // Feel, Rain, Wind, UV
// ===== SECTION 3: DOM UTILITIES =====
// Typed querySelector wrapper
function qs(sel) {
    return document.querySelector(sel);
}
// ===== SECTION 4: WEATHER DATA PROCESSING =====
// Convert SMHI symbol to icon path, fallback to sunny
function mapSymbolToIcon(sym) {
    return weatherIcons[sym] || 'icons/day/01.svg';
}
// Group forecasts by date for min/max calculations
function groupByDate(timeSeries) {
    const days = {};
    timeSeries.forEach(entry => {
        // Split timestamp like "2025-10-19T14:00:00Z" to get just the date
        const date = entry.validTime.split('T')[0];
        if (!days[date])
            days[date] = [];
        days[date].push(entry);
    });
    return days;
}
// ===== SECTION 5: API INTERACTIONS =====
// Get SMHI forecast data for location
async function fetchPointData(lat, lon) {
    const url = SMHI_POINT(lat, lon);
    const res = await fetch(url);
    // If the API call fails (like if SMHI is down),
    // we throw an error so renderCity can show a message
    if (!res.ok)
        throw new Error('Fetch error ' + res.status);
    return res.json();
}
// ===== SECTION 6: UI RENDERING =====
// Main render function - updates all weather displays
async function renderCity(city) {
    try {
        // First, get the weather data from SMHI
        const data = await fetchPointData(city.lat, city.lon);
        const series = data.timeSeries;
        if (!series || !series.length)
            throw new Error('No timeseries');
        // SECTION 1: CURRENT WEATHER
        // The first entry in timeSeries is always the current/nearest forecast
        // We need to find specific parameters in the data:
        // - t: temperature in Celsius
        // - Wsymb2: weather symbol for icon/description
        const current = series[0];
        const t = current.parameters.find((p) => p.name === 't')?.values[0];
        const sym = current.parameters.find((p) => p.name === 'Wsymb2')?.values[0];
        // Update the big display at the top:
        // - City name (always prefixed with "Sweden," for context)
        // - Current temperature (rounded, no decimals)
        // - Weather description (mapped from symbol number)
        // - Weather icon (mapped from symbol number)
        const cityTitle = qs('.today-weather-title h1');
        if (cityTitle)
            cityTitle.textContent = `Sweden, ${city.name}`;
        const mainTemp = qs('.today-weather-title h2');
        if (mainTemp)
            mainTemp.textContent = t !== undefined ? `${Math.round(t)}°C` : '--°C';
        const desc = qs('.today-weather-title p');
        if (desc)
            desc.textContent = sym ? (weatherText[sym] || String(sym)) : '';
        const icon = qs('.today-weather-title img');
        if (icon)
            icon.src = mapSymbolToIcon(sym || 1);
        // SECTION 2: 4-DAY FORECAST
        // Here's where it gets interesting! For each day we need to:
        // 1. Find all forecasts for that day
        // 2. Calculate min/max temperatures
        // 3. Pick a representative weather symbol (we use mid-day)
        // 4. Create a nice card with day name, icon, and temps
        // First, organize all forecasts by date
        const days = groupByDate(series);
        // We only want 4 days (today + 3 more)
        const dates = Object.keys(days).slice(0, 4);
        // Get the container for our weekly cards
        const cards = qs('.weak-weather-cards');
        if (cards) {
            // Clear existing cards (important when switching cities!)
            cards.innerHTML = '';
            // Create a card for each day
            dates.forEach((date, idx) => {
                // Get all forecasts for this day
                const entries = days[date] || [];
                // Find min/max temperatures
                // 1. Map each entry to its temperature
                // 2. Filter out any undefined/null values
                // 3. Calculate min and max
                const temps = entries.map(e => e.parameters.find((p) => p.name === 't')?.values[0]).filter((v) => typeof v === 'number');
                const min = temps.length ? Math.min(...temps) : 0;
                const max = temps.length ? Math.max(...temps) : 0;
                // For the weather icon/description, use the middle of the day
                // This is better than morning/evening as it's most representative
                const midEntry = entries[Math.floor(entries.length / 2)];
                const sym = midEntry?.parameters.find((p) => p.name === 'Wsymb2')?.values[0] ?? 1;
                // Create a new card and style it
                const card = document.createElement('div');
                card.className = 'weak-weather-card';
                // For the day name:
                // - If it's the first card (idx 0), show "Today"
                // - Otherwise, show short day name (Mon, Tue, etc)
                const dayName = idx === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                // Build the card HTML. Each card shows:
                // 1. Day name at the top
                // 2. Weather icon + description in the middle
                // 3. Min/max temperatures at the bottom
                card.innerHTML = `
          <p class="weak-day">${dayName}</p>
          <div class="weak-two">
            <span class="weak-icon"><img src="${mapSymbolToIcon(sym)}" alt="${weatherText[sym] || ''}" width="28"/></span>
            <p class="weak-weather-info">${weatherText[sym] || String(sym)}</p>
          </div>
          <p class="weak-degree">${Math.round(min)}° / ${Math.round(max)}°</p>
        `;
                cards.appendChild(card);
            });
        }
        // SECTION 3: TODAY'S HOURLY FORECAST
        // We show forecasts for specific hours: 6am, 9am, 12pm, 3pm, 6pm, 9pm
        // This gives a good overview without overwhelming the user
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        // Filter the series to only today's forecasts
        const todaySeries = series.filter(s => s.validTime.startsWith(today));
        // Define which hours we want to show (24-hour format)
        const wantedHours = [6, 9, 12, 15, 18, 21];
        // Find forecasts matching our wanted hours
        // Note: some hours might not have forecasts, so we filter those out
        const hoursToShow = wantedHours.map(h => todaySeries.find((e) => new Date(e.validTime).getHours() === h)).filter(Boolean);
        // Get the container for today's hourly cards
        const todayContainer = qs('.today-weather-cards');
        if (todayContainer) {
            // Clear existing cards
            todayContainer.innerHTML = '';
            // Create a card for each hour we want to show
            hoursToShow.forEach((entry) => {
                // Format the time nicely (like "14:00" or "2:00 PM" depending on locale)
                const time = new Date(entry.validTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                // Get temperature and weather symbol for this hour
                const temp = entry.parameters.find((p) => p.name === 't')?.values[0];
                const sym = entry.parameters.find((p) => p.name === 'Wsymb2')?.values[0];
                // Create the hourly card
                const card = document.createElement('div');
                card.className = 'today-weather-card';
                card.innerHTML = `
          <p class="today-time">${time}</p>
          <span class="today-icon"><img src="${mapSymbolToIcon(sym)}" alt="" width="28"/></span>
          <p class="today-degree">${Math.round(temp)}°C</p>
        `;
                todayContainer.appendChild(card);
            });
        }
        // SECTION 4: WEATHER DETAILS
        // This is our "ALL CONDITIONS" grid showing:
        // 1. Real Feel (same as current temp for now)
        // 2. Chance of Rain (from pmean parameter)
        // 3. Wind Speed (from ws parameter)
        // 4. UV Index (max value from next 24 hours)
        const gridValues = qsAll('.today-weather-details-grid-card h4');
        if (gridValues && gridValues.length >= 4) {
            // Real Feel temperature (currently same as actual temp)
            // Could be improved with wind chill/humidity calculations
            if (gridValues[0])
                gridValues[0].textContent = t !== undefined ? `${Math.round(t)}°C` : '-';
            // Chance of Rain: look at next 12 hours of pmean values
            // pmean = precipitation mean (mm/hour)
            const rainEntry = series.slice(0, 12).map(s => s.parameters.find((p) => p.name === 'pmean')?.values[0]).find(v => typeof v === 'number');
            if (gridValues[1])
                gridValues[1].textContent = rainEntry !== undefined ? `${rainEntry} mm/h` : '-';
            // Wind Speed: current wind speed in meters/second
            const ws = current.parameters.find((p) => p.name === 'ws')?.values[0];
            if (gridValues[2])
                gridValues[2].textContent = ws !== undefined ? `${ws} m/s` : '-';
            // UV Index: find the highest UV value in next 24 hours
            // This helps users plan sun protection!
            const uvs = series.slice(0, 24).map(s => s.parameters.find((p) => p.name === 'uvi')?.values[0]).filter((v) => typeof v === 'number');
            if (gridValues[3])
                gridValues[3].textContent = uvs.length ? `${Math.round(Math.max(...uvs))}` : '-';
            // Add emojis to the icons
            const iconEls = qsAll('.today-weather-details-grid-card .details-icon');
            iconEls.forEach((el, idx) => { if (el)
                el.textContent = detailEmojis[idx] || ''; });
        }
        // SECTION 5: SUNRISE & SUNSET TIMES
        // We use a separate API (sunrise-sunset.org) for this
        // because it's super accurate and handles daylight savings time
        try {
            // formatted=0 gives us ISO timestamps which are easier to work with
            const srUrl = `https://api.sunrise-sunset.org/json?lat=${city.lat}&lng=${city.lon}&formatted=0`;
            const srRes = await fetch(srUrl);
            if (srRes.ok) {
                const srData = await srRes.json();
                const sunriseIso = srData.results?.sunrise;
                const sunsetIso = srData.results?.sunset;
                const sunriseEl = qs('#sunrise-time');
                const sunsetEl = qs('#sunset-time');
                // Convert UTC times from API to local time
                if (sunriseIso && sunriseEl) {
                    const local = new Date(sunriseIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    sunriseEl.textContent = `Sunrise: ${local}`;
                }
                if (sunsetIso && sunsetEl) {
                    const local = new Date(sunsetIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    sunsetEl.textContent = `Sunset: ${local}`;
                }
            }
        }
        catch (e) {
            // If sunrise-sunset.org is down, we don't want to break the whole app
            // Just log it and continue - the times will stay as "--:--"
            console.warn('sunrise fetch failed', e);
        }
    }
    catch (err) {
        // If anything goes wrong (API down, network issues, etc),
        // log it so we can debug in the console
        console.error('renderCity error', err);
    }
}
// Helper function: like qs() but returns an array of elements
// We use this for the ALL CONDITIONS grid where we need multiple h4 elements
function qsAll(sel) {
    return Array.from(document.querySelectorAll(sel));
}
// ===== SECTION 7: EVENT HANDLERS =====
// City search handler
const cityInput = qs('#cityInput');
if (cityInput) {
    cityInput.addEventListener('change', () => {
        const value = cityInput.value;
        // Case-insensitive search (stockholm = Stockholm)
        const c = cities.find(x => x.name.toLowerCase() === value.toLowerCase());
        if (c)
            renderCity(c);
    });
}
// When the page loads, show Stockholm's weather by default
// (it's first in our cities array)
if (cities[0])
    renderCity(cities[0]);
// Geolocation handler
const mapNav = qs('#mapNav');
if (mapNav) {
    mapNav.addEventListener('click', (e) => {
        // Stop the link from trying to navigate somewhere
        e.preventDefault();
        // First, check if the browser supports geolocation
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        // Ask for the user's location
        // This will trigger the browser's permission popup!
        navigator.geolocation.getCurrentPosition(
        // Success: we got the coordinates
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            // Create a temporary "city" with these coordinates
            // We call it "Your location" in the UI
            const userCity = { name: 'Your location', lat, lon };
            renderCity(userCity);
        }, 
        // Error: something went wrong
        (err) => {
            alert('Could not get your location: ' + err.message);
        });
    });
}
export {};
// Initialize with Stockholm weather
//# sourceMappingURL=indexsample.js.map