import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logoimage from "../images/logo.png";

const NavBar = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <div style={{ backgroundColor: "#073068", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoimage} alt="logo" style={{ width: "40px", height: "40px" }} />
          <h1 style={{ color: "white", fontFamily: "cursive", textDecoration: "bolder", marginLeft: "10px" }}>Petpulse</h1>
        </div>
        <nav>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex" }}>
            <li>
              <a href="/mainhome" style={{ color: location.pathname === "/mainhome" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>Home</a>
            </li>
            <li>
              <a href="/adduser" style={{ color: location.pathname === "/AdminLogin" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>Pet pulse Blog</a>
            </li>
            <li>
              <a href="/Otp" style={{ color: location.pathname === "/Otp" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>Otp</a>
            </li>
            <li>
              <a href="/AdminLogin" style={{ color: location.pathname === "/AdminLogin" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>User Login</a>
            </li>
            <li>
              <a href="/adduser" style={{ color: location.pathname === "/AdminLogin" ? "white" : "inherit", textDecoration: "none", marginRight: "20px" }}>Register</a>
            </li>
            
          </ul>
        </nav>
      </div>
      {showLogin && <Login onClose={toggleLogin} />}
    </>
  );
};

export default NavBar;