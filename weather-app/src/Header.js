import React, { useEffect, useState } from "react";
import "./Header.scss";

const Header = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="header">
      <img
        src="../assets/header-banner.png"
        alt="Header"
        className="header-image"
      />
      {startAnimation && (
        <img
          src="../assets/black-cat-run.gif"
          alt="Black Cat"
          className="cat-gif"
        />
      )}
    </header>
  );
};

export default Header;
