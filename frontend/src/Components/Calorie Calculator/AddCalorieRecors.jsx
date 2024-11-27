import React, { useState } from 'react';
import axios from 'axios'; 

function AddCalorieRecors() {

    const [formData, setFormData] = useState({
        microchipId: '',
        date: '',
        activityType: 'walking', // Default value
        weight: '',
        duration: ''
      });
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear validation error when input changes
      };
    
      const validateForm = () => {
        const { microchipId, date, weight, duration } = formData;
        const errors = {};
    
        if (!microchipId) {
          errors.microchipId = 'Microchip ID is required';
        }
    
        if (!date) {
          errors.date = 'Date is required';
        }
    
        if (!weight || isNaN(weight) || parseFloat(weight) <= 0) {
          errors.weight = 'Please enter a valid weight';
        }
    
        if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
          errors.duration = 'Please enter a valid duration';
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors found
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          try {
            const { microchipId, date, activityType, weight, duration } = formData;
    
            // Calculate caloriesBurned based on activityType, weight, and duration
            const metValue = activityType.toLowerCase() === 'walking' ? 50 : 100;
            const caloriesBurned = metValue * parseFloat(weight) * (parseInt(duration) / 60);
    
            const newRecord = {
              microchipId,
              date,
              activityType,
              weight: parseFloat(weight),
              duration: parseInt(duration),
              caloriesBurned: parseFloat(caloriesBurned.toFixed(2)) // Round to 2 decimal places
            };
    
            // Send POST request to backend API to add the new record
            const response = await axios.post('http://localhost:5000/CalorieCalc', newRecord);
    
            console.log('Record added successfully:', response.data);
            // Reset form data after successful submission
            setFormData({
              microchipId: '',
              date: '',
              activityType: 'walking',
              weight: '',
              duration: ''
            });
    
            alert('Record added successfully!');
          } catch (error) {
            console.error('Failed to add record:', error.message);
            alert('Failed to add record. Please try again.');
          }
        }
      };
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 shadow-md p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Calorie Calculation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="microchipId" className="block text-sm font-medium text-gray-700">Microchip ID</label>
          <input
            type="text"
            id="microchipId"
            name="microchipId"
            value={formData.microchipId}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.microchipId ? 'border-red-500' : ''}`}
          />
          {errors.microchipId && <p className="text-red-500 text-sm mt-1">{errors.microchipId}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.date ? 'border-red-500' : ''}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">Activity Type</label>
          <select
            id="activityType"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.activityType ? 'border-red-500' : ''}`}
          >
            <option value="walking">Walking</option>
            <option value="running">Running</option>
          </select>
          {errors.activityType && <p className="text-red-500 text-sm mt-1">{errors.activityType}</p>}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.01"
            required
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.weight ? 'border-red-500' : ''}`}
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            step="1"
            required
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.duration ? 'border-red-500' : ''}`}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Add Record
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddCalorieRecors
