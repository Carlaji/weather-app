// Date and Time
let now = new Date();
let day = now.getDay();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let hour = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
let h3 = document.querySelector("#current-time");
h3.innerHTML = `${days[day]} ${hour}:${minutes}`;

// Change temperature + Wind + Humidity + change icon depending of temperature
function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h4wind = document.querySelector("#wind");
  let h4humidity = document.querySelector("#humidity");

  let description = document.querySelector("#weather-description");
  let temperature = Math.round(response.data.temperature.current);
  let humidity = Math.round(response.data.temperature.humidity);
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;

  celsiusTemperature = response.data.temperature.current;

  h1.innerHTML = `${temperature}`;
  h4wind.innerHTML = `Wind: ${wind}km/h`;
  h4humidity.innerHTML = `Humidity: ${humidity}%`;
  description.innerHTML = `${weatherDescription}`;
  document.getElementById(
    "icon"
  ).src = `/img/${response.data.condition.icon}.png`;
}

let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=Barcelona&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Barcelona&key=29a93389cbc7b063100ft3doa5403cdf`;
axios.get(apiUrl).then(showWeather);
axios.get(apiUrlForecast).then(displayForecast);

// Search for city title and change
function changeCity(event) {
  event.preventDefault();
  let formSearch = document.querySelector("#form-write");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${formSearch.value}`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${formSearch.value}&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${formSearch.value}&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrlForecast).then(displayForecast);
}

let form = document.querySelector("#form-city");
form.addEventListener("submit", changeCity);

// Search my Current Location and change everything

function searchMe(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;

  axios.get(apiUrl).then(searchCity);
}

function searchCity(response) {
  let h2 = document.querySelector("h2");
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("h1");
  let humidity = Math.round(response.data.temperature.humidity);
  let h4humidity = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let h4wind = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let weatherDescription = response.data.condition.description;
  description.innerHTML = `${weatherDescription}`;
  h2.innerHTML = `${city}`;
  h1.innerHTML = `${temperature}`;
  h4humidity.innerHTML = `Humidity: ${humidity}%`;
  h4wind.innerHTML = `Wind: ${wind}km/h`;
  document.getElementById(
    "icon"
  ).src = `/img/${response.data.condition.icon}.png`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

document.getElementById("button").onclick = function () {
  navigator.geolocation.getCurrentPosition(searchMe);
};

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=29a93389cbc7b063100ft3doa5403cdf&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//Forecast week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="day col-2">
            <h5>${formatDay(forecastDay.time)}</h5>
            <img
              src="/img/${forecastDay.condition.icon}.png"
              class="weather-icon-week"
              alt="Sunny and Cloudy"
            />
            <div class="day-temperature">
              <span class="day-temperature-max"> ${Math.round(
                forecastDay.temperature.maximum
              )}° </span>
              <span class="day-temperature-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
          </div>
       
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
