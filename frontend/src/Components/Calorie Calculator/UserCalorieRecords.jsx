import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../nav/nav user";

const UserCalorieRecords = () => {
  const { microchipId } = useParams();
  const [calorieCalcData, setCalorieRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const fetchCalorieData = async () => {
      try {
        const calorieResponse = await axios.get(
          `http://localhost:5000/CalorieCalc/microchipId/${microchipId}`
        );
        console.log("Calorie API Response:", calorieResponse.data);
        const data = calorieResponse.data.calorieCalcData;
        const lastTwoEntries = data.slice(-7); // Get the last seven entries from the array
        setCalorieRecords(lastTwoEntries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCalorieData();
  }, [microchipId]);

  const handleEditRecord = (recordId) => {
    // Navigate to edit page with the specific record ID and microchipId
    history(`/editcaloryrecord/${recordId}`); // Navigate to edit page with the recordId
  };

  const deleteHandler = async (recordId) => {
    try {
      await axios.delete(`http://localhost:5000/CalorieCalc/${recordId}`);
      // After successful deletion, reload the data to reflect the changes
      history('/'); // Navigate to home page (optional)
      history(`/calorierecords/${microchipId}`); // Reload the calorie records page
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleAddRecord = () => {
    history('/caloriecalculator'); // Navigate to the add record page
  };

  return (
    <div>
      <Navbar />
      <div className="mt-8 px-4">
        {!loading ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Calorie Records</h2>
              <button
                onClick={handleAddRecord}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Add Record
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Activity Type</th>
                    <th className="border px-4 py-2">Weight</th>
                    <th className="border px-4 py-2">Duration</th>
                    <th className="border px-4 py-2">Calories Burned</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {calorieCalcData.map((record) => (
                    <tr key={record._id}>
                      <td className="border px-4 py-2">{record.date}</td>
                      <td className="border px-4 py-2">{record.activityType}</td>
                      <td className="border px-4 py-2">{record.weight}</td>
                      <td className="border px-4 py-2">{record.duration}</td>
                      <td className="border px-4 py-2">{record.caloriesBurned}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEditRecord(record._id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(record._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserCalorieRecords;
