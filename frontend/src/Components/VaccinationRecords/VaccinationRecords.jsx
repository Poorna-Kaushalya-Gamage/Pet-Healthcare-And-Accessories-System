import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
// import Nav from '../Nav/Nav';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import DisplayVaccination from './DisplayVaccination';
import Sidebar from '../TestExample/Sidebar';

const URL = "http://Localhost:5000/VaccinationRec";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res)=>res.data);
  }

function VaccinationRecords() {
    const [VaccineData, setVacRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResult, setNoResults] = useState(false);

    useEffect(()=>{
        fetchHandler().then((data)=>setVacRecords(data.VaccineData));
    },[]);

    const ComponenetsRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => ComponenetsRef.current,
      DocumentTitle: 'Pet Vaccination Report',
      onafterprint: () => alert('Pet Vaccination Report successfully Download'),
    });

    const handleSearch = () => {
        fetchHandler().then((data) =>{
          const filteredVaccinationRec = data.VaccineData.filter((VacRecord)=>
          VacRecord.microchipId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          VacRecord.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          VacRecord.Vaccine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          VacRecord.nxtVaccination.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setVacRecords(filteredVaccinationRec);
        setNoResults(filteredVaccinationRec.length === 0);
       });
      }
    
  return (
    <div>
      {/* <Nav /> */}
      <Sidebar/>
      <br></br>
      <br></br>
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      
      <div className="flex space-x-3 ">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"         
          >
            <Link to={`/addvaccinationRecords`}>Add Record</Link>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrint}                       
          >
            Download Report
          </button>
        </div>
        </div>

      {noResult ? (
        <div>
          <p>No records found</p>
        </div>
      ) : (
        <div ref={ComponenetsRef}> 
        <br></br>
        <p class="text-4xl text-center">Vaccination Records</p>
        <br></br>
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Microchip ID
              </th>
              <th scope="col" className="p-4">
                Date
              </th>
              <th scope="col" className="p-4">
                Vaccine
              </th>
              <th scope="col" className="p-4">
                Next Vaccination Date
              </th>
              <th scope="col" className="p-4 print:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
           
            {VaccineData.map((VaccinationRecord, i) => (
               <DisplayVaccination key={i} VaccinationRecord={VaccinationRecord} />
            ))}
          </tbody>
        </table>
        </div>
      )}
      <br />
      <br />
    </div>
  )
}

export default VaccinationRecords
