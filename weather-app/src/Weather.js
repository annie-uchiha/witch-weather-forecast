import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import config from "./config";
import WeatherCard from "./components/WeatherCard";
import "./Weather.scss";

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastType, setForecastType] = useState(null);
  const API_KEY = config.apiKey;

  const fetchWeatherData = async (type) => {
    try {
      const endpoint =
        type === "current"
          ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
          : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(endpoint);
      setWeatherData(response.data);
      setForecastType(type);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    fetchWeatherData(type);
  };

  const handleDownload = () => {
    if (weatherData) {
      const json = JSON.stringify(weatherData);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "weather_forecast.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <form onSubmit={(e) => handleSubmit(e, forecastType)}>
            <div className="d-flex justify-content-between">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  value={location}
                  onChange={handleLocationChange}
                />
              </div>
              <Button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e, "current")}
              >
                Current Weather
              </Button>
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => handleSubmit(e, "5-day")}
              >
                5-day Forecast
              </Button>
            </div>
          </form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <Button
            variant="success"
            onClick={handleDownload}
            disabled={!weatherData}
          >
            Download Forecast
          </Button>
        </Col>
      </Row>
      <div className="weather-cards-container">
        {forecastType === "5-day" &&
          weatherData &&
          weatherData.list &&
          weatherData.list
            .slice(0, 5)
            .map((item) => (
              <WeatherCard
                key={item.dt}
                dt={item.dt * 1000}
                temp_min={item.main.temp_min}
                temp_max={item.main.temp_max}
                main={item.weather[0].main}
                icon={item.weather[0].icon}
              />
            ))}
        {forecastType === "current" && weatherData && (
          <WeatherCard
            key={weatherData.dt}
            dt={weatherData.dt * 1000}
            temp_min={weatherData.main.temp_min}
            temp_max={weatherData.main.temp_max}
            main={weatherData.weather[0].main}
            icon={weatherData.weather[0].icon}
          />
        )}
      </div>
    </Container>
  );
}

export default Weather;
