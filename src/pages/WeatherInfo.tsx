import React, { useState, useEffect } from "react";
import { keys } from "./config";
import { Form, Button } from "react-bootstrap";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { BsGeoAlt, BsSun } from "react-icons/bs";
import { IoMdThermometer } from "react-icons/io";

const WeatherInfo = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    checkWeather("Mumbai");
  }, []);

  const checkWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `${keys.API_URL}${cityName}&appid=${keys.API_KEY}`
      );
      const data = await response.json();
      setCity(data.name);
      setTemp(Math.round(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    checkWeather(searchInput);
    setSearchInput("");
  };

  return (
    <div className="weather">
      <Form.Group>
        <Form.Control
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form.Group>
      <div className="city">
        <BsGeoAlt />
        {city}
      </div>
      <div className="temp">
        <IoMdThermometer />
        {`${temp}°C`}
      </div>
      <div className="humidity">
        <WiHumidity />
        {`${humidity}%`}
      </div>
      <div className="wind">
        <WiStrongWind />
        {`${wind}km/h`}
      </div>
    </div>
  );
};

export default WeatherInfo;
