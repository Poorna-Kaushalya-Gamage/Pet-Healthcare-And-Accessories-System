import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/employee.jpg";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AddEmployee = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    userimage: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    email: "",
    jobTitle: "",
    employeeID: "",
    department: "",
    startDate: "",
    employmentStatus: "",
    password: "",
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleChange = (e) => {
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
          history("/AdminLogin");
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error (e.g., show error message to the user)
        }
      } else {
        alert("Please select a profile picture.");
      }
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/employees", {
        userimage: String(inputs.userimage.name),
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

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "1550px",
            position: "absolute",
            top: "-20px",
            left: "0px",
            height: "724px",
            borderRadius: "0px",
          }}
        >
          <h2
            className="text-3xl font-bold mb-6 text-gray-800"
            style={{ position: "relative", left: "300px", top: "35px" }}
          >
            Add Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div style={{ position: "relative", left: "70px", top: "50px" }}>

            <div className="mb-4">
            <label htmlFor="userimage" className="form-label">
                  Profile Picture:
                </label>
                <div className="d-flex align-items-center">
                  {" "}
                  {/* Using flexbox for alignment */}
                  <input
                    type="file"
                    className="form-control"
                    id="userimage"
                    name="userimage"
                    style={{ width: "300px" }}
                    onChange={handleProfilePictureChange}
                  />
                  {inputs.userimage && inputs.userimage.name && (
                    <p className="mt-3">Selected file: {inputs.userimage.name}</p>
                  )}
                  {profilePicturePreview && (
                    <div style={{ marginLeft: "10px" }}>
                      {" "}
                      {/* Adding margin for spacing */}
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
                      {/* Adding margin for spacing */}
                      <FaUserCircle size={50} color="#CCC" />{" "}
                      {/* Using the user circle icon */}
                    </div>
                  )}
                </div>
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
                  style={{ width: "300px" }}
                  required
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
                  style={{ width: "300px" }}
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
                  type="date"
                  name="dateOfBirth"
                  value={inputs.dateOfBirth}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
                />
              </div>
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
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
                />
              </div>
            </div>
            <div style={{ position: "relative", left: "420px", top: "-440px" }}>
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
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
                >
                  <option value="">Select Department</option>
                  <option value="Veterinary Services">
                    Veterinary Services
                  </option>
                  <option value="Reception">Reception</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="form-label">
                  Start Date:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={inputs.startDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                  style={{ width: "300px" }}
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
                  <label htmlFor="fullTime" className="form-check-label">
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
                  <label htmlFor="partTime" className="form-check-label">
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
                  <label htmlFor="contract" className="form-check-label">
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
                    style={{ width: "300px" }}
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                    title="Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers"
                  />
                </div>
              </div>
            </div>
            <div style={{ position: "relative", left: "450px", top: "-430px" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100px" }}
              >
                Submit
              </button>
            </div>
            <div
              className="text-center"
              style={{ position: "absolute", left: "580px", top: "565px" }}
            >
              <Link to="/mainhome">
                <input
                  type="submit"
                  className="btn btn-primary px-5 py-10"
                  style={{ backgroundColor: "red",width: "100px" }}
                  value="Cancel"
                />
              </Link>
            </div>

            <div style={{ position: "relative", left: "800px", top: "-950px", backgroundColor: "rgba(255, 255, 255, 0.7)", width: "650px", borderRadius:"10%", padding:"50px" }}>
            <p><center><h2>Terms and Conditions</h2></center><br/>
              
                <strong>Employment Status:</strong> Specify if full-time,
                part-time, temporary, or contract-based.
              </p>
              <p>
                <strong>Job Description:</strong> Clearly outline roles,
                responsibilities, and reporting structure.
              </p>
              <p>
                <strong>Compensation:</strong> Detail salary, hourly wage,
                benefits, and perks.
              </p>
              <p>
                <strong>Work Schedule:</strong> Provide information on regular
                hours, breaks, and flexibility.
              </p>
              <p>
                <strong>Confidentiality Agreement:</strong> Require signing to
                protect sensitive information.
              </p>
              <p>
                <strong>Code of Conduct:</strong> Communicate expectations for
                professional behavior and integrity.
              </p>
              <p>
                <strong>Health and Safety Policies:</strong> Detail protocols
                for handling animals and emergency response.
              </p>
              <p>
                <strong>Training and Development:</strong> Specify available
                training and professional development opportunities.
              </p>
              <p>
                <strong>Termination Clause:</strong> Include reasons for
                termination, notice periods, and severance arrangements.
              </p>
              <p>
                <strong>Legal Compliance:</strong> Ensure awareness of legal
                obligations and industry standards.
              </p>
              <p>
                <strong>Dispute Resolution:</strong> Provide avenues for
                resolving disputes or grievances.
              </p>
              <p>
                <strong>Modification of Terms:</strong> Reserve the right to
                modify terms with notice and consultation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
