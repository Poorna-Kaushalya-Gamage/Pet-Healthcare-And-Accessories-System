import React, { useState, useEffect } from "react";
import Navbar from "../nav/nav admin"; // Import Navbar component
import logo from "../images/logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  FaDog,
  FaPlus,
  FaCalendarAlt,
  FaTruck,
  FaTshirt,
  FaMoneyBillAlt,
  FaPhotoVideo,
} from "react-icons/fa";

//.............................

const URL = "http://localhost:5000/employees";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

//.............................

function AdminDashboard() {
  const { email } = useParams();
  const location = useLocation();
  const stateEmail = location.state?.email;
  const userEmail = email || stateEmail;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchHandler().then((data) => setEmployee(data.employees));
  }, []);

  //DELETE pet
  const deleteemployees = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      // After deletion, fetch the updated list of users
      const updateemployees = employee.filter(
        (employees) => employees._id !== _id
      );
      setEmployee(updateemployees);
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };

  const generateRandomColor = () => {
    // Generate random values for RGB components (spread out across the middle range)
    const r = Math.floor(Math.random() * 128 + 128); // Adjusted range for middle-range colors
    const g = Math.floor(Math.random() * 128 + 128); // Adjusted range for middle-range colors
    const b = Math.floor(Math.random() * 128 + 128); // Adjusted range for middle-range colors

    // Construct the color string in hexadecimal format
    const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
  };

  const generateBackgroundColor = () => {
    return generateRandomColor();
  };

  useEffect(() => {
    const fetchEmployeesDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employees/email/${userEmail}`
        );
        setEmployee(response.data.employees);
        // Fetch pets associated with the user's email
      } catch (error) {
        console.error("Error fetching employees details:", error);
      }
    };
    fetchEmployeesDetails();
  }, [email]);

  return (
    <div className="h-screen">
      <Navbar /> {/* Include Navbar component */}
      <div className="flex h-full ">
        {/* Sidebar */}
        <nav className="w-64 px-6 py-4" style={{ backgroundColor: "#46505D" }}>
          <div
            className="flex justify-center items-center mb-10"
            style={{ position: "absolute", top: "70px" }}
          >
            <img src={logo} alt="Petpulse Logo" className="h-15 w-16" />
            <span className="text-white text-3xl font-bold ml-2">Petpulse</span>
          </div>
          <div style={{ position: "absolute", top: "180px" }}>
            <ul>
              <li className="mb-4">
                <a
                  href="/Adduser"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaDog className="mr-2" />
                  Add Pet Owners
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/userdetails"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaPlus className="mr-2" />
                  View Pet Owners
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/AddPets"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaCalendarAlt className="mr-2" />
                  Add Pets
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/ViewPets"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaTruck className="mr-2" />
                  View Pets
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/AddAdmin"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaTshirt className="mr-2" />
                  Add Employees
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/ViewEmployees"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaMoneyBillAlt className="mr-2" />
                  View Employees
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/petrecords"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaMoneyBillAlt className="mr-2" />
                  Pet Records
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="fg"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaPhotoVideo className="mr-2" />
                  Media Library
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/pdashboard"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaPhotoVideo className="mr-2" />
                  Product Management
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="/deldashbord"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaTruck className="mr-2" />
                  Delivery Management
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow p-8 overflow-y-auto">
          {employee ? (
            <>
              <h1 className="text-3xl font-bold mb-4">
                <center>
                  Welcome, {employee.fullName}
                  <font style={{ fontSize: "12px" }}> [Admin]</font>
                </center>
              </h1>

              <div
                style={{ position: "absolute", top: "17px", left: "1180px" }}
              >
                <p style={{ fontSize: "16px", color: "white" }}>
                  <b>Hi, {employee.fullName}</b>
                </p>
              </div>

              <div style={{ position: "absolute", top: "20px", left: "750px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Admin Dashboard
                </p>
              </div>

              <div
                style={{ position: "absolute", top: "15px", left: "1380px" }}
              >
                <input
                  type="text"
                  value={
                    employee && employee.fullName
                      ? employee.fullName.charAt(0).toUpperCase()
                      : ""
                  }
                  style={{
                    fontSize: "16px",
                    color: "black",
                    backgroundColor: generateBackgroundColor(),
                    width: "37px",
                    height: "37px",
                    borderRadius: "50%",
                    border: "2px solid #06abcc",
                    textAlign: "center",
                    fontWeight: "bold", // Make the text bold
                  }}
                  readOnly // Make the input field read-only
                />
              </div>

              <div>
                <div className="container mt-4">
                  <div
                    style={{
                      position: "absolute",
                      top: "140px",
                      left: "300px",
                    }}
                  >
                    <label htmlFor="info">
                      <h3>Admin Details</h3>
                    </label>
                    <br />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "150px",
                        width: "1000px",
                        height: "20px",
                        color: "#0648A4",
                      }}
                    >
                      <hr style={{ borderTop: "3px solid #0648A4" }} />{" "}
                      {/* Increase thickness */}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      position: "absolute",
                      top: "180px",
                      left: "300px",
                    }}
                  >
                    {/* Display the image */}
                    <img
                      src={`http://localhost:5000/profileimage/${employee.userimage}`}
                      alt="User Image"
                      style={{ maxWidth: "180px", borderRadius: "50%" }}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "180px",
                      left: "700px",
                      width: "900px",
                      fontSize: "16px",
                    }}
                  >
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="employeeID"
                        style={{ fontSize: "14px", fontFamily: "cursive" }}
                      >
                        Employee ID
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.employeeID}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "50px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="fullName"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Full Name
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.fullName}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "90px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="gender"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Gender
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.gender}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "130px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="dateOfBirth"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Date Of Birth
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.dateOfBirth}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "170px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="address"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Address
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.address}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "210px",
                        left: "-200px",
                      }}
                    >
                      <label
                        htmlFor="startDate"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Start Date
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.startDate}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="phoneNumber"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Phone No
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.phoneNumber}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "50px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="email"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Email
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.email}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "90px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="jobTitle"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        job Title
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.jobTitle}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "130px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="department"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Department :&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.department}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "170px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="employmentStatus"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        job Status :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.employmentStatus}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "210px",
                        left: "330px",
                      }}
                    >
                      <label
                        htmlFor="password"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Password
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + employee.password}
                        readOnly
                        style={{
                          fontWeight: "bold",
                          borderRadius: "10px",
                          width: "350px",
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "250px",
                        left: "-100px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <Link to={`/Updateemployee/${employee._id}`}>
                        <button
                          style={{
                            backgroundColor: "#119c2f",
                            color: "#fff",
                            border: "none",
                            padding: "3px 40px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "250px",
                        left: "50px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <input
                        type="button"
                        value="Delete"
                        style={{
                          backgroundColor: "#0359B4",
                          color: "#fff",
                          border: "none",
                          padding: "3px 30px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#0056b3";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#1A7DE7";
                        }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "250px",
                        left: "200px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <input
                        type="button"
                        value="Logout"
                        style={{
                          backgroundColor: "#E80606",
                          color: "#fff",
                          border: "none",
                          padding: "3px 30px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#A11010";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#E80606";
                        }}
                        onClick={() => {
                          window.location.href = "/mainhome";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
