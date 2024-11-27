import React, { useState } from "react";
import Login from "../Login/Login";
import { useLocation } from "react-router-dom";

const NavBar = ({ userEmail }) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <div style={{ backgroundColor: "#073068", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}>
        <div>
          <h1 style={{ color: "white", fontFamily: "cursive", fontWeight: "bolder" }}>Petpulse</h1>
        </div>

        <div>
          <a href="/mainhome" style={{ color: location.pathname === "/mainhome" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>{userEmail}</a>
          
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: "white", marginRight: "5px" }}>{userEmail}</span>
            
          </div>
        </div>
      </div>
      {showLogin && <Login onClose={toggleLogin} />}
    </>
  );
};

export default NavBar;
