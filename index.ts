
// --- INTERFACE: City ---
// Represents a city with a name and coordinates (latitude, longitude).
interface City {
  name: string;
  lat: number;
  lon: number;
}

// --- INTERFACE: Parameter ---
// Represents a weather parameter (e.g., temperature, humidity) and its values.
interface Parameter {
  name: string;
  values: number[];
}

// --- INTERFACE: TimeSeriesEntry ---
// Represents a single time point in the weather forecast, with parameters.
interface TimeSeriesEntry {
  validTime: string;
  parameters: Parameter[];
}

// --- INTERFACE: WeatherData ---
// Represents the full weather data response from SMHI API.
interface WeatherData {
  timeSeries: TimeSeriesEntry[];
}

// --- INTERFACE: SunTimes ---
// Represents sunrise and sunset times for a location.
interface SunTimes {
  sunrise: string;
  sunset: string;
}

// --- CONST: cities ---
// List of supported cities with their coordinates for quick selection.
const cities: City[] = [
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Malmö", lat: 55.605, lon: 13.0038 },
  { name: "Gothenburg", lat: 57.7089, lon: 11.9746 },
];

// --- CONST: icons ---
// Maps weather codes to SVG icon file paths for display.
const icons: { [key: number]: string } = {};
for (let i = 1; i <= 27; i++) {
  icons[i] = `icons/night/${String(i).padStart(2, "0")}.svg`;
}

// --- CONST: weatherText ---
// Maps weather codes to human-readable weather descriptions.
const weatherText: { [key: number]: string } = {
  1: "Clear sky",
  2: "Almost clear",
  3: "Variable clouds",
  4: "Half clear",
  5: "Cloudy",
  6: "Overcast",
  7: "Fog",
  8: "Light rain",
  9: "Rain showers",
  10: "Heavy rain",
  11: "Thunder",
  12: "Sleet",
  13: "Light sleet",
  14: "Light snow",
  15: "Snow showers",
  16: "Heavy snow",
  17: "Freezing rain",
  18: "Rain",
  19: "Heavy rain",
  20: "Storm",
  21: "Light snow showers",
  22: "Snow",
  23: "Heavy snow showers",
  24: "Hail",
  25: "Drizzle",
  26: "Freezing drizzle",
  27: "Mixed precipitation",
};

// --- FUNCTION: calculateHumidex ---
// Calculates the Humidex (real feel) temperature using air temperature and relative humidity.
function calculateHumidex(tempC: number, rh: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  const e = 6.11 * Math.exp(5417.7530 * ((1 / 273.16) - (1 / (273.15 + dewPoint))));
  return tempC + 0.5555 * (e - 10);
}

// --- FUNCTION: getSmhiUrl ---
// Builds the SMHI API URL for a given latitude and longitude.
function getSmhiUrl(lat: number, lon: number): string {
  return `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
}

// --- FUNCTION: pick ---
// Extracts a specific parameter value (e.g., temperature) from a time series entry.
// Simplifies access to weather parameters by name.
function pick(entry: TimeSeriesEntry, paramName: string): number | undefined {
  const param = entry.parameters.find((p: Parameter) => p.name === paramName);
  return param ? param.values[0] : undefined;
}

// --- FUNCTION: groupByDate ---
// Groups time series entries by date (YYYY-MM-DD).
// Makes it easy to display daily summaries from hourly data.
function groupByDate(timeSeries: TimeSeriesEntry[]): { [date: string]: TimeSeriesEntry[] } {
  const groups: { [date: string]: TimeSeriesEntry[] } = {};
  timeSeries.forEach((entry: TimeSeriesEntry) => {
    const date: string = entry.validTime.split("T")[0] || "";
    if (!date) return;
    if (!groups[date]) groups[date] = [];
    groups[date].push(entry);
  });
  return groups;
}

// --- FUNCTION: getSunTimes ---
// Fetches sunrise and sunset times for a given location using the sunrise-sunset.org API.
async function getSunTimes(lat: number, lon: number): Promise<SunTimes> {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${today}&formatted=0`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK") {
      const sunrise = new Date(data.results.sunrise).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunset = new Date(data.results.sunset).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return { sunrise, sunset };
    }
  } catch (err) {
    console.log("Soltider kunde inte hämtas:", err);
  }
  return { sunrise: "N/A", sunset: "N/A" };
}

// --- FUNCTION: getWeather ---
// Fetches weather data from the SMHI API for a given location.
// Main entry point for retrieving weather forecasts.
async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = getSmhiUrl(lat, lon);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// --- FUNCTION: renderToday ---
// Renders the current weather for the selected city/location.
// Updates the UI with today's weather, including temperature, icon, humidity, wind, and real feel.
function renderToday(
  data: WeatherData,
  cityName: string,
  lat: number,
  lon: number
): void {
  const now = data.timeSeries[0];
  if (!now) return;
  const temp = pick(now, "t");
  const code = pick(now, "Wsymb2");
  const desc = typeof code === "number" && weatherText[code] ? weatherText[code] : "—";
  const icon = typeof code === "number" && icons[code] ? icons[code] : "";
  const rh = pick(now, "r");
  const ws = pick(now, "ws");
  const windKmH = typeof ws === "number" ? ws * 3.6 : undefined;
  const titleEl = document.querySelector(
    ".today-weather-view .today-weather-title"
  );
  if (titleEl) {
    const h1 = titleEl.querySelector("h1");
    if (h1) h1.textContent = `Sweden, ${cityName}`;
    const h2 = titleEl.querySelector("h2");
    if (h2) h2.textContent = `${temp}°C`;
    const p = titleEl.querySelector("p");
    if (p) p.textContent = desc;
    const img = titleEl.querySelector("img.today-weather-icon") as HTMLImageElement | null;
    if (img) {
      img.src = icon;
      img.alt = desc;
    }
  }
  const detailValues = document.querySelectorAll(
    ".today-weather-details-grid-card h4"
  );
  // Show Real Feel (Humidex) in the first card
  if (detailValues[0]) {
    if (typeof temp === "number" && typeof rh === "number") {
      const humidex = calculateHumidex(temp, rh);
      detailValues[0].textContent = `${humidex.toFixed(1)}°C`;
    } else {
      detailValues[0].textContent = "Real Feel: N/A";
    }
  }
  // Show humidity in the second card
  if (detailValues[1])
    detailValues[1].textContent = rh != null ? `${rh}%` : "N/A";
  // Show wind in the third card
  if (detailValues[2])
    detailValues[2].textContent = windKmH != null ? `${windKmH.toFixed(1)} km/h` : "N/A";
  // Show sunrise/sunset in the fourth card
  if (detailValues[3]) {
    detailValues[3].textContent = "Loading…";
    getSunTimes(lat, lon).then(({ sunrise, sunset }) => {
      if (detailValues[3])
        detailValues[3].textContent = `↑${sunrise}  ↓${sunset}`;
    });
  }
}

// --- FUNCTION: renderHourly ---
// Renders 2-hour weather forecast for the next 12 hours.
function renderHourly(data: WeatherData): void {
  const container = document.querySelector(
    ".today-weather-forecast .today-weather-cards"
  );
  if (!container) return;
  container.innerHTML = "";
  const hours = data.timeSeries.slice(0, 12);
  for (let i = 0; i < hours.length; i += 2) {
    const entry = hours[i];
    if (!entry) continue;
    const time = entry.validTime.split("T")[1]?.slice(0, 5) ?? "--:--";
    const temp = pick(entry, "t");
    const code = pick(entry, "Wsymb2");
    const icon = typeof code === "number" && icons[code] ? icons[code] : "";
    const card = document.createElement("div");
    card.className = "today-weather-card";
    card.innerHTML = `
      <p class="today-time">${time}</p>
      <img class="today-icon-img" src="${icon}" alt="${code}" width="32" height="32" />
      <p class="today-degree">${temp}°C</p>
    `;
    container.appendChild(card);
  }
}

// --- FUNCTION: renderForecast ---
// Renders the daily weather forecast for the next four days.
function renderForecast(data: WeatherData): void {
  const container = document.querySelector(".weak-weather-cards");
  if (!container) return;
  container.innerHTML = "";
  const grouped = groupByDate(data.timeSeries);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let printed = 0;
  for (const date in grouped) {
    if (printed >= 4) break;
    const entries = grouped[date];
    if (!entries) continue;
    const temps = entries
      .map((e) => pick(e, "t"))
      .filter((v) => typeof v === "number");
    const minTemp = temps.length ? Math.min(...temps) : "?";
    const maxTemp = temps.length ? Math.max(...temps) : "?";
    const mid = entries[Math.floor(entries.length / 2)];
    if (!mid) continue;
    const code = pick(mid, "Wsymb2");
    const icon = typeof code === "number" && icons[code] ? icons[code] : "";
    const desc = typeof code === "number" && weatherText[code] ? weatherText[code] : "—";
    const d = new Date(date);
    const label = printed === 0 ? "Today" : dayNames[d.getDay()];
    const card = document.createElement("div");
    card.className = "weak-weather-card";
    card.innerHTML = `
      <p class="weak-day">${label}</p>
      <div class="weak-two">
        <img class="weak-icon-img" src="${icon}" alt="${desc}" width="32" height="32" />
        <p class="weak-weather-info">${desc}</p>
      </div>
      <p class="weak-degree">Min: <span class="degree-bold">${minTemp}</span> / Max: <span class="degree-bold">${maxTemp}</span></p>
    `;
    container.appendChild(card);
    printed++;
  }
}

// --- FUNCTION: loadCity ---
// Loads and renders weather for a selected city by name.
async function loadCity(cityName: string): Promise<void> {
  const city = cities.find((c) => c.name === cityName);
  if (!city) return;
  const data = await getWeather(city.lat, city.lon);
  renderToday(data, city.name, city.lat, city.lon);
  renderHourly(data);
  renderForecast(data);
}

// --- FUNCTION: loadCoords ---
// Loads and renders weather for a given latitude and longitude (e.g., user's geolocation).
async function loadCoords(lat: number, lon: number): Promise<void> {
  const data = await getWeather(lat, lon);
  renderToday(data, "My Location", lat, lon);
  renderHourly(data);
  renderForecast(data);
  const select = document.getElementById("citySelect") as HTMLSelectElement | null;
  if (select) select.value = "";
}

// --- MAIN: DOMContentLoaded event ---
// Sets up event listeners and loads initial weather data when the page is ready.
window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("citySelect") as HTMLSelectElement | null;
  const geoBtn = document.getElementById("geoLocateBtn");
  if (select) {
    select.addEventListener("change", () => {
      if (select.value) loadCity(select.value);
    });
  }
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Din webbläsare stöder inte platsinformation.");
        return;
      }
      const original = geoBtn.textContent;
      geoBtn.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          geoBtn.textContent = original;
          loadCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          geoBtn.textContent = original;
          alert("Kunde inte hämta din plats.");
          console.log("Geolocation error:", err);
        }
      );
    });
  }
  if (select) {
    select.value = "Stockholm";
    loadCity("Stockholm");
  }
});
