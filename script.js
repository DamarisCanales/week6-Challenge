// var apiKey = "5caf1edd566cbc4e862d318c9caa2c07";
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var currentForecast = document.querySelector("#currentForecast");
var searchBtn = document.querySelector("#searchBtn");
var baseURL = "https://api.openweathermap.org";

async function getCoordinates(e) {
  e.preventDefault();
  console.log("clicked");
  const city = document.querySelector("#cityName").value;

  const response = await fetch(
    `${baseURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  );

  const data = await response.json();
  // console.log(data);
  oneCall(data);
}

searchBtn.addEventListener("click", getCoordinates);

async function oneCall(obj) {
  console.log(obj);
  const { lat } = obj.coord;
  const { lon } = obj.coord;

  const response = await fetch(
    `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  createTodaysWeather(data);
}

function createTodaysWeather(obj) {
  let tempElement = document.createElement("p");
  tempElement.textContent = obj.current.temp;
  document.querySelector("#currentForecast").append(tempElement);
}

//YOuu are going to target the users input when they type in a city
// When they click the submit button, you are going to store their input into the city variable
// var getLocation =
//   "http://api.openweathermap.org/geo/1.0/direct?q=brooklyn"
//   "&limit=5&units=imperial&appid=" +
//   apiKey;

// fetch(getLocation)
//   .then(function (res) {
//     // We need to return Json so it converts it from robot language to a mailiable languange
//     return res.json();
//   })
//   .then(function (data) {
//     console.log(data);

//     var latitude = data[0].lat;
//     var longitude = data[0].lon;

//     var currentWeather =
//       "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//       latitude +
//       "&lon=" +
//       longitude +
//       "&units=imperial&appid=" +
//       apiKey;

//     fetch(currentWeather)
//       .then(function (res) {
//         return res.json();
//       })

//       .then(function (data) {
//         console.log(data);
//         let cityName = document.createElement('h1')

//         // cityName.textContent =
//       });
//   });

// function citySearch(e) {
//   e.preventDefault();
//   console.log(city);
//   fetch(getLocation)
//     .then(function (res) {
//       // We need to return Json so it converts it from robot language to a mailiable languange
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       var latitude = data[0].lat;
//       var longitude = data[0].lon;

//       var currentWeather =
//         "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//         latitude +
//         "&lon=" +
//         longitude +
//         "&units=imperial&appid=" +
//         apiKey;

//       fetch(currentWeather)
//         .then(function (res) {
//           return res.json();
//         })

//         .then(function (data) {
//           console.log(data);
//           // let cityName = document.createElement('h1')

//           // cityName.textContent =
//         });
//     });
// }
