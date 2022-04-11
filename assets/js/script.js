//https://openweathermap.org/api/one-call-api
var defaultCity = "New York";
var APIKey = config.API_KEY;

function init() {
  populateStateCodes();
  displayLastSearch();
}

// need to use event delegation in order to populate the search bar with the button text of the element that the user picks
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var citySearch = $("#cityChoice");
  if (citySearch.val()) {
    var citySearchArray = JSON.parse(localStorage.getItem("citySearch"));
    if (!citySearchArray) {
      citySearchArray = [citySearch.val()];
      localStorage.setItem("citySearch", JSON.stringify(citySearchArray));
    }
    if (!citySearchArray.includes(citySearch.val())) {
      if (citySearchArray.length == 10) {
        citySearchArray.pop();
      }
      citySearchArray.unshift(citySearch.val());
    }
    populatePastSearchCities(citySearchArray);
    getCityData(citySearch.val());
  }
  $("#cityChoice").val("");
});

/* Using event delegation to populate the call with the prior buttons */
$(".previousSearches").on("click", function (event) {
  event.preventDefault();
  citySearch = $(event.target).text().trim();
  getCityData(citySearch);
});

function populatePastSearchCities(citySearchArray) {
  $(".previousSearches").html("");
  localStorage.setItem("citySearch", JSON.stringify(citySearchArray));
  citySearchArray.forEach(function (city) {
    var cityBtnEl =
      $(`<button type="submit" class="btn btn-primary btn-block" id="cityBtn">
        ${city}
      </button>`);
    $(".previousSearches").append(cityBtnEl);
  });
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

/* Displays the last item searched from the array */
function displayLastSearch() {
  $(".previousSearches").html("");
  citySearchArray = JSON.parse(localStorage.getItem("citySearch"));

  if (citySearchArray) {
    populatePastSearchCities(citySearchArray);
    getCityData(citySearchArray[0]);
  } else {
    getCityData(defaultCity);
  }
}

function getCityData(citySearch) {
  //   `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch},{state code},{country code}&limit=1&appid=${APIKey}`

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${APIKey}`
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

        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        $(`#wicon${i}`).attr("src", iconurl);
      });
    });
}

/* Colors the UV Index in green, yellow, orange, and red tones */
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

init();
