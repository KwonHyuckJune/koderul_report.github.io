
const weather = document.querySelector('.js-weather');
const API_KEY = '4bd35b68bac384269eaf781137c10cba';

function getLocation(){
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
}

function saveGeoLocation(location){
    localStorage.setItem('geoLocation', JSON.stringify(location));
}

function successLocation(location){
    const coords = location.coords;
    const geoLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude
    }

    saveGeoLocation(geoLocation);
    getWeather(coords.latitude, coords.longitude);
}

function errorLocation(error){
    console.log(error);
}

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        const cityName = result.name;
        const temperature = result.main.temp;

        weather.innerHTML = `
            <p>now temperature : ${temperature}</p>
            <p>current your location : ${cityName}</p>
        `
    })
}

function geoLocationInit(){
    const savedGeo = localStorage.getItem('geoLocation');

    if(savedGeo === null){
        getLocation();
    }
    else{
        const coords = JSON.parse(savedGeo);

        getWeather(coords.latitude, coords.longitude);
    }
}

geoLocationInit();