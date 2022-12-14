import React, {useState} from "react";
import "./App.css";
import { ThermometerHalf, Moisture, Wind, Cloud } from "react-bootstrap-icons";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");

  const handleSearch = async () => {
    if (search) {
     await fetch("http://api.weatherstack.com/current?access_key=4a8fa398437e54ca5a250cf4bafe3816&query=" + search +"")
        .then((resp) => resp.json())
        .then((result) => {
          setWeather(result);
          setSearch("");
          // console.log(result);
        });
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

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  };

  const setBG = () => {
    if (weather === "") return "app";
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
  };

  return (
    <div className={setBG()}>
      <main>
        <div className="search-bar">
          <input
            className="search-box"
            type="text"
            name="location"
            placeholder="Search Your City..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
          <button type="submit" className="search-btn" onClick={handleSearch}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
              alt=""
            />
          </button>
        </div>
        {typeof weather.current != "undefined" ? (
          <div className="container">
            <div className="location-box">
              <h2 className="location">
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="date">{dateBuilder(new Date())}</p>

              <div className="temp">
                Temp:{weather.current.temperature}??C
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
              <div className="app-name">
                Weather App
              </div>
              <Cloud className="cloud"/>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
