import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("New Delhi");
  const [location, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`, // Add `units=metric` to get temp in Celsius
    };

    const forecastOptions = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      console.log('Weather Main:', response.data.weather[0].main);
      console.log(response.data.weather); // Check weather array
      setWeather({
        temp: response.data.main.temp,
        wind_speed: response.data.wind.speed,
        humidity: response.data.main.humidity,
        heat_index: response.data.main.feels_like,
        description: response.data.weather[0].description,
        iconString: response.data.weather[0].main,
      }); // Set temperature from `main.temp`
      setLocation(response.data.name); // Set city name from `name`

      // Fetch forecast data
      const responseForecast = await axios.request(forecastOptions);
      const forecastData = responseForecast.data.list.map((item) => ({
        datetime: item.dt_txt,
        temp: item.main.temp,
        conditions: item.weather[0].main,
      }));
      setValues(forecastData); // Set the forecast data
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        location,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
