import React, { useEffect, useState } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateReorder() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/reorders/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.reorders));
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "reorderQuantity") {
      if (isNaN(value) || value < 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          reorderQuantity: "Reorder Quantity must be a positive number",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          reorderQuantity: "",
        }));
      }
    }

    if (name === "supplierNo") {
      if (!isValidPhoneNumber(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          supplierNo: "Please enter a valid phone number",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          supplierNo: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (Object.values(errors).every((error) => !error)) {
      await sendRequest();
      history("/displayreorder");
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/reorders/${id}`, {
        prid: String(inputs.prid),
        name: String(inputs.name),
        reorderQuantity: inputs.reorderQuantity,
        supplierName: String(inputs.supplierName),
        supplierNo: inputs.supplierNo,
      })
      .then((res) => res.data);
  };

  // Function to validate phone number
  const isValidPhoneNumber = (phoneNumber) => {
   
    const phonePattern = /^\d{10}$/; // Assumes a 10-digit phone number
    return phonePattern.test(phoneNumber);
  };

  return (
    <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
        <div className="grid grid-cols-10">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0">
            <Sidebar />
          </div>
          <div className="col-span-8 p-8 rounded-md shadow-md text-3xl text-center font-bold underline">
            <h1>Update Reorder Form</h1>
          </div>
          <form
            className="col-span-8 p-8 mt-4 rounded-md shadow-3xl border border-blue-700 border-blur-3xl"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="font-bold">PRID:</label>
              <input
                type="text"
                name="prid"
                onChange={handleChange}
                value={inputs.prid}
                className="border border-black p-2 w-full rounded-xl"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-bold">Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>

            <div className="mb-4">
              <label className="font-bold">Reorder Quantity:</label>
              <br />
              <input
                type="number"
                name="reorderQuantity"
                onChange={handleChange}
                value={inputs.reorderQuantity}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.reorderQuantity && (
                <span className="text-red-500">{errors.reorderQuantity}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="font-bold">Supplier Name</label>
              <br />
              <input
                type="text"
                name="supplierName"
                onChange={handleChange}
                value={inputs.supplierName}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-bold">Supplier No</label>
              <br />
              <input
                type="text"
                name="supplierNo"
                onChange={handleChange}
                value={inputs.supplierNo}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.supplierNo && (
                <span className="text-red-500">{errors.supplierNo}</span>
              )}
            </div>

            <button className="bg-blue-500 text-white text-lg py-4 px-8 rounded-xl">
              Submit
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default UpdateReorder;
