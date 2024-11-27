import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import backgroundImage from "../images/updatepet.jpg";
import { Link } from "react-router-dom";

function UpdatePet() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/pets/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.pets));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/pets/${id}`, {
        petImage: String(inputs.petImage),
        name: String(inputs.name),
        type: String(inputs.type),
        breed: String(inputs.breed),
        birthday: String(inputs.birthday),
        sex: String(inputs.sex),
        weight: Number(inputs.weight),
        microchipId: String(inputs.microchipId),
        color: String(inputs.color),
        owner: String(inputs.owner),
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
    sendRequest().then(() => history("/Loginupdate"));
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
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "700px",
          borderRadius: "30px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{width:"350px", position:"relative", left:"620px",top:"10px"}}>
          <center><h1>Update Pet Details</h1></center>
        <form onSubmit={handleSubmit} className="container mt-4">
          <div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Birthday:
              </label>
              <input
                type="text"
                className="form-control"
                id="birthday"
                name="birthday"
                onChange={handlechange}
                value={inputs.birthday}
                required
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Sex:
              </label>
              <input
                type="text"
                className="form-control"
                id="sex"
                name="sex"
                placeholder="Enter sex"
                onChange={handlechange}
                value={inputs.sex}
                required
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
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
              />
            </div>
          </div>
          <div className="formde3" style={{position:"absolute",top:"400px",left:"400px"}}>
            <div class="button-container">
              <input type="submit" value="Update" className="submit-btn" style={{backgroundColor:"green",padding:"10px",borderRadius:"20px",width:"130px", color:"white",fontWeight:"bolder"}}/><br/><br/>
              <Link to="/mainhome">
                <input
                  type="submit"
                  className="btn btn-primary "
                  style={{ backgroundColor: "red",width: "130px",borderRadius:"20px",padding:"10px",fontWeight:"bolder" }}
                  value="Cancel"
                />
              </Link>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePet;
