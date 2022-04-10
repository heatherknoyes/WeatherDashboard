# Weather Dashboard

## Description

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

The motivation for this project was to create a calendar that the user can edit and see the current time of day along with events that they have saved. By using jQuery, external APIs, HTML, CSS, and JavaScript I was able to create a dynamic one screen calendar that the user can interact with. I learned how to utilize dynamic HTML elements with jQuery and Javascript and used the users local storage in order to save and delete events without the defaulting the text of the screen for a single instance. The thing I am most proud of with this project is that I was able to implement a delete button to make the UI more user friendly even though it wasn't a part of the requirements. With the completion of this project I fulfilled the following user story and acceptance criteria.

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

This project taught me how to utilize jQuery instead of vanilla JavaScript as well as other APIs like Moment.js in order to manipulate time. In the future, I would like to try to put a dynamic section where the user is able to input what their times for their calendar should be. I would add a submit button as the trigger for a new calendar creation and would try to keep the same events that had already been saved. I also want to try to be able to incorporate a click off functionality so that the event clears out unless you hit the save button.

## Installation

1. Download all files within the main directory as well as the assets directory to your device.

2. Open the index.html file in your browser to view the website.

3. If future edits need to be made then the stylesheet can be found under ./assets/css/style.css. The JavaScript can be found under the ./assets/js/script.js.

## Usage

The following image shows the web application's appearance in a gif:

![The weather webpage functionality in a GIF.](./assets/images/WorkDaySchedulerGIF.gif)

You can view the deployed application here: https://heatherknoyes.github.io/WorkDayScheduler/

## License

No license.
