import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import backgroundImage from "../images/updateuser.jpg";
import logo from "../images/logo.png";

// Import AddUser.css
import "../Add User/AddUser.css";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        userRegNo: String(inputs.userRegNo),
        firstName: String(inputs.firstName),
        lastName: String(inputs.lastName),
        nic: String(inputs.nic),
        password: String(inputs.password),
        email: String(inputs.email),
        phoneNo: Number(inputs.phoneNo),
        usertAddress: String(inputs.usertAddress),
        username: String(inputs.username),
      })
      .then((res) => res.data);
  };

  const handlechange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/userdetails"));
  };

  return (
    <div
      className="updateform"
      style={{
        position: "absolute",
        height: "0%",
        top: "150px",
        left: "5%",
        maxwidth: "50%",
      }}
    >
      <div className="card">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "880px",
            position: "absolute",
            top: "-50px",
            left: "230px",
            height: "70vh",
            borderRadius: "30px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ position: "relative", left: "350px", top: "50px" }}>
            <h2>Upadate User Details</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="container mt-4"
            style={{ position: "absolute", top: "100px", left: "80px" }}
          >
            <div className="form-group">
              <label
                htmlFor="userRegNo"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                User Registration No :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="userRegNo"
                name="userRegNo"
                onChange={handlechange}
                value={inputs.userRegNo}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="firstName"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                First Name :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="firstName"
                name="firstName"
                onChange={handlechange}
                value={inputs.firstName}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="nic"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                NIC :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="nic"
                name="nic"
                onChange={handlechange}
                value={inputs.nic}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                Email :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="email"
                name="email"
                onChange={handlechange}
                value={inputs.email}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="phoneNo"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                Phone No :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="phoneNo"
                name="phoneNo"
                onChange={handlechange}
                value={inputs.phoneNo}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="usertAddress"
                style={{
                  fontSize: "14px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  color: "#2b2a2a",
                }}
              >
                User Address :
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="input-field1"
                id="usertAddress"
                name="usertAddress"
                onChange={handlechange}
                value={inputs.usertAddress}
                required
                style={{
                  width: "25%",
                  padding: "5px",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
              />
            </div>

            <div className="formde2">
              <div className="form-group">
                <label
                  htmlFor="lastName"
                  style={{
                    fontSize: "14px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                    color: "#2b2a2a",
                  }}
                >
                  Last Name:
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="input-field2"
                  id="lastName"
                  name="lastName"
                  onChange={handlechange}
                  maxLength={10}
                  value={inputs.lastName}
                  required
                  style={{
                    width: "50%",
                    padding: "5px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  }}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="username"
                  style={{
                    fontSize: "14px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                    color: "#2b2a2a",
                  }}
                >
                  Username :
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="input-field2"
                  id="username"
                  name="username"
                  onChange={handlechange}
                  value={inputs.username}
                  required
                  style={{
                    width: "50%",
                    padding: "5px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  }}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                    color: "#2b2a2a",
                  }}
                >
                  Password :
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="password"
                  className="input-field2"
                  id="password"
                  name="password"
                  onChange={handlechange}
                  value={inputs.password}
                  required
                  style={{
                    width: "50%",
                    padding: "5px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  }}
                />
              </div>
            </div>

            <div
              className="formde3"
              style={{ position: "absolute", top: "150px", left: "520px" }}
            >
              <div className="button-container">
                <input
                  type="submit"
                  value="Update"
                  className="submit-btn"
                  style={{
                    width: "25%",
                    padding: "3px",
                    backgroundColor: "#002aff",
                    color: "rgb(255, 255, 255)",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "larger",
                    fontWeight: "bolder",
                  }}
                />
              </div>
              <div style={{ position: "absolute", top: "70px", left: "100px" }}>
                <img
                  src={logo}
                  alt="Petpulse Logo"
                  style={{ width: "100px" }}
                />
                <p
                  style={{
                    fontSize: "30px",
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "cursive",
                  }}
                >
                  <center>Petpulse</center>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
