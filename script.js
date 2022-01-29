const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
const btn = document.getElementById("previousbtn");
let currentWeatherEl = document.getElementById("current");
let futureWeatherEl = document.getElementById("forecast");
      const myKey = "d65886cf52c458b65f7f5a093e229f6b";
const previousSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
  
var currentDate = moment().format("dddd MMM Do YYYY, h:mm a ");
$("#currentDay").append(currentDate);
  
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

function createCurrentWeatherUI(currentWeather, input) {
  
  var uvButton; 
  if (currentWeather.uvi < 3){
    uvButton = ' btn-success'
   } else if(currentWeather.uvi > 3) {
     uvButton = 'btm-warning';
     } else {currentWeather.uvi > 6 
      uvButton = 'btn-danger';
    }
  
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
  
    getFromLS() {
      if (localStorage.getItem("city" == null)) {
        return this.defaultCity;
      } else {
        this.city = JSON.parse(localStorage.getItem("city"));
      }
  
      return this.city;
    }
  
    clearLS() {
      localStorage.clear();
    }
  }

  //inst classes//

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});
