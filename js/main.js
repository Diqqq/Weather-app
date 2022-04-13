const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=4e544c9d06791f0a4b6bffba1100c444'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS + API_LANG

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)
			// powyższy zapis równa się temu: res.data.weather[0]

			warning.textContent = '' // pozwala to wyczyścić tekst błędu, gdy poprawnie zadziałą funkcja
			input.value = ''

			weather.textContent = status.main
			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + `°C`
			humidity.textContent = hum + `%`

			if (weather.textContent === 'Clear') {
				weather.textContent = 'Czyste niebo'
			} else if (weather.textContent === 'Clouds') {
				weather.textContent = 'Zachmurzenie'
			} else if (weather.textContent === 'Fog') {
				weather.textContent = 'Mgła'
			} else if (weather.textContent === 'Snow') {
				weather.textContent = 'Śnieg'
			} else if (weather.textContent === 'Rain') {
				weather.textContent = 'Deszcz'
			} else if (weather.textContent === 'Drizzle') {
				weather.textContent = 'Mrzawka'
			} else if (weather.textContent === 'Thunderstorm') {
				weather.textContent = 'Burza'
			} else {
				weather.textContent = 'Brak danych'
			}

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute('src', './img/rain.png')
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute('src', './img/ice.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (status.id === 741) {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id >= 800 && status.id < 900) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}
input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)
