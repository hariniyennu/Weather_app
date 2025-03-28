async function getweather() {
    const apikey = API_KEY;
    const city = document.getElementById("inp").value.trim(); // Trim spaces
    const weatherBox = document.getElementById("weather-box");
    const searchBox = document.getElementById("search-box");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Store data in localStorage
            localStorage.setItem("weatherData", JSON.stringify(data));
            localStorage.setItem("city", city);

            // Show weather box and hide search box
            searchBox.style.display = "none";
            weatherBox.style.display = "flex";

            // Update UI with correct data
            displayWeather(data, city);
        } else {
            alert("City not found. Try again!");
        }
    } catch (error) {
        alert("Error fetching weather data. Please try again!");
    }
}

// Function to display weather details
function displayWeather(data, city) {
    document.getElementById("city-name").innerText = `Weather Report for ${city}`;
    document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById("feels-like").innerText = `😌 Feels Like: ${data.main.feels_like}°C`;
    document.getElementById("condition").innerText = `☁ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").innerText = `🌬 Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    console.log("Full API Response:", data);
console.log("City:", city);
console.log("Weather Condition:", data.weather[0].description);
console.log("Icon Code:", data.weather[0].icon);

}

// Background image transition
const images = [
    "url('images/imgg1.jpeg')",
    "url('images/imgg2.jpeg')",
    "url('images/imgg3.jpeg')",
    "url('images/imgg4.jpeg')",  
    "url('images/imgg5.jpeg')"  
];

let index = 0;
document.body.style.backgroundImage = images[index];
function changeBackground() {
    index = (index + 1) % images.length; // Loop back to first image
    document.body.style.backgroundImage = images[index];
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundPosition = "center"; 
}

setInterval(changeBackground, 3000); // Change every 3s

// Load saved weather data on page load
document.addEventListener("DOMContentLoaded", function () {
    const data = JSON.parse(localStorage.getItem("weatherData"));
    const city = localStorage.getItem("city"); // ✅ Fixed the city retrieval

    if (data && city) {
        displayWeather(data, city);
    }
});

// Back button function
function goBack() {
    document.getElementById("weather-box").style.display = "none";
    document.getElementById("search-box").style.display = "flex";
}
