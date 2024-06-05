// state
let currCity = "Buenos Aires";
let units = "metric";

// Selectors
let ciudad = document.querySelector(".ciudad");
let fechaHora = document.querySelector(".fecha-hora");
let pronostico = document.querySelector('.pronostico');
let temperatura = document.querySelector(".temperatura");
let weatherIcon = document.querySelector(".weather-icon");
let temperaturaMinMax = document.querySelector(".temperatura-minmax")
let realFeel = document.querySelector('.realFeel');
let humedad = document.querySelector('.humedad');
let viento = document.querySelector('.viento');
let presion = document.querySelector('.presion');

// Buscador
document.querySelector(".weather-buscador").addEventListener('submit', e => {
    let search = document.querySelector(".weather-searchform");
    // prevenir la acción predeterminada
    e.preventDefault();
    // cambiar a la ciudad del search
    currCity = search.value;
    // obtener pronóstico del tiempo 
    getWeather();
    // limpiar el buscador
    search.value = ""
})

// Unidades de Temperatura
document.querySelector(".weather-unidad-celsius").addEventListener('click', () => {
    if (units !== "metric") {
        // cambiar a grados celcius
        units = "metric"
        // obtener pronóstico del tiempo 
        getWeather()
    }
})

document.querySelector(".weather-unidad-farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        // cambiar a grados farenheit
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

// Convertir la hora y la fecha segun pais
function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600; // convertir de segundos a horas 

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("es-AR", options)
}

// Tranformar el código de pais a un nombre
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["es"], { type: "region" });
    return regionNames.of(country)
}

function getWeather() {
    const API_KEY = '4aa34e71dfd307a64c916d9bd6e04e5f'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        ciudad.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        fechaHora.innerHTML = convertTimeStamp(data.dt, data.timezone);
        pronostico.innerHTML = `<p>${data.weather[0].main}`
        temperatura.innerHTML = `${data.main.temp.toFixed()}°`
        weatherIcon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
        temperaturaMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}°</p><p>Max: ${data.main.temp_max.toFixed()}°</p>`
        realFeel.innerHTML = `${data.main.feels_like.toFixed()}°`;
        humedad.innerHTML = `${data.main.humidity}%`
        viento.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
        presion.innerHTML = `${data.main.pressure} hPa`
    })
}

document.body.addEventListener('load', getWeather())