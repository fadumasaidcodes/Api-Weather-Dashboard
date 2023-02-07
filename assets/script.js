// Store the API key, weather URL, and forecast URL in variables
const apiKey = "5f81365ae536b7da813d034c891315db";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const futureWeather = document.getElementById("future-weather");

// Add a click event listener to the search button
searchBtn.addEventListener("click", function () {
    const city = cityInput.value;

    fetch(`${weatherUrl}?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const date = new Date();
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const temperature = (data.main.temp - 273.15).toFixed(2);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            let output = `
        <h2>${data.name} (${date.toLocaleDateString()})</h2>
        <img src="${icon}" alt="Weather Icon">
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

            weatherDisplay.innerHTML = output;
        });

    // Fetch 5-day forecast data
    fetch(`${forecastUrl}?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let forecastOutput = "";
            for (let i = 0; i < data.list.length; i += 8) {
                const forecastDate = new Date(data.list[i].dt * 1000);
                const forecastIcon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
                const forecastTemperature = (data.list[i].main.temp - 273.15).toFixed(2);
                const forecastHumidity = data.list[i].main.humidity;
                forecastOutput += `
        <div class="col-sm-2">
          <div class="card bg-primary text-white mb-3" style="max-width: 18rem;">
            <div class="card-header">${forecastDate.toLocaleDateString()}</div>
            <div class="card-body">
              <img src="${forecastIcon}" alt="Weather Icon">
              <p>Temperature: ${forecastTemperature} &#8451; </p>
              <p>Humidity: ${forecastHumidity}%</p>
              </div>
              </div>
              </div>
              `;
            }
            futureWeather.innerHTML = forecastOutput;
        });
});