
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
let key = "9afc5146bea2t731f3ee989f0a290f4o";
let demoApi = `https://api.shecodes.io/weather/v1/current?query=Paris&key=${key}&units=imperial`;
let demourl = `https://api.shecodes.io/weather/v1/forecast?query=Paris&key=${key}&units=imperial`;
axios.get(demourl).then(displayForeCast);
axios.get(demoApi).then(displayWeather);

// function displaydemoWeather(response){
//   let demoCity = document.querySelector("#current-city").innerHTML = response.data.city;
//     document.querySelector("#main-temp").innerHTML = Math.round(
//       response.data.temperature.current
//     );
//     document.querySelector(
//       "#Humidity"
//     ).innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
//     document.querySelector(
//       "#Wind"
//     ).innerHTML = `Wind: ${response.data.wind.speed} mph`;
//     document.querySelector(
//       "#main-Forecast"
//     ).innerHTML = `${response.data.condition.description}`;
//     document.querySelector(
//       "#main-icon"
//     ).innerHTML = `<img src="${response.data.condition.icon_url}" class = "weatherIcon"/>`;



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
function formatDay(timestamp){
  let newDate = new Date(timestamp * 1000)
  let cutDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri","Sat"];
  

  return cutDays[newDate.getDay()];
}
function searchCityName(event) {
  event.preventDefault();
  let key = "9afc5146bea2t731f3ee989f0a290f4o";
  let query = document.querySelector("#search-bar").value;
  // let cityElemet = document.querySelector("#current-city")
  // cityElemet = query



  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${key}&units=imperial`;
  axios.get(apiUrl).then(displayForeCast);
  let cityurl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=imperial`;
  axios.get(cityurl).then(displayWeather);
  // document.querySelector("#search-bar").attr('placeholder','Start typing to find answers!');

  
}
function displayWeather(response){
  // console.log(response.data)
  document.querySelector("#main-temp").innerHTML = Math.round(response.data.temperature.current);
  // console.log(response.data.temperature.current);
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#Humidity").innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  document.querySelector("#Wind").innerHTML = `Wind: ${response.data.wind.speed} mph`;
  document.querySelector("#main-Forecast").innerHTML = `${response.data.condition.description}`;
  document.querySelector("#main-icon").innerHTML = `<img src="${response.data.condition.icon_url}" class = "weatherIcon"/>`;
  // document.querySelector("#search-bar")= "Enter a city...";
  

}
function displayForeCast(Response){
  console.log(Response.data);

  let cutDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";
  document.querySelector("#first-day").innerHTML= `${cutDays[day]}`;
  Response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
              <div class="week-forecast">
              <div class="weather-forecast-day">${formatDay(day.time)} </div>
              <div class="weatherforecast-icon"> 
              <img src="${day.condition.icon_url}"/>
              </div>
              <div class = max-minus-temp>
                <div class="weatherforecast-temeprature"> 
                <stong> ${Math.round(day.temperature.maximum)} </stong></div>
                <div class="weatherforecast-temeprature">|${Math.round(
                  day.temperature.minimum
                )}</div> 
              </div> 
              </div>
              `;
    }
  });
  let forecastElement = document.querySelector("#week-forecast");
  forecastElement.innerHTML = forecastHtml;
}


let form = document.querySelector(".search-form");

form.addEventListener("submit", searchCityName);


displayForeCast();
