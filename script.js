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

      const fiveDayResponse = await fetch(
        `api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`
      );
  
      const data = await response.json();
  
      console.log(data);
  
      return data;
    }
  }

  // class Fetch {
  //   async getCurrent(input) {
  //     // const myKey = "d65886cf52c458b65f7f5a093e229f6b";
  
  //     //request to url
  
  //     const fiveDayResponse = await fetch(
  //       `api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`
  //     );
  
  //     const fiveDayData = await fiveDayResponse.json();
  
  //     console.log(data);
  
  //     return fiveDayData;
  //   }
  // }

  var currentDate = moment().format("dddd MMM Do YYYY, h:mm a ");
$("#currentDay").append(currentDate);

  class UI {
    constructor() {
      this.uiContainer = document.getElementById("content");
      this.city;
      this.defaultCity = "London";
    }
  
    populateUI(data) {
      //de-structure vars
  
      //add them to inner HTML
  
      this.uiContainer.innerHTML = `
          
          <div class="card mx-auto mt-5" style="width: 18rem;">
              <div class="card-body justify-content-center">
                  <h5 class="card-title">${data.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
                  <p class="card-text ">Weather conditions: ${data.weather[0].description}</p>
                  <p class="card-text ">Wind Speed: ${data.wind.speed} MPH</p>
                  <p class="card-text ">Humidity: ${data.main.humidity} %</p>
                  
              </div>
          </div>

          <div class="card mx-auto mt-5" style="width: 18rem;">
              <div class="card-body justify-content-center">
                  <h5 class="card-title">${data.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
                  <p class="card-text ">Weather conditions: ${data.weather[0].description}</p>
                  <p class="card-text ">Wind Speed: ${data.wind.speed} MPH</p>
                  <p class="card-text ">Humidity: ${data.main.humidity} %</p>
                  
              </div>
          </div>
          
          
          `;
    }
  
    clearUI() {
      uiContainer.innerHTML = "";
    }
  
    saveToLS(data) {
      localStorage.setItem("city", JSON.stringify(data));
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
