
const apiKey = "YOUR ACCESS KEY";

const cityInput = document.querySelector("#cityInput");
const searchbtn = document.querySelector("#searchbtn");

const temperature = document.querySelector("#temperature");
const cityname = document.querySelector("#cityname");
const humpercent = document.querySelector("#humpercent");
const windpercent = document.querySelector("#windpercent");
const weatherIcon = document.querySelector("#weatherIcon");


function checkWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {

            if (data.error) {
                alert("City not found");
                return;
            }

            const currentWeather = data.current;

            const temp = currentWeather.temp_c;
            const humidity = currentWeather.humidity;
            const wind = currentWeather.wind_kph;
            const condition = currentWeather.condition.text;
            const city = data.location.name;

            temperature.textContent = `${Math.round(temp)}°C`;

            cityname.textContent = city;

            humpercent.textContent = `${humidity}%`;

            windpercent.textContent = `${Math.round(wind)}km/h`;


            const weather = condition.toLowerCase();

            if (weather.includes("snow")) {
                weatherIcon.src = "./images/snow.png";
                weatherIcon.style.display = "block";
            }
            else if (
                weather.includes("rain") ||
                weather.includes("shower")
            ) {
                weatherIcon.src = "./images/rain.png";
                weatherIcon.style.display = "block";
            }
            else if (
                weather.includes("drizzle")
            ) {
                weatherIcon.src = "./images/drizzle.png";
                weatherIcon.style.display = "block";
            }
            else if (
                weather.includes("cloud")
            ) {
                weatherIcon.src = "./images/clouds.png";
                weatherIcon.style.display = "block";
            }
            else if (
                weather.includes("mist") ||
                weather.includes("fog")
            ) {
                weatherIcon.src = "./images/mist.png";
                weatherIcon.style.display = "block";
            }
            else if (
                weather.includes("clear") ||
                weather.includes("sunny")
            ) {
                weatherIcon.src = "./images/clear.png";
                weatherIcon.style.display = "block";
            }

        })
        .catch(error => {
            console.log("Error:", error);
        });
}


searchbtn.addEventListener("click", checkWeather);


cityInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        checkWeather();
    }

});