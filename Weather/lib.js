import { futureDays, todayBtn, location } from './selectors.js'
import { generateFutureDays, handleClick, updateCurrentData } from './utils.js'

// Grabbing weather data and putting it onto site
export async function getWeather(lat, lon) {
  // The link for the data, including the passed in arguements for Latitude and Longdtitude
  const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=9feab22816732accf10687c5d41227d7`
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    updateCurrentData(data);
    generateFutureDays(data.daily)
    

    futureDays.forEach(day => day.addEventListener('click', e => handleClick(e, data)))
    todayBtn.addEventListener('click', e => updateCurrentData(data))
    


  } catch (error) {
    console.log(`Whoops! ${error}`)
  }
}


// Grabs the long/lat co-ords for the getWeather function
export function geoFindMe() {
  // If user allows then this data will be gathered
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude)
    location.innerText = 'Local weather';
  }
  // If user disallows GPS info, then error displayed
  // TODO - Render error message on the actual page, not just the console
  function error() {
    console.log('Unable to retrieve your location');
  }
  // Handle success or fail of getting user permission
  if (!navigator.geolocation) {
    error();
  } else {
    console.log('Locating…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
