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
h3.innerHTML = `Current Time: ${days[day]} ${hour}:${minutes}`;

// Change temperature + Wind + Humidity + change icon depending of temperature
function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h4wind = document.querySelector("#wind");
  let h4humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  h1.innerHTML = `${temperature}`;
  h4wind.innerHTML = `Wind: ${wind}km/h`;
  h4humidity.innerHTML = `Humidity: ${humidity}%`;
  if (response.data.weather[0].description === "clear sky") {
    iconElement.setAttribute("src", "/img/sun.png");
  } else if (response.data.weather[0].description === "few clouds") {
    iconElement.setAttribute("src", "/img/sunc.png");
  } else if (
    response.data.weather[0].description === "shower rain" ||
    response.data.weather[0].description === "rain"
  ) {
    iconElement.setAttribute("src", "/img/rain.png");
  } else if (response.data.weather[0].description === "thunderstorm") {
    iconElement.setAttribute("src", "/img/storm.png");
  } else if (response.data.weather[0].description === "snow") {
    iconElement.setAttribute("src", "/img/snow.png");
  } else if (response.data.weather[0].description === "mist") {
    iconElement.setAttribute("src", "/img/wind.png");
  } else {
    iconElement.setAttribute("src", "/img/cloud.png");
  }
}
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=894a2e7aa7f46eeca5d8778f6faa5a5b&units=metric`;
axios.get(apiUrl).then(showWeather);

// Search for city title and change
function changeCity(event) {
  event.preventDefault();
  let formSearch = document.querySelector("#form-write");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${formSearch.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formSearch.value}&appid=894a2e7aa7f46eeca5d8778f6faa5a5b&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#form-city");
form.addEventListener("submit", changeCity);

// Search my Current Location and change everything

function searchMe(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=894a2e7aa7f46eeca5d8778f6faa5a5b&units=metric`;
  axios.get(apiUrl).then(searchCity);
}

function searchCity(response) {
  let h2 = document.querySelector("h2");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let humidity = Math.round(response.data.main.humidity);
  let h4humidity = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let h4wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  h2.innerHTML = `${city}`;
  h1.innerHTML = `${temperature}`;
  h4humidity.innerHTML = `Humidity: ${humidity}%`;
  h4wind.innerHTML = `Wind: ${wind}km/h`;

  if (response.data.weather[0].description === "clear sky") {
    iconElement.setAttribute("src", "/img/sun.png");
  } else if (response.data.weather[0].description === "few clouds") {
    iconElement.setAttribute("src", "/img/sunc.png");
  } else if (
    response.data.weather[0].description === "shower rain" ||
    response.data.weather[0].description === "rain"
  ) {
    iconElement.setAttribute("src", "/img/rain.png");
  } else if (response.data.weather[0].description === "thunderstorm") {
    iconElement.setAttribute("src", "/img/storm.png");
  } else if (response.data.weather[0].description === "snow") {
    iconElement.setAttribute("src", "/img/snow.png");
  } else if (response.data.weather[0].description === "mist") {
    iconElement.setAttribute("src", "/img/wind.png");
  } else {
    iconElement.setAttribute("src", "/img/cloud.png");
  }
}

document.getElementById("button").onclick = function () {
  navigator.geolocation.getCurrentPosition(searchMe);
};

// C to F ❌ NOW not avaible

function changeC(event) {
  event.preventDefault();
  let h1 = document.querySelector("#today-temperature");
}

function changeF(event) {
  event.preventDefault();
  let h1 = document.querySelector("#today-temperature");
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
celsius.addEventListener("click", changeC);
fahrenheit.addEventListener("click", changeF);
