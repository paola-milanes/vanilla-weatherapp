
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = document.querySelector("#current-date")
let now = new Date();
let moth = now.getMonth();
let day = now.getDay();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();


if(hour>10){
    currentDay.innerHTML = `${days[day]}, ${months[moth]} ${date}   0${hour}:${minutes}`;
}
if (minutes < 10) {
    currentDay.innerHTML = `${days[day]}, ${months[moth]} ${date}   ${hour}:0${minutes}`;
} else {

  currentDay.innerHTML = `${days[day]}, ${months[moth]} ${date} ${hour}:${minutes}`;
};
function showTemperature(Response){
    console.log(Response.data)
    document.querySelector("#current-city").innerHTML = Response.data.name;
    document.querySelector("#Humidity").innerHTML = `Humidity: ${Response.data.main.humidity} %`;
    document.querySelector("#Wind").innerHTML = `Wind: ${Response.data.wind.speed} mph`;
    document.querySelector("#main-temp").innerHTML = Math.round(Response.data.main.temp);
    document.querySelector("#Forecast").innerHTML =Response.data.weather[0].description;

}

function searchCityName(event) {
  event.preventDefault();
  console.log("hello")
  let apiKey = "68dec89f5577f56bb12d71530e92be60";
  let city = document.querySelector("#search-bar").value;
  console.log(city)
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector(".search-form");

form.addEventListener("submit", searchCityName);