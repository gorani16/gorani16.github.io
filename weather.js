const weatherstate = document.querySelector(".js-weather");
const API_KEY = "7023f25c75df8c5f86f718dec139022a";
const COORDS = 'COORDS';

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        const wheater = json.weather[0].main;
        weatherstate.innerText = `지역 : ${place} 
                                    현재 기온 : ${temperature}°C 
                                    날씨 : ${wheater}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position);  // 현재 위치의 모든 정보(coords)
    // console.log(position.coords.latitude);  // 위도 정보
    // console.log(position.coords.longitude); // 경도 정보
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        //console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoord();
}

init();
