// 1. Your OpenWeatherMap API key (get one free at openweathermap.org/api)
const API_KEY = "3c078a2c1b2c8489a7b282f0f5e03a21";

// 2. Grab all the elements we'll need to update
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");

// 3. Run getWeather() when the button is clicked, or when Enter is pressed
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});

// 4. The main function
async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  // Reset UI: hide old results/errors, show loading
  weatherCard.classList.add("hidden");
  errorBox.classList.add("hidden");
  loading.classList.remove("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    // If the city doesn't exist, the API returns a non-200 status
    if (!response.ok) {
      throw new Error("City not found. Check the spelling and try again.");
    }

    const data = await response.json();
    displayWeather(data);

  } catch (err) {
    showError(err.message);
  } finally {
    loading.classList.add("hidden");
  }
}

// 5. Fill in the card with real data
function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} m/s`;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

  weatherCard.classList.remove("hidden");
}

// 6. Show an error message
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}
