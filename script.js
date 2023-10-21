const searchIcon = document.querySelector(".search-icon");
const inputBox = document.querySelector("#input-box");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidityDetail = document.querySelector(
	".humidity-detail span:first-child"
);
const windDetail = document.querySelector(".wind-detail span:first-child");
const imgOfWeather = document.querySelector("#imgOfWeather");

const key = "fb46dbd9cf0bcff6a11f927b75ab80f9";

searchIcon.addEventListener("click", getWeather);

function getWeather() {
	let city = inputBox.value;

	if (!city) {
		alert("Lutfen bir şehir giriniz");
	} else {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&units=metric&appid=${key}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				if (data.cod == "404") {
					alert("Geçerli bir şehir bulunamadı");
					return;
				} else {
					console.log(data);
				}

				getDatas(data);
				document.querySelector(".container").style.height = "600px";
			});
	}

	function getDatas(data) {
		temperature.innerHTML = `${data.main.temp}°C`;
		description.innerHTML = `${data.weather[0].description}`;
		humidityDetail.innerHTML = `${data.main.humidity}`;
		windDetail.innerHTML = `${data.wind.speed}`;
		getImage(data.weather[0].main);
	}

	function getImage(weatherDescription) {
		switch (weatherDescription) {
			case "Clear":
				imgOfWeather.setAttribute("src", "img/clear.png");
				break;
			case "Rain":
				imgOfWeather.setAttribute("src", "img/rain.png");
				break;
			case "Clouds":
				imgOfWeather.setAttribute("src", "img/cloud.png");
				break;
			case "Haze":
				imgOfWeather.setAttribute("src", "img/mist.png");
				break;
			case "Snow":
				imgOfWeather.setAttribute("src", "img/snow.png");
				break;
		}
	}

	document.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			getWeather();
		}
	});
}
