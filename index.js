
//  Den här filen gör 3 saker:
//   1) Hämtar väderdata från SMHI (och soltider från sunrise-sunset)
//   2) Plockar ut temperatur, väderkod, vind, luftfuktighet m.m.
//   3) Skriver in (renderar) allt i din HTML (id/klass som du redan har)
//
//  Läsordning:
//   1. Grunddata (städer, ikoner, text)
//   2. Små hjälpare (URL, soltider, värdehämtning)
//   3. Hämta väder från SMHI
//   4. Rendera: today / hourly / forecast
//   5. “Huvudprogram”: eventlyssnare och startläge



// 1) GRUNDDATA

// (A) Städer du kan välja i <select>. Varje stad har lat/lon (koordinater)
const cities = [
  { name: "Stockholm",  lat: 59.3293, lon: 18.0686 },
  { name: "Malmö",      lat: 55.6050, lon: 13.0038 },
  { name: "Gothenburg", lat: 57.7089, lon: 11.9746 }
]

// (B) Ikon-loop: genererar filvägarna för vädersymboler 01–27
//     Fördelen med loop: du slipper skriva 27 rader för hand och kan byta tema (night/day)
//     genom att bara ändra "icons/night/" till "icons/day/" om du vill.
const icons = {}
for (let i = 1; i <= 27; i++) {
  // padStart(2, "0") gör 1 -> "01", 9 -> "09", 12 -> "12"
  icons[i] = `icons/night/${String(i).padStart(2, "0")}.svg`
}

// (C) SMHI:s väderkoder -> läsbar text. (Kortfattat, kan anpassas)
const weatherText = {
  1: "Clear sky", 2: "Almost clear", 3: "Variable clouds",
  4: "Half clear", 5: "Cloudy", 6: "Overcast",
  7: "Fog", 8: "Light rain", 9: "Rain showers",
  10: "Heavy rain", 11: "Thunder", 12: "Sleet", 13: "Light sleet",
  14: "Light snow", 15: "Snow showers", 16: "Heavy snow",
  17: "Freezing rain", 18: "Rain", 19: "Heavy rain", 20: "Storm",
  21: "Light snow showers", 22: "Snow", 23: "Heavy snow showers",
  24: "Hail", 25: "Drizzle", 26: "Freezing drizzle", 27: "Mixed precipitation"
}


// 2) SMÅ HJÄLPARE

// (A) Bygger SMHI-URL för en punktprognos vid lat/lon.
//     SMHI:s öppna API för "3-timmars prognos" (pmp3g) -> JSON
function getSmhiUrl(lat, lon) {
  return `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
}

// (B) Hämtar ett specifikt parameter-värde ur en "timeSeries"-post.
//     SMHI skickar många parametrar (t=temp, r=luftfukt, ws=vindhast, Wsymb2=väderkod).
//     Den här funktionen letar upp rätt parameter (med name===paramName) och returnerar första värdet.
function pick(entry, paramName) {
  const param = entry.parameters.find(p => p.name === paramName)
  return param ? param.values[0] : undefined
}

// (C) Delar upp SMHI:s långa tidslista i "påse per datum", t.ex.
//     "2025-10-22": [..tider..], "2025-10-23": [..tider..]
function groupByDate(timeSeries) {
  const groups = {}
  timeSeries.forEach(entry => {
    const date = entry.validTime.split("T")[0] // "YYYY-MM-DDTHH:mm" -> "YYYY-MM-DD"
    if (!groups[date]) groups[date] = []
    groups[date].push(entry)
  })
  return groups
}

// (D) Hämtar soluppgång/solnedgång från sunrise-sunset.org.
//     Används för detaljkortet "Sunrise / Sunset".
async function getSunTimes(lat, lon) {
  const today = new Date().toISOString().split("T")[0] // "YYYY-MM-DD"
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${today}&formatted=0`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.status === "OK") {
      // Gör ISO-tider läsbara enligt användarens locale (2 siffror timme:minut)
      const sunrise = new Date(data.results.sunrise)
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const sunset  = new Date(data.results.sunset)
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      return { sunrise, sunset }
    }
  } catch (err) {
    console.log("Soltider kunde inte hämtas:", err)
  }
  // Fallback om API:et inte svarar
  return { sunrise: "N/A", sunset: "N/A" }
}



// 3) HÄMTA VÄDER (SMHI)

// Hämtar JSON från SMHI för angivna koordinater.
// Returnerar ett objekt med bl.a. "timeSeries" (lista över tider).
async function getWeather(lat, lon) {
  const url = getSmhiUrl(lat, lon)
  const res = await fetch(url)
  // Obs: här hoppar vi över extra try/catch för att hålla "Technigo-style" enkelt.
  // Vill du göra robust: lägg till kontroll på res.ok, annars alert/logga fel.
  const data = await res.json()
  return data
}

// 4) RENDERA (SKRIV IN I HTML)

// (A) Dagens vy (överst: stad + stor temperatur + beskrivning + ikon + 4 minikort)
function renderToday(data, cityName, lat, lon) {
  // 1) Hämta "nu" = första posten i timeSeries
  const now = data.timeSeries[0]

  // 2) Plocka ut nyckelvärden
  const temp = pick(now, "t")                // temperatur °C (Number)
  const code = pick(now, "Wsymb2")           // väderkod 1..27 (Number)
  const desc = weatherText[code] || "—"      // textbeskrivning
  const icon = icons[code] || ""             // ikonens filväg
  const rh   = pick(now, "r")                // luftfuktighet %
  const ws   = pick(now, "ws")               // vindhastighet m/s (SMHI)
  // (valfritt) konvertera m/s -> km/h: m/s * 3.6
  const windKmH = typeof ws === "number" ? (ws * 3.6) : undefined

  // 3) Fyll rubrikerna i den stora "today"-titeln
  const titleEl = document.querySelector(".today-weather-view .today-weather-title")
  titleEl.querySelector("h1").textContent = `Sweden, ${cityName}`
  titleEl.querySelector("h2").textContent = `${temp}°C`
  titleEl.querySelector("p").textContent  = desc

  // 4) Byt bild på ikonen (img.today-weather-icon finns i HTML)
  const img = titleEl.querySelector("img.today-weather-icon")
  if (img) {
    img.src = icon
    img.alt = desc
  }

  // 5) Uppdatera de fyra små detaljkorten (“ALL CONDITIONS”)
  //    Ordning i din HTML:
  //     [0] Real Feel (vi förenklar -> samma som temp)
  //     [1] Humidity
  //     [2] Wind (km/h)
  //     [3] Sunrise / Sunset (hämtas asynkront)
  const detailValues = document.querySelectorAll(".today-weather-details-grid-card h4")
  if (detailValues[0]) detailValues[0].textContent = (temp != null ? `${temp}°C` : "N/A")
  if (detailValues[1]) detailValues[1].textContent = (rh   != null ? `${rh}%`   : "N/A")
  if (detailValues[2]) detailValues[2].textContent = (windKmH != null ? `${windKmH.toFixed(1)} km/h` : "N/A")
  if (detailValues[3]) detailValues[3].textContent = "Loading…"

  // 6) Hämta soltiderna för vald plats och skriv in när svaret kommer
  getSunTimes(lat, lon).then(({ sunrise, sunset }) => {
    if (detailValues[3]) detailValues[3].textContent = `↑${sunrise}  ↓${sunset}`
  })
}

// (B) Timprognos för idag (de små korten med klockslag + temp + ikon)
function renderHourly(data) {
  const container = document.querySelector(".today-weather-forecast .today-weather-cards")
  container.innerHTML = "" // 1) Töm bort gamla kort (om man byter stad)

  // 2) Ta ut första 12 posterna (ca 36 timmar i SMHI pmp3g; vi visar t.ex. varannan)
  const hours = data.timeSeries.slice(0, 12)
  for (let i = 0; i < hours.length; i += 2) {
    const entry = hours[i]
    const time = entry.validTime.split("T")[1].slice(0, 5) // "HH:mm"
    const temp = pick(entry, "t")
    const code = pick(entry, "Wsymb2")
    const icon = icons[code] || ""

    // 3) Bygg ett kort (div) och lägg in i containern
    const card = document.createElement("div")
    card.className = "today-weather-card"
    card.innerHTML = `
      <p class="today-time">${time}</p>
      <img class="today-icon-img" src="${icon}" alt="${code}" width="32" height="32" />
      <p class="today-degree">${temp}°C</p>
    `
    container.appendChild(card)
  }
}

// (C) 4-dagars prognos (enkelt: min/max per dag + en ikon från "mitten" av dagen)
function renderForecast(data) {
  const container = document.querySelector(".weak-weather-cards")
  container.innerHTML = "" // töm gammalt

  const grouped = groupByDate(data.timeSeries)           // { "YYYY-MM-DD": [entries...] }
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  let printed = 0

  for (const date in grouped) {
    if (printed >= 4) break // visa bara 4 dagar för en clean layout

    const entries = grouped[date]

    // Hämta alla temperaturer för datumet -> räkna ut min/max
    const temps = entries
      .map(e => pick(e, "t"))
      .filter(v => typeof v === "number")
    const minT = temps.length ? Math.min(...temps) : "?"
    const maxT = temps.length ? Math.max(...temps) : "?"

    // Välj en mittenpost för att representera "dagens väder" med ikon/typ
    const mid   = entries[Math.floor(entries.length / 2)]
    const code  = pick(mid, "Wsymb2")
    const icon  = icons[code] || ""
    const desc  = weatherText[code] || "—"

    // Dagens namn: "Today" för första, annars veckodag
    const d = new Date(date)
    const label = (printed === 0) ? "Today" : dayNames[d.getDay()]

    // Bygg dagkortet och lägg in i DOM
    const card = document.createElement("div")
    card.className = "weak-weather-card"
    card.innerHTML = `
      <p class="weak-day">${label}</p>
      <div class="weak-two">
        <img class="weak-icon-img" src="${icon}" alt="${desc}" width="32" height="32" />
        <p class="weak-weather-info">${desc}</p>
      </div>
      <p class="weak-degree">${minT} / ${maxT}</p>
    `
    container.appendChild(card)
    printed++
  }
}

// 5) “HUVUDPROGRAM” – START OCH EVENT

window.addEventListener("DOMContentLoaded", () => {
  // 1) Hämta referenser till <select> och knappen “My Location”
  const select = document.getElementById("citySelect")
  const geoBtn = document.getElementById("geoLocateBtn")

  // 2) Hjälpare: ladda och rendera för vald stad (namn -> lat/lon -> hämta -> skriv ut)
  async function loadCity(cityName) {
    const city = cities.find(c => c.name === cityName)
    if (!city) return
    const data = await getWeather(city.lat, city.lon)
    renderToday(data, city.name, city.lat, city.lon)
    renderHourly(data)
    renderForecast(data)
  }

  // 3) Hjälpare: ladda och rendera för koordinater (användarens position)
  async function loadCoords(lat, lon) {
    const data = await getWeather(lat, lon)
    renderToday(data, "My Location", lat, lon) // skicka lat/lon så soltider blir rätt
    renderHourly(data)
    renderForecast(data)
    select.value = "" // töm valt stadsvärde för att signalera “egen plats”
  }

  // 4) När användaren byter stad i <select> -> ladda den
  if (select) {
    select.addEventListener("change", () => {
      if (select.value) loadCity(select.value)
    })
  }

  // 5) När man klickar på “My Location” -> använd webbläsarens geolocation-API
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Din webbläsare stöder inte platsinformation.")
        return
      }

      const original = geoBtn.textContent
      geoBtn.textContent = "Locating…"

      navigator.geolocation.getCurrentPosition(
        pos => {
          geoBtn.textContent = original
          loadCoords(pos.coords.latitude, pos.coords.longitude)
        },
        err => {
          geoBtn.textContent = original
          alert("Kunde inte hämta din plats.")
          console.log("Geolocation error:", err)
        }
      )
    })
  }

  // 6) Startläge: välj “Stockholm” och ladda direkt när sidan öppnas
  if (select) {
    select.value = "Stockholm"
    loadCity("Stockholm")
  }
})
