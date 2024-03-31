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

  const handleShowOpenWindow = async ()=> {
		const result = await window.electron.tutorial.showtTutorialWindow()
    console.log(result);
    
	}

  return (
    <div className="nav-bar">
      <div>
        <p>Node TSC</p>
        <button
          onClick={handleButtonClick}
          className={path === "/" ? "nav-select" : "nav-not-select"}
        >
          Home
        </button>
        <button onClick={handleShowOpenWindow}>Tutorial</button>
      </div>
    </div>
  );
};
