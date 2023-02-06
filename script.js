const apiKey = "5f81365ae536b7da813d034c891315db";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");

searchBtn.addEventListener("click", function() {
  const city = cityInput.value;

  fetch(`${weatherUrl}?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      fetch(`${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          let output = "";
          data.list.forEach(function(forecast) {
            output += `
              <div>
                <p>Date: ${forecast.dt_txt}</p>
                <p>Temperature: ${forecast.main.temp}</p>
                <p>Description: ${forecast.weather[0].description}</p>
              </div>
            `;
          });
          weatherDisplay.innerHTML = output;
        });
    });
});
