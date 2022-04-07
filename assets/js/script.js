//https://openweathermap.org/api/one-call-api
var citySearch = $("#cityChoice");
var citySearchBtn = $("#submitBtn");
var APIKey = config.API_KEY;

//https://api.openweathermap.org/data/2.5/weather?q={citySearch}&appid={APIKey}

citySearchBtn.on("click", function (event) {
  event.preventDefault();
  if (citySearch.val()) {
    getCityData(citySearch.val());
  }
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
  if (localStorage.getItem("citySearch")) {
    var citySearch = localStorage.getItem("citySearch");
  } else {
    var citySearch = "Atlanta";
    localStorage.setItem("citySearch", citySearch);
  }
  // populateTodayData(citySearch);
  getCityData(citySearch);
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
      console.log(data);
      oneCallData(citySearch, data[0].lat, data[0].lon);
    });
}

function oneCallData(citySearch, lat, lon) {
  $("#today").html("");
  $("#futurecast").html("");
  var today = moment().local().format("MM/DD/YYYY");
  localStorage.setItem("citySearch", citySearch);

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${APIKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //console.log(data.daily[0]);
      data.daily.forEach(function (day, i) {
        var iconcode = day.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        if (i === 0) {
          // populate the today element
          $("#today").html(
            `<h1>${citySearch} (${today}) <span id="icon"><img id="wicon" src="" alt="Weather icon"></span></h1>
            <h3>Temp: ${data.current.temp}\u00B0F</h3>
            <h3>Wind: ${data.current.wind_speed} MPH</h3>
            <h3>Humidity: ${data.current.humidity} %</h3>
            <h3>UV Index: ${data.current.uvi}</h3>`
          );
        } else if (i < 6) {
          var dateString = moment.unix(day.dt).format("MM/DD/YYYY");
          console.log(day);
          var dayEl = $(`<div class="card bg-dark text-light">
          <h3>${dateString}</h3>
          <h4><span id="icon"><img id="wicon" src="" alt="Weather icon"></span></h4>
          <h4>Temp: XX</h4>
          <h4>Wind: ${day.wind_speed} MPH</h4>
          <h4>Humidity: ${day.humidity} %</h4>
        </div>`);

          $("#futurecast").append(dayEl);
        }
        $("#wicon").attr("src", iconurl);
      });
    });
}

function populateTodayData(citySearch) {
  $("#today").html("");
  var today = moment().local().format("MM/DD/YYYY");
  localStorage.setItem("citySearch", citySearch);

  // fetch the result from the API to fill today's data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${APIKey}&units=imperial`,
    {
      // The browser fetches the resource from the remote server without first looking in the cache.
      // The browser will then update the cache with the downloaded resource.
      cache: "reload",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // populate the today element
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $("#today").html(
        `<h1>${citySearch} (${today}) <span id="icon"><img id="wicon" src="" alt="Weather icon"></span></h1>
        <h3>Temp: ${data.main.temp}\u00B0F</h3>
        <h3>Wind: ${data.wind.speed} MPH</h3>
        <h3>Humidity: ${data.main.humidity} %</h3>
        <h3>UV Index: Variable UV Index with Color Here</h3>`
      );
      $("#wicon").attr("src", iconurl);
      // console.log(data);
      oneCallData(citySearch, data.coord.lat, data.coord.lon);
    });
}

// function populateFiveDaysData(citySearch, lat, lon) {
//   // fetch the result from the API to fill today's data
//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`,
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
//       // var iconcode = data.weather[0].icon;
//       // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//       // $("#today").html(
//       //   `<h1>${citySearch} (${today}) <span id="icon"><img id="wicon" src="" alt="Weather icon"></span></h1>
//       //   <h3>Temp: ${data.main.temp}\u00B0F</h3>
//       //   <h3>Wind: ${data.wind.speed} MPH</h3>
//       //   <h3>Humidity: ${data.main.humidity} %</h3>
//       //   <h3>UV Index: Variable UV Index with Color Here</h3>`
//       // );
//       // $("#wicon").attr("src", iconurl);
//       console.log(data);
//     });
// }

init();
