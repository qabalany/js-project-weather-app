type City = {
  name: string;
  lat: number;
  lon: number;
};

const CITIES: City[] = [
  { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
  { name: 'Malmö', lat: 55.605, lon: 13.0038 },
  { name: 'Gothenburg', lat: 57.7089, lon: 11.9746 }
];

const WEATHER_ICON_PATHS: { [key: number]: string } = {
  1: 'icons/night/01.svg',  2: 'icons/night/02.svg',  3: 'icons/night/03.svg',
  4: 'icons/night/04.svg',  5: 'icons/night/05.svg',  6: 'icons/night/06.svg',
  7: 'icons/night/07.svg',  8: 'icons/night/08.svg',  9: 'icons/night/09.svg',
  10: 'icons/night/10.svg', 11: 'icons/night/11.svg', 12: 'icons/night/12.svg',
  13: 'icons/night/13.svg', 14: 'icons/night/14.svg', 15: 'icons/night/15.svg',
  16: 'icons/night/16.svg', 17: 'icons/night/17.svg', 18: 'icons/night/18.svg',
  19: 'icons/night/19.svg', 20: 'icons/night/20.svg', 21: 'icons/night/21.svg',
  22: 'icons/night/22.svg', 23: 'icons/night/23.svg', 24: 'icons/night/24.svg',
  25: 'icons/night/25.svg', 26: 'icons/night/26.svg', 27: 'icons/night/27.svg'
};

const WEATHER_DESCRIPTIONS: { [key: number]: string } = {
  1: 'Clear', 2: 'Nearly clear', 3: 'Variable clouds', 4: 'Halfclear', 5: 'Cloudy',
  6: 'Overcast', 7: 'Fog', 8: 'Light rain', 9: 'Rain showers', 10: 'Heavy rain',
  11: 'Thunder', 12: 'Sleet', 13: 'Light sleet', 14: 'Light snow', 15: 'Snow showers',
  16: 'Heavy snow', 17: 'Light freezing rain', 18: 'Rain', 19: 'Heavy rain',
  20: 'Storm', 21: 'Light snow showers', 22: 'Snow', 23: 'Heavy snow showers',
  24: 'Hail', 25: 'Drizzle', 26: 'Freezing drizzle', 27: 'Mixed precipitation'
};


function getDayLabel(date: string, index: number, dayNames: string[]): string {
  if (index === 0) return 'Today';
  const dateObj = new Date(date);
  return dayNames[dateObj.getDay()] ?? '';
}

function getMiddleEntry(entries: any[]): any {
  return entries[Math.floor(entries.length / 2)];
}



function buildDayForecastCard(container: HTMLElement, date: string, entries: any[], dayIndex: number, dayNames: string[]) {
  const { min: minTemp, max: maxTemp } = getMinMaxTemp(entries);
  const middleEntry = getMiddleEntry(entries);
  const weatherCode = getParam(middleEntry, 'Wsymb2');
  const { icon, desc } = getIconAndDescription(weatherCode);
  const dayLabel = getDayLabel(date, dayIndex, dayNames);
  const card = createDailyForecastCard(dayLabel, icon, desc, String(minTemp), String(maxTemp));
  container.appendChild(card);
}




function getMinMaxTemp(entries: any[]): { min: number | string, max: number | string } {
  const temps = entries.map((entry: any) => getParam(entry, 't')).filter((v) => typeof v === 'number') as number[];
  if (!temps.length) return { min: '?', max: '?' };
  return { min: Math.min(...temps), max: Math.max(...temps) };
}

function getIconAndDescription(code: number | undefined): { icon: string, desc: string } {
  return {
    icon: WEATHER_ICON_PATHS[code as number] ?? '❓',
    desc: WEATHER_DESCRIPTIONS[code as number] ?? 'Unknown'
  };
}





function getSmhiForecastUrl(lat: number, lon: number): string {
  return `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
}


function getParam(entry: any, paramName: string): number | undefined {
  const param = entry.parameters.find((p: { name: string; values: number[] }) => p.name === paramName);
  return param ? param.values[0] : undefined;
}


function groupByDate(timeSeries: any[]) {
  const days: { [date: string]: any[] } = {};
  for (const entry of timeSeries) {
    const dateStr = entry.validTime.split('T')[0];
    if (!days[dateStr]) days[dateStr] = [];
    days[dateStr].push(entry);
  }
  return days;
}


function showCurrentWeather(cityName: string, data: any) {
  const section = document.querySelector('.today-weather-view .today-weather-title');
  if (!section) return;
  const now = data.timeSeries[0];
  const temp = getParam(now, 't');
  const code = getParam(now, 'Wsymb2');
  const { icon, desc } = getIconAndDescription(code);

  const h1 = section.querySelector('h1');
  if (h1) h1.textContent = `Sweden, ${cityName}`;
  const img = section.querySelector('img.today-weather-icon') as HTMLImageElement | null;
  if (img && typeof icon === 'string' && icon.endsWith('.svg')) {
    img.src = icon;
    img.alt = desc;
  }
  const h2 = section.querySelector('h2');
    if (h2) h2.textContent = temp !== undefined ? `${temp}\u00b0C` : '';
  const p = section.querySelector('p');
  if (p) p.textContent = desc;
}


function showHourlyForecast(data: any) {
  const container = document.querySelector('.today-weather-forecast .today-weather-cards');
  if (!container) return;
  container.innerHTML = '';
  const timeSeries = data.timeSeries.slice(0, 12); 
  for (let i = 0; i < timeSeries.length; i += 2) {
    const entry = timeSeries[i];
    const time = entry.validTime.split('T')[1].slice(0, 5);
    const temp = getParam(entry, 't');
    const code = getParam(entry, 'Wsymb2');
    const { icon } = getIconAndDescription(code);
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

function createDailyForecastCard(dayLabel: string, icon: string, desc: string, minTemp: number | string, maxTemp: number | string): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'weak-weather-card';
  card.innerHTML = `
    <p class="weak-day">${dayLabel}</p>
    <div class="weak-two">
      ${typeof icon === 'string' && icon.endsWith('.svg') ? `<img class='weak-icon-img' src='${icon}' alt='${desc}' style='width:32px;height:32px;vertical-align:middle;'/>` : `<icon class='weak-icon'>${icon}</icon>`}
      <p class="weak-weather-info">${desc}</p>
    </div>
    <p class="weak-degree">${minTemp} / ${maxTemp}</p>
  `;
  return card;
}

function showDailyForecast(data: any) {
  const container = document.querySelector('.weak-weather-cards') as HTMLElement | null;
  if (!container) return;
  container.innerHTML = '';

  const daysByDate = groupByDate(data.timeSeries);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let shownDays = 0;

  for (const date in daysByDate) {
    if (shownDays >= 4) break;
    const entries = daysByDate[date];
    if (!entries || entries.length === 0) continue;
    buildDayForecastCard(container as HTMLElement, date, entries, shownDays, dayNames);
    shownDays++;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const citySelect = document.getElementById('citySelect') as HTMLSelectElement | null;
  if (!citySelect) return;

  async function loadAndRenderWeather(cityName: string) {
    const selectedCity = CITIES.find(city => city.name === cityName);
    if (selectedCity) {
      try {
        const data = await fetchWeatherData(selectedCity.lat, selectedCity.lon);
        showCurrentWeather(selectedCity.name, data);
        showHourlyForecast(data);
        showDailyForecast(data);
      } catch (err) {
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

async function fetchWeatherData(lat: number, lon: number) {
  const url = getSmhiForecastUrl(lat, lon);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}