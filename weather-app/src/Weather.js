import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import config from "./config";
import "./Weather.scss";

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastType, setForecastType] = useState("5-day forecast");
  const API_KEY = config.apiKey;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/${
          forecastType === "current weather" ? "weather" : "forecast"
        }?q=${location}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleForecastTypeChange = (type) => {
    setForecastType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
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
          <form onSubmit={handleSubmit}>
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
              <DropdownButton id="dropdown-basic-button" title={forecastType}>
                <Dropdown.Item
                  onClick={() => handleForecastTypeChange("current weather")}
                >
                  Current Weather
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleForecastTypeChange("5-day forecast")}
                >
                  5-day Forecast
                </Dropdown.Item>
              </DropdownButton>
              <button type="submit" className="btn btn-primary">
                Get Weather Forecast
              </button>
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
      <Row className="justify-content-center mt-3">
        {weatherData &&
          weatherData.list.map((item) => (
            <Col key={item.dt} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{item.dt_txt}</Card.Title>
                  <Card.Text>
                    Temperature: {item.main.temp} °C
                    <br />
                    Description: {item.weather[0].description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Weather;
