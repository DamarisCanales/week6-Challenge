










// // VARIABLE STASH //
// const apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
// const currentForecast = document.querySelector("#currentForecast");
// const searchBtn = document.querySelector("#searchBtn");
// const baseURL = "https://api.openweathermap.org";

// var searchHistory = [];

// // LOCAL STORAGE SEARCH SAVER FUNCTION FOR DISPLAY //
// function saveSearch(cityName) {
//   searchHistory.push(cityName);

//   localStorage.setItem("search", JSON.stringify(searchHistory));
// }

// // LOCAL STORAGE SEARCH KEY RETRIVAL FUNCTION //
// function getSearchHistory() {
//   let storedHistory = localStorage.getItem("search");
//   if (storedHistory) {
//     searchHistory = JSON.parse(storedHistory);
//   }
// }
// getSearchHistory();

// // CITY COORDINATES SEARCH INFORMATION FUNCTION //
// async function getCoordinates(e) {
//   e.preventDefault();
//   console.log("clicked");
//   const city = document.querySelector("#cityName").value;

//   const response = await fetch(
//     `${baseURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
//   );
//   const data = await response.json();

//   console.log(data);
//   oneCall(data);
//   saveSearch(city);
// }

// // INITIATING SUBMIT BUTTON //
// searchBtn.addEventListener("click", getCoordinates);


// // CURRENT & FIVE-DAY FORECAST FUNCTION //
// async function oneCall(obj) {
//   // console.log(obj);
//   const { lat } = obj.coord;
//   const { lon } = obj.coord;

//   const response = await fetch(
//     `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
//   );
//   const data = await response.json();
//   console.log(data);
//   createTodaysWeather(data);
//   fiveDayForecast(data);
// }

// function createTodaysWeather(obj) {
//   let tempElement = document.createElement("p");
//   let windElement = document.createElement("p");
//   let humidElement = document.createElement("p");

//   tempElement.textContent = `Temp: ${obj.current.temp}`;
//   windElement.textContent = "Wind: " + obj.current.wind_speed;
//   humidElement.textContent = `Humidity: ${obj.current.humidity}`;

//   document
//     .querySelector("#currentForecast")
//     .append(tempElement, windElement, humidElement);
// }

// function fiveDayForecast(obj) {
//   const dailyArr = obj.daily;
//   console.log(dailyArr);

//   for (let i = 0; i <= 4; i++) {
//     var currentForecastObj = dailyArr[i];
//     console.log(currentForecastObj);

//     let temperatureEl = document.createElement("p");
//     let windSpeedEl = document.createElement("p");
//     let humidityEl = document.createElement("p");

//     temperatureEl.textContent = `Temp:${currentForecastObj}`;

//     temperatureEl.textContent = `Temp: ${currentForecastObj.temp.day}`;
//     windSpeedEl.textContent = `Wind: ${currentForecastObj.wind_speed}`;
//     humidityEl.textContent = `Humidity: ${currentForecastObj.humidity}`;

//     document
//       .querySelector("#fiveDayForecast")
//       .append(temperatureEl, windSpeedEl, humidityEl);
//   }
// }
