// API key
var key = "1b2c2d3d7a616e00185ed07b2d85689e";

// DOM elements to display on page 
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentWeather = document.querySelector("#current-weather");
var previousCityEl = document.getElementById("search-container");
var fiveDayEl = document.querySelector("#forecast-cards");
var currentUvEl = document.querySelector("#uv-input")

var storedCity = [];

// requesting Current Weather API
var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    // if response was successful 
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCityWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })

}

// requesting UV index API 
var searchCityUV = function(lon, lat, city) {
    var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                displayCurrentUv(lon, lat, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
        })
        
        // if network error 
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
    })
};


// Displaying current weather data 
var displayCityWeather = function(city, searchTerm) {
    // clear old content 
    cityContainerEl.textContent = '';
    citySearchTerm.textContent = searchTerm;

    var displayCurrentDate = document.querySelector("#city-current-date");
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(L)");

    // weather icon 
    var displayIcon = document.querySelector("#city-current-icon");
    var currentIcon = "http://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"
    displayIcon.setAttribute ("src", currentIcon);

    // temperature 
    var displayTemp = document.querySelector("#temp-input");
    var currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    // humidity
    var displayHumidity = document.querySelector("#humidity-input");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 

    // wind speed 
    var displayWind = document.querySelector("#wind-input");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

     // for uv index 
     var lon = city.coord.lon; 
     var lat = city.coord.lat; 
 
     searchCityUV(lon, lat, city);

};

// display UV
var displayCurrentUv = function(data) {
    var uv = data.value;
        if (uv >= 6) {
            currentUvEl.classList="badge badge-danger"
            currentUvEl.innerHTML=" " + uv + " ";
        } else if (uv > 3 ) {
            currentUvEl.classList="badge badge-warning"
            currentUvEl.innerHTML=" " + uv + " ";
        } else {
            currentUvEl.classList="badge badge-success"
            currentUvEl.innerHTML=" " + uv + " ";
        }
};

   
// 5 day forecast API 
var getForecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + key;

    // if response was successful 
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

// Displaying 5 day forecast   
var displayForecast = function (list) { 
    console.log(list);

        for (var i = 0; i <= 4; i++) {

        //date
        var displayDate1 = document.querySelector("#date-0");
        var forecastDate1 = moment().add(1, "days").format("L");
        displayDate1.textContent = forecastDate1;

        var displayDate2 = document.querySelector("#date-1");
        var forecastDate2 = moment().add(2, "days").format("L");
        displayDate2.textContent = forecastDate2;

        var displayDate3 = document.querySelector("#date-2");
        var forecastDate3 = moment().add(3, "days").format("L");
        displayDate3.textContent = forecastDate3;

        var displayDate4 = document.querySelector("#date-3");
        var forecastDate4 = moment().add(4, "days").format("L");
        displayDate4.textContent = forecastDate4;

        var displayDate5 = document.querySelector("#date-4");
        var forecastDate5 = moment().add(5, "days").format("L");
        displayDate5.textContent = forecastDate5;

        // temp
        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = list[i].main.temp + " °F";
        displayTemp.textContent = forecastTemp; 

        //humidity
        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = list[i].main.humidity + "%";
        displayHumidity.textContent = forecastHumidity;
        
        // weather icons 
        var displayIcon1 = document.querySelector("#city-icon-1");
        var currentIcon1 = "http://openweathermap.org/img/wn/" + list[1].weather[0].icon + "@2x.png"
        displayIcon1.setAttribute ("src", currentIcon1);

        var displayIcon2 = document.querySelector("#city-icon-2");
        var currentIcon2 = "http://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        displayIcon2.setAttribute ("src", currentIcon2);

        var displayIcon3 = document.querySelector("#city-icon-3");
        var currentIcon3 = "http://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        displayIcon3.setAttribute ("src", currentIcon3);

        var displayIcon4 = document.querySelector("#city-icon-4");
        var currentIcon4 = "http://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        displayIcon4.setAttribute ("src", currentIcon4);

        var displayIcon5 = document.querySelector("#city-icon-5");
        var currentIcon5 = "http://openweathermap.org/img/wn/" + list[5].weather[0].icon  + "@2x.png"
        displayIcon5.setAttribute ("src", currentIcon5);

        }
}; 

// save searches to local storage 
var saveCitySearch = function (city) {
    var cityEl = document.createElement("li");
    cityEl.innerText = city;
    cityEl.classList = "list-group-item";
    previousCityEl.appendChild(cityEl);

    storedCity.push(city);

    localStorage.setItem("city", json.stringify(storedCity));
}

// //  get items in local storage
var loadCity = function () {
    var storedCityName = localStorage.getItem('city');
    
    if(!storedCityName) {
        return false; 
    };

    storedCity = json.parse(storedCityName);

    for (i = 0; i < storedCity.length; i++) {
        var cityEl = document.createElement("li")
        cityEl.innerText = storedCity[i];
        cityEl.classList = "list-group-item";
        previousCityEl.appendChild(cityEl);
        
    }
};

// search city form submission 
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        getForecast(city);
        cityInputEl.value = "";
     } else {
        alert("Please enter a City name");
    }
};

// // clicking on previous searched city
var historyHandler = function (event) {
    event.preventDefault();

    var city = even.target.innerHTML;
    localStorage.getItem(city);


    getCityWeather(city);
    getForecast(city);
};

// // click on previously searched city 
previousCityEl.addEventListener("click", historyHandler);

// search button 
userFormEl.addEventListener("submit", formSubmitHandler);


