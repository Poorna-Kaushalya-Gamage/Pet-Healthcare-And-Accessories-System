import React, { useState } from "react";
import Login from "../Login/Login";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
    <div style = {{position: "absolute", top: "10px",left:"1300px"}}> 
      <Navbar > 
        
        <Nav className="me-auto">
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavDropdown title="Login or Sign Up" style={{ color: "#073068", fontFamily: "cursive", fontWeight: "bolder", fontSize: "14px" }}>{/* Text color */}
            <NavDropdown.Item onClick={toggleLogin}>Login</NavDropdown.Item>
            <NavDropdown.Item href="/adduser">Register</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/mainhome">Log Out</NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Navbar>
      </div>
      {showLogin && <Login onClose={toggleLogin} />}
    </>
  );
};

export default NavBar;
