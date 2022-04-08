//https://openweathermap.org/api/one-call-api
var citySearch = $("#cityChoice");
var citySearchBtn = $("#submitBtn");
var defaultCity = "Atlanta";
var APIKey = config.API_KEY;

// need to use event delegation in order to populate the search bar with the button text of the element that the user picks
citySearchBtn.on("click", function (event) {
  event.preventDefault();
  // Here I need to make sure that the first city I press that the button shows up
  if (citySearch.val()) {
    var citySearchArray = JSON.parse(localStorage.getItem("citySearch"));
    if (!citySearchArray) {
      citySearchArray = [citySearch.val()];
      localStorage.setItem("citySearch", JSON.stringify(citySearchArray));
    }
    if (!citySearchArray.includes(citySearch.val())) {
      citySearchArray.push(citySearch.val());
      localStorage.setItem("citySearch", JSON.stringify(citySearchArray));
      var cityBtnEl =
        $(`<button type="submit" class="btn btn-primary btn-block" id="cityBtn">
        ${citySearch.val()}
      </button>`);
      $(".previousSearches").append(cityBtnEl);
    }
    getCityData(citySearch.val());
  }
  // else {
  //   getCityData(defaultCity);
  // }
});

function init() {
  populateStateCodes();
  // Probably would save the last search in order to populate to the screen
  displayLastSearch();
}

function populateStateCodes() {
  var stateCodes = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  stateCodes.forEach(function (stateCode) {
    $("#stateCodeList").append(
      `<option value="${stateCode}">${stateCode}</option>`
    );
  });
}

function displayLastSearch() {
  $(".previousSearches").html("");
  citySearchArray = JSON.parse(localStorage.getItem("citySearch"));

  if (citySearchArray) {
    citySearchArray.forEach(function (city) {
      var cityBtnEl =
        $(`<button type="submit" class="btn btn-primary btn-block cityBtn">
      ${city}
    </button>`);
      $(".previousSearches").append(cityBtnEl);
    });
    getCityData(citySearchArray[citySearchArray.length - 1]);
  } else {
    getCityData(defaultCity);
  }
}

function getCityData(citySearch) {
  //   `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch},{state code},{country code}&limit=1&appid=${APIKey}`

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${APIKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      oneCallData(citySearch, data[0].lat, data[0].lon);
    });
}

function oneCallData(citySearch, lat, lon) {
  $("#today").html("");
  $("#futurecast").html("");
  var today = moment().local().format("MM/DD/YYYY");
  // localStorage.setItem("citySearch", citySearch);

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${APIKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.daily.forEach(function (day, i) {
        var iconcode = day.weather[0].icon;

        if (i === 0) {
          // populate the today element
          $("#today").html(
            `<h1>${citySearch} (${today}) <span id="icon"><img id="wicon${i}" src="" alt="Weather icon"></span></h1>
            <h3>Temp: ${data.current.temp}\u00B0F</h3>
            <h3>Wind: ${data.current.wind_speed} MPH</h3>
            <h3>Humidity: ${data.current.humidity} %</h3>
            <h3>UV Index: <span id="uvi">${data.current.uvi}</span></h3>`
          );
          colorUVIBox(data.current.uvi);
        } else if (i < 6) {
          iconcode = day.weather[0].icon;
          var dateString = moment.unix(day.dt).format("MM/DD/YYYY");
          var dayEl = $(`<div class="card bg-dark text-light">
          <h3>${dateString}</h3>
          <h4><span id="icon"><img id="wicon${i}" src="" alt="Weather icon"></span></h4>
          <h4>High: ${day.temp.max}\u00B0F</h4>
          <h4>Low: ${day.temp.min}\u00B0F</h4>
          <h4>Wind: ${day.wind_speed} MPH</h4>
          <h4>Humidity: ${day.humidity} %</h4>
        </div>`);

          $("#futurecast").append(dayEl);
        }

        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(`#wicon${i}`).attr("src", iconurl);
      });
    });
}

function colorUVIBox(uvi) {
  if (uvi <= 3) {
    $("#uvi").css("background-color", "green");
  } else if (uvi > 3 && uvi <= 6) {
    $("#uvi").css("background-color", "yellow");
  } else if (uvi > 6 && uvi <= 8) {
    $("#uvi").css("background-color", "orange");
  } else {
    $("#uvi").css("background-color", "red");
  }
}

// function populateTodayData(citySearch) {
//   // localStorage.setItem("citySearch", citySearch);

//   // fetch the result from the API to fill today's data
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${APIKey}&units=imperial`,
//     {
//       // The browser fetches the resource from the remote server without first looking in the cache.
//       // The browser will then update the cache with the downloaded resource.
//       cache: "reload",
//     }
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // populate the today element
//       oneCallData(citySearch, data.coord.lat, data.coord.lon);
//     });
// }

init();
