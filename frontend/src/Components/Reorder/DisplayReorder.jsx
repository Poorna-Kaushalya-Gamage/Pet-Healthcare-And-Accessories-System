import React, { useEffect, useState, useRef } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Reorder from "./Reorder";
import {Link} from "react-router-dom"
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:5000/reorders/getAll";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function DisplayReorder() {
  const [reorders, setReorders] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setReorders(data.reorders));
  }, []);

  const tableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Reorders Report",
    onAfterPrint: () => alert("Reorders Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () =>{
    fetchHandler().then((data) =>{
      const filteredReorders = data.reorders.filter((reorder) =>
    Object.values(reorder).some((field)=>
    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ))
    setReorders(filteredReorders);
    setNoResults(filteredReorders.length === 0);
    });
  }

  return (
    <React.Fragment>
      <section >
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
        <div className="grid grid-cols-10">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0  ">
            <Sidebar />
          </div>
          
       
          <div className="col-span-10 p-4">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded mr-2 mt-5 inline-block">
          <Link to="/addreorder">
            <button>Add Reorder</button>
            </Link>
            </div>
            <button onClick={handlePrint} className=" text-right bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 mt-2 ml-4 rounded inline-block">Download Reorder Report</button>
            <br/>
            <br/>
            <div className="mb-2">
            <input onChange={(e)=> setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="search here"
            className="border border-black px-2 py-1">
            </input>

            <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 inline-block ml-2">Search</button>
            </div>
            {noResults ? (
              <div>
                <p>No Reorders Found</p>
              </div>
            ): (
            <div ref={tableRef}>
              <table className="table-auto w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
   
                    <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">PRID</th>
                    <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Name</th>
                   
                    <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">
                      Reorder Quantity
                    </th>
                    
                    <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">
                      Supplier Name
                    </th>
                    <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">
                      Supplier No
                    </th>
                   
                    <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">Edit</th>
                    <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {reorders &&
                    reorders.map((reorder, i) => (
                      <Reorder key={i} reorder={reorder} />
                    ))}
                </tbody>
              </table>
            </div>
            
                  )}
          </div>
          
        </div>
      </section>
    </React.Fragment>
  );
}




export default DisplayReorder;
