import React, { useState, useEffect } from "react";
import Navbar from "../nav/nav user"; // Import Navbar component
import logo from "../images/logo.png";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

//.......import images........
import accessories from "../images/accessories.png";
import appointment from "../images/appointment.png";
import customer_service from "../images/customer service.png";
import delivery from "../images/delivery.png";
import media from "../images/media.png";
import payments from "../images/payments.png";
import track from "../images/track.png";

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

const URL = "http://localhost:5000/pets";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

//.............................

function UserDashboard() {
  const { email } = useParams();
  const location = useLocation();
  const stateEmail = location.state?.email;
  const userEmail = email || stateEmail;
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setPets(data.Pets));
  }, []);

  //DELETE pet
  const deletepet = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      // After deletion, fetch the updated list of users
      const updatedpets = pets.filter((pet) => pet._id !== _id);
      setPets(updatedpets);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const URLi = "http://localhost:5000/users";
  //DELETE USER
  const deleteUser = async (_id) => {
    try {
      await axios.delete(`${URLi}/${_id}`);
      // After deletion, fetch the updated list of users
      const updatedUsers = user.filter((user) => user._id !== _id);
      setUser(updatedUsers);
      navigate("/mainhome");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const generateRandomColor = () => {
    // Generate random values for RGB components (spread out across the middle range)
    const r = Math.floor(Math.random() * 128 + 128);
    const g = Math.floor(Math.random() * 128 + 128);
    const b = Math.floor(Math.random() * 128 + 128);

    // Construct the color string in hexadecimal format
    const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
  };

  const generateBackgroundColor = () => {
    return generateRandomColor();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/email/${userEmail}`
        );
        setUser(response.data.user);
        // Fetch pets associated with the user's email
        const petResponse = await axios.get(
          `http://localhost:5000/pets/owner/${userEmail}`
        );
        setPets(petResponse.data.pets);
      } catch (error) {
        console.error("Error fetching user and pet details:", error);
      }
    };

    fetchUserDetails();
  }, [email]);

  return (
    <div className="h-screen ">
      <Navbar /> {/* Include Navbar component */}
      <div className="flex h-full">
        {/* Sidebar */}
        <nav className="w-64 px-6 py-4" style={{ backgroundColor: "#073068" }}>
          <div
            className="flex justify-center items-center mb-10"
            style={{ position: "absolute", top: "120px" }}
          >
            <img src={logo} alt="Petpulse Logo" className="h-19 w-20" />
            <span className="text-white text-3xl font-bold ml-2">Petpulse</span>
          </div>
          <div style={{ position: "absolute", top: "320px" }}>
            <ul>
              <li className="mb-4">
                <a
                  href="ac"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaDog className="mr-2" />
                  My Pets
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/Addpets"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaPlus className="mr-2" />
                  Add Pets
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="bc"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaCalendarAlt className="mr-2" />
                  Appointment
                </a>
              </li>
              <li className="mb-4">
                <a
                  href={`/CustomerView/${userEmail}`}
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaTruck className="mr-2" />
                  Delivery Tracking
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="de"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaTshirt className="mr-2" />
                  Accessories
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="ef"
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaMoneyBillAlt className="mr-2" />
                  Payments
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
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow p-8 overflow-y-auto">
          {user ? (
            <>
              <h1 className="text-3xl font-bold mb-4">
                <center>Welcome, {user.firstName + " " + user.lastName}</center>
              </h1>

              <div
                style={{ position: "absolute", top: "10px", left: "1240px" }}
              >
                <p style={{ fontSize: "14px", color: "white", top:"10px" }}>
                  <b>Hi, {user.firstName + " " + user.lastName}</b>
                </p>
              </div>

              <div style={{ position: "absolute", top: "70px", left: "25px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  User Dashboard
                </p>
              </div>

              <div
                style={{ position: "absolute", top: "6px", left: "1400px" }}
              >
                <input
                  type="text"
                  value={
                    user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()
                  }
                  style={{
                    fontSize: "12px",
                    color: "black",
                    backgroundColor: generateBackgroundColor(),
                    width: "35px",
                    height: "35px",
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
                      top: "120px",
                      left: "300px",
                    }}
                  >
                    <label htmlFor="info">
                      <h2>User Details</h2>
                    </label>
                    <br />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "120px",
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
                      left: "290px",
                    }}
                  >
                    {/* Display the image */}
                    <img
                      src={`http://localhost:5000/profileimage/${user.userimage}`}
                      alt={`${user.firstName}'s Profile Picture`}
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
                        htmlFor="userRegNo"
                        style={{ fontSize: "14px", fontFamily: "cursive" }}
                      >
                        User Registration No :&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.userRegNo}
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
                        htmlFor="firstName"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        First Name
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.firstName}
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
                        htmlFor="lastName"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Last Name
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.lastName}
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
                        htmlFor="nic"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        NIC
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.nic}
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
                        htmlFor="email"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Email
                        :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.email}
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
                        htmlFor="phoneNo"
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
                        value={"  " + user.phoneNo}
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
                        htmlFor="userAddress"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        User Address :&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.usertAddress}
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
                        htmlFor="username"
                        style={{
                          fontSize: "14px",
                          fontFamily: "cursive",
                          textDecoration: "bolder",
                        }}
                      >
                        Username :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <input
                        type="text"
                        value={"  " + user.username}
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
                        type="password"
                        value={user.password}
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
                        left: "250px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <Link to={`/userdetails/${user._id}`}>
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
                        top: "170px",
                        left: "370px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <button
                        className="bg-red-500 text-white px-10 py-1  hover:bg-red-700"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "#031cfc",
                        }}
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        top: "170px",
                        left: "520px",
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
                <div
                  style={{
                    position: "absolute",
                    top: "390px",
                    left: "300px",
                    width: "1260px",
                    height: "20px",
                    color: "#0648A4",
                  }}
                >
                  <label htmlFor="info">
                    <h3>Pet's Details</h3>
                  </label>
                </div>
                <br />
                <div
                  style={{
                    position: "absolute",
                    top: "400px",
                    left: "420px",
                    width: "1000px",
                    height: "20px",
                    color: "#0648A4",
                  }}
                >
                  <hr style={{ borderTop: "3px solid #0648A4" }} />{" "}
                  {/* Increase thickness */}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}

          {/*....................................pet details..............................................*/}
          <div
            className="flex justify-center mt-10"
            style={{ position: "absolute", top: "400px", left: "270px" }}
          >
            <div>
              {pets.length > 0 ? (
                <table className="border-4 border-collapse w-99">
                  <thead>
                    <tr>
                      <th className="border p-2">Pet Image</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Breed</th>
                      <th className="border p-2">Birthday</th>
                      <th className="border p-2">Sex</th>
                      <th className="border p-2">Weight</th>
                      <th className="border p-2">Microchip Id</th>
                      <th className="border p-2">Color</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets.map((pet) => (
                      <tr key={pet._id}>
                        <td className="border p-2">
                          <img
                            src={`http://localhost:5000/profileimage/${pet.petImage}`}
                            alt="User Image"
                            style={{ maxWidth: "50px", borderRadius: "50%" }}
                          />
                        </td>
                        <td className="border p-2">{pet.name}</td>
                        <td className="border p-2">{pet.type}</td>
                        <td className="border p-2">{pet.breed}</td>
                        <td className="border p-2">{pet.birthday}</td>
                        <td className="border p-2">{pet.sex}</td>
                        <td className="border p-2">{pet.weight}</td>
                        <td className="border p-2">{pet.microchipId}</td>
                        <td className="border p-2">{pet.color}</td>
                        <td className="border p-2">
                          <Link to={`/UpdatePet/${pet._id}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                              Update
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={() => deletepet(pet._id)}
                          >
                            Delete
                          </button>&nbsp;&nbsp;
                          <Link to={`/Petprofile/${pet.microchipId}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                              View Pet
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>
                  <center>No pets available.</center>
                </p>
              )}
            </div>

            <div style={{ position: "absolute", top: "200px", left: "950px" }}>
              <Link to={`/AddPets`}>
                <button
                  className="bg-blue-500 text-white px-16 py-2 rounded-xl hover:bg-blue-700 mr-2"
                  style={{ fontSize: "14px", backgroundColor: "#119c3b" }}
                >
                  Add_Pets
                </button>
              </Link>
            </div>
          </div>
          {/*..........................................Quick links................................................*/}
          <div>
            <div
              style={{
                position: "absolute",
                top: "690px",
                left: "300px",
              }}
            >
              <label htmlFor="info">
                <h3>Quick Links</h3>
              </label>
              <br />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "120px",
                  width: "1000px",
                  height: "20px",
                  color: "#0648A4",
                }}
              >
                <hr style={{ borderTop: "3px solid #0648A4" }} />{" "}
                {/* Increase thickness */}
              </div>
            </div>

            <div style={{ position: "absolute", top: "720px", left: "250px" }}>
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <li className="mb-4">
                  <Link
                    to="/accessories"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={accessories}
                      alt="My Pets"
                      style={{
                        width: "240px",
                        height: "130px",
                        marginRight: "-50px",
                      }}
                    />
                  </Link>
                  <div
                    style={{ position: "absolute", top: "120px", left: "77px" }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Accessories</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to="/track"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={track}
                      alt="track"
                      style={{
                        width: "150px",
                        height: "120px",
                        marginRight: "20px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "215px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Pet Health Details</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to="/appointment"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={appointment}
                      alt="appointment"
                      style={{
                        width: "120px",
                        height: "120px",
                        marginRight: "50px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "400px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Appointment</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to="/media"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={media}
                      alt="track"
                      style={{
                        width: "110px",
                        height: "80px",
                        marginRight: "50px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "560px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Media Library</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to="/payments"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={payments}
                      alt="payments"
                      style={{
                        width: "120px",
                        height: "110px",
                        marginRight: "15px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "740px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Payments</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to={`/CustomerView/${userEmail}`}
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={delivery}
                      alt="delivery"
                      style={{
                        width: "240px",
                        height: "140px",
                        marginRight: "-50px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "910px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Delivery</b>
                    </p>
                  </div>
                </li>
                <li className="mb-4">
                  <Link
                    to="/customer_service"
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    <img
                      src={customer_service}
                      alt="customer_service"
                      style={{
                        width: "130px",
                        height: "120px",
                        marginRight: "10px",
                      }}
                    />
                  </Link>
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "1050px",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>
                      <b>Customer Service</b>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
