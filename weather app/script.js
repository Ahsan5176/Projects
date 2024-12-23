const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


search.addEventListener('click', () => {

    const APIkey = '20beb2ead66181cdda7ab9de7987966e';
    const city = document.querySelector('.search-box input').value;


    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${APIkey}`).then(Response => Response.json()).then(json => {


        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

       
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');


           
      if(cityHide.textContent == city) {
        return;
      }  
      else{
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add = ('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove = ('active');
        }, 2500);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'mist':
                image.src = 'images/mist.png';
                break;
            case 'haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = 'images/cloud.png';
                break;
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infohumidity = document.querySelector('.info-humidity');
        const infowind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfohumidity = infohumidity.cloneNode(true);
        const elCloneInfowind = infowind.cloneNode(true);

        elCloneInfoWeather.id ='clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfohumidity.id ='clone-info-humidity';
        elCloneInfohumidity.classList.add('active-clone');

        elCloneInfowind.id ='clone-info-wind';
        elCloneInfowind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
            infohumidity.insertAdjacentElement("afterend",elCloneInfohumidity);
            infowind.insertAdjacentElement("afterend",elCloneInfowind);
        }, 2200);

        const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoweather = CloneInfoWeather.length;
        const CloneInfoWeatherFirst = CloneInfoWeather[0];

        
        const CloneInfohumidity = document.querySelectorAll('.info-humidity.active-clone');
        const CloneInfohumidityFirst = CloneInfohumidity[0];

        
        const CloneInfowind = document.querySelectorAll('.info-wind.active-clone');
        const CloneInfowindFirst = CloneInfowind[0];

        if(totalCloneInfoweather > 0){
            CloneInfoWeatherFirst.classList.remove('active-clone');
            CloneInfohumidityFirst.classList.remove('active-clone');
            CloneInfowindFirst.classList.remove('active-clone');

            setTimeout(() => {
                CloneInfoWeatherFirst.remove();
                CloneInfohumidityrFirst.remove();
                CloneInfowindFirst.remove();
            }, 2200);
        }
        
      }

       
    })
});









