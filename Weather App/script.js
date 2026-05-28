const APIKEY = "7c9f70950f2809f3f5b92a5406512d05";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=" + APIKEY;

const btn = document.getElementById("btn");
const city = document.getElementById("city");
const bottom = document.querySelector(".bottom");
const subtitle = document.querySelector(".subtitle");
const cityInput = document.getElementById("city");
const mainTemp = document.querySelector(".main-temp");


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
      mainTemp.textContent = `${tempC}°C`;
      mainTemp.style.animation = "none";
      mainTemp.offsetHeight;
      mainTemp.style.animation = "tempFade 0.6s ease";
      bottom.querySelector(".temp").innerHTML =
        `<img src="weather.png" class="w-icon">${tempC}°C`;

      bottom.querySelector(".wind").innerHTML =
        `<img src="wind.png" class="wind-icon">${windKph} km/h`;

      bottom.querySelector(".feels-like").innerHTML =
        `<img src="feels-like.png" class="feels-like-icon">Feels ${feelsLikeC}°C`;
    })
    .catch(err => console.error("Fetch error:", err));
});
// dark mode
const themeBtn = document.getElementById("theme-btn");

/* LOAD SAVED THEME */

if (localStorage.getItem("theme") === "dark") {

  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️";

}

/* TOGGLE THEME */

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {

    themeBtn.textContent = "☀️";

    localStorage.setItem("theme", "dark");

  } else {

    themeBtn.textContent = "🌙";

    localStorage.setItem("theme", "light");

  }

});
