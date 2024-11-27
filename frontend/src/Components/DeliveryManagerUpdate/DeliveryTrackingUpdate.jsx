import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../Nav copy/Nav';
import { useParams, useNavigate } from 'react-router-dom';

function DeliveryTrackingUpdate() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({}); // State to track validation errors
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from the URL

    // Helper function to extract only the date part in "yyyy-MM-dd" format
    const extractDate = (isoString) => {
        return new Date(isoString).toISOString().split("T")[0];
    };

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tracking/${id}`);
                const data = response.data.tracking;

                setInputs({
                    ...data,
                    date1: extractDate(data.date1), // Ensure correct date format
                    date2: extractDate(data.date2),
                    date3: extractDate(data.date3),
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchHandler();
    }, [id]); // Fetch when component is mounted or ID changes

    const validate = () => {
        const newErrors = {};

        // Required field validations
        if (!inputs.date1) {
            newErrors.date1 = "Date 1 is required.";
        }
        if (!inputs.date2) {
            newErrors.date2 = "Date 2 is required.";
        }
        if (!inputs.date3) {
            newErrors.date3 = "Date 3 is required.";
        }

        // Validate chronological order
        if (
            inputs.date1 &&
            inputs.date2 &&
            new Date(inputs.date1) > new Date(inputs.date2)
        ) {
            newErrors.date1 = "Date 1 must be before Date 2.";
        }

        if (
            inputs.date2 &&
            inputs.date3 &&
            new Date(inputs.date2) > new Date(inputs.date3)
        ) {
            newErrors.date2 = "Date 2 must be before Date 3.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return; // Exit if validation fails
        }

        try {
            await axios.put(`http://localhost:5000/tracking/${id}`, {
                email: inputs.email,
                status1: inputs.status1,
                date1: inputs.date1, // Ensure correct format
                status2: inputs.status2,
                date2: inputs.date2,
                status3: inputs.status3,
                date3: inputs.date3,
            });
            navigate('/trackingdetails'); // Navigate after successful update
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div>
            <Nav />
            <h1 className="text-3xl font-bold mb-4">Update Tracking Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={inputs.email}
                        className={`border border-gray-300 rounded-md px-3 py-2`}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Status 1</label>
                    <select
                        name="status1"
                        value={inputs.status1}
                        onChange={handleChange}
                        className={`border border-gray-300 rounded-md px-3 py-2`}
                    >
                        <option value="notyet">Not Yet</option>
                        <option value="packed">Packed</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Date 1</label>
                    <input
                        type="date"
                        name="date1"
                        onChange={handleChange}
                        value={inputs.date1}
                        className={`border border-gray-300 rounded-md px-3 py-2 ${errors.date1 ? 'border-red-500' : ''}`}
                    />
                    {errors.date1 && (
                        <span className="text-red-500 text-sm">{errors.date1}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label>Status 2</label>
                    <select
                        name="status2"
                        value={inputs.status2}
                        onChange={handleChange}
                        className={`border border-gray-300 rounded-md px-3 py-2`}
                    >
                        <option value="notyet">Not Yet</option>
                        <option value="dispatched">Dispatched</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Date 2</label>
                    <input
                        type="date"
                        name="date2"
                        onChange={handleChange}
                        value={inputs.date2}
                        className={`border border-gray-300 rounded-md px-3 py-2 ${errors.date2 ? 'border-red-500' : ''}`}
                    />
                    {errors.date2 && (
                        <span className="text-red-500 text-sm">{errors.date2}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label>Status 3</label>
                    <select
                        name="status3"
                        value={inputs.status3}
                        onChange={handleChange}
                        className={`border border-gray-300 rounded-md px-3 py-2`}
                    >
                        <option value="notyet">Not Yet</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Date 3</label>
                    <input
                        type="date"
                        name="date3"
                        onChange={handleChange}
                        value={inputs.date3}
                        className={`border border-gray-300 rounded-md px-3 py-2 ${errors.date3 ? 'border-red-500' : ''}`}
                    />
                    {errors.date3 && (
                        <span className="text-red-500 text-sm">{errors.date3}</span>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </form>
        </div>
    );
}

export default DeliveryTrackingUpdate;
