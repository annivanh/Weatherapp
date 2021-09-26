import React from 'react';
import Weather from './style/Weather.css';
import { useState } from 'react';
import { FaTemperatureLow, FaSun, FaRegMoon } from 'react-icons/fa';
import { IconContext } from "react-icons";


const APITEST = () => {
    const [weather, setWeather] = useState({city: '', country:'', condition: '', temp: '', conditionIcon: '', sunrise: '', sunset: ''});
    const [city, setCity] = useState('');
  
    const search = event => {
      if (event.key === "Enter") {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=6bc8c875fb3e475f808183235212907&q=${city}&aqi=no&days=3`)
        .then(response => response.json())
        .then(responseData => setWeather({
          city: (responseData.location.name),
          country: (responseData.location.country),
          condition: (responseData.current.condition.text),
          temp: (responseData.current.temp_c),
          conditionIcon: (responseData.current.condition.icon),
          sunrise: (responseData.forecast.forecastday[0].astro.sunrise),
          sunset: (responseData.forecast.forecastday[0].astro.sunset),
        }));
      }
    }

    if (city === "") {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=6bc8c875fb3e475f808183235212907&q=helsinki&aqi=no&days=3`)
        .then(response => response.json())
        .then(responseData => setWeather({
          city: (responseData.location.name),
          country: (responseData.location.country),
          condition: (responseData.current.condition.text),
          temp: (responseData.current.temp_c),
          conditionIcon: (responseData.current.condition.icon),
          sunrise: (responseData.forecast.forecastday[0].astro.sunrise),
          sunset: (responseData.forecast.forecastday[0].astro.sunset),
        }));
    }

    const date = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      
      return `${day} ${date} ${month} ${year}`
    }
  
    return (
      <div className="container">
        <div className="info-container">
          <div className="search-box">
              <input 
                type="text"
                className="search-bar"
                placeholder="Search for a city"
                onChange={e => setCity(e.target.value)}
                value={city}
                onKeyPress={search}
              />
          </div>
          <div className="info">
            <div className="city-name">
              {weather.city},
            </div>
            <div className="country-name">
              {weather.country}
            </div>
              Today is {date(new Date())} <br />
              <div className="temp-condition">
                <div className="temp">
                  <IconContext.Provider value={{className: "react-icons" }}>
                    <div>
                      <FaTemperatureLow />   
                    </div>
                  </IconContext.Provider>
                  {weather.temp} °C <br />
                </div>
                <div className="condition">
                  <img src={weather.conditionIcon}/><br />
                  {weather.condition} 
                </div>
                <div className="sun">
                  <FaSun />  {weather.sunrise} <br />
                  <FaRegMoon />   {weather.sunset}
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

export default APITEST
