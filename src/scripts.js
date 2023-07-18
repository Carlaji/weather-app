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
  let description = document.querySelector("#weather-description");
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.weather[0].main;

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = `${temperature}`;
  h4wind.innerHTML = `Wind: ${wind}km/h`;
  h4humidity.innerHTML = `Humidity: ${humidity}%`;
  description.innerHTML = `${weatherDescription}`;

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
  let description = document.querySelector("#weather-description");
  let weatherDescription = response.data.weather[0].main;
  description.innerHTML = `${weatherDescription}`;
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

function search(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
// C to F

function displayCelsius(event) {
  event.preventDefault();
  let h1 = document.querySelector("#today-temperature");
  h1.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let h1 = document.querySelector("#today-temperature");
  h1.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
celsiusLink.addEventListener("click", displayCelsius);
fahrenheitLink.addEventListener("click", displayFarenheit);

search("Barcelona");
