// Minimal weather app wiring (TypeScript)
// Goals: fetch SMHI point data, render week view (4 days), daily hourly view, and details with icons/emojis.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cities = [
    { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
    { name: 'Malmö', lat: 55.605, lon: 13.0038 },
    { name: 'Gothenburg', lat: 57.7089, lon: 11.9746 }
];
const SMHI_POINT = (lat, lon) => `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
const weatherIcons = {
    1: 'icons/day/01.svg',
    2: 'icons/day/02.svg',
    3: 'icons/day/03.svg',
    4: 'icons/day/04.svg',
    5: 'icons/day/05.svg',
    6: 'icons/day/06.svg',
    7: 'icons/day/07.svg',
    8: 'icons/day/08.svg',
    9: 'icons/day/09.svg',
    10: 'icons/day/10.svg',
    11: 'icons/day/11.svg',
    14: 'icons/day/14.svg',
    15: 'icons/day/15.svg',
    16: 'icons/day/16.svg'
};
// Friendly text for SMHI Wsymb2 symbols
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
const detailEmojis = ['🌡️', '💧', '💨', '🔆'];
function qs(sel) {
    return document.querySelector(sel);
}
function mapSymbolToIcon(sym) {
    return weatherIcons[sym] || 'icons/day/01.svg';
}
// Parse SMHI timeseries into daily buckets
function groupByDate(timeSeries) {
    const days = {};
    timeSeries.forEach(entry => {
        const date = entry.validTime.split('T')[0];
        if (!days[date])
            days[date] = [];
        days[date].push(entry);
    });
    return days;
}
function fetchPointData(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = SMHI_POINT(lat, lon);
        const res = yield fetch(url);
        if (!res.ok)
            throw new Error('Fetch error ' + res.status);
        return res.json();
    });
}
// Render summary + week view + details
function renderCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const data = yield fetchPointData(city.lat, city.lon);
            const series = data.timeSeries;
            if (!series || !series.length)
                throw new Error('No timeseries');
            // Current (first entry)
            const current = series[0];
            const t = (_a = current.parameters.find((p) => p.name === 't')) === null || _a === void 0 ? void 0 : _a.values[0];
            const sym = (_b = current.parameters.find((p) => p.name === 'Wsymb2')) === null || _b === void 0 ? void 0 : _b.values[0];
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
            // Week view (4 days): use min/max per day
            const days = groupByDate(series);
            const dates = Object.keys(days).slice(0, 4);
            const cards = qs('.weak-weather-cards');
            if (cards) {
                cards.innerHTML = '';
                dates.forEach((date, idx) => {
                    var _a, _b;
                    const entries = days[date] || [];
                    const temps = entries.map(e => { var _a; return (_a = e.parameters.find((p) => p.name === 't')) === null || _a === void 0 ? void 0 : _a.values[0]; }).filter((v) => typeof v === 'number');
                    const min = temps.length ? Math.min(...temps) : 0;
                    const max = temps.length ? Math.max(...temps) : 0;
                    const midEntry = entries[Math.floor(entries.length / 2)];
                    const sym = (_b = (_a = midEntry === null || midEntry === void 0 ? void 0 : midEntry.parameters.find((p) => p.name === 'Wsymb2')) === null || _a === void 0 ? void 0 : _a.values[0]) !== null && _b !== void 0 ? _b : 1;
                    const card = document.createElement('div');
                    card.className = 'weak-weather-card';
                    const dayName = idx === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
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
            // Today's hourly cards (daily view)
            const today = new Date().toISOString().split('T')[0];
            const todaySeries = series.filter(s => s.validTime.startsWith(today));
            const wantedHours = [6, 9, 12, 15, 18, 21];
            const hoursToShow = wantedHours.map(h => todaySeries.find((e) => new Date(e.validTime).getHours() === h)).filter(Boolean);
            const todayContainer = qs('.today-weather-cards');
            if (todayContainer) {
                todayContainer.innerHTML = '';
                hoursToShow.forEach((entry) => {
                    var _a, _b;
                    const time = new Date(entry.validTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const temp = (_a = entry.parameters.find((p) => p.name === 't')) === null || _a === void 0 ? void 0 : _a.values[0];
                    const sym = (_b = entry.parameters.find((p) => p.name === 'Wsymb2')) === null || _b === void 0 ? void 0 : _b.values[0];
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
            // Details (Real feel, Rain, Wind, UV) - add emojis
            const gridValues = qsAll('.today-weather-details-grid-card h4');
            if (gridValues && gridValues.length >= 4) {
                // Real feel: take 't' from current
                if (gridValues[0])
                    gridValues[0].textContent = t !== undefined ? `${Math.round(t)}°C` : '-';
                // Chance of rain: find pmean nearby
                const rainEntry = series.slice(0, 12).map(s => { var _a; return (_a = s.parameters.find((p) => p.name === 'pmean')) === null || _a === void 0 ? void 0 : _a.values[0]; }).find(v => typeof v === 'number');
                if (gridValues[1])
                    gridValues[1].textContent = rainEntry !== undefined ? `${rainEntry} mm/h` : '-';
                // Wind: ws
                const ws = (_c = current.parameters.find((p) => p.name === 'ws')) === null || _c === void 0 ? void 0 : _c.values[0];
                if (gridValues[2])
                    gridValues[2].textContent = ws !== undefined ? `${ws} m/s` : '-';
                // UV: max of first 24 entries
                const uvs = series.slice(0, 24).map(s => { var _a; return (_a = s.parameters.find((p) => p.name === 'uvi')) === null || _a === void 0 ? void 0 : _a.values[0]; }).filter((v) => typeof v === 'number');
                if (gridValues[3])
                    gridValues[3].textContent = uvs.length ? `${Math.round(Math.max(...uvs))}` : '-';
                // Add emojis to the icons
                const iconEls = qsAll('.today-weather-details-grid-card .details-icon');
                iconEls.forEach((el, idx) => { if (el)
                    el.textContent = detailEmojis[idx] || ''; });
            }
            // Sunrise / Sunset - use sunrise-sunset.org API (formatted=0 returns ISO strings)
            try {
                const srUrl = `https://api.sunrise-sunset.org/json?lat=${city.lat}&lng=${city.lon}&formatted=0`;
                const srRes = yield fetch(srUrl);
                if (srRes.ok) {
                    const srData = yield srRes.json();
                    const sunriseIso = (_d = srData.results) === null || _d === void 0 ? void 0 : _d.sunrise;
                    const sunsetIso = (_e = srData.results) === null || _e === void 0 ? void 0 : _e.sunset;
                    const sunriseEl = qs('#sunrise-time');
                    const sunsetEl = qs('#sunset-time');
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
                // ignore sunrise errors
                console.warn('sunrise fetch failed', e);
            }
        }
        catch (err) {
            console.error('renderCity error', err);
        }
    });
}
function qsAll(sel) {
    return Array.from(document.querySelectorAll(sel));
}
// Wire search input
const cityInput = qs('#cityInput');
if (cityInput) {
    cityInput.addEventListener('change', () => {
        const value = cityInput.value;
        const c = cities.find(x => x.name.toLowerCase() === value.toLowerCase());
        if (c)
            renderCity(c);
    });
}
// Initial load: Stockholm
if (cities[0])
    renderCity(cities[0]);
// Geolocation: wire to Map nav
const mapNav = qs('#mapNav');
if (mapNav) {
    mapNav.addEventListener('click', (e) => {
        e.preventDefault();
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            // Temporary city object to render
            const userCity = { name: 'Your location', lat, lon };
            renderCity(userCity);
        }, (err) => {
            alert('Could not get your location: ' + err.message);
        });
    });
}
export {};
//# sourceMappingURL=index.js.map