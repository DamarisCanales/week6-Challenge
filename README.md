# Weather-Dashboard
### Description
Weather-Dashboard is an application to find a weather condition of a given city both the current and 5-Days forecast at the same time.
The server-side API used to get response data object is retrieved from the Open Weather APi.
The current weather section is including the following weather characters and date.

- City, Date, Icon-image
- Temperature
- Humidity
- Wind Speed
- UV index

The 5-days weather forecast also displays below the current weather conditions section and it includes the following information for each day:

- Date
- Icon image
- Temperature
- Humidity

The local storage is used here to store the previous search city and display them to the user under the search box form.

## Features
When a user loads the page, they will see a search bar. They'll enter a city name and click the submit button, upon which several things will happen:

![Weather Dashboard Website initial Upload](/assets/images/Weather_Dashboard_Website_Intial_Upload.png "San Juan Mountains")

- If a city is found, the current forcast will be displayed, as well as the city name, date, an icon of the current weather, the temperature (in fahrenheit), wind speed, humidity, and UV Index.




- If a city is not found, an alert will display, and the city will be removed from the saved array.

- Below the current forcast, the forecast for the next five days will be displayed - the date, an icon displaying the weather, the temperature (in fahrenheit), wind speed, and humidity.

- The color surrounding the UV index will change based on whether the UV index is favorable, moderate, or severe.


- Finally, a button will be added below the search bar to save the city that was entered. Even when the page is refreshed or reloaded, the past cities will stay saved.


