import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";

import updateemployeeimage from "../images/updateemployee.jpg"

function Updateemployee() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/employees/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.employees));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/employees/${id}`, {
        fullName: String(inputs.fullName),
        gender: String(inputs.gender),
        dateOfBirth: new Date(inputs.dateOfBirth),
        address: String(inputs.address),
        phoneNumber: String(inputs.phoneNumber),
        email: String(inputs.email),
        jobTitle: String(inputs.jobTitle),
        employeeID: String(inputs.employeeID),
        department: String(inputs.department),
        startDate: new Date(inputs.startDate),
        employmentStatus: String(inputs.employmentStatus),
        password: String(inputs.password),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/AdminLogin"));
  };

  return (
    <div className="updateform">
      <div
        className="card"
        style={{
          width: "1300px",
          position: "absolute",
          top: "10px",
          left: "120px",
          padding: "20px",
          backgroundImage: `url(${updateemployeeimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "700px",
          borderRadius: "30px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        }}
      >
       <div style={{ position: "absolute", left: "20px", top: "0px",width:"750px"}}>
       <div style={{ position: "absolute", left: "180px", top: "100px", backgroundColor: "rgba(255, 255, 255, 0.3)", width: "900px",height:"550px", borderRadius:"7%", padding:"10px" }}></div>
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "450px",
            fontSize: "24px",
            fontFamily: "cursive",
            fontWeight: "bolder",
            color:"white",
          }}
        >
          Update Employee Details
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            style={{
              position: "absolute",
              top: "130px",
              left: "230px",
              width: "350px",
            }}
          >
            <div className="mb-4">
              <label htmlFor="employeeID" className="form-label">
                Employee ID:
              </label>
              <input
                type="text"
                name="employeeID"
                value={inputs.employeeID}
                onChange={handleChange}
                className="form-control"
                placeholder="Employee ID"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fullName" className="form-label">
                Full Name:
              </label>

              <input
                type="text"
                name="fullName"
                value={inputs.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <select
                name="gender"
                value={inputs.gender}
                onChange={handleChange}
                className="form-select"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth:
              </label>
              <input
                type="text"
                name="dateOfBirth"
                value={inputs.dateOfBirth}
                onChange={handleChange}
                className="form-control"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Address"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={inputs.phoneNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Phone Number"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "110px",
              left: "690px",
              width: "350px",
            }}
          >
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="jobTitle" className="form-label">
                Job Title:
              </label>
              <input
                type="text"
                name="jobTitle"
                value={inputs.jobTitle}
                onChange={handleChange}
                className="form-control"
                placeholder="Job Title"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="form-label">
                Department:
              </label>
              <select
                name="department"
                value={inputs.department}
                onChange={handleChange}
                className="form-select"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              >
                <option value="">Select Department</option>
                <option value="Veterinary Services">Veterinary Services</option>
                <option value="Reception">Reception</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="form-label">
                Start Date:
              </label>
              <input
                type="text"
                name="startDate"
                value={inputs.startDate}
                onChange={handleChange}
                className="form-control"
                required
                style={{
                  fontSize: "14px",
                  fontFamily: "initial",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Employment Status:</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="fullTime"
                  name="employmentStatus"
                  value="Full time"
                  onChange={handleChange}
                  checked={inputs.employmentStatus === "Full time"}
                  className="form-check-input"
                />
                <label
                  htmlFor="fullTime"
                  className="form-check-label"
                  style={{
                    fontSize: "14px",
                    fontFamily: "initial",
                    fontWeight: "bold",
                  }}
                >
                  Full time
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="partTime"
                  name="employmentStatus"
                  value="Part time"
                  onChange={handleChange}
                  checked={inputs.employmentStatus === "Part time"}
                  className="form-check-input"
                />
                <label
                  htmlFor="partTime"
                  className="form-check-label"
                  style={{
                    fontSize: "14px",
                    fontFamily: "initial",
                    fontWeight: "bold",
                  }}
                >
                  Part time
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="contract"
                  name="employmentStatus"
                  value="Contract"
                  onChange={handleChange}
                  checked={inputs.employmentStatus === "Contract"}
                  className="form-check-input"
                />
                <label
                  htmlFor="contract"
                  className="form-check-label"
                  style={{
                    fontSize: "14px",
                    fontFamily: "initial",
                    fontWeight: "bold",
                  }}
                >
                  Contract
                </label>
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "560px",
              left: "340px",
              width: "350px",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                height: "30px",
                width: "150px",
                borderRadius: "20px",
                fontWeight: "bolder",
              }}
            >
              Update
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Updateemployee;
