import React from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/NavBar.css";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const handleButtonClick = () => {
    localStorage.state = "home";
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div>
        <p>UWU</p>
        <button
          onClick={handleButtonClick}
          className={path === "/" ? "nav-select" : "nav-not-select"}
        >
          Home
        </button>
      </div>
    </div>
  );
};
