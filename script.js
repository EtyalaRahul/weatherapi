
const apiapp = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apikey = "&appid=7a33e4c4854bc3daa0b2aea25d7ddd80";
let search = document.getElementById('btn');
let humidity = document.getElementById('hp');
let wind = document.getElementById('wp');
let city = document.getElementById('cp');
let image = document.getElementById('img');
let block = document.getElementById('hider');
let temp = document.getElementById('temp');

async function getWeather(place) {
    try {
        let response = await fetch(`${apiapp}&q=${place}${apikey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();
        console.log(data);

        humidity.innerText = `Humidity: ${data.main.humidity}%`;
        wind.innerText = `Wind Speed: ${data.wind.speed} m/s`;
        city.innerText = `City: ${data.name}`;
        temp.innerHTML = `Temperature: ${data.main.temp} °C`;

        let weatherCondition = data.weather[0].main;
        let imageUrl;

        switch (weatherCondition) {
            case 'Clouds':
                imageUrl = 'clouds.png';
                break;
            case 'Clear':
                imageUrl = 'clear.png';
                break;
            case 'Rain':
                imageUrl = 'rain.png';
                break;
            case 'Snow':
                imageUrl = 'snow.png';
                break;
            case 'Thunderstorm':
                imageUrl = 'https://media.tenor.com/vXhppaY5OqIAAAAj/rainy-missyou.gif';
                break;
            default:
                imageUrl = 'default.png';
        }
        block.style.display = "block";
        image.setAttribute("src", imageUrl);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found or unable to fetch weather data.');
    }
}

search.addEventListener('click', () => {
    let weatherOfaCity = document.getElementById('city').value.trim();
    if (weatherOfaCity) {
        getWeather(weatherOfaCity);
    } else {
        alert('Please enter a city name.');
    }
});
