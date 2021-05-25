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

function changeCity(event){
  event.preventDefault();
  let newCity = document.querySelector("#new-city").value;
  console.log(newCity);

 
  let apiKey = "97f3b3b2df521867b9186f5dc6f41a1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

}

function changeToC(event){
event.preventDefault();
  let tempElement = document.querySelector("#temp");
temp = Number(celsiusTemp);
 tempElement.innerHTML = temp;
}

function changeToF(event){
event.preventDefault();
  let tempElement = document.querySelector("#temp");
 let temp = tempElement.innerHTML;
temp = Number(celsiusTemp);
tempElement.innerHTML = Math.round(temp * 1.8 + 32);
}

function showWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
   wind = Math.round(wind);
   console.log(response.data);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = celsiusTemp;
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

let celsiusTemp = null;

let currentDayTime = document.querySelector("h3");
currentDayTime.innerHTML = formatDate(new Date());
console.log(formatDate(new Date()));

let enteredCity = document.querySelector("#city-search-form");
enteredCity.addEventListener("submit", changeCity);

let tempUnitC = document.querySelector("#c");
tempUnitC.addEventListener("click", changeToC);

let tempUnitF = document.querySelector("#f");
tempUnitF.addEventListener("click", changeToF);

let currentLocationButton = document.querySelector("#current-loc-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemp);

