const apiKey = "5f81365ae536b7da813d034c891315db";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const futureWeather = document.getElementById("future-weather");

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

    fetch(`${forecastUrl}?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let forecastOutput = "";
            for (let i = 0; i < data.list.length; i += 8) {
                const date = new Date(data.list[i].dt * 1000);
                const forecastIcon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
                const forecastTemperature = (data.list[i].main.temp - 273.15).toFixed(2);
                const forecastHumidity = data.list[i].main.humidity;
                const forecastWindSpeed = data.list[i].wind.speed;
                forecastOutput += `
                    <div class="forecast">
                        <h2>${date.toLocaleDateString()}</h2>
                        <img src="${forecastIcon}" alt="Weather Icon">
                        <p>Temperature: ${forecastTemperature} &#8451;</p>
                        <p>Humidity: ${forecastHumidity}%</p>
                        <p>Wind Speed: ${forecastWindSpeed} m/s</p>
                    </div>
                `;
            }
            futureWeather.innerHTML = forecastOutput;
        });

    if (typeof (Storage) !== "undefined") {
        let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        if (!searchHistory) {
            searchHistory = [];
        }

        // Clear the search history list before appending data from localStorage
        let historyList = document.getElementById("history-list");
        historyList.innerHTML = "";

        // Add the city to the search history
        searchHistory.push(city);

        // Store the updated search history in local storage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        let searchHistoryHeader = document.createElement("h2");
        searchHistoryHeader.innerHTML = "Search History";
        historyList.insertBefore(searchHistoryHeader, historyList.firstChild);

        searchHistory.forEach(city => {
            let cityListItem = document.createElement("li");
            cityListItem.innerHTML = city;
            historyList.appendChild(cityListItem);
        });
    }
})
