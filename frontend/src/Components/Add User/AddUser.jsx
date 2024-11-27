import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../nav/nav";
import backgroundImage from "../images/bg3.jpg";
import Footer from "../Footer/Footer";
import { FaUserCircle } from "react-icons/fa";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    userimage: "",
    userRegNo: "",
    firstName: "",
    lastName: "",
    nic: "",
    password: "",
    email: "",
    phoneNo: "",
    usertAddress: "",
    username: "",
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handlechange = (e) => {
    if (e.target.name === "image") {
      // Update state with the selected file
      setInputs((prevState) => ({
        ...prevState,
        image: e.target.files[0], // Access the selected file
      }));
    } else {
      // For other input fields, update state with the input value
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (termsChecked) {
      // Create a FormData object
      const formData = new FormData();
      formData.append("image", inputs.userimage); // Assuming inputs.userimage contains the selected image file

      // Check if a file is selected
      if (inputs.userimage) {
        try {
          const response = await axios.post(
            "http://localhost:5000/profileimage",
            formData
          );
          const userimage = response.data.image;

          await sendRequest(userimage);
          history("/mainhome");
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error (e.g., show error message to the user)
        }
      } else {
        alert("Please select a profile picture.");
      }
    } else {
      alert("Please accept the Terms and Conditions.");
    }
  };

  const sendRequest = async (imageName) => {
    try {
      await axios.post("http://localhost:5000/users", {
        userimage: String(inputs.userimage.name), // Pass the image name instead of the file
        userRegNo: String(inputs.userRegNo),
        firstName: String(inputs.firstName),
        lastName: String(inputs.lastName),
        nic: String(inputs.nic),
        password: String(inputs.password),
        email: String(inputs.email),
        phoneNo: Number(inputs.phoneNo),
        usertAddress: String(inputs.usertAddress),
        username: String(inputs.username),
      });
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // Define handleProfilePictureChange function
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setInputs((prevInputs) => ({
      ...prevInputs,
      userimage: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview(null);
    }
  };

  const [passhow, setPassShow] = useState(false);

  return (
    <div
      className="h-screen bg-gray-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div
        className="mx-auto p-4 rounded-md"
        style={{
          maxWidth: "300px",
          position: "relative",
          top: "40px",
          left: "300px",
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{ position: "relative", top: "-20px", left: "130px" }}>
              <h2 className="text-center text-4xl font-bold mb-2">Sign In</h2>
            </div>
            <div style={{ position: "relative", top: "0px", left: "0px" }}>
              <h3 className="text-2xl font-semibold mb-4">
                <u>User Details</u>
              </h3>
              <div className="mb-3">
                <label htmlFor="userimage" className="form-label">
                  Profile Picture:
                </label>
                <div className="d-flex align-items-center">
                  {" "}
                  <input
                    type="file"
                    className="form-control"
                    id="userimage"
                    name="userimage"
                    onChange={handleProfilePictureChange}
                  />
                  {inputs.userimage && inputs.userimage.name && (
                    <p className="mt-3">
                      Selected file: {inputs.userimage.name}
                    </p>
                  )}
                  {profilePicturePreview && (
                    <div style={{ marginLeft: "10px" }}>
                      {" "}
                      <img
                        src={profilePicturePreview}
                        alt="Profile Preview"
                        style={{ maxWidth: "50px", borderRadius: "50%" }}
                      />
                    </div>
                  )}
                  {!profilePicturePreview && (
                    <div style={{ marginLeft: "10px" }}>
                      {" "}
                      <FaUserCircle size={50} color="#CCC" />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ position: "relative", top: "70px", left: "0px" }}>
                <div className="mb-3">
                  <label htmlFor="userRegNo" className="form-label">
                    Registration No:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userRegNo"
                    name="userRegNo"
                    placeholder="Enter Registration Number"
                    onChange={handlechange}
                    value={inputs.userRegNo}
                    required
                    pattern="[A-Za-z0-9]+"
                    title="Please enter a valid registration number"
                    style={{
                      border: "none",
                      width: "80%",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter Your First Name"
                    onChange={handlechange}
                    value={inputs.firstName}
                    required
                    title="Please enter your first name"
                    style={{
                      border: "none",
                      width: "80%",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    onChange={handlechange}
                    value={inputs.lastName}
                    required
                    title="Please enter your last name"
                    style={{
                      border: "none",
                      width: "80%",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nic" className="form-label">
                    NIC:<br/>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nic"
                    name="nic"
                    placeholder="Enter Your NIC"
                    onChange={handlechange}
                    value={inputs.nic}
                    required
                    pattern="\d{9}|\d{12}"
                    title="Please enter a valid NIC number (9 or 12 digits)"
                    style={{
                      border: "none",
                      width: "80%",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ position: "relative", top: "-470px", left: "250px" }}>
              <h3 className="text-2xl font-semibold mb-4 ">
                <u>Contacts</u>
              </h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:<br/>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={handlechange}
                  value={inputs.email}
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address"
                  style={{
                    border: "none",
                    width: "80%",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">
                  Phone No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter Your Phone Number"
                  onChange={handlechange}
                  value={inputs.phoneNo}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number"
                  style={{
                    border: "none",
                    width: "80%",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="usertAddress" className="form-label">
                  User Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usertAddress"
                  name="usertAddress"
                  placeholder="Enter Your Address"
                  onChange={handlechange}
                  value={inputs.usertAddress}
                  required
                  title="Please enter your address"
                  style={{
                    border: "none",
                    width: "80%",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "330px",
                left: "250px",
                width: "400px",
              }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                <u>Username & Password</u>
              </h3>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:<br/>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter Your Username"
                  onChange={handlechange}
                  value={inputs.username}
                  required
                  title="Please enter your username"
                  style={{
                    border: "none",
                    width: "60%",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:<br/>
                </label>
                <div className="input-group">
                  <input
                    type={!passhow ? "password" : "text"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    onChange={handlechange}
                    value={inputs.password}
                    required
                    minLength="8"
                    title="Password must be at least 8 characters long"
                    style={{
                      border: "none",
                      width: "60%",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setPassShow(!passhow)}
                  >
                    {passhow ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="text-center"
              style={{
                position: "absolute",
                top: "570px",
                left: "180px",
                width: "400px",
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheckbox"
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                  style={{
                    width: "15px",
                    height: "15px",
                    ":hover": {
                      backgroundColor: "lightgray",
                      border: "1px solid blue",
                      cursor: "pointer",
                    },
                  }}
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I accept the <a href="#terms-section">Terms and Conditions</a>
                </label>
              </div>
              <br />
              <input
                type="submit"
                className={`btn btn-primary px-5 py-2 ${
                  !termsChecked && "disabled"
                }`}
                value="Register"
                disabled={!termsChecked}
                style={{
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  background: "#007bff",
                  color: "white",
                  padding: "8px 20px",
                  cursor: "pointer",
                  outline: "none",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              />
            </div>
          </form>
          <div
            id="terms-section"
            style={{
              width: "1300px",
              position: "absolute",
              top: "650px",
              left: "-810px",
            }}
          >
            <legend>
              <h2>Terms and Conditions</h2>{" "}
              <h3>
                Welcome to the Pet HealthCare and Accessories System
                ("Petpulse").
              </h3>{" "}
              <p style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
                <b>
                  By registering as a pet owner on the System, you agree to
                  comply with the following terms and conditions:
                </b>
                <br />
                <br /> 1. Registration: You must provide accurate and complete
                information during the registration process. You are responsible
                for maintaining the confidentiality of your account and
                password, and for restricting access to your computer and
                account.
                <br />
                <br /> 2. Use of the System: You agree to use the System solely
                for lawful purposes and in a manner consistent with all
                applicable laws and regulations. You are solely responsible for
                your interactions with other users of the System. You agree not
                to use the System to harass, abuse, or harm other users.
                <br />
                <br /> 3. Pet Information: You are responsible for providing
                accurate and up-to-date information about your pet(s) on the
                System. You agree not to provide false or misleading information
                about your pet(s).
                <br />
                <br />
                4. Health and Safety: You acknowledge that the System provides
                information and resources related to pet healthcare and
                accessories, but does not provide medical advice. You are solely
                responsible for the health and safety of your pet(s), including
                obtaining appropriate veterinary care.
                <br />
                <br /> 5. Intellectual Property: All content on the System,
                including text, graphics, logos, images, and software, is the
                property of the System or its licensors and is protected by
                copyright and other intellectual property laws. You may not
                reproduce, modify, distribute, or publicly display any content
                from the System without the prior written consent of the System.
                <br />
                <br /> 6. Termination: The System reserves the right to suspend
                or terminate your account and access to the System at any time,
                with or without cause and without notice.
                <br />
                <br /> 7. Changes to Terms and Conditions: The System reserves
                the right to modify or revise these terms and conditions at any
                time. Your continued use of the System following any changes
                constitutes acceptance of those changes.
                <br />
                <br /> 8. Governing Law: These terms and conditions shall be
                governed by and construed in accordance with the laws of [Your
                Jurisdiction], without regard to its conflicts of law
                provisions. By registering as a pet owner on the System, you
                acknowledge that you have read, understood, and agree to be
                bound by these terms and conditions.
              </p>
            </legend>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "1519px",
          position: "absolute",
          top: "1330px",
          left: "0px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default AddUser;
