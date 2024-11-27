import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../nav/nav user";
import { Link } from "react-router-dom";

const PetProfile = () => {
  const { microchipId } = useParams();
  const [pets, setPets] = useState([]);
  const [petRecordBook, setpetRecords] = useState([]);
  const [doWarmingData, setDewormingRecords] = useState([]);
  const [vaccineData, setVaccinationRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetAndDewormingData = async () => {
      try {
        // Fetch pet data
        const petResponse = await axios.get(
          `http://localhost:5000/pets/microchipId/${microchipId}`
        );
        setPets(petResponse.data.pets);

        // Fetch deworming records
        const dewormingResponse = await axios.get(
          `http://localhost:5000/DoWarmingRec/microchipId/${microchipId}`
        );
        setDewormingRecords(dewormingResponse.data.doWarmingData);

        // Fetch treatment records
        const petrecordsResponse = await axios.get(
          `http://localhost:5000/PetRecordBooks/microchipId/${microchipId}`
        );
        setpetRecords(petrecordsResponse.data.petRecordBook);

          // Fetch vaccination records
          const vaccinationResponse = await axios.get(
            `http://localhost:5000/VaccinationRec/microchipId/${microchipId}`
          );
          setVaccinationRecords(vaccinationResponse.data.vaccineData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPetAndDewormingData();
  }, [microchipId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pets.length > 0 ? (
          <div>
            {pets.map((pet) => (
              <div
                key={pet._id}
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                  padding: "10px",
                  borderRadius: "8px",
                  margin: "20px",
                  width: "750px",
                  height: "450px",
                }}
              >
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1
                  style={{
                    color: "#333",
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontFamily: "fantasy",
                  }}
                >
                  {pet.name}
                </h1>
                <br />
                <div style={{ position: "absolute", left: "510px" }}>
                  <h4>
                    <strong>Type:</strong> {pet.type}
                  </h4>
                  <p />
                  <h4>
                    <strong>Breed:</strong> {pet.breed}
                  </h4>
                  <p />
                  <h4>
                    <strong>Birthday:</strong>{" "}
                    {new Date(pet.birthday).toLocaleDateString()}
                  </h4>
                  <p />
                  <h4>
                    <strong>Sex:</strong> {pet.sex}
                  </h4>

                  <div
                    style={{
                      position: "absolute",
                      left: "250px",
                      top: "-13px",
                      width: "500px",
                    }}
                  >
                    <p />
                    <h4>
                      <strong>Weight:</strong> {pet.weight} lbs
                    </h4>
                    <p />
                    <h4>
                      <strong>Microchip ID:</strong> {pet.microchipId}
                    </h4>
                    <p />
                    <h4>
                      <strong>Color:</strong> {pet.color}
                    </h4>
                    <p />
                    <h4>
                      <strong>Owner:</strong> {pet.owner}
                    </h4>
                    <br />
                  </div>
                </div>
                <div
                  style={{ position: "absolute", left: "670px", top: "150px" }}
                >
                  <img
                    src={`http://localhost:5000/profileimage/${pet.petImage}`}
                    alt={pet.name}
                    style={{
                      maxWidth: "200px",
                      borderRadius: "50%",
                      display: "block", 
                      margin: "0 auto", 
                    }}
                  />
                </div>

                <div style={{position:"absolute",top:"15px",left:"1400px"}}>
                <Link to={`/UserDashboard/${pet.owner}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                    Go Back
                  </button>
                </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No pets found for microchip ID: {microchipId}.</p>
        )}
      </div>

        <div style= {{position:"absolute",top:"750px", left:"250px",padding:"50px"}}>
          {doWarmingData.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h2>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deworming Records</h2>
              <table border="2" style={{ width: "200%", textAlign:"center" }} className="border-2 ">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Treatment/Dosage</th>
                    <th>nextDate</th>
                  </tr>
                </thead>
                <tbody>
                  {doWarmingData.map((record) => (
                    <tr key={record._id}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.treatment}</td>
                      <td>{record.nextDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        

        <div style= {{position:"absolute",top:"1000px", left:"250px",padding:"50px"}}>
          {petRecordBook.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h2>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Treatment Records</h2>
              <table border="2" style={{ width: "200%", textAlign:"center" }} className="border-2 ">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Special Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {petRecordBook.map((record) => (
                    <tr key={record._id}>
                      <td>{record.date}</td>                    
                      <td>{record.diagnosis}</td>
                      <td>{record.treatment}</td>
                      <td>{record.specialNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style= {{position:"absolute",top:"1250px", left:"250px",padding:"50px"}}>
    
          {vaccineData.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h2>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaccination Records</h2>
              <table border="2" style={{ width: "200%", textAlign:"center" }} className="border-2 ">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Vaccine used</th>
                    <th>Next vaccination</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineData.map((record) => (
                    <tr key={record._id}>
                      <td>{record.date}</td>                    
                      <td>{record.Vaccine}</td>
                      <td>{record.nxtVaccination}</td>                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link to={`/UserDashboard/${pets[0].owner}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
              Go Back
            </button>
          </Link>
        </div>

        <div style={{position:"absolute",top:"1500px", left:"250px",padding:"50px"}}>
          <Link to={`/calorierecords/${microchipId}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
              Calorie calculator
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PetProfile;
