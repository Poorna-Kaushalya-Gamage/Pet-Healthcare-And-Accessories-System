import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../TestExample/Sidebar';

function UpdatePetRecords() {
  const [inputs, setInputs] = useState({
    microchipId:'',
    date: '',
    diagnosis: '',
    treatment: '',
    specialNotes: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const id = useParams().id;
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/PetRecordBooks/${id}`);
        setInputs(response.data.petRecordBook);
      } catch (error) {
        console.error('Error fetching pet record:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate microchipId length
    if (name === 'microchipId') {
      const minMicroLength = 3;
      const maxMicroLength = 15;

      if (value.length < minMicroLength || value.length > maxMicroLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Microchip ID must be between ${minMicroLength} and ${maxMicroLength} characters.`,
        }));
        setIsFormValid(false);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
        setIsFormValid(true);
      }
    } else {
      // Validate input lengths for other fields
      const minLength = 5;
      const maxLength = 200;

      if (value.length < minLength || value.length > maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must be between ${minLength} and ${maxLength} characters.`,
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

    // Update inputs state
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form is valid
    if (!isFormValid) {
      alert('Please fix the form errors before submitting.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/PetRecordBooks/${id}`, inputs);
      alert('Details Updated Successfully');
      history('/petrecords');
    } catch (error) {
      console.error('Error updating pet record:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Update Treatment Records</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="microchipId" className="block text-sm font-medium text-gray-700">
                Microchip ID
              </label>
              <input
                type="text"
                id="microchipId"
                name="microchipId"
                value={inputs.microchipId}
                onChange={handleChange}
                required
                className={`mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.microchipId ? 'border-red-500' : ''
                }`}
              />
              {errors.microchipId && (
                <p className="text-sm text-red-500 mt-1">{errors.microchipId}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
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

            {['diagnosis', 'treatment', 'specialNotes'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <textarea
                  id={field}
                  name={field}
                  value={inputs[field]}
                  onChange={handleChange}
                  required
                  rows="3"
                  className={`mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors[field] ? 'border-red-500' : ''
                  }`}
                />
                {errors[field] && (
                  <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="text-center">
              <button
                type="submit"
                className={`inline-block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isFormValid && 'cursor-not-allowed opacity-50'
                }`}
                disabled={!isFormValid}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePetRecords;