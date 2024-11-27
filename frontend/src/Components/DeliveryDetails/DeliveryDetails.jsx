import React, { useEffect, useState, useRef } from 'react';
import Nav from '../Nav copy/Nav';
import Sidebar from '../sidebarmovi/Sidebar';
import axios from "axios";
import Delivery from "../Delivery/Delivery";
import OrderM from "../OrderM/OrderM";
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom'; // Import Link component from React Router

const URL = "http://localhost:5000/delivery";
const URLT = "http://localhost:5000/transaction";


const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

const fetchHandler1 = async () => {
    return await axios.get(URLT).then((res) => res.data);
}

function DeliveryDetails() {
    const [delivery, setDeliveryDetails] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setDeliveryDetails(data.delivery));
    }, []);

    const [transaction, setTransactionDetails] = useState();
    useEffect(() => {
        fetchHandler1().then((data) =>  setTransactionDetails(data.transaction));
    }, []);


    const ComponentsRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Delivery Report",
        onAfterPrint: () => alert("Successfully downloaded")
    });

    const [searchQuery, setSearchQuery] = useState(''); // Initialize with an empty string
    const [noResult, setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredDeliveryDetails = data.delivery.filter((delivery) =>
                Object.values(delivery).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setDeliveryDetails(filteredDeliveryDetails);
            setNoResults(filteredDeliveryDetails.length === 0);
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
      <div className='grid grid-cols-12' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0 '>
          <Sidebar/>
        </div >
       
     
    
    <div className="col-span-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Delivery Details Display Page</h1>
            
           
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded mt-2 inline-block ml-46">
           <Link to="/adddelivery">Add Delivery</Link>
            </div>

           
            
            <button onClick={handlePrint} className="  text-right bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 mt-2 ml-4 rounded inline-block">Download Report</button>
            <br></br>
            <br></br>
            <div className="mb-2 ml-46">
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                placeholder="Search Delivery Details"
                value={searchQuery} // Add value prop
                className="border border-gray-300 rounded-md px-3 py-2 mr-2"
            />
           
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button><br></br>
            </div>
            {noResult ? (
                <div>
                    <p>No delivery details found</p>
                </div>
            ) : (

                <div  ref={ComponentsRef}>
                    
                    <table className="table-auto w-full border-collapse ml-46">
 
                    <thead>
                        <tr className="bg-gray-200">

                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">ID</th>
                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Package ID</th>
                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Product Name</th>
                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Customer Email</th>
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Address</th>
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Package Size</th>
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Weight</th>
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Delivery Man</th>
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Delivery Service</th>
                          
                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {delivery && delivery.map((delivery, i) => (
                            <Delivery key={i} delivery={delivery} />
                        ))}
                          {transaction && transaction.map((transaction, i) => (
                            <OrderM key={i} transaction={transaction} />
                        ))}
                    </tbody>

                    <tbody>
                      
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

export default DeliveryDetails;




/*
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Nav from '../Nav copy/Nav';
import Sidebar from '../Sidebar/Sidebar';
import Delivery from '../Delivery/Delivery';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';

const DELIVERY_URL = "http://localhost:5000/deliveries";
const TRANSACTION_URL = "http://localhost:5000/transactions";

const fetchDeliveries = async () => {
    return await axios.get(DELIVERY_URL).then((res) => res.data);
};

const fetchTransactions = async () => {
    return await axios.get(TRANSACTION_URL).then((res) => res.data);
};

function DeliveryDetails() {
    const [deliveries, setDeliveries] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [noResult, setNoResults] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const deliveryData = await fetchDeliveries();
            const transactionData = await fetchTransactions();

            setDeliveries(deliveryData);
            setTransactions(transactionData);
        };

        fetchData();
    }, []);

    const ComponentsRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Delivery Report",
        onAfterPrint: () => alert("Successfully downloaded"),
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Search both deliveries and transactions
        const filteredDeliveries = deliveries.filter((delivery) =>
            Object.values(delivery).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        const filteredTransactions = transactions.filter((transaction) =>
            Object.values(transaction).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        setDeliveries(filteredDeliveries);
        setTransactions(filteredTransactions);
        setNoResults(filteredDeliveries.length === 0 && filteredTransactions.length === 0);
    };

    return (
        <React.Fragment>
            <section>
                <Nav />
            </section>

            <section className="pl-60 pt-20 overflow-x-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0">
                        <Sidebar />
                    </div>

                    <div className="col-span-10">
                        <h1 className="text-2xl font-bold mb-4 text-center">Delivery Details Display Page</h1>

                        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded mt-2 inline-block ml-46">
                            <Link to="/adddelivery">Add Delivery</Link>
                        </div>

                        <button onClick={handlePrint} className=" text-right bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 mt-2 ml-4 rounded inline-block">
                            Download Report
                        </button>

                        <div className="mb-2 ml-46">
                            <input
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search Delivery Details"
                                value={searchQuery}
                                className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                            />
                            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Search
                            </button>
                        </div>

                        {noResult ? (
                            <div>
                                <p>No delivery or transaction details found</p>
                            </div>
                        ) : (
                            <div ref={ComponentsRef}>
                                <table className="table-auto w-full border-collapse ml-46">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">ID</th>
                                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Product Name</th>
                                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Package ID</th>
                                            <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Customer Email</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Address</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Package Size</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Weight</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Delivery Man</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Delivery Service</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Dispatch Date</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Expected Date</th>
                                            <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveries.map((delivery, i) => (
                                            <tr key={i}>
                                                <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery._id}</td>
                                                <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.productName}</td>
                                                <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.packageId}</td>
                                                <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.email}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.address}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.packSize}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.weight}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.delman}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.delservice}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.dispatchDate}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{delivery.expectedDate}</td>
                                                <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
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

export default DeliveryDetails;
*/