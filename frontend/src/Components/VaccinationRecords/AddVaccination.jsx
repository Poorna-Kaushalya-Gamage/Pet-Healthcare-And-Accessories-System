import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../TestExample/Sidebar';

function AddVaccination() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    microchipId:'',
    date: '',
    Vaccine: '',
    nxtVaccination: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Validate input length for Vaccine textarea
    if (name === 'Vaccine') {
      const minLength = 5;
      const maxLength = 200;
      if (value.length < minLength || value.length > maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Vaccine Used must be between ${minLength} and ${maxLength} characters.`,
        }));
        setIsFormValid(false); // Disable form submission
      } else {
        // Clear error message if input length is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
        setIsFormValid(true); // Enable form submission
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

    // Validate Next Vaccination date
    if (name === 'nxtVaccination') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nxtVaccination: '', // Clear error message when valid date is entered
      }));

      const trimmedNxtVaccination = value.trim() || '-';
      const currentDate = new Date(inputs.date);
      const nextVaccinationDate = new Date(trimmedNxtVaccination);

      if (nextVaccinationDate <= currentDate) {
        // Display alert for invalid date
        alert('Next Vaccination date must be after the Date.');
        setIsFormValid(false); // Disable form submission
      } else {
        setIsFormValid(true); // Enable form submission if valid date is entered
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { microchipId,date, Vaccine, nxtVaccination } = inputs;
    const trimmedNxtVaccination = nxtVaccination.trim() || '-';

    // Validate Next Vaccination date
    if (new Date(trimmedNxtVaccination) <= new Date(date)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nxtVaccination: 'Next Vaccination date must be after the Date.',
      }));
      setIsFormValid(false);
      return;
    }

    const requestData = {
      microchipId: String(microchipId),
      date: String(date),
      Vaccine: String(Vaccine),
      nxtVaccination: String(trimmedNxtVaccination),
    };

    try {
      await axios.post('http://localhost:5000/VaccinationRec', requestData);
      history('/vaccinationRecords');
    } catch (error) {
      console.error('Error adding vaccination record:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Add Vaccination Records
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
                Date
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
                htmlFor="Vaccine"
                className="block text-sm font-medium text-gray-700"
              >
                Vaccine Used
              </label>
              <textarea
                id="Vaccine"
                name="Vaccine"
                value={inputs.Vaccine}
                onChange={handleChange}
                required
                rows="2"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.Vaccine && (
                <p className="text-sm text-red-500 mt-1">{errors.Vaccine}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="nxtVaccination"
                className="block text-sm font-medium text-gray-700"
              >
                Next Vaccination
              </label>
              <input
                type="date"
                id="nxtVaccination"
                name="nxtVaccination"
                value={inputs.nxtVaccination}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.nxtVaccination && (
                <p className="text-sm text-red-500 mt-1">{errors.nxtVaccination}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`inline-block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${!isFormValid && 'cursor-not-allowed opacity-50'}`}
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

export default AddVaccination;
