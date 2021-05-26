function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if ( hour < 10){
hour = `0${hour}`;
  }
 if ( minute < 10){
minute = `0${minute}`;
  }

   return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[day];
}

function changeCity(event){
  event.preventDefault();
  let newCity = document.querySelector("#new-city").value;
  console.log(newCity);

 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getForecast(coords){
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={minutely}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
   let forecast = response.data.daily;
   console.log(forecast);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<br>
<h3>Forecast:</h3>
<br>
<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  tempreture = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
   wind = Math.round(wind);
   console.log(response.data);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = tempreture;
  console.log(response.data);
 let windElement = document.querySelector("#wind");
windElement.innerHTML = wind;
let newCity = response.data.name;
  let displayedCity = document.querySelector("#entered-city");
  displayedCity.innerHTML = `<strong>${newCity}</strong>`;

let weatherIcon = document.querySelector("#weather-icon");
weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = humidity;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = description;

  getForecast(response.data.coord);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
    let displayedCity = document.querySelector("#entered-city");
  displayedCity.innerHTML = `<strong>Current location<strong>`;

  let apiKey = "97f3b3b2df521867b9186f5dc6f41a1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocationTemp(event){
navigator.geolocation.getCurrentPosition(handlePosition);
}

  let apiKey = "97f3b3b2df521867b9186f5dc6f41a1b";


let currentDayTime = document.querySelector("h3");
currentDayTime.innerHTML = formatDate(new Date());
console.log(formatDate(new Date()));

let enteredCity = document.querySelector("#city-search-form");
enteredCity.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-loc-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemp);

