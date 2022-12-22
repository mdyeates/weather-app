getCurrentDay = () => {
  // Select the element with the class "today-date"
  var currentDayEl = $(".today-date");

  // Use moment.js to format the current date
  var currentDay = moment(new Date()).format("MMMM Do, YYYY");

  // Set the text of the element to the current day
  currentDayEl.text(currentDay);
};

displayWeather = (currentData, forecastData) => {
  // Select the element with the ID "today"
  var currentWeatherEl = $("#today");
  var currentWindSpeed = Math.round(currentData.wind.speed);
  var currentTemp = Math.round(currentData.main.temp);
  var currentHumidity = currentData.main.humidity;
  var currentDescription = currentData.weather[0].main;
  var cityName = $("h1");

  // Hide the element
  currentWeatherEl.hide();

  if (!currentData) {
    return currentWeatherEl.html(`<p class="no-search-text">Sorry, no cities were found matching your search.</p>`);
  }
  cityName.text(currentData.name);

  // Remove all existing content from the element
  currentWeatherEl.empty();
  // Append new content to the element
  currentWeatherEl.append(
    $(` 
              <div class="today-wind-wrapper text-center">
                <img class="icon" src="assets/icons/windy.png" alt="" />
                <p class="today-wind">${currentWindSpeed} mph</p>
              </div>
              <div class="icon-wrapper text-center">
                <img class="icon changingIcon" src="assets/icons/cloudy-partlysunny.png" alt="" />
                <p class="today-temp">${currentTemp}&#176;C</p>
                <p class="today-weather-desc">${currentDescription}</p>
              </div>
              <div class="today-humid-wrapper text-center">
                <img class="icon" src="assets/icons/rainy-cloudy.png" alt="" />
                <p class="today-humid">${currentHumidity}%</p>
              </div>`)
  );

  // Set the background color of the element
  currentWeatherEl.css("background-color", "var(--secondary)");

  // Animate the element to fade in
  animationEntrance(currentWeatherEl);
};

getWeatherData = () => {
  var apiKey = "a3a1179d4cb7b4ca24713bc14a6d33a2";
  var searchInput = $("#search-input");
  var baseURL = "https://api.openweathermap.org/data/2.5/";
  var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
  var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;

  var searchText = searchInput.val().trim();

  if (searchText) {
    // Get weather data from API
    $.get(currentURL + `q=${searchText}`).then(function (currentData) {
      displayWeather(currentData);
      createCustomIcons(currentData);

      //   $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`).then(function (forecastData) {
      //     displayWeather(forecastData);
      //   });
    });
  }
};

createCustomIcons = (currentData) => {
  var icon = currentData.weather[0].icon;
  var iconUrl;

  switch (icon) {
    case "01d":
      iconUrl = "assets/icons/clear-sky.png";
      break;
    case "02d":
      iconUrl = "assets/icons/few-clouds.png";
      break;
    case "03d":
      iconUrl = "assets/icons/scattered-clouds.png";
      break;
    case "04d":
      iconUrl = "assets/icons/broken-clouds.png";
      break;
    case "09d":
      iconUrl = "assets/icons/shower-rain.png";
      break;
    case "10d":
      iconUrl = "assets/icons/rain.png";
      break;
    case "11d":
      iconUrl = "assets/icons/thunderstorm.png";
      break;
    case "13d":
      iconUrl = "assets/icons/snow.png";
      break;
    case "50d":
      iconUrl = "assets/icons/mist.png";
      break;
    case "01n":
      iconUrl = "assets/icons/night-clear-sky.png";
      break;
    case "02n":
      iconUrl = "assets/icons/night-few-clouds.png";
      break;
    case "03n":
      iconUrl = "assets/icons/scattered-clouds.png";
      break;
    case "04n":
      iconUrl = "assets/icons/broken-clouds.png";
      break;
    case "09n":
      iconUrl = "assets/icons/night-rain.png";
      break;
    case "10n":
      iconUrl = "assets/icons/night-rain.png";
      break;
    case "11n":
      iconUrl = "assets/icons/thunderstorm.png";
      break;
    case "13n":
      iconUrl = "assets/icons/night-snow.png";
      break;
    case "50n":
      iconUrl = "assets/icons/night-mist.png";
      break;
    default:
      iconUrl = "assets.icons/sunrise.png";
  }

  var iconElement = $(".changingIcon");
  iconElement.attr("src", iconUrl);
};

animationEntrance = (element) => {
  element.fadeIn({
    duration: 1000,
    easing: "swing",
  });
};

init = () => {
  getCurrentDay();

  $("#search-button").click((event) => {
    event.preventDefault();
    getWeatherData();
  });
};

// Call the function to initialize the page
init();
