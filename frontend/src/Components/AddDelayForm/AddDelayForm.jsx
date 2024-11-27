import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function AddDelayForm() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        packId: "",
        issue: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest();
            setIsSubmitted(true); // Show success message
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/delay", {
            email: String(inputs.email),
            packId: String(inputs.packId),
            issue: String(inputs.issue),
        });
    };

    const handleReset = () => {
        setIsSubmitted(false); // Hide success message
        setInputs({
            email: "",
            packId: "",
            issue: "",
        }); // Reset the form inputs
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center">Add Delay Details</h1>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-1">Email</label>
                            <input type="text" name="email" onChange={handleChange} value={inputs.email} required className="border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Package ID</label>
                            <input type="text" name="packId" onChange={handleChange} value={inputs.packId} required className="border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Issue</label>
                            <input type="text" name="issue" onChange={handleChange} value={inputs.issue} required className="border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Form submitted successfully!</h2>
                        <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Add Another Delay
                        </button>
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default AddDelayForm;
