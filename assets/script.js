// GLOBAL VARIABLE STASH //
var searchBoxEl = document.querySelector("#searchBoxDiv");
var pastSearchBoxEl = document.querySelector("#pastSearches");
var currentBoxEl = document.querySelector("#currentForecast");
var fiveDayBoxEl = document.querySelector("#fiveDayForecast");
var searchFormBoxEl = document.querySelector("#searchForm");
var submitBtnEl = document.querySelector("#submitBtn");
var cityInputEl = document.querySelector("#city-name");
var searchHistoryArr = [];

// PAST CITY BUTTON //
var pastCityBtn = function () {
  if (localStorage.getItem("searchHistoryArr") != null) {
    var stringOfArray = localStorage.getItem("searchHistoryArr");
    console.log(stringOfArray);
    searchHistoryArr = JSON.parse(stringOfArray);

    for (var i = 0; i < searchHistoryArr.length; i++) {
      createPastCityBtn(searchHistoryArr[i]);
      console.log(searchHistoryArr);
    }
  }
};

// SAVE TO LOCAL STORAGE //
var saveLocalStorage = function () {
  var newArray = JSON.stringify(searchHistoryArr);
  localStorage.setItem("searchHistoryArr", newArray);
};

var createPastCityBtn = function (city) {
  var cityButtonEl = document.createElement("button");
  cityButtonEl.textContent = city;
  pastSearchBoxEl.appendChild(cityButtonEl);

  cityButtonEl.addEventListener("click", function () {
    getCityCoordinates(city);
  });
};

// CITY NAME VALIDATION //
var submitCityForm = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityCoordinates(cityName);
    createPastCityBtn(cityName);
    searchHistoryArr.push(cityName);
    saveLocalStorage();
    cityInputEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please check your spelling and try again.");
  }
};

// GET CITY COORDINATES //
var getCityCoordinates = function (city) {
  var locationApiURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=d91f911bcf2c0f925fb6535547a5ddc9";
  currentBoxEl.textContent = "";
  fiveDayBoxEl.textContent = "";
  fetch(locationApiURL).then(function (response) {
    // if request is successful: //
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          // pass response data //
          var latCoordinates = data[0].lat;
          var lonCoordinates = data[0].lon;
          var cityIdentity = data[0].name;
          getCurrentForecast(latCoordinates, lonCoordinates, cityIdentity);
        })
        .catch(function (err) {
          searchHistoryArr.splice(-1, 1);
          saveLocalStorage();
          alert("Could not find city. Please check spelling");
        });
    }
  });
};

var getCurrentForecast = function (lat, lon, city) {
  var weatherApiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9";

  fetch(weatherApiURL).then(function (response) {
    // if request was successful: //
    if (response.ok) {
      response.json().then(function (data) {
        // pass response data //
        console.log(data);

        var currentDate = calculateDate(data.current.dt);

        displayCurrent(
          city,
          currentDate,
          data.current.weather[0].icon,
          data.current.temp,
          data.current.wind_speed,
          data.current.humidity,
          data.current.uvi
        );

        for (var i = 1; i < 6; i++) {
          currentDate = calculateDate(data.daily[i].dt);
          displayFiveDay(
            currentDate,
            data.daily[i].weather[0].icon,
            data.daily[i].temp.day,
            data.daily[i].wind_speed,
            data.daily[i].humidity
          );
        }
      });
    } else {
    }
  });
};

// TIME STAMP CALCULATIONS //
var calculateDate = function (timestamp) {
  var unixTime = timestamp;
  var currentDate = new Date(unixTime * 1000);
  var fullDate =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();
  return fullDate;
};

// CURRENT FORECAST DISPLAY //
var displayCurrent = function (
  city,
  date,
  iconCode,
  temp,
  wind,
  humidity,
  UVindex
) {

  var todayTextEl = document.createElement("h1");
  var cityAndDateEl = document.createElement("h2");
  var forecastIconEl = document.createElement("img");
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  // get icon codes //
  forecastIconEl.setAttribute("src", iconURL);

  cityAndDateEl.textContent = city + " on " + date;

  var tempEl = document.createElement("p");
  tempEl.textContent = "Temp: " + temp + "\xB0 F";

  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + wind + "MPH";

  var humidEl = document.createElement("p");
  humidEl.textContent = "Humidity: " + humidity + " %";

  var UVindexTextEl = document.createElement("p");
  UVindexTextEl.textContent = "UV index: ";

  var UVindexScaleEl = document.createElement("span");
  UVindexScaleEl.textContent = "  " + UVindex + "  ";

  if (UVindex < 2) {
    UVindexTextEl.setAttribute("id", "favorable");
  } else if (UVindex < 5) {
    UVindexTextEl.setAttribute("id", "moderate");
  } else {
    UVindexTextEl.setAttribute("id", "severe");
  }

  currentBoxEl.append(todayTextEl);
  currentBoxEl.appendChild(cityAndDateEl);
  cityAndDateEl.appendChild(forecastIconEl);
  currentBoxEl.appendChild(tempEl);
  currentBoxEl.appendChild(windEl);
  currentBoxEl.appendChild(humidEl);
  currentBoxEl.appendChild(UVindexTextEl);
  UVindexTextEl.appendChild(UVindexScaleEl);
};

var displayFiveDay = function (date, iconCode, temp, wind, humidity) {
  var dayBoxEl = document.createElement("div");
  dayBoxEl.setAttribute("id", "dayBox");
  var dateEl = document.createElement("h3");
  var forecastIconEl = document.createElement("img");
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  // get icon codes //
  forecastIconEl.setAttribute("src", iconURL);

  dateEl.textContent = date;

  var tempEl = document.createElement("p");
  tempEl.textContent = "Temp: " + temp + "\xB0 F";
  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + wind + "MPH";
  var humidEl = document.createElement("p");
  humidEl.textContent = "Humidity: " + humidity + " %";

  dayBoxEl.appendChild(dateEl);
  dateEl.appendChild(forecastIconEl);
  dayBoxEl.appendChild(tempEl);
  dayBoxEl.appendChild(windEl);
  dayBoxEl.appendChild(humidEl);
  fiveDayBoxEl.appendChild(dayBoxEl);
};

// FULL FORECAST SETUP //
pastCityBtn();
submitBtnEl.addEventListener("click", submitCityForm);







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
