import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import Header from "./Header";
import { FaSun, FaMoon } from "react-icons/fa";
import "./App.css";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDay(!isDay);
  };

  return (
    <div className={`App ${isDay ? "day" : "night"}`}>
      {!showContent && (
        <div className="fog-overlay">
          <video autoPlay muted loop preload="auto" className="fog-video">
            <source src="./assets/fog.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="toggle-icon" onClick={toggleTheme}>
        {isDay ? <FaMoon /> : <FaSun />}
      </div>
      <Header />
      {showContent && <Weather />}
    </div>
  );
}

export default App;
