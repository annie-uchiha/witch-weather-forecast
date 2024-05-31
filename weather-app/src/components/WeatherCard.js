import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./WeatherCard.scss";

const WeatherCard = ({
  dt,
  temp_min,
  temp_max,
  feels_like,
  wind,
  humidity,
  main,
  icon,
  isCurrent,
}) => {
  const date = new Date(dt);
  const formatTemperature = (temp) => `${Math.round(temp)}°C`;
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    if (isCurrent && main.toLowerCase() === "clouds") {
      setShowClouds(true);
      const timer = setTimeout(() => {
        setShowClouds(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [main, isCurrent]);

  const getWeatherClass = (weather) => {
    if (!isCurrent) return "";
    switch (weather.toLowerCase()) {
      case "clear":
        return "sunny";
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return "rainy";
      case "clouds":
      default:
        return "";
    }
  };

  return (
    <Card className={`WeatherCardStyle ${getWeatherClass(main)}`}>
      {isCurrent && showClouds && <div className="clouds-animation" />}
      <Card.Img
        variant="top"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
      <Card.Body>
        <Card.Title>{main}</Card.Title>
        <p>
          {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </p>
        <p>Min: {formatTemperature(temp_min)}</p>
        <p>Max: {formatTemperature(temp_max)}</p>
        <p>Feels Like: {formatTemperature(feels_like)}</p>
        <p>Wind: {wind} m/s</p>
        <p>Humidity: {humidity}%</p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
