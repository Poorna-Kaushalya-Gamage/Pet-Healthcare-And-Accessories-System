import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
// import Nav from '../Nav/Nav'
import axios from "axios";
import DisplayPetRecords from '../Display pet records/DisplayPetRecords';
import {useReactToPrint} from "react-to-print"
import Sidebar from '../TestExample/Sidebar';

const URL = "http://Localhost:5000/PetRecordBooks";


const fetchHandler = async () =>{
  return await axios.get(URL).then((res)=>res.data);
}
function PetRecords() {
  
  const [PetRecordBooks,setRecords] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [noResult,setNoResults] = useState(false);

  useEffect(()=> {
    fetchHandler().then((data)=>setRecords(data.PetRecordBooks));
  },[])

  const ComponenetsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponenetsRef.current,
    DocumentTitle:"Pet Record Report",
    onafterprint: ()=>alert("Pet Record Report successfully Download")
  })
  

  const handleSearch = () => {
    fetchHandler().then((data) =>{
      const filteredPetRecords = data.PetRecordBooks.filter((record) =>
        record.microchipId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.specialNotes.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecords(filteredPetRecords);
      setNoResults(filteredPetRecords.length === 0);
    });
  }


  
  return (
    <div>
      {/* <Nav/> */}
      <Sidebar/>
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
            <Link to={`/addpetrecords`}>Add Record</Link>
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
        
        <p class="text-4xl text-center">Treatment Records</p>
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
                Diagnosis
              </th>
              <th scope="col" className="p-4">
                Treatment
              </th>
              <th scope="col" className="p-4">
                Special Notes
              </th>
              <th scope="col" className="p-4 print:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {PetRecordBooks.map((PetRecord, i) => (
              <DisplayPetRecords key={i} PetRecord={PetRecord}/>    
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


export default PetRecords