import { daysOfWeek, dayTemps, daySymbols } from './selectors.js'

export const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));


export function dayConversion(utcSeconds) {
  let day = new Date(0); // The 0 there is the key, which sets the date to the epoch
  day.setUTCSeconds(utcSeconds);
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

export function generateFutureDays(days) {
  for (let i = 0; i < 5; i++) {
    daysOfWeek[i].textContent = `${dayConversion(days[i+1].dt)}`
    dayTemps[i].textContent = `${Math.round(days[i+1].temp.max)}°C`
    daySymbols[i].src = `http://openweathermap.org/img/wn/${days[i+1].weather[0].icon}@2x.png`
  }
}