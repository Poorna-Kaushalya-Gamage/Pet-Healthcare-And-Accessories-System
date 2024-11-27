import React, { useState } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDiscount() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    psid:"",
    name: "",
    ptype: "",
    type: "",
    amount: 0,
    applicableProduct: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation for amount
    if (name === "amount") {
      if (isNaN(value) || value < 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Amount must be a positive number",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    
    if (name === "startDate" || name === "endDate") {
      // Validation for startDate and endDate
      const startDate = name === "startDate" ? new Date(value) : new Date(inputs.startDate);
      const endDate = name === "endDate" ? new Date(value) : new Date(inputs.endDate);
  
      if (!value) {
        errorMessage = "This field is required";
      } else if (startDate.getTime() > endDate.getTime()) {
        errorMessage = "Start Date cannot be after End Date";
      } else if (name === "endDate" && startDate.getTime() === endDate.getTime()) {
        errorMessage = "End Date should be after Start Date";
      } else if (name === "endDate" && endDate.getTime() < Date.now()) {
        errorMessage = "End Date should be in the future";
      }
    }
    
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    
    // Check if there are any errors before submitting
    if (Object.values(errors).every((error) => !error)) {
      await sendRequest();
      history("/displaydiscount");
    }
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/discounts/add", {
        psid: String(inputs.psid),
        name: String(inputs.name),
        ptype: String(inputs.ptype),
        type: String(inputs.type),
        amount: inputs.amount,
        applicableProduct: String(inputs.applicableProduct),
        startDate: inputs.startDate,
        endDate: inputs.endDate,
      })
      .then((res) => res.data);
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
            <h1>Add Discount Form</h1>
          </div>
          <form
            className="col-span-8 p-8  mt-4 rounded-md shadow-3xl border border-blue-700 border-blur-3xl"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="font-bold">PSID:</label>
              <input
                type="text"
                name="psid"
                onChange={handleChange}
                value={inputs.psid}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>
            {/* Add similar blocks for other input fields */}
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
              <label className="font-bold">Promotion Type:</label>
              <input
                type="text"
                name="ptype"
                onChange={handleChange}
                value={inputs.ptype}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>

            <div className="mb-4">
              <label className="font-bold">Discount Type:</label>
              <input
                type="text"
                name="type"
                onChange={handleChange}
                value={inputs.type}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>

            <div className="mb-4">
              <label className="font-bold">Amount:</label>
              <br />
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                value={inputs.amount}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.amount && (
                <span className="text-red-500">{errors.amount}</span>
              )}
            </div>
            
            <div className="mb-4">
              <label className="font-bold">applicableProduct:</label>
              <input
                type="text"
                name="applicableProduct"
                onChange={handleChange}
                value={inputs.applicableProduct}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
            </div>

            <div className="mb-4">
              <label className="font-bold">Start Date:</label>
              <br />
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                value={inputs.startDate}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.startDate && (
                <span className="text-red-500">{errors.startDate}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="font-bold">End Date:</label>
              <br />
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                value={inputs.endDate}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.endDate && (
                <span className="text-red-500">{errors.endDate}</span>
              )}
            </div>

            <button className="bg-blue-500 text-white text-lg py-4 px-8 rounded-xl">submit</button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default AddDiscount;
