import React, { useEffect, useState } from 'react';
import Nav from '../Nav copy/Nav';
import axios from "axios";
import Tracking from "../Tracking/Tracking";
import { Link } from 'react-router-dom'; // Import Link component from React Router
import Sidebar from '../sidebarmovi/Sidebar';

const URL = "http://localhost:5000/tracking";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function AllTracking() {

    const [tracking, setAllTracking] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setAllTracking(data.tracking));
    }, [])
    
    return (
       
             <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
      <div className='grid grid-cols-0' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0 '>
          <Sidebar/>
        </div>
       
     
           

    <h1 className="text-2xl font-bold mb-4 text-center">Tracking Details Display Page</h1>
    <div className="text-right mb-6 ">
  <Link to="/addtracking" className="inline-block bg-green-500 text-white px-4 py-2 rounded-md">Add Delivery</Link>
</div>

            <div className="overflow-x-auto flex justify-center items-start mt-0 !important ">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date1</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tracking && tracking.map((track, i) => (
                            <Tracking key={i} track={track} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       
    </section>
      
    </React.Fragment>
    )
}

export default AllTracking;




