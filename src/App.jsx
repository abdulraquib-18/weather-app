import { useState, useEffect } from "react";
import "./App.css";

import { fetchWeather } from "./services/weatherService";
import { getBackground } from "./utils/weatherBackground";
import { saveTheme, getTheme } from "./utils/storage";

function App() {
  // ==========================
  // States
  // ==========================

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
  getTheme() === "dark"
);
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState("");

  // Last 3 Search History
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });

  // Greeting
  const [greeting, setGreeting] = useState("");

  // OpenWeather API Key
  const apiKey = "7e109b194588edd2d03805df880c18cd";

  // ==========================
  // Splash Screen (3 Seconds)
  // ==========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ==========================
  // Greeting
  // ==========================

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("🌅 Good Morning");
    } else if (hour < 17) {
      setGreeting("☀️ Good Afternoon");
    } else if (hour < 20) {
      setGreeting("🌇 Good Evening");
    } else {
      setGreeting("🌙 Good Night");
    }
  }, []);

  // ==========================
  // Fetch Weather
  // ==========================

  const getWeather = async () => {
  if (!city.trim()) {
    setError("Please enter a city name.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await fetchWeather(city);

    setWeather(data);
    const updatedHistory = [
  city,
  ...history.filter((item) => item.toLowerCase() !== city.toLowerCase()),
].slice(0, 3);

setHistory(updatedHistory);
localStorage.setItem("history", JSON.stringify(updatedHistory));
    setCity("");

  } catch (err) {
    setWeather(null);
    setError(err.message || "Failed to fetch weather data.");
  } finally {
    setLoading(false);
  }
};

  // ==========================
  // Dynamic Background
  // ==========================

  const bgClass = getBackground(weather);
  
  // ==========================
  // Splash Screen
  // ==========================

  if (showSplash) {
    return (
      <div className="splash-screen">

        <h1 className="app-title">
  🌦️ Weather App
</h1>

<p className="intro-text">
  Search any city and get accurate
  <span> real-time weather updates</span>,
  including <strong>temperature</strong>,
  <strong> humidity</strong>,
  <strong> wind speed</strong>,
  <strong> pressure</strong>,
  <strong> visibility</strong>,
  <strong> sunrise</strong> and
  <strong> sunset</strong>.
</p>

<div className="intro-box">

  <h2>👨‍💻 Project By</h2>

  <p><strong>Name :</strong> Abdul Raquib</p>

  <p><strong>Course :</strong> Diploma in Computer Science & Engineering</p>

  <p><strong>Roll No :</strong> 25DPCS005HY</p>

  <p><strong>Enrollment No :</strong> A250923</p>

  <p><strong>Email :</strong> abdulraquib045@gmail.com</p>

</div>

<div className="loader">
  <div className="loader-bar"></div>
</div>

<p className="loading-text">
  Loading Weather App...
</p>

      </div>
    );
  }

  // ==========================
  // Main UI
  // ==========================

  return (
    <main
      className={`${darkMode ? "container dark" : "container"} ${bgClass}`}
    >

      <section className="weather-card">

        <header>

          <h1>🌤 Weather Cast</h1>

          <p className="app-description">
            Fast • Accurate • Real-Time Weather Forecast

          </p>

        </header>
<div className="top-buttons">
  <button
    className="support-btn"
    onClick={() =>
      window.location.href =
        "mailto:abdulraquib045@gmail.com"
    }
  >
    📧
  </button>

  <button
    className="theme-btn"
    onClick={() => {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
      saveTheme(newTheme ? "dark" : "light");
    }}
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>

        <input
          type="text"
          placeholder="Enter City Name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <button
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? "Searching..." : "🔍 Search Weather"}
        </button>

        {loading && (
          <p className="loading">
            Fetching latest weather data...
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {history.length > 0 && (

          <div className="history">

            <h3>🕘 Recent Searches</h3>


            {history.map((item, index) => (

              <button
                key={index}
                className="history-btn"
                onClick={() => setCity(item)}
              >
                📍 {item}
              </button>

            ))}

          </div>

        )}

        {weather && (

          <article className="result">

            <h2>{weather.name}</h2>

            <p>
              🌍 Country :{" "}
              {new Intl.DisplayNames(
                ["en"],
                { type: "region" }
              ).of(weather.sys.country)}
            </p>

            <p>
              📅 {new Date().toLocaleString()}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <h3 className="temp">
              {Math.round(weather.main.temp)}°C
            </h3>
            <button
  className="clear-history"
  onClick={() => {
    setHistory([]);
    localStorage.removeItem("history");
  }}
>
  🗑️ Clear History
</button>
                        <p>
              🌡 Feels Like :
              {Math.round(weather.main.feels_like)}°C
            </p>

            <p>
              🔺 Maximum Temperature :
              {Math.round(weather.main.temp_max)}°C
            </p>

            <p>
              🔻 Minimum Temperature :
              {Math.round(weather.main.temp_min)}°C
            </p>

            <p>
              ☁ Weather Condition :
              {weather.weather[0].main}
            </p>

            <p>
              📝 Description :
              {weather.weather[0].description}
            </p>

            <p>
              💧 Humidity :
              {weather.main.humidity}%
            </p>

            <p>
              💨 Wind Speed :
              {weather.wind.speed} m/s
            </p>

            <p>
              📊 Pressure :
              {weather.main.pressure} hPa
            </p>

            <p>
              👁 Visibility :
              {(weather.visibility / 1000).toFixed(1)} km
            </p>

            <p>
              📍 Latitude :
              {weather.coord.lat}
            </p>

            <p>
              📍 Longitude :
              {weather.coord.lon}
            </p>

            <p>
              ☁ Cloud Coverage :
              {weather.clouds.all}%
            </p>

            <p>
              🌅 Sunrise :
              {new Date(
                weather.sys.sunrise * 1000
              ).toLocaleTimeString("en-IN")}
            </p>

            <p>
              🌇 Sunset :
              {new Date(
                weather.sys.sunset * 1000
              ).toLocaleTimeString("en-IN")}
            </p>

            <p>
              🕒 Last Updated :
              {new Date().toLocaleTimeString("en-IN")}
            </p>

            <p className="weather-emoji">

              {weather.weather[0].main === "Clear" &&
                "☀️ Bright Sunny Day"}

              {weather.weather[0].main === "Clouds" &&
                "☁️ Cloudy Sky"}

              {weather.weather[0].main === "Rain" &&
                "🌧 Rainy Weather"}

              {weather.weather[0].main === "Snow" &&
                "❄ Snowfall"}

              {weather.weather[0].main === "Thunderstorm" &&
                "⛈ Thunderstorm"}

              {weather.weather[0].main === "Mist" &&
                "🌫 Misty Weather"}

              {weather.weather[0].main === "Haze" &&
                "🌫 Hazy Sky"}
            </p>

            <hr />
                      <footer className="footer">
  <p>🌍 Powered by OpenWeather API</p>
  <p>⚛ Built with React + Vite</p>
  <p>📧 Email for inquiry : abdulraquib045@gmail.com</p>
</footer>
                      </article>
        )}

      </section>
    </main>
  );
}

export default App;
