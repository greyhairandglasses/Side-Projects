// API Key - 9feab22816732accf10687c5d41227d7
let weatherInfo;

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-0.12574&lon=51.50853&appid=9feab22816732accf10687c5d41227d7')
.then(response => {
  return response.json();
})
.then(weather => {
  weatherInfo = weather;
})
// currentTemp = weather.current.temp
// currentWeather = weather.current.weather[0].description
// console.log(currentTemp, currentWeather)
console.log(weatherInfo)