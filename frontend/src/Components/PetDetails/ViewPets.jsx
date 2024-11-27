import React, { useState, useEffect, useRef } from "react";
import Navbar from "../nav/nav";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

const URL = "http://localhost:5000/pets";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewPets() {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [petTypeCounts, setPetTypeCounts] = useState({});
  const [petRegistrationCounts, setPetRegistrationCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartRendered, setChartRendered] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setPets(data.Pets);
      generateCounts(data.Pets); 
    });
  }, []);

  const ComponentsRef = useRef();

  const generateCounts = (pets) => {
    const typeCounts = {};
    const registrationCounts = {};
    pets.forEach((pet) => {
      typeCounts[pet.type] = (typeCounts[pet.type] || 0) + 1;
      const registrationDate = new Date(pet.registeredDate).toDateString();
      registrationCounts[registrationDate] =
        (registrationCounts[registrationDate] || 0) + 1;
    });
    setPetTypeCounts(typeCounts);
    setPetRegistrationCounts(registrationCounts);
    const typeChartLabels = Object.keys(typeCounts);
    const typeChartValues = Object.values(typeCounts);
    setChartData({
      type: {
        labels: typeChartLabels,
        datasets: [
          {
            label: "Pet Type Counts",
            data: typeChartValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },

      registration: {
        labels: Object.keys(registrationCounts),
        datasets: [
          {
            label: "Pet Registration Date Counts",
            data: Object.values(registrationCounts),
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (
      chartData.type &&
      chartData.type.labels &&
      chartData.type.labels.length > 0 &&
      !chartRendered
    ) {
      const ctxType = document.getElementById("petTypeChart");
      new Chart(ctxType, {
        type: "pie", 
        data: chartData.type,
        options: {
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          layout: {
            padding: {
              top: 520,
              bottom: 0, 
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      const ctxRegistration = document.getElementById(
        "petRegistrationChart"
      );
      new Chart(ctxRegistration, {
        type: "bar", 
        data: chartData.registration,
        options: {
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          layout: {
            padding: {
              top: 520,
              bottom: 0, 
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setChartRendered(true); 
    }
  }, [chartData, chartRendered]);

  //--- Create Pdf ---
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Pet's Report",
    onAfterPrint: () => alert("Pet report Successfully Downloaded!.."),
  });

  // DELETE PET
  const deletePet = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      const updatedPets = pets.filter((pet) => pet._id !== _id);
      setPets(updatedPets);
      generateCounts(updatedPets); 
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  //--- Create Search ---
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredPets = data.Pets.filter((pet) =>
        Object.values(pet).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPets(filteredPets);
      generateCounts(filteredPets); 
    });
  };

  return (
    <div>
      <Navbar />
      &nbsp;
      <center>
        <h1>Pet Details</h1>
      </center>
      <div
        className="searchbar"
        style={{ position: "relative", top: "-20px", left: "1100px" }}
      >
        <input
          type="text"
          name="Search"
          placeholder="Search Users Details"
          onChange={(e) => setSearchQuery(e.target.value)}
        />{" "}
        &nbsp;
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-700 mr-2"
        >
          Search
        </button>
      </div>
      <div
        className="flex justify-center mt-10"
        ref={ComponentsRef}
        style={{ position: "absolute", top: "490px", left: "40px" }}
      >
        <table className="border-4 border-collapse w-99">
          <thead>
            <tr>
              <th className="border p-2">Pet Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Breed</th>
              <th className="border p-2">Birthday</th>
              <th className="border p-2">Sex</th>
              <th className="border p-2">Weight</th>
              <th className="border p-2">Microchip Id</th>
              <th className="border p-2">Color</th>
              <th className="border p-2">Owner</th>
              <th className="print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/profileimage/${pet.petImage}`}
                    alt="User Image"
                    style={{ maxWidth: "50px", borderRadius: "50%" }}
                  />
                </td>
                <td className="border p-2">{pet.name}</td>
                <td className="border p-2">{pet.type}</td>
                <td className="border p-2">{pet.breed}</td>
                <td className="border p-2">{pet.birthday}</td>
                <td className="border p-2">{pet.sex}</td>
                <td className="border p-2">{pet.weight}</td>
                <td className="border p-2">{pet.microchipId}</td>
                <td className="border p-2">{pet.color}</td>
                <td className="border p-2">{pet.owner}</td>
                <td className="print:hidden">
                  &nbsp;&nbsp;
                  <Link to={`/UpdatePet/${pet._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => deletePet(pet._id)}
                  >
                    Delete
                  </button>{" "}
                  &nbsp;&nbsp;
                  <Link to={`/Petprofile/${pet.microchipId}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                      View Pet
                    </button>
                  </Link>
                  &nbsp;&nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Display pet type counts */}
        <div
          className="ml-10"
          style={{ position: "absolute", top: "-320px", left: "-40px" }}
        >
          <h2
            style={{
              position: "absolute",
              top: "-50px",
              left: "140px",
              width: "200px",
            }}
          >
            <u><center>Pet Type</center></u>
          </h2>
          <br />
          <ul
            style={{
              position: "absolute",
              top: "30px",
              left: "20px",
              width: "200px",
            }}
          >
            {Object.entries(petTypeCounts).map(([type, count]) => (
              <li key={type}>
                <div
                  className="card"
                  style={{
                    width: "100px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: "0px",
                    padding: "0px",
                    margin: "10px",
                    backgroundColor: "#4F4F4F",
                    color: "white",
                    weight: "bold",
                  }}
                >
                  <b>
                    <h5>
                      {type}: {count}
                    </h5>
                  </b>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Display pet registration date counts */}
        <div
          className="ml-10"
          style={{ position: "absolute", top: "-320px", left: "400px" }}
        >
          <h2
            style={{
              position: "absolute",
              top: "-50px",
              left: "140px",
              width: "500px",
            }}
          >
            <u><center>Pet Registration Date</center></u>
          </h2>
          <br />
          <ul
            style={{
              position: "absolute",
              top: "30px",
              left: "20px",
              width: "200px",
            }}
          >
          </ul>
        </div>
      </div>
      {/* Chart for pet types */}
      <div
        className="mt-5"
        style={{
          width: "200px",
          height: "800px",
          position: "absolute",
          top: "100px",
          left: "380px",
        }}
      >
        <canvas
          id="petTypeChart"
          style={{
            width: "850px",
            height: "800px",
            position: "absolute",
            top: "-450px",
          }}
        ></canvas>
      </div>
      {/* Chart for registration dates */}
      <div
        className="mt-5"
        style={{
          width: "200px",
          height: "800px",
          position: "absolute",
          top: "100px",
          left: "780px",
        }}
      >
        <canvas
          id="petRegistrationChart"
          style={{
            width: "850px",
            height: "800px",
            position: "absolute",
            top: "-450px",
          }}
        ></canvas>
      </div>
      <div
        className="print"
        style={{ position: "absolute", top: "125px", left: "1250px" }}
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handlePrint}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default ViewPets;
