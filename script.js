const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=50&lon=40&appid=5f81365ae536b7da813d034c891315db"

fetch(apiUrl).then(function (response) {
    return response.json()

}).then(function (data) {
    console.log(data)
})


