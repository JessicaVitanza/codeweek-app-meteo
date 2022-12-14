//METODO GET
const GET = async (url) => {
    const res = await fetch(url);
    return await res.json();
};

// ------------------------------------ OROLOGIO ------------------------------------
function showDate() {
    let date = new Date();
    let d = date.getDate();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[date.getMonth()];
    let y = date.getFullYear();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = days[date.getDay()];
    let currentDate = document.querySelector("#date");
  
    currentDate.innerHTML = `${weekDay} ${d} ${m}, ${y} `;
  }
  
  function showTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    let clock = document.querySelector("#my-clock");
  
    clock.innerHTML = `${h}:${m}`;
    setTimeout(showTime, 1000);
  }
  
  showTime();
  showDate();

// ------------------------------------ SEARCH ------------------------------------
const body = document.querySelector("body");
const weatherForm = document.forms.weatherForm;
const element = weatherForm.elements;
const nameCity = document.querySelector(".nameCity");
const cityNotFound = document.querySelector(".citynotfound");

nameCity.value = "Milan"; 
let newCity = nameCity.value; 
let cityName = newCity.replace("Milan", () => { 
    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = nameCity.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=eb0503dcbfb49a890461f582cd52caa3`;

        fetch(url)
        .then((res) => res.json())
        .then((data) => editCard(data))

        console.log(cityName);
        cityNotFound.innerHTML = cityName;
    })
})
 


// ------------------------------------ CREO CARD CITTA' ATTUALE ------------------------------
const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity.value}&appid=eb0503dcbfb49a890461f582cd52caa3`;

fetch(url)
.then((res) => res.json())
.then((data) => editCard(data))

const editCard = (data) => {

    const weatherCity = document.querySelector(".weatherCity");
    const forecast = document.querySelector(".forecast");
    const city = document.querySelector(".city");
    const country = document.querySelector(".country");
    const weather = document.querySelector(".weather")
    const imgWeather = document.querySelector(".imgWeather");
    const grades = document.querySelector(".grades");
    const minGrades = document.querySelector(".minGrades");
    const maxGrades = document.querySelector(".maxGrades");
    const humidityVal = document.querySelector(".humidityVal");
    const pressureVal = document.querySelector(".pressureVal");
    const speedVal = document.querySelector(".speedVal");
    const modal = document.querySelector(".modal");
    const modalText = document.createElement("p");
    modalText.textContent = newCity;
    const closeModal = document.querySelector(".close-button");

    city.innerHTML = data.name;
    
// ------------------------------------ MODAL - CITTA' NON TROVATA ---------------------- 
    if(city.textContent != "undefined"){
        weatherCity.style="display:block";
        forecast.style="display:block";
        modal.style="display:none";
    } else {
        weatherCity.style="display:none";
        forecast.style="display:none";
        modal.style="display:block";
    }

    closeModal.addEventListener("click", (e) => 
        window.location.reload(modal.style="display:none")
    )
// --------------------------------------------------------------------------------------
    country.innerHTML = "(" + data.sys.country + ")";
    weather.innerHTML = data.weather[0].main;
    imgWeather.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    grades.innerHTML = "Temp. " + parseFloat(data.main.temp-273.15).toFixed(1) + "°";
    minGrades.innerHTML = parseFloat(data.main.temp_min-273.15).toFixed(1) + "°";
    maxGrades.innerHTML = parseFloat(data.main.temp_max-273.15).toFixed(1) + "°";
    humidityVal.innerHTML = data.main.humidity + " %";
    pressureVal.innerHTML = data.main.pressure;
    speedVal.innerHTML = data.wind.speed + " m/s";

// ------------------------------------ DAILY FORECAST ------------------------------------
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity.value}&appid=eb0503dcbfb49a890461f582cd52caa3`;
const containerForecast = document.querySelector(".containerForecast")

fetch(urlForecast)
.then((res) => res.json())
.then((data) => forecastCards(data)) 

const forecastCards = (data) => {

    for(let i = 0; i < 8; i++){

        const dayForecast = document.querySelector(".containerDayForecast");
        const dayHour = document.querySelector(".dayForecast");
        const imgForecast = document.querySelector(".imgDayForecast");
        const gradesForecast = document.querySelector(".gradesDayForecast");

        dayHour.innerHTML = data.list[i].dt_txt.substring(11,16)
        imgForecast.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
        gradesForecast.innerHTML = parseFloat(data.list[i].main.temp - 273.15).toFixed(1)  + "°";

        dayForecast.append(dayHour, imgForecast, gradesForecast);
        containerForecast.append(dayForecast);

    // ------------------------------------ CAMBIO ICONE -----------------------------
        function iconWeatherForecastDay(){
            if(data.list[i].weather[0].icon === "01d"){
                imgForecast.src = "./assets/icon_weather/01d.svg";
            }
            else if(data.list[i].weather[0].icon === "01n"){
                imgForecast.src = "./assets/icon_weather/01n.svg";
            }
            else if(data.list[i].weather[0].icon === "02d"){
                imgForecast.src = "./assets/icon_weather/02d.svg";
            }
            else if(data.list[i].weather[0].icon === "02n"){
                imgForecast.src = "./assets/icon_weather/02n.svg";
            }
            else if(data.list[i].weather[0].icon === "03d" || data.list[i].weather[0].icon === "03n"){
                imgForecast.src = "./assets/icon_weather/03d.svg";
            }
            else if(data.list[i].weather[0].icon === "04d" || data.list[i].weather[0].icon === "04n"){
                imgForecast.src = "./assets/icon_weather/04d.svg";
            }
            else if(data.list[i].weather[0].icon === "09d" || data.list[i].weather[0].icon === "09n"){
                imgForecast.src = "./assets/icon_weather/09d.svg";
            }
            else if(data.list[i].weather[0].icon === "10d"){
                imgForecast.src = "./assets/icon_weather/10d.svg";
            }
            else if(data.list[i].weather[0].icon === "10n"){
                imgForecast.src = "./assets/icon_weather/10n.svg";
            }
            else if(data.list[i].weather[0].icon === "11d" || data.list[i].weather[0].icon === "11n"){
                imgForecast.src = "./assets/icon_weather/11d.svg";
            }
            else if(data.list[i].weather[0].icon === "13d" || data.list[i].weather[0].icon === "13n"){
                imgForecast.src = "./assets/icon_weather/13d.svg";
            }
            else if(data.list[i].weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                imgForecast.src = "./assets/icon_weather/50d.svg";
            }
        } iconWeatherForecastDay()
        }
    }

    function iconWeather(){
        if(data.weather[0].icon === "01d"){
            imgWeather.src = "./assets/icon_weather/01d.svg";
        }
        else if(data.weather[0].icon === "01n"){
            imgWeather.src = "./assets/icon_weather/01n.svg";
        }
        else if(data.weather[0].icon === "02d"){
            imgWeather.src = "./assets/icon_weather/02d.svg";
        }
        else if(data.weather[0].icon === "02n"){
            imgWeather.src = "./assets/icon_weather/02n.svg";
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            imgWeather.src = "./assets/icon_weather/03d.svg";
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            imgWeather.src = "./assets/icon_weather/04d.svg";
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            imgWeather.src = "./assets/icon_weather/09d.svg";
        }
        else if(data.weather[0].icon === "10d"){
            imgWeather.src = "./assets/icon_weather/10d.svg";
        }
        else if(data.weather[0].icon === "10n"){
            imgWeather.src = "./assets/icon_weather/10n.svg";
        }
        else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
            imgWeather.src = "./assets/icon_weather/11d.svg";
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            imgWeather.src = "./assets/icon_weather/13d.svg";
        }
        else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
            imgWeather.src = "./assets/icon_weather/50d.svg";
        }
    }
    iconWeather()
}

// --------------------------- CITTA' DI DEFAULT ---------------------------
const arrayCity = [ "Rome", "London", "Madrid", "New York"];

for (let i = 0; i < arrayCity.length; i++){

    const url_default = `https://api.openweathermap.org/data/2.5/weather?q=${arrayCity[i]}&appid=eb0503dcbfb49a890461f582cd52caa3`;

   fetch(url_default)
   .then((res) => res.json())
   .then((data) =>cityDefault(data))
}

const cityDefault = (data) => {
    const defaultCity = document.querySelector(".defaultCity");
    const weather = document.createElement("div");
    const city = document.createElement("h5");
    const img = document.createElement("img");
    const sky = document.createElement("p");
    const minGrades = document.createElement("p");
    const maxGrades = document.createElement("p");
    const divGrades = document.createElement("div");

    weather.className = "default-card";
    
    city.textContent = data.name;
    img.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    sky.textContent = data.weather[0].main;
    minGrades.textContent = parseFloat(data.main.temp_min-273.15).toFixed(1) + "°";
    maxGrades.textContent = "/" + parseFloat(data.main.temp_max-273.15).toFixed(1) + "°";

    divGrades.append(minGrades, maxGrades)
    weather.append( city, img, sky, divGrades);
    defaultCity.appendChild(weather);
}

