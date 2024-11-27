import React, { useEffect, useState, useRef } from 'react';
import Nav from "../Nav copy/Nav";
import Sidebar from '../sidebarmovi/Sidebar';
import axios from "axios";
import Delay from "../Delay/Delay";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/delay";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function AllDelay() {

    const [delay, setAllDelay] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setAllDelay(data.delay));
    }, []);

    const ComponentsRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Delay Report",
        onAfterPrint: () => alert("Successfully downloaded")
    });

    const [searchQuery, setSearchQuery] = useState(''); // Initialize with an empty string
    const [noResult, setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredAllDelay = data.delay.filter((delay) =>
                Object.values(delay).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setAllDelay(filteredAllDelay);
            setNoResults(filteredAllDelay.length === 0);
        });
    };

    return (
        
             <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-60 pt-20 overflow-x-auto">
      <div className='grid grid-cols-0' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0 '>
          <Sidebar/>
        </div >
           
            <h1 className="text-2xl font-bold mb-4 text-center">Delay Details Display Page</h1>
            <div className="text-ml  text-right">
            <input 
    onChange={(e) => setSearchQuery(e.target.value)}
    type="text"
    name="search"
    placeholder="Search Delivery Details"
    value={searchQuery} // Add value prop
    className="border border-gray-300 rounded-md px-3 py-2 mr-2"/>
<button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
</div>

            {noResult ? (
                <div>
                    <p>No delay details found</p>
                </div>
            ) : (
                <div className="overflow-x-auto" ref={ComponentsRef}>
                    <div className="text-ml  text-right">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                                
                               
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {delay && delay.map((delay, i) => (
                                <Delay key={i} delay={delay} />
                            ))}
                        </tbody>
                        
                    </table>
                </div></div>
            )}
            <div className="text-ml  text-right">
           <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded-md">Download Report</button>
           </div></div>
       
       
    </section>
      
    </React.Fragment>

        
    );
}

export default AllDelay;
