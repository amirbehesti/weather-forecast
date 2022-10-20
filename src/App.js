import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { ThermometerHalf, Moisture, Wind, Cloud } from "react-bootstrap-icons";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const url = "http://api.weatherstack.com/current?access_key=7446a0cb008ddc627eb5d915a972a421&query=";
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search) {
      const response = await axios.get(`${url}+${search}`);
      setWeather(response.data);
      setSearch("");
      // console.log(response);
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()]; //  get day
    let month = months[d.getMonth()]; //get month
    let date = d.getDate(); // get date
    let year = d.getFullYear(); // get year

    return `${day}, ${date} ${month}, ${year}`; // to today time and date
  };

  const setBG = () => {
    // this is for bacckground
    if (weather === "") return "app"; // if wearther empty
    else if (weather.current.temperature <= 15) return "app cold";
    else if (
      weather.current.temperature > 15 &&
      weather.current.temperature <= 25
    )
      return "app lcold";
    else if (
      weather.current.temperature > 25 &&
      weather.current.temperature <= 35
    )
      return "app medium";
    else return "app warm";
  }; // every time setBG return the classname of perticuler temp.

  return (
    // set this return class name into this <div className={setBG()}></div>
    <div className={setBG()}>
      <main>
        <div className="search-bar">
          <input
            className="search-box"
            type="text"
            name="location"
            placeholder="Search Your City..."
            onChange={(e) => setSearch(e.target.value)} //set the search value int useState
            value={search}
          ></input>
          <button type="submit" className="search-btn" onClick={handleSearch}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
              alt=""
            />
          </button>
        </div>
        {weather && typeof weather.current != "undefined" ? (
          <div>
            <div className="location-box">
              <h2 className="location">
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="date">{dateBuilder(new Date())}</p>

              <div className="temp">
                Temp:{weather.current.temperature}°C
                <span>
                  <img
                    src={weather.current.weather_icons}
                    alt=""
                    className="weatherImg"
                  />
                </span>
              </div>

              <p className="type">{weather.current.weather_descriptions[0]}</p>
              <div className="other-dets">
                <h4
                  style={{
                    fontSize: "35px",
                    fontWeight: "150",
                    marginBottom: "30px",
                  }}
                >
                  Other details :
                </h4>
                <p className="others">
                  <ThermometerHalf /> Pressure : {weather.current.pressure} hPa
                </p>
                <p className="others">
                  <Moisture /> Humidity :{weather.current.humidity} %
                </p>
                <p className="others">
                  <Wind /> Wind :{weather.current.wind_speed} m/s
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="welcome-box">
              <h2 className="app-name">
                Weather App <Cloud />
              </h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
