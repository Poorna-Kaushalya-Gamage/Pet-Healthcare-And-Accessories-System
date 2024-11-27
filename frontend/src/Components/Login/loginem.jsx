import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../images/adminbg1.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    axios
      .post(`http://localhost:5000/employees/AdminLogin`, { email, password })
      .then((response) => {
        console.log(response);
        if (response.data === "Success") {
          console.log("Login Success");
          navigate("/AdminDashboard", { state: { email } });
        } else {
          setErrorMessage("Incorrect password! Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card">
      <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "700px",
            position: "absolute",
            top: "140px",
            left: "-350px",
            height: "50vh",
            borderRadius: "30px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="card-body"
            style={{
              width: "300px",
              position: "absolute",
              top: "15px",
              left: "330px",
            }}
          >
            <h2
              className="card-title mb-4 text-center"
              style={{
                fontSize: "40px",
                fontFamily: "cursive",
                fontWeight: "bold",
                color: "rgb(9, 9, 209",
              }}
            >
              Petpulse
            </h2>
            <div style={{ position: "absolute", top: "70px", left: "60px" }}>
              <h2
                className="card-title mb-3 text-center"
                style={{
                  color: "black",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                Employee Login
              </h2>
            </div>
            <br />
            <br />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <strong>Email Id</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "100px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </button>
              </div>
            </form>

            <p
              className="my-3 text-center"
              style={{
                fontSize: "15px",
                fontFamily: "cursive",
                fontWeight: "initial",
                color: "rgb(18, 12, 122 )",
              }}
            >
              Don't have an account?{" "}
              <Link to="/AddAdmin" style={{ color: "rgb(110, 7, 12)" }}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
