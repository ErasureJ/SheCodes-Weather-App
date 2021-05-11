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
 let temp = tempElement.innerHTML;
temp = Number(temp);
 tempElement.innerHTML = Math.round((temp - 32) / 1.8);

}

function changeToF(event){
event.preventDefault();
  let tempElement = document.querySelector("#temp");
 let temp = tempElement.innerHTML;
temp = Number(temp);
tempElement.innerHTML = Math.round(temp * 1.8 + 32);
}

function showWeather(response) {
  let temp = response.data.main.temp;
  temp = Math.round(temp);
 let wind = response.data.wind.speed;
   wind = Math.round(wind);
   console.log(wind);
  // let precipitation = response.data.wind.speed;
    //precipitation = Math.round(precipitation);

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = temp;
  console.log(response.data);
 let windElement = document.querySelector("#wind");
windElement.innerHTML = wind;
let newCity = response.data.name;
  let displayedCity = document.querySelector("#entered-city");
  displayedCity.innerHTML = `Currently: <strong>${newCity}</strong>`;

 // let precipitationElement = document.querySelector("#precipitation");
//precipitationElement.innerHTML = precipitation;
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