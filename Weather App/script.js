const APIKEY = "7c9f70950f2809f3f5b92a5406512d05";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=" + APIKEY;

const btn = document.getElementById("btn");
const city = document.getElementById("city");
const bottom = document.querySelector(".bottom");
const subtitle = document.querySelector(".subtitle");
const cityInput = document.getElementById("city");

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btn.click(); 
  }
});


btn.addEventListener("click", () => {
  const cityName = city.value.trim();
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const url = BASE_URL.replace("{city name}", cityName);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const tempC = (data.main.temp - 273.15).toFixed(1);
      const windKph = (data.wind.speed * 3.6).toFixed(1);
      const feelsLikeC = (data.main.feels_like - 273.15).toFixed(1);

      subtitle.textContent = data.name;

      bottom.querySelector(".temp").innerHTML =
        `<img src="weather.png" class="w-icon">${tempC}°C`;

      bottom.querySelector(".wind").innerHTML =
        `<img src="wind.png" class="wind-icon">${windKph} km/h`;

      bottom.querySelector(".feels-like").innerHTML =
        `<img src="feels-like.png" class="feels-like-icon">Feels ${feelsLikeC}°C`;
    })
    .catch(err => console.error("Fetch error:", err));
});
