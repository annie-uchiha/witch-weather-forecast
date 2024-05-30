import React from "react";
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
}) => {
  const date = new Date(dt);
  const formatTemperature = (temp) => `${Math.round(temp)}°C`;

  return (
    <Card className="WeatherCardStyle" style={{ width: "18rem" }}>
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
