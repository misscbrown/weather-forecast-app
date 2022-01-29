const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
const btn = document.getElementById("previousbtn");
let currentWeatherEl = document.getElementById("current");
let futureWeatherEl = document.getElementById("forecast");
const myKey = "d65886cf52c458b65f7f5a093e229f6b";
const previousSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

//Sets the date and time 
var currentDate = moment().format("dddd MMM Do YYYY, h:mm a ");
$("#currentDay").append(currentDate);

//Pulls current weather data from API and saves to local storage
function getCurrentSearchCoords(input) {

previousSearchHistory.push(input);
localStorage.setItem("search-history", JSON.stringify(previousSearchHistory))
createSearchHistoryButtons();


  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      getCurrentAndForecast(latitude, longitude, input);
    });
}

//Pulls data to create 5 day forecast 
function getCurrentAndForecast(lat, lon, input) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${myKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("One Call API", data);
      createCurrentWeatherUI(data.current, input);
      createFiveDayForecastUI(data.daily);
    });
}

//Shows the UV of each location
function createCurrentWeatherUI(currentWeather, input) {

  var uvButton; 
  if (currentWeather.uvi < 3){
    uvButton = ' btn-success'
   } else if(currentWeather.uvi > 3) {
     uvButton = 'btm-warning';
     } else {currentWeather.uvi > 6 
      uvButton = 'btn-danger';
    }

  //Card for displaying current weather with UV button, card is created dynamically
  currentWeatherEl.innerHTML = `
    <div class="card mx-auto mt-5" style="width: 18rem;">
        <div class="card-body justify-content-center">
            <h5 class="card-title">${input}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Temp: ${currentWeather.temp}</h6>
            <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png">
            <p class="card-text ">Wind Speed: ${currentWeather.wind_speed} MPH</p>
          <p class="card-text ">Humidity: ${currentWeather.humidity} %</p>
          <button class=${uvButton}>UV: ${currentWeather.uvi}<button/>
        </div>
    </div>`;
}

//Cards for displaying 5 day forecast, for loop limits results to 5
function createFiveDayForecastUI(forecast) {
  futureWeatherEl.innerHTML = ''
  console.log(forecast);
  for (var i = 0; i < 5; i++) {
    var forecastDate = moment().add(i + 1, 'days')
    var forecastCard = document.createElement("div");
    forecastCard.setAttribute("class", "col-lg-2");
    forecastCard.innerHTML = `
    <div class="card mx-auto mt-5">
    <div class="card-body justify-content-center">
    <h6 class="card-subtitle mb-2 text-muted">${forecastDate}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Temp: ${forecast[i].temp.day}</h6>
        <img src="http://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png">
        <p class="card-text ">Wind Speed: ${forecast[i].wind_speed} MPH</p>
      <p class="card-text ">Humidity: ${forecast[i].humidity} %</p>
    </div>
</div>`;

    futureWeatherEl.appendChild(forecastCard);
  }
}

//Creates search history buttons from local storage
function createSearchHistoryButtons(){
  console.log(previousSearchHistory)
  //use search history and render the buttons onto the page
}

//Activates search button, calls current weather, calls search history buttons
button.addEventListener("click", () => {
  const currentVal = search.value;


  getCurrentSearchCoords(currentVal);
});

createSearchHistoryButtons();