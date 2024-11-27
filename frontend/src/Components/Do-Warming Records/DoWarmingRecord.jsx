import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
// import Nav from '../Nav/Nav';
import axios from 'axios';
import DisplayDoWarming from './DisplayDoWarming';
import { useReactToPrint } from 'react-to-print';
import Sidebar from '../TestExample/Sidebar';

const URL = 'http://localhost:5000/DoWarmingRec';

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { DoWarmingData: [] };
  }
};

function DoWarmingRecord() {
  const [DoWarmingData, setDWrecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResult, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setDWrecords(data.DoWarmingData));
  }, []);

  const ComponenetsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponenetsRef.current,
    DocumentTitle: 'Pet Do-warming Report',
    onafterprint: () => alert('Pet Do-warming Report successfully Download'),
  });

  const handleSearch = () => {
    fetchHandler().then((data) =>{
      const filteredDoWarmingRecords = data.DoWarmingData.filter((DwRecord)=>
      DwRecord.microchipId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      DwRecord.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      DwRecord.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      DwRecord.nextDate.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setDWrecords(filteredDoWarmingRecords);
    setNoResults(filteredDoWarmingRecords.length === 0);
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
            <Link to={`/addDoWarming`}>Add Record</Link>
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
        <p class="text-4xl text-center">Do-Warming Records</p>
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
                Treatment
              </th>
              <th scope="col" className="p-4">
                Next Date
              </th>
              <th scope="col" className="p-4 print:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {DoWarmingData.map((DoWarmingRecord, i) => (
               <DisplayDoWarming key={i} DoWarmingRecord={DoWarmingRecord} />
            ))}
          </tbody>
        </table>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}

export default DoWarmingRecord;
