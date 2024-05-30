let cityName = document.querySelector("h1");
let temperature = document.querySelector("h2");
let desc = document.querySelector(".description");
let icon = document.querySelector("img");
let city = "";

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe824cb856a37281c8c13e7a5fbbd488&units=metric`
    )
    .then((res) => {
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
      );
      cityName.textContent = res.data.name;
      temperature.textContent = Math.round(res.data.main.temp) + "°c";
      desc.textContent = res.data.weather[0].main;
      document.querySelector("input").value = "";
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", (event) => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    axios
      .get(
        `
        https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=fe824cb856a37281c8c13e7a5fbbd488&units=metric`
      )
      .then((res) => {
        icon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        );
        cityName.textContent = res.data.name;
        temperature.textContent = Math.round(res.data.main.temp) + "°c";
        desc.textContent = res.data.weather[0].main;
        document.querySelector("input").value = "";
      })
      .catch((err) => console.log(err));
  });
});
