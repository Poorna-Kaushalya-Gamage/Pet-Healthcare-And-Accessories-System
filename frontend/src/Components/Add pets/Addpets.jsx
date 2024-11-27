import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../nav/nav";
import backgroundImage from "../images/bg9.jpg";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function AddPets() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    petImage: "",
    name: "",
    type: "",
    breed: "",
    birthday: "",
    sex: "",
    weight: "",
    microchipId: "",
    color: "",
    owner: "",
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

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
    const formData = new FormData();
    formData.append("image", inputs.petImage);

    if (inputs.petImage) {
      try {
        const response = await axios.post(
          "http://localhost:5000/profileimage",
          formData
        );
        const petImage = response.data.image;

        await sendRequest(petImage);
        history("/mainhome");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please select a profile picture.");
    }
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/pets", {
        petImage: String(inputs.petImage.name),
        name: String(inputs.name),
        type: String(inputs.type),
        breed: String(inputs.breed),
        birthday: String(inputs.birthday),
        sex: String(inputs.sex),
        weight: Number(inputs.weight),
        microchipId: String(inputs.microchipId),
        color: String(inputs.color),
        owner: String(inputs.owner),
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
      petImage: file,
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
          left: "-350px",
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                position: "relative",
                top: "630px",
                left: "-0px",
                width: "900px",
              }}
            >
              <h2 className="text-center text-4xl font-bold mb-2">
                "Click 'Add Your Pet' to start adding your furry friend to your
                profile."
              </h2>
            </div>
            <div
              style={{
                position: "relative",
                top: "-50px",
                left: "-150px",
                width: "600px",
              }}
            >
              <h2 className="text-center text-4xl font-bold mb-2">
                Add Your Pet
              </h2>
            </div>
            <div style={{ position: "relative", top: "50px", left: "10px" }}>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "-150px", top: "50px" }}
              >
                <label htmlFor="petImage" className="form-label">
                  Pet Image:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="petImage"
                  name="petImage"
                  onChange={handleProfilePictureChange}
                />
                <div style={{position:"absolute",top:"-130px",left:"200px"}}>
                {inputs.petImage && inputs.petImage.name && (
                 <div style={{position:"absolute",top:"50px",left:"150px"}}> <b><p className="mt-3"> {inputs.petImage.name}</p></b></div>
                )}
                
                {profilePicturePreview && (
                  <div style={{ marginLeft: "10px" }}>
                    {" "}
                    {/* Adding margin for spacing */}
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      style={{ maxWidth: "130px", borderRadius: "50%" }}
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
              <div
                className="mb-3"
                style={{ position: "absolute", left: "-150px", top: "120px" }}
              >
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Pet's Name"
                  onChange={handlechange}
                  value={inputs.name}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "-150px", top: "190px" }}
              >
                <label htmlFor="species" className="form-label">
                  Type:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  placeholder="Enter Pet Type"
                  onChange={handlechange}
                  value={inputs.type}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "-150px", top: "260px" }}
              >
                <label htmlFor="breed" className="form-label">
                  Breed:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  name="breed"
                  placeholder="Enter Breed"
                  onChange={handlechange}
                  value={inputs.breed}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "-150px", top: "330px" }}
              >
                <label htmlFor="birthday" className="form-label">
                  Birthday:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="birthday"
                  onChange={handlechange}
                  value={inputs.birthday}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "200px", top: "50px" }}
              >
                <label className="form-label">Sex:</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="Male"
                    value="Male"
                    onChange={handlechange}
                    checked={inputs.sex === "Male"}
                  />
                  <label className="form-check-label" htmlFor="Male">
                    Male
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="Female"
                    value="Female"
                    onChange={handlechange}
                    checked={inputs.sex === "Female"}
                    style={{
                      position: "relative",
                      left: "50px",
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Female"
                    style={{ position: "relative", left: "50px" }}
                  >
                    Female
                  </label>
                </div>
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "200px", top: "120px" }}
              >
                <label htmlFor="weight" className="form-label">
                  Weight:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Enter Weight"
                  onChange={handlechange}
                  value={inputs.weight}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "200px", top: "190px" }}
              >
                <label htmlFor="microchipId" className="form-label">
                  Microchip ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="microchipId"
                  name="microchipId"
                  placeholder="Enter Microchip ID"
                  onChange={handlechange}
                  value={inputs.microchipId}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "200px", top: "260px" }}
              >
                <label htmlFor="color" className="form-label">
                  Color:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  placeholder="Enter Color"
                  onChange={handlechange}
                  value={inputs.color}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <div
                className="mb-3"
                style={{ position: "absolute", left: "200px", top: "330px" }}
              >
                <label htmlFor="owner" className="form-label">
                  Owner:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="owner"
                  name="owner"
                  placeholder="Enter owner Email"
                  onChange={handlechange}
                  value={inputs.owner}
                  required
                  style={{
                    width: "250px",
                  }}
                />
              </div>
            </div>
            <div
              className="text-center"
              style={{ position: "absolute", left: "180px", top: "560px" }}
            >
              <input
                type="submit"
                className="btn btn-primary px-5 py-10"
                value="Add Pet"
              />
            </div>
            <div
              className="text-center"
              style={{ position: "absolute", left: "330px", top: "560px" }}
            >
              <Link to="/mainhome">
                <input
                  type="submit"
                  className="btn btn-primary px-5 py-10"
                  
                  value="Cancel"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPets;
