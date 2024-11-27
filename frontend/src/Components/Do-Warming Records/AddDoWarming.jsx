import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../TestExample/Sidebar";

function AddDoWarming() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    microchipId: "",
    date: "",
    treatment: "",
    nextDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update input values
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Validate treatment length
    if (name === "treatment") {
      const minLength = 10;
      const maxLength = 200;
      if (value.length < minLength || value.length > maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Treatment/Dosage must be between ${minLength} and ${maxLength} characters.`,
        }));
        setIsFormValid(false);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
        setIsFormValid(true);
      }
    }

     // Validate microchip length
     if (name === 'microchipId') {
      const minLength = 3;
      const maxLength = 15;
      if (value.length < minLength || value.length > maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `microchip Id must be between ${minLength} and ${maxLength} characters.`,
        }));
        setIsFormValid(false);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
        setIsFormValid(true);
      }
    }

    // Validate nextDate
    if (name === "nextDate") {
      const nextDate = new Date(value);
      const currentDate = new Date(inputs.date);

      if (nextDate <= currentDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nextDate: "Next Do-Warming date must be after the Do-Warming Date.",
        }));
        setIsFormValid(false);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nextDate: "",
        }));
        setIsFormValid(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form is valid
    if (!isFormValid) {
      alert("Please fix the form errors before submitting.");
      return;
    }

    const {microchipId, date, treatment, nextDate } = inputs;

    try {
      const response = await axios.post("http://localhost:5000/DoWarmingRec", {
        microchipId: String(microchipId),
        date: String(date),
        treatment: String(treatment),
        nextDate: String(nextDate),
      });

      console.log("Do-Warming record added successfully:", response.data);
      history("/doWarmingRecords");
    } catch (error) {
      console.error("Error adding Do-Warming record:", error);
      
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Add Do-Warming Records
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label
                htmlFor="microchipId"
                className="block text-sm font-medium text-gray-700"
              >
                MichroChip ID
              </label>
              <textarea
                id="microchipId"
                name="microchipId"
                value={inputs.microchipId}
                onChange={handleChange}
                required
                rows="2"
                className={`mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.microchipId ? "border-red-500" : ""
                }`}
              />
              {errors.microchipId && (
                <p className="text-sm text-red-500 mt-1">{errors.microchipId}</p>
              )}
            </div> 

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Do-Warming Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="treatment"
                className="block text-sm font-medium text-gray-700"
              >
                Treatment/Dosage
              </label>
              <textarea
                id="treatment"
                name="treatment"
                value={inputs.treatment}
                onChange={handleChange}
                required
                rows="4"
                className={`mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.treatment ? "border-red-500" : ""
                }`}
              />
              {errors.treatment && (
                <p className="text-sm text-red-500 mt-1">{errors.treatment}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="nextDate"
                className="block text-sm font-medium text-gray-700"
              >
                Next Do-Warming
              </label>
              <input
                type="date"
                id="nextDate"
                name="nextDate"
                value={inputs.nextDate}
                onChange={handleChange}
                required
                className={`mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.nextDate ? "border-red-500" : ""
                }`}
              />
              {errors.nextDate && (
                <p className="text-sm text-red-500 mt-1">{errors.nextDate}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`inline-block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isFormValid && "cursor-not-allowed opacity-50"
                }`}
                disabled={!isFormValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoWarming;
