import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { AiOutlineCalculator } from 'react-icons/ai';
import Nav from "../Nav copy/Nav";
import Sidebar from "../Sidebar/Sidebar";

function DelProgressChart() {
  const [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/tracking");
        console.log("Data from API:", response.data); // Log the data received from the API
        //const deliveries = response.data.delivery; // Extract the delivery array from the response
        const deliveries = response.data.tracking; // Extract the delivery array from the response
        setDeliveryData(deliveries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Check if deliveryData is an array before using forEach
  if (!Array.isArray(deliveryData)) {
    console.error("Delivery data is not an array:", deliveryData);
    return null; // Or handle this error condition as needed
  }

  // Process delivery data to calculate sums
  let notyetCount = 0;
  let packedCount = 0;
  let dispatchCount = 0;
  let completeCount = 0;
  deliveryData.forEach((tracking) => {
    if (tracking.status1 === "packed" && tracking.status2 === "notyet" && tracking.status3 === "notyet") {
      packedCount++;
    } else if (tracking.status1 === "packed" && tracking.status2 === "dispatched" && tracking.status3 === "notyet") {
      dispatchCount++;
    }else if (tracking.status3 === "complete") {
      completeCount++;
    }
    else if (tracking.status1 === "notyet" && tracking.status2 === "notyet" && tracking.status3 === "notyet") {
      notyetCount++;
    }
  });

  // Total sum of processing and complete items
  const totalSum = notyetCount + packedCount + dispatchCount + completeCount;


  const chartOptions = {
    xaxis: {
      categories: ["Not packed","Packed","Dispatch", "Complete"],
    },
  };

  const chartSeries = [
    {
      name: "Trackings",
      data: [notyetCount,packedCount,dispatchCount, completeCount],
    },
  ];


  return (

    <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
      <div className='grid grid-cols-13' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0'>
          <Sidebar/>
          </div>
       

    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Delivery Charts</h1>

     <div >
      <div className="bg-blue-100 p-4 rounded-lg flex items-center" >
        <AiOutlineCalculator className="text-blue-500 text-2xl mr-2" />
        <span className="text-lg font-semibold">Total Sum: {totalSum}</span>
      
      </div></div>

    

<Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="500"
      />
    </div>
    </div>
       
      
     </section>
       
     </React.Fragment>
  );
}

export default DelProgressChart;