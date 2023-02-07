// Store the API key, weather URL, and forecast URL in variables
const apiKey = "5f81365ae536b7da813d034c891315db";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
// Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");

searchBtn.addEventListener("click", function() {
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
});
