import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./WeatherCard.scss";

const WeatherCard = ({
  date,
  times,
  temp_min,
  temp_max,
  feels_like,
  wind,
  humidity,
  main,
  icon,
  isCurrent,
}) => {
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
      <Card.Body>
        {isCurrent ? (
          <>
            <Card.Img
              variant="top"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            />
            <Card.Title>{main}</Card.Title>
            <p className="fetched-data">
              {new Date(date).toLocaleDateString()} -{" "}
              {new Date(date).toLocaleTimeString()}
            </p>
            <p className="fetched-data">Min: {formatTemperature(temp_min)}</p>
            <p className="fetched-data">Max: {formatTemperature(temp_max)}</p>
            <p className="fetched-data">
              Feels Like: {formatTemperature(feels_like)}
            </p>
            <p className="fetched-data">Wind: {wind} m/s</p>
            <p className="fetched-data">Humidity: {humidity}%</p>
          </>
        ) : (
          <>
            <p className="fetched-data">
              {new Date(date).toLocaleDateString()}
            </p>
            {times.map((timeData, index) => (
              <div key={index} className="time-block">
                <p className="fetched-data">
                  <strong>{timeData.time}:</strong>
                </p>
                <p className="fetched-data">
                  Temp: {formatTemperature(timeData.data.main.temp)}
                </p>
                <p className="fetched-data">
                  Feels Like: {formatTemperature(timeData.data.main.feels_like)}
                </p>
                <p className="fetched-data">
                  Min: {formatTemperature(timeData.data.main.temp_min)}
                </p>
                <p className="fetched-data">
                  Max: {formatTemperature(timeData.data.main.temp_max)}
                </p>
                <p className="fetched-data">
                  Humidity: {timeData.data.main.humidity}%
                </p>
                <p className="fetched-data">
                  Wind: {timeData.data.wind.speed} m/s
                </p>
                <p className="fetched-data">
                  Weather: {timeData.data.weather[0].main}
                </p>
              </div>
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
