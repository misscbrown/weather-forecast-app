# weather-forecast-app
An app that forecasts the weather
GIVEN a weather dashboard with form inputs

The dashboard allows a user to search for a city or country and get the weather details. 

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

Each search is recorded and stored in local storage. Users are able to view current conditions for each city. 

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

A card appears on the page which includes city name, the date, an image that represents the weather, the temperatur in degrees celsius, humidity, wind speed and the UV index. A colour appears that represents the conditions, allowing users to easily take in information.


WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

The 5 day forecast is displayed on cards, on the page, including temperature, wind speed, humidity, time and date. The time and date was added using moments. 

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

The search history is displayed in local storage but not on the page. 

This weather app was created using javascript, bootstrap with a bootswatch theme, jquery and html. 

View deployment here: https://misscbrown.github.io/weather-forecast-app/

Contact: djmisscbrown@hotmail.com

![screenshot](/Images/screenshot1.png)
![screenshot](/Images/screenshot2.png)
