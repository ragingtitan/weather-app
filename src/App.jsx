import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [Data, setData] = useState(null);
  async function fetchData(cityname='Kolkata') {
    if(cityname === null || cityname=='')
    {
      alert('Please select a city!');
    }
    else{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=3f7f920b96e3cc25b3326b47412ab494`;
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data);
      setData(data);
    }
    
  }
  const [currentDate, setCurrentDate] = useState(null); // Changed from `Date` to `currentDate`
  const [City, setCity] = useState('')
  useEffect(() => {
    
    fetchData();

    const intervalId = setInterval(() => {
      const formattedDate = formatCurrentDate();
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  function formatCurrentDate() {
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', options);
  }

  function formatCurrentTime() {
    const options = { hour: 'numeric', minute: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', options);
  }

  function getWeatherIcon(condition) {
    switch (condition) {
      case 'Thunderstorm':
        return 'thunderstorm.png';
      case 'Drizzle':
        return 'drizzle.png';
      case 'Rain':
        return 'rain.png';
      case 'Snow':
        return 'snow.png';
      case 'Mist':
        return 'mist.png';
      case 'Smoke':
        return 'smoke.png';
      case 'Haze':
        return 'haze.png';
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Dust':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return 'fog.png';
      case 'Clear':
        return 'clear.png';
      case 'Clouds':
        return 'clouds.png';
      default:
        return 'unknown.png';
    }
  }
  const handleSearch = () => {
    fetchData(City);
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      {Data &&
        <div className="layout-wrapper h-full w-full flex justify-center items-center text-white bg-[#9381bb]">
          <div className="phone-layout opacity-90 flex flex-col gap-3 bg-gradient-to-r from-[rgba(91,69,153,1)] to-[#5f417f] via-[#5f417f] bg-[rgba(91,69,153,1)] w-96 rounded-3xl p-3">
            <div className="navbar flex justify-between">
              <div className="time">{formatCurrentTime()}</div>
              <div className="info flex gap-2">
                <div className="tower">
                  <i className="fa-solid fa-signal"></i>
                </div>
                <div className="wifi">
                  <i className="fa-solid fa-wifi"></i>
                </div>
                <div className="battery">
                  <i className="fa-solid fa-battery"></i>
                </div>
              </div>
            </div>
            <div className="search-wrapper flex justify-center py-2">
              <div className="search-bar hover:shadow bg-white rounded-2xl w-11/12 flex gap-2 justify-center p-2">
                <input type="text" className='w-11/12 h-10 text-black p-2 outline-none' value={City} onChange={(e)=>{setCity(e.target.value)}} placeholder='Search for a city'/>
                <div className="search-icon flex justify-center items-center p-1 hover:cursor-pointer" onClick={handleSearch}>
                  <img src="public/images/search.png" alt="" className='bg-none' width={28} />
                </div>
              </div>
            </div>
            <div className="weather-condition flex justify-center">
              <p className='text-5xl'>{capitalize(Data.weather[0].description)}</p>
            </div>
            <div className="location flex justify-center">
              <p className='text-2xl'>{Data.name}, {Data.sys.country}</p>
            </div>
            <div className="weather-condition-logo flex justify-center bg-[#331865] rounded-xl p-2">
              <img className='w-1/2' src={`public/images/${getWeatherIcon(Data.weather[0].main)}`} alt="Weather Condition"/>
            </div>
            <div className="time-and-details flex justify-center">
              <p>{currentDate}</p>
            </div>
            <div className="temperature-show flex flex-col items-center justify-center gap-5">
              <p className='text-5xl text-center'>{Math.round(Data.main.temp)}°C</p>
              <p>Feels like: {Math.round(Data.main.feels_like)}°C</p>
            </div>
            <div className="highest-lowest flex justify-center gap-2">
              <div className="highest">
                <p>Highest: {Math.round(Data.main.temp_max)}°C</p>
              </div>
              <div className="lowest">
                <p>Lowest: {Math.round(Data.main.temp_min)}°C</p>
              </div>
            </div>
            <div className="other-details-wrapper w-full flex justify-center ">
              <div className="other-details p-3 rounded-2xl flex justify-around h-fit bg-[#331865] w-11/12">
                <div className="rain flex flex-col items-center justify-center">
                  <img src="public\images\rainlogo.png" alt="Rain Logo" width={40} />
                  <p>{}</p>
                  <p>Rain</p>
                </div>
                <div className="wind-speed flex flex-col items-center justify-center">
                  <img className='' src="public\images\wind.png" alt="Wind Speed" width={30} />
                  <p>{Data.wind.speed} Km/hr</p>
                  <p>Wind speed</p>
                </div>
                <div className="humidity flex flex-col items-center justify-center">
                  <img className='my-1' src="public\images\humidity.png" alt="Humidity" width={30} />
                  <p>{Data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
