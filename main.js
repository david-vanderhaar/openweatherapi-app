

console.log("working");

//input form
var zipInput = document.getElementById('zipInput');
//var weatherButton = document.getElementById('weatherButton');

var output = document.getElementById('output');
var error = document.getElementById('error');

//html 'output' elements
var city = document.getElementById('city');
var conditions = document.getElementById('conditions');
var conditionImg = document.getElementById('conditionImg');
// var tempK = document.getElementById('tempK');
// var tempC = document.getElementById('tempC');
var tempF = document.getElementById('tempF');
var tempHi = document.getElementById('tempHi');
var tempLo = document.getElementById('tempLo');
// var seasonImg = document.getElementById('seasonImg');
var errorMsg = document.getElementById('errorMsg');

document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        // $(".example7").colorbox({iframe:true, innerWidth:600, innerHeight:600});
       // weatherButton.onclick = getWeather;
        zipInput.onkeypress = pressEnterOnZipInput;
        //zipInput field will autofocus on load
        zipInput.focus();
    }
};



function test() {
    console.log("zipcode");
}

//Contact openWeather API
function getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=522f247f3865d994e8d30161d680514e"
    url = url.replace("<zipCode>", zipInput.value);
    console.log(url);
    apiRequest = new XMLHttpRequest();
    apiRequest.onload = catchResponse;
    apiRequest.onerror = httpRequestOnError;
    apiRequest.open('get', url, true);
    apiRequest.send();

}

//If we succesfully contacted openWeather API
function catchResponse() {
    console.log('getWeather succeeded');
    console.dir(apiRequest);
    if (apiRequest.statusText == 'OK') {
        console.log('Good request');
        //look into JSON info
        parseResponse(JSON.parse(apiRequest.response));

        //toggle display of weather info and error
        // output.style.display = 'block';
        error.style.display = 'none';

    } else {

        //toggle display of weather info and error
        console.log('Bad Request');
        error.style.display = 'block';
        error.innerHTML = apiRequest.statusText;
        // output.style.display = 'none';

    }
}

//Allows script to sift through API JSON data
function parseResponse(result) {
    console.dir(result);

    //Fill in Contents of DOM elements with API data
    city.innerHTML = result.name;
    conditions.innerHTML = result.weather[0].description;
    displayConditionImg(result.weather[0].description);
    // tempK.innerHTML = result.main.temp;
    // tempC.innerHTML = convertKtoC(result.main.temp);
    tempF.innerHTML = convertKtoF(result.main.temp);
    tempLo.innerHTML = 'Lo: ' + convertKtoF(result.main.temp_min);
    tempHi.innerHTML = 'Hi: ' + convertKtoF(result.main.temp_max);
    // displaySeasonImage(convertKtoF(result.main.temp));

}

//Converts temp Kelvin to temp Celsius
function convertKtoC(kelvin) {
    return Math.round(kelvin - 273.15);
}

//Converts temp Kelvin to temp Fahrenheit
function convertKtoF(kelvin) {
    return Math.round(((kelvin * 9) / 5) - 459.67);
}

//Controls Seasonal Image Display
function displaySeasonImage(fahr) {
    switch (true) {
        case fahr > 78:
            //Hot
            conditionImg.src = 'https://68.media.tumblr.com/2579413bdc64f863116662b4f9b3acf3/tumblr_mwan6qdS951qc2zhlo1_250.gif';
        break;
        case fahr <= 78 && fahr >= 65:
            //Mild
        break;
        case fahr < 65 && fahr >= 50:
            //Cool
        break;
        case fahr < 50:
            //Cold
        break;      
    }
}

function displayConditionImg(cond) {
    switch (true) {
        case cond.includes('clear'):
            conditionImg.src = 'images/weatherIcons/animated/day.svg';
        break;
        case cond == 'few clouds':
            conditionImg.src = 'images/weatherIcons/animated/cloudy-day.svg';
        break;
        case cond.includes('clouds'):
            conditionImg.src = 'images/weatherIcons/animated/cloudy.svg';
        break;
        case cond == 'showered rain':
            conditionImg.src = 'images/weatherIcons/animated/rainy-2.svg';
        break;
        case cond.includes('rain'):
            conditionImg.src = 'images/weatherIcons/animated/rainy-5.svg';
        break;
        case cond.includes( 'thunderstorm'):
            conditionImg.src = 'images/weatherIcons/animated/thunder.svg';
        break;
        case cond.includes('snow'):
            conditionImg.src = 'images/weatherIcons/animated/snowy-5.svg';
        break;
    }
}

//Allows user to hit enter key to get weather
function pressEnterOnZipInput(e) {
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that rusn
        getWeather();
    }
}

function httpRequestOnError() {
    console.log('getWeather failed');
    error.style.display = 'block';
    error.innerHTML = 'Weather Data Not Currently Available';

}
