// API Key - 9feab22816732accf10687c5d41227d7

// Weather API as a variable
const openWeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=-0.12574&lon=51.50853&units=metric&appid=9feab22816732accf10687c5d41227d7';

// Wes' timeout shortcut
const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Info panels
const currentInfo = document.querySelector('.current-info')
const currentTemp = document.querySelector('.current-temp')
const currentType = document.querySelector('.current-type')


// Grabbing weather data and putting it onto site
const weather = fetch(openWeatherAPI)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    const current = data.current;
    currentInfo.innerHTML = `${current.weather[0].description}`
    currentTemp.innerHTML = `${Math.round(current.temp)}`
    console.log(data)
    console.log(current.dt)
    console.log(current.temp)
    console.log(current.weather[0].description)
  });