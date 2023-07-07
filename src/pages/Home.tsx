import React from "react";
import "./style.css";
import WeatherInfo from "./WeatherInfo";

export const Home = () => {
  return (
    <div className="centered">
      <h1>My To-Do + Shopping App</h1>
      <p>Shop for all your favorite products in one place!</p>
      <WeatherInfo />
    </div>
  );
};
