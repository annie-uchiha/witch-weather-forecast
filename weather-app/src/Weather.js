import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "c0703afc23fc229cf83c9e599923f44d";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Get Weather Forecast
            </button>
          </form>
        </Col>
      </Row>
      {weatherData && (
        <Row className="justify-content-center">
          {weatherData.list.map((item) => (
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
      )}
    </Container>
  );
}

export default Weather;
