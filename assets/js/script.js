//https://openweathermap.org/api/one-call-api
//https://openweathermap.org/api/one-call-api
var citySearch = $("#cityChoice");
var citySearchBtn = $("#submitBtn");
var APIKey = config.API_KEY;

//https://api.openweathermap.org/data/2.5/weather?q={citySearch}&appid={APIKey}

citySearchBtn.on("click", function (event) {
  event.preventDefault();
  if (citySearch.val()) {
    populateTodayData(citySearch.val());
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
  populateTodayData(citySearch);
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
      console.log(data);
    });
}

init();
