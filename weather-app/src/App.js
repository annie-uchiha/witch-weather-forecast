import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {!showContent && (
        <div className="fog-overlay">
          <video autoPlay muted loop preload="auto" className="fog-video">
            <source src="./assets/fog.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <header className="App-header">
        <h1>Witches Weather Forecast</h1>
      </header>
      {showContent && <Weather />}
    </div>
  );
}

export default App;
