import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import background from "./assets/images/background.jpg"
import { useState } from 'react';



function App() {

  //Create List Day Name
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = new Date();
  const dayIndex = today.getDay();
  const currentDay = weekday[dayIndex]
  const dayList = weekday.splice(dayIndex + 1, 4).concat(weekday.splice(0, dayIndex - 2))

  //Set State
  const key = "c10bb3bd22f90d636baa008b1529ee25";
  const [homePage, setHomePage] = useState(true)
  const [cityQuery, setCityQuery] = useState("")
  const [weather, setWeather] = useState("")
  const [iconToday, setIconToday] = useState("")

  //Event handler
  const onInputCityHandler = (event) => setCityQuery(event.target.value);

  const onEnterSearch = async (e) => {
    if (e.key === "Enter") {
      let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityQuery}&units=metric&cnt=5&APPID=${key}`)
      let weatherData = await data.json()
      if (weatherData.cod !== "404") {
        console.log(weatherData)
        setHomePage(false)
        setIconToday(weatherData.list[0].weather[0].icon)
        setWeather(weatherData)
      } else {
        console.log(weatherData.message)
      }
    }
  }

  return (
    <div>
      <div>

        {homePage ?

          <div style={{ backgroundImage: `url(${background})`, padding: "120px" }}>
            <div className='weatherBox'>
              <div className='row'>
                <div className='col-sm-6'>
                  <img className='homeIcon' src="images/cloudy.png" alt=""></img>
                </div>
                <div className='col-sm-6' style={{ color: "#365a7a", fontWeight: "bold", fontSize: "90px", margin: "auto" }} >
                  <p>Weather Forecast</p>
                </div>
              </div>
              <div className='row'>
                <input placeholder="Enter a City..." onChange={onInputCityHandler} onKeyDown={onEnterSearch} style={{ width: "600px", height: "45px", border: "2px solid black", fontWeight: "bolder", margin: "auto", marginTop: "60px", borderRadius: "20px" }}></input>
              </div>
            </div>
          </div>

          :

          <div style={{ backgroundImage: `url(${background})`, padding: "100px" }}>
            <div className='row'>
              <input placeholder="Enter a City..." onChange={onInputCityHandler} onKeyDown={onEnterSearch} style={{ width: "600px", height: "45px", border: "2px solid black", fontWeight: "bolder", margin: "auto", marginBottom: "30px", borderRadius: "20px" }}></input>
            </div>
            <div className='weatherBox'>
              <div className='row'>
                <div className='col-sm-6'>
                  <img className='homeIcon' src={`images/${iconToday}.png`} alt=""></img>
                </div>
                <div className='col-sm-6' style={{ margin: "auto" }}>
                  <h5>Today - {currentDay}</h5>
                  <h1>{weather.city.name}</h1>
                  <h5>Temperature: {weather.list[0].temp.day}°C</h5>
                  <h5>{weather.list[0].weather[0].main} - {weather.list[0].weather[0].description}</h5>
                </div>
              </div>
              <div className='row'>

                {weather.list.slice(0, 4).map((eachDay, index) => {
                  return (
                    <div className='col-sm-3'>
                      <div className='forecast-miniBox'>
                        <h4 className='title-dayList'>{dayList[index]}</h4>
                        <img className='img-dayList' src={`images/${eachDay.weather[0].icon}.png`} alt=""></img>
                        <h3 className='title-dayList'>{eachDay.temp.day}°C</h3>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
