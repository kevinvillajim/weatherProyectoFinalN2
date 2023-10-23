// Iconos MUI
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
// Components
import Card from "./components/Card";
import Card2 from "./components/Card2";
import Brujula from "./components/Brujula";
import ProgressBar from "./components/ProgressBar";
import "./App.css";
import { useEffect, useState } from "react";

// -------Fecha hoy y de los proximos 5 dias------

const tiempoTranscurrido = Date.now();
const daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatearFecha(fecha) {
  const diaSemana = daysWeek[fecha.getDay()];
  const diaMes = fecha.getDate();
  const nombreMes = months[fecha.getMonth()];
  return `${diaSemana}, ${diaMes} ${nombreMes}`;
}

const today = new Date(tiempoTranscurrido);

const fechasProximas = [];

for (let i = 1; i <= 5; i++) {
  const tomorrow = new Date(tiempoTranscurrido + i * 24 * 60 * 60 * 1000);
  fechasProximas.push(formatearFecha(tomorrow));
}
//-----------------------

function App() {
  const apiKey = "fdc81c13f3bc0e408acd4f11ab5e2379";
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [grades, setGrades] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [city, setCity] = useState("");

  //Función de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();

    const ciudad = e.target[0].value.toLowerCase();
    setCity(ciudad);
    setLat(null);
    setLon(null);
  };

  //Función de cambio de estado (visible, no visible), barra izquierda
  const toggleVisibleSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  //Cambio de grados a Fahrenheit o Celcius
  const handleCelcius = () => {
    setGrades(false);
  };

  const handleFahrenheit = () => {
    setGrades(true);
  };

  //Use effect que trae la información de la latitud y longitud según la busqueda de ciudad del usuario
  useEffect(() => {
    if (city === null) return;
    const getData = async () => {
      const link3 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${
        grades === false ? "&units=metric" : "&units=imperial"
      }`;
      const res3 = await fetch(link3);
      const data3 = await res3.json();
      setLat(data3.coord.lat);
      setLon(data3.coord.lon);
    };
    getData();
  }, [city, grades]);

  //Use effect que trae la información del clima según la latitud y longitud ingresadas, o la ubicación pedida con pérmisos
  //el data trae los datos de la api general y esa data se utiliza en el programa para imprimir casi todo el contienido a exepcion
  //de las tarjetas pequeñas del clima venidero (data2, link 2)

  useEffect(() => {
    if (lat === null && lon === null) return;

    const getData = async () => {
      const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}${
        grades === false ? "&units=metric" : "&units=imperial"
      }`;
      const res = await fetch(link);
      const data = await res.json();
      setCurrentWeather(data);

      const link2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}${
        grades === false ? "&units=metric" : "&units=imperial"
      }`;
      const res2 = await fetch(link2);
      const data2 = await res2.json();
      setFutureWeather(data2);
    };
    getData();
  }, [lat, lon, grades]);

  // Funciones para pedir ubicación al navegador
  const handleSucess = (data) => {
    const { latitude, longitude } = data.coords;
    setLat(latitude);
    setLon(longitude);
  };

  const handleError = () => {
    console.log("Ubicacion denegada.");
    setLat(null);
    setLon(null);
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSucess, handleError);
  };

  //Funciónes para formatear los nombres de las imagenes del clima

  function capitalizeEveryWord(text) {
    if (text === null || text === undefined) {
      return "Shower";
    }
    const words = text.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(" ");
  }

  const weatherDescription =
    currentWeather && currentWeather.weather[0].description;

  const transformedDescription = capitalizeEveryWord(weatherDescription);

  function eliminarEspacios(transformedText) {
    return transformedText.replace(/\s+/g, "");
  }

  const textoConEspacios = transformedDescription;
  const textoSinEspacios = eliminarEspacios(textoConEspacios);

  return (
    <>
      <main id="total-container">
        <div
          id="left-container"
          className={`left-container ${visibleSearch === false ? "" : "none"}`}
        >
          <div id="weather-container">
            <div id="buttons-container">
              <button
                id="search"
                className="buttons-left"
                onClick={toggleVisibleSearch}
              >
                Search for places
              </button>
              <button
                id="geo"
                className="buttons-left"
                onClick={handleLocation}
              >
                <MyLocationIcon></MyLocationIcon>
              </button>
            </div>
            <div id="main-img-container">
              <img
                id="background-image"
                src="https://raw.githubusercontent.com/kevinvillajim/weatherProyectoFinalN2/main/public/img/Cloud-background.png"
              />
              <img
                id="main-img"
                src={`https://raw.githubusercontent.com/kevinvillajim/weatherProyectoFinalN2/main/public/img/${textoSinEspacios}.png`}
              />
            </div>
            <div id="text-container">
              <div id="degrees-container">
                <span id="degrees">
                  {currentWeather && currentWeather.main.temp
                    ? parseInt(currentWeather.main.temp)
                    : "15"}
                </span>
                <span id="CF">{grades === false ? "°C" : "°F"}</span>
              </div>
              <div id="type-container">
                <span id="type">{transformedDescription}</span>
              </div>
              <div id="date-container">
                <span className="date" id="today">
                  Today
                </span>
                <span className="date" id="dot">
                  .
                </span>
                <span className="date" id="date">
                  {formatearFecha(today)}
                </span>
              </div>
              <div id="place-container">
                <PlaceIcon></PlaceIcon>
                <span className="date" id="place">
                  {currentWeather && currentWeather.name
                    ? currentWeather.name
                    : "Helsinki"}
                </span>
              </div>
            </div>
          </div>
          <div id="search-container">
            <div id="search-bar-container"></div>
            <div id="cities-cotainer"></div>
          </div>
        </div>
        <div
          id="left-container-search"
          className={`search-container ${visibleSearch === true ? "" : "none"}`}
        >
          <div id="close-search">
            <CloseIcon
              sx={{
                color: "#fff",
                width: "32px",
                height: "32px",
                cursor: "pointer",
              }}
              onClick={toggleVisibleSearch}
            />
          </div>
          <div id="search-form-container">
            <SearchIcon
              sx={{
                height: "24px",
                width: "24px",
                color: "#616475",
                position: "absolute",
                top: "25%",
                left: "1rem",
              }}
            />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="search location"
                id="search-left"
              />
              <input type="submit" value="Search" id="search-button-left" />
            </form>
          </div>
          <div id="favourite-countries">
            <select id="favourite-countries-select">
              <option className="options">option 1</option>
              <option className="options">option 2</option>
              <option className="options">option 3</option>
            </select>
          </div>
        </div>
        <div id="right-container">
          <div id="buttons-degrees-container">
            <button
              type="button"
              className={`button-degrees ${
                grades === false ? "degree-active" : "degree-inactive"
              }`}
              id="celcius"
              onClick={handleCelcius}
            >
              °C
            </button>
            <button
              type="button"
              className={`button-degrees ${
                grades === true ? "degree-active" : "degree-inactive"
              }`}
              id="fahrenheit"
              onClick={handleFahrenheit}
            >
              °F
            </button>
          </div>
          <div id="prediction-cards-container">
            <Card
              day="Tomorrow"
              img={
                futureWeather && futureWeather.daily[1].weather[0].main
                  ? futureWeather.daily[1].weather[0].main
                  : "LightCloud"
              }
              maxDegrees={
                futureWeather && futureWeather.daily[1].temp.max
                  ? parseInt(futureWeather.daily[1].temp.max)
                  : 16
              }
              minDegrees={
                futureWeather && futureWeather.daily[1].temp.min
                  ? parseInt(futureWeather.daily[1].temp.min)
                  : 11
              }
            />
            <Card
              day={fechasProximas[1]}
              img={
                futureWeather && futureWeather.daily[2].weather[0].main
                  ? futureWeather.daily[2].weather[0].main
                  : "LightCloud"
              }
              maxDegrees={
                futureWeather && futureWeather.daily[2].temp.max
                  ? parseInt(futureWeather.daily[2].temp.max)
                  : 16
              }
              minDegrees={
                futureWeather && futureWeather.daily[2].temp.min
                  ? parseInt(futureWeather.daily[2].temp.min)
                  : 16
              }
            />
            <Card
              day={fechasProximas[2]}
              img={
                futureWeather && futureWeather.daily[3].weather[0].main
                  ? futureWeather.daily[3].weather[0].main
                  : "LightCloud"
              }
              maxDegrees={
                futureWeather && futureWeather.daily[3].temp.max
                  ? parseInt(futureWeather.daily[3].temp.max)
                  : 16
              }
              minDegrees={
                futureWeather && futureWeather.daily[3].temp.min
                  ? parseInt(futureWeather.daily[3].temp.min)
                  : 16
              }
            />
            <Card
              day={fechasProximas[3]}
              img={
                futureWeather && futureWeather.daily[4].weather[0].main
                  ? futureWeather.daily[4].weather[0].main
                  : "LightCloud"
              }
              maxDegrees={
                futureWeather && futureWeather.daily[4].temp.max
                  ? parseInt(futureWeather.daily[4].temp.max)
                  : 16
              }
              minDegrees={
                futureWeather && futureWeather.daily[4].temp.min
                  ? parseInt(futureWeather.daily[4].temp.min)
                  : 16
              }
            />
            <Card
              day={fechasProximas[4]}
              img={
                futureWeather && futureWeather.daily[5].weather[0].main
                  ? futureWeather.daily[5].weather[0].main
                  : "LightCloud"
              }
              maxDegrees={
                futureWeather && futureWeather.daily[5].temp.max
                  ? parseInt(futureWeather.daily[5].temp.max)
                  : 16
              }
              minDegrees={
                futureWeather && futureWeather.daily[5].temp.min
                  ? parseInt(futureWeather.daily[5].temp.min)
                  : 16
              }
            />
          </div>
          <div id="today-highlights-container">
            <span id="today-highlights-title">Today&#39;s Highlights</span>
            <div id="highlights-container-2">
              <Card2
                title2="Wind status"
                dataN={
                  currentWeather && currentWeather.wind.speed
                    ? currentWeather.wind.speed
                    : 7
                }
                unit={grades === false ? "m/s" : "mph"}
                element={
                  <Brujula
                    cardinalP={
                      currentWeather && currentWeather.wind.deg
                        ? currentWeather.wind.deg >= 0 &&
                          currentWeather.wind.deg < 22.5
                          ? "N"
                          : currentWeather.wind.deg >= 22.5 &&
                            currentWeather.wind.deg < 45
                          ? "NNE"
                          : currentWeather.wind.deg >= 45 &&
                            currentWeather.wind.deg < 67.5
                          ? "NE"
                          : currentWeather.wind.deg >= 67.5 &&
                            currentWeather.wind.deg < 90
                          ? "ENE"
                          : currentWeather.wind.deg >= 90 &&
                            currentWeather.wind.deg < 112.5
                          ? "E"
                          : currentWeather.wind.deg >= 112.5 &&
                            currentWeather.wind.deg < 135
                          ? "ESE"
                          : currentWeather.wind.deg >= 135 &&
                            currentWeather.wind.deg < 157.5
                          ? "SE"
                          : currentWeather.wind.deg >= 157.5 &&
                            currentWeather.wind.deg < 180
                          ? "S"
                          : currentWeather.wind.deg >= 180 &&
                            currentWeather.wind.deg < 202.5
                          ? "SSW"
                          : currentWeather.wind.deg >= 202.5 &&
                            currentWeather.wind.deg < 225
                          ? "SW"
                          : currentWeather.wind.deg >= 225 &&
                            currentWeather.wind.deg < 247.5
                          ? "WSW"
                          : currentWeather.wind.deg >= 247.5 &&
                            currentWeather.wind.deg < 270
                          ? "W"
                          : currentWeather.wind.deg >= 270 &&
                            currentWeather.wind.deg < 292.5
                          ? "WNW"
                          : currentWeather.wind.deg >= 292.5 &&
                            currentWeather.wind.deg < 315
                          ? "NW"
                          : "NNW"
                        : "SSW"
                    }
                  />
                }
              />
              <Card2
                title2="Humidity"
                dataN={
                  currentWeather && currentWeather.main.humidity
                    ? parseInt(currentWeather.main.humidity)
                    : 84
                }
                unit="%"
                element={
                  <ProgressBar
                    progress={
                      currentWeather && currentWeather.main.humidity
                        ? parseInt(currentWeather.main.humidity)
                        : 84
                    }
                  />
                }
              />
              <Card2
                title2="Visibility"
                dataN={
                  currentWeather && currentWeather.visibility
                    ? parseInt(currentWeather.visibility) / 1000
                    : 6.4
                }
                unit="miles"
                element={null}
              />
              <Card2
                title2="Air Presure"
                dataN={
                  currentWeather && currentWeather.main.pressure
                    ? currentWeather.main.pressure
                    : 6.4
                }
                unit=" mb"
                element={null}
              />
            </div>
          </div>
          <div id="footer-container">
            <span>
              created by{" "}
              <a href="https://github.com/kevinvillajim">kevinvillajim</a>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
