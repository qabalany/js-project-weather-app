/*
// Get elements from HTML
const cityEl = document.getElementById("cityName") as HTMLElement;
const tempEl = document.getElementById("temperature") as HTMLElement;
const descEl = document.getElementById("weatherDescription") as HTMLElement;
const iconEl = document.getElementById("weatherIcon") as HTMLElement;

const select = document.getElementById("citySelect") as HTMLSelectElement;
const button = document.getElementById("showWeatherBtn") as HTMLButtonElement;

// THE SEARCHER SECTION IRIS//

/*
//weather emojis
const weatherIcons: { [key: number]: string } = {
  1: "☀️",
  2: "🌤️",
  3: "⛅",
  4: "🌥️",
  5: "🌦️",
  6: "☁️",
  7: "🌫️",
  8: "🌧️",
  9: "🌧️",
  10: "🌧️",
  11: "⛈️",
  14: "❄️",
  15: "❄️",
  16: "❄️"
};


// text to the emojis, dubble check with the API!!! 
const weatherText: { [key: number]: string } = {
  1: "Clear sky",
  2: "Nearly clear",
  3: "Variable cloudiness",
  4: "Half-clear",
  5: "Cloudy",
  6: "Overcast",
  7: "Fog",
  8: "Light rain",
  9: "Moderate rain",
  10: "Heavy rain",
  11: "Thunderstorm",
  14: "Light snow",
  15: "Moderate snow",
  16: "Heavy snow",
};

//Fetch weather data fom SMHI
async function fetchWeather(lat: number, lon: number, cityName: string) {
  const API_URL = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`

  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    const data: any = await res.json()

    // Get the current weather 
    const current = data.timeSeries[0]
    const temp = current.parameters.find((p: any) => p.name === "t").values[0]
    const symbol = current.parameters.find((p: any) => p.name === "Wsymb2").values[0]

    // Update the page
    cityEl.textContent = cityName
    tempEl.textContent = `${Math.round(temp)}°C`
    descEl.textContent = weatherText[symbol as keyof typeof weatherText] || "Unknown"
    iconEl.textContent = weatherIcons[symbol] || "❔"
  } catch (error) {
    console.error("Error fetching weather:", error)
    descEl.textContent = "Could not load weather"
    iconEl.textContent = "❔"
  }
}

//Button, change the city
button.addEventListener("click", () => {
  const selected = select.value // 
  const city = cities[selected as keyof typeof cities]; // find the citys coordinates

  //only run if the city exist
if (!city) return

//show a loading msg
descEl.textContent = "Loading..."
iconEl.textContent = "⌛"

// call the weather function
fetchWeather(city.lat, city.lon, selected);

fetchTodayWeather(city.lat, city.lon); // For Mohammad's part: today forecast
})

*/

/*------------------------------------
| SECTION  TODAY FORECAST: MOHAMMAD  |
--------------------------------------
*/
/*
 --- TODAY FORECAST (using SMHI API) ---
async function fetchTodayWeather(lat: number, lon: number) {
  const API_URL = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    const cardsContainer = document.querySelector(".today-weather-cards");
    if (!cardsContainer) return;

    cardsContainer.innerHTML = ""; // clear old cards

    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Filter entries for today only
    const todaySeries = data.timeSeries.filter((item: any) =>
      item.validTime.startsWith(today)
    );

    // Limit to first 6 hourly forecasts
    const hoursToShow = todaySeries.slice(0, 6);

    hoursToShow.forEach((entry: any) => {
      const time = new Date(entry.validTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const temp = entry.parameters.find((p: any) => p.name === "t").values[0];
      const symbol = entry.parameters.find((p: any) => p.name === "Wsymb2").values[0];

      // Reuse the same icons and text from Iris' section
      const icon = weatherIcons[symbol] || "❔";

      const card = document.createElement("div");
      card.className = "today-weather-card";
      card.innerHTML = `
        <p class="today-time">${time}</p>
        <span class="today-icon">${icon}</span>
        <p class="today-degree">${Math.round(temp)}°C</p>
      `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching SMHI forecast:", error);
    const cardsContainer = document.querySelector(".today-weather-cards");
    if (cardsContainer) {
      cardsContainer.innerHTML = "<p>Error loading forecast data</p>";
    }
  }
}
fetchTodayWeather(city.lat, city.lon);

*/
/*----------------------------------------
| QUESTION QUESTION QUESTION QUESTION    |
------------------------------------------

- Guys we didnt deсide which cities we will choose ? Stockholm Gothenburg and Malmö :)
*/



/*--------------------------------------------
| SECTION   7-DAY FORECAST: KAUSAR TESTING    |
----------------------------------------------
*/
/*
// Interface for city coordinates //USE KAUSYARS 
interface City {
  name: string;
  lat: number;
  lon: number;
}

// List of cities
const cities: City[] = [
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Gothenburg", lat: 57.7089, lon: 11.9746 },
  { name: "Malmö", lat: 55.6050, lon: 13.0038 }
];

// Base URL for SMHI API
const baseUrl: string =
"https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point";

// Selected city (change index to choose another city)
const selectedCity: City = cities[0]!; // Stockholm

// Mapping SMHI symbol_code to icon and description
const weatherIcons: Record<number, { day: string; night: string }> = {
  1: {
    day: "weather_icons/centered/solid/day/01.svg",
    night: "weather_icons/centered/solid/night/01.svg",
  },
  2: {
    day: "weather_icons/centered/solid/day/02.svg",
    night: "weather_icons/centered/solid/night/02.svg",
  },
  3: {
    day: "weather_icons/centered/solid/day/03.svg",
    night: "weather_icons/centered/solid/night/03.svg",
  },
  4: {
    day: "weather_icons/centered/solid/day/04.svg",
    night: "weather_icons/centered/solid/night/04.svg",
  },
  5: {
    day: "weather_icons/centered/solid/day/05.svg",
    night: "weather_icons/centered/solid/night/05.svg",
  },
  6: {
    day: "weather_icons/centered/solid/day/06.svg",
    night: "weather_icons/centered/solid/night/06.svg",
  },
  7: {
    day: "weather_icons/centered/solid/day/07.svg",
    night: "weather_icons/centered/solid/night/07.svg",
  },
  8: {
    day: "weather_icons/centered/solid/day/08.svg",
    night: "weather_icons/centered/solid/night/08.svg",
  },
  9: {
    day: "weather_icons/centered/solid/day/09.svg",
    night: "weather_icons/centered/solid/night/09.svg",
  },
  10: {
    day: "weather_icons/centered/solid/day/10.svg",
    night: "weather_icons/centered/solid/night/10.svg",
  },
  11: {
    day: "weather_icons/centered/solid/day/11.svg",
    night: "weather_icons/centered/solid/night/11.svg",
  },
  12: {
    day: "weather_icons/centered/solid/day/12.svg",
    night: "weather_icons/centered/solid/night/12.svg",
  },
  13: {
    day: "weather_icons/centered/solid/day/13.svg",
    night: "weather_icons/centered/solid/night/13.svg",
  },
  14: {
    day: "weather_icons/centered/solid/day/14.svg",
    night: "weather_icons/centered/solid/night/14.svg",
  },
  15: {
    day: "weather_icons/centered/solid/day/15.svg",
    night: "weather_icons/centered/solid/night/15.svg",
  },
  16: {
    day: "weather_icons/centered/solid/day/16.svg",
    night: "weather_icons/centered/solid/night/16.svg",
  },
  17: {
    day: "weather_icons/centered/solid/day/17.svg",
    night: "weather_icons/centered/solid/night/17.svg",
  },
  18: {
    day: "weather_icons/centered/solid/day/18.svg",
    night: "weather_icons/centered/solid/night/18.svg",
  },
  19: {
    day: "weather_icons/centered/solid/day/19.svg",
    night: "weather_icons/centered/solid/night/19.svg",
  },
  20: {
    day: "weather_icons/centered/solid/day/20.svg",
    night: "weather_icons/centered/solid/night/20.svg",
  },
};

// Function to get day name
function getDayName(date: Date, isToday: boolean): string {
  if (isToday) return "Today";
  return date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, ...
}

// Fetch weather data from SMHI API
const url = `${baseUrl}/lon/${selectedCity.lon}/lat/${selectedCity.lat}/data.json`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const cardsContainer = document.querySelector(".weak-weather-cards");
    if (!cardsContainer) return;
    cardsContainer.innerHTML = "";

    const forecasts = data.timeSeries.slice(0, 7);

    forecasts.forEach((forecast: any, index: number) => {
      const forecastDate = new Date(forecast.time);
      const timeOfDay = getTimeOfDay(forecastDate);
      const code = forecast.data.symbol_code;

      const iconSet = weatherIcons[code];
      const icon = iconSet ? iconSet[timeOfDay] : "❓";
      const desc = weatherDescriptions[code] || "Unknown";

      const temp = Math.round(forecast.data.air_temperature);
      const isToday = index === 0;

      const card = document.createElement("div");
      card.classList.add("weak-weather-card");
      card.innerHTML = `
        <p class="weak-day">${getDayName(forecastDate, isToday)}</p>
        <div class="weak-two">
          <img class="weak-icon" src="${icon}" alt="${desc}" />
          <p class="weak-weather-info">${desc}</p>
        </div>
        <p class="weak-degree">${temp}°C</p>
      `;
      cardsContainer.appendChild(card);
    });
  })
  .catch((err) => console.error("Error fetching weather data:", err));



  
  
  





