import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Otp from "../OTP_Verify/otp";
import backgroundImage from "../images/bg5.jpg";
import adminBackgroundImage from "../images/adminbg1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("user"); // Default user type
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    const loginEndpoint = userType === "user" ? "/users/login" : "/employees/AdminLogin";

    axios
      .post(`http://localhost:5000${loginEndpoint}`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log("Login Success");
          alert("Email and Password are Correct.");
          if (userType === "user") {
            setShowOtp(true);
          } else {
            navigate("/AdminDashboard", { state: { email } });
          }
        } else {
          setErrorMessage("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card">
        <div
          style={{
            backgroundImage: `url(${userType === "user" ? backgroundImage : adminBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "800px",
            position: "absolute",
            top: "140px",
            left: "400px",
            height: "60vh",
            borderRadius: "30px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
           className="card-body"
           style={{
             width: "300px",
             position: "absolute",
             top: "25px",
             left: "70px",
            }}
          >
            <h2
              className="card-title mb-4 text-center"
              style={{
                fontSize: "40px",
                fontFamily: "cursive",
                fontWeight: "bold",
                color: "rgb(9, 9, 209)",
              }}
            >
              Petpulse
            </h2>

            <h2
              className="card-title mb-3 text-center"
              style={{
                color: "black",
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              {userType === "user" ? "User" : "Employee"} Login
            </h2>

            {showOtp ? (
              <Otp email={email} /> // Pass email as prop
            ) : (
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
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">
                    <strong>User Type</strong>
                  </label>
                  <select
                    id="userType"
                    className="form-select"
                    onChange={(event) => setUserType(event.target.value)}
                    value={userType}
                  >
                    <option value="user">User</option>
                    <option value="admin">Employee</option>
                  </select>
                </div>
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
            )}

            <p
              className="my-3 text-center"
              style={{
                fontSize: "15px",
                fontFamily: "cursive",
                fontWeight: "initial",
                color: "rgb(255, 0, 0 )",
              }}
            >
              Don't have an account? <Link to="/adduser">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
