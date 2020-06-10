import { geoFindMe } from './lib.js'
import { locationBtn, dropdown } from './selectors.js'
import { populateDropdown, dropdownHandler } from './utils.js'
import { locationData } from './location-data.js'

// This function gets the data into the dropdown menu
populateDropdown(locationData, dropdown);
// This will get the ask the user for permission to use their location, then use that data to generate local weather
locationBtn.addEventListener('click', geoFindMe)
// Changes the weather based upon the option selected from the dropdown
dropdown.addEventListener('change', dropdownHandler)
geoFindMe()
