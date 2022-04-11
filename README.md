# Weather Dashboard

## Description

The motivation for this project was to create a dynamic webpage that would display weather information for a certain city. This weather information was received by implementing a server side third-party API the OpenWeather One Call API. The user should input a city into the search box which then should display the current information for that city as well as the information for the next five days for weather. By using jQuery, external APIs, HTML, CSS, and JavaScript I was able to create a small dynamic weather page that the user can interact with as well as utilize past searches without needing to input the city in the form field. I learned how to parse through a JSON response from a third-party API in order to create a novel web application with the data that was received. The thing I am most proud of with this project is that I was able to chain multiple API's to get the information needed to create the webpage. With the completion of this project I fulfilled the following user story and acceptance criteria.

### User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

This project taught me how to utilize API keys to get information from a third-party API instead of providing all of the information beforehand. In the future, I would like to try to make the search for the user more specific to include state and country. In addition, I would like to format the user's input so that it is in a standard format no matter what the user inputs into the form.

## Installation

1. Download all files within the main directory as well as the assets directory to your device.

2. Open the index.html file in your browser to view the website.

3. If future edits need to be made then the stylesheet can be found under ./assets/css/style.css. The JavaScript can be found under the ./assets/js/script.js.

## Usage

The following image shows the web application's appearance in a gif:

![The weather webpage functionality in a GIF.](./assets/images/WeatherDashboardGIF.gif)

You can view the deployed application here: https://heatherknoyes.github.io/WeatherDashboard/

## License

No license.
