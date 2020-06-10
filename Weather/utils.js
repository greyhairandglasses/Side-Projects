import { daysOfWeek,
  dayTemps, 
  daySymbols,  
  sunrise, 
  sunset, 
  UVLevel, 
  feelsLike, 
  windSpeed, 
  description, 
  humidity,
  currentDay, 
  currentTemp, 
  currentType, 
  todayBtn,
  location } from './selectors.js'
  import { getWeather } from './lib.js'

// A helper funtion to translate days from numbers to strings
export function dayConversion(utcSeconds) {
  // Creates new date variable
  let day = new Date(0); // The 0 there is the key, which sets the date to the epoch
  // Sets the date
  day.setUTCSeconds(utcSeconds);
  // Converts full date into just a day, which is a number initially. Switch statement then converts to string
  switch (day.getDay()) {
    case 0:
      day = 'Sunday'
      break;
    case 1:
      day = 'Monday'
      break;
    case 2:
      day = 'Tuesday'
      break;
    case 3:
      day = 'Wednesday'
      break;
    case 4:
      day = 'Thursday'
      break;
    case 5:
      day = 'Friday'
      break;
    case 6:
      day = 'Saturday'
      break;
    default:
      break;
  }
  return day
}

// This function generates the 5 day forecast at the bottom of the div
export function generateFutureDays(days) {
  // The loop goes through the daily data, plus one is needed to prevent the current day being shown twice on the page
  for (let i = 0; i < 5; i++) {
    daysOfWeek[i].textContent = `${dayConversion(days[i+1].dt)}`
    dayTemps[i].textContent = `${Math.round(days[i+1].temp.max)}°C`
    daySymbols[i].src = `http://openweathermap.org/img/wn/${days[i+1].weather[0].icon}@2x.png`
  }
}

// Used to handle a click on the 5 day forecast, will push data upto the main display for a more detailed breakdown of the weather on that day
export function handleClick(e, data) {
  const clickedDay = e.currentTarget.id
  const dayRef = (clickedDay.charAt(clickedDay.length - 1))
  updateCurrentData(data, dayRef)

}

// Used to generate the data for the selected item in the dropdown
export function dropdownHandler(e) {
  // Below 3 lines converts the string of coords into 2 individual numbers
  let [lat, lon] = e.target.value.split(' ')
  lat = parseFloat(lat)
  lon = parseFloat(lon)
  // Calling with appropriate coords
  getWeather(lat, lon);
  location.innerText = event.target.options[event.target.selectedIndex].dataset.name;
}

// This beast will populate the table with the appropriate data
export function updateCurrentData(data, day = 0) {
  // If the day is today, then hide the 'Today' button. 
  day === 0 ? todayBtn.classList.add('hidden') : todayBtn.classList.remove('hidden');

  // Updates the small summary card
  currentDay.textContent = day === 0 ? 'Today' : `${dayConversion(data.daily[day].sunrise)}`;
  currentTemp.textContent = day === 0 ? `${Math.round(data.current.temp)}°C` : `${Math.round(data.daily[day].temp.max)}°C`;
  currentType.src = day === 0 ? `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png` : `http://openweathermap.org/img/wn/${data.daily[day].weather[0].icon}@2x.png`

  // Grabs the timestamps for the sunset and sunrise
  let sunriseTime = new Date(0)
  sunriseTime.setUTCSeconds(day === 0 ? data.current.sunrise : data.daily[day].sunrise)
  let sunsetTime = new Date(0)
  sunsetTime.setUTCSeconds(day === 0 ? data.current.sunset : data.daily[day].sunset)

  // Updates the main table
  // TODO: Using localeString with a hardcoded value converts the time of sunset and sunrise to GMT, regardless of where the user is
  // So for international locations the sunset/rise times will be the time in the UK when the sunsets in X location  
  sunrise.textContent = `${day === 0 ? sunriseTime.toLocaleTimeString('en-GB') : sunriseTime.toLocaleTimeString('en-GB')}`
  sunset.textContent = `${day === 0 ? sunsetTime.toLocaleTimeString('en-GB') : sunsetTime.toLocaleTimeString('en-GB')}`
  UVLevel.textContent = `${day === 0 ? Math.round(data.current.uvi) : Math.round(data.daily[day].uvi)}`
  feelsLike.textContent = `${day === 0 ? Math.round(data.current.feels_like) : Math.round(data.daily[day].feels_like.day)}°C`
  windSpeed.textContent = `${day === 0 ? data.current.wind_speed : data.daily[day].wind_speed} m/s`
  description.textContent = `${day === 0 ? data.current.weather[0].description : data.daily[day].weather[0].description}`
  humidity.textContent = `${day === 0 ? data.current.humidity : data.daily[day].humidity}%`
}

// Will put the locations stored in the data file into the dropdown menu
export function populateDropdown(data, dropdown, selected = 'London') {
  let option;
  data.forEach(item => {
    option = document.createElement('option');
    option.text = item.name;
    option.value = `${item.coord.lat} ${item.coord.lon}`
    option.setAttribute('data-name', item.name)
    // if (selected === item.name) {
    //   option.selected = true
    // }
    dropdown.add(option);
  })

}

