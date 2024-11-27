import React, { useState, useEffect } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import Chart from "react-apexcharts";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faExclamationTriangle, faPercentage } from '@fortawesome/free-solid-svg-icons';

function ProductDashboard() {
  
  const [cbarChartData, setCbarChartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [reorderProductsCount, setReorderProductsCount] = useState(0);
  const [activeDiscountsCount, setActiveDiscountsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/products/getAll"
        );
        const discountResponse = await axios.get(
          "http://localhost:5000/discounts/getAll"
        );
        console.log("Fetched products:", productResponse.data.products);
        console.log("Fetched discounts:", discountResponse.data.discounts);

        const products = productResponse.data.products;
        const discounts = discountResponse.data.discounts;

        discounts.forEach((discount) => {
          discount.startDate = new Date(discount.startDate);
          discount.endDate = new Date(discount.endDate);
          discount.startDate.setHours(0, 0, 0, 0);
          discount.endDate.setHours(0, 0, 0, 0);
        });

        // Calculate total quantity
        let total = 0;
        let lowStockCount = 0;
        let reorderCount = 0;
        products.forEach((product) => {
          total += product.quantity;
          if (product.quantity < product.stockAlertThreshold) {
            lowStockCount++;
          }
          if (product.quantity < product.reorderPoint) {
            reorderCount++;
          }
        });
        setTotalQuantity(total);
        setLowStockCount(lowStockCount);
        setReorderProductsCount(reorderCount);

        // Count active discounts
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const activeDiscounts = discounts.filter((discount) => {
          const stDate = new Date(discount.startDate);
         
          const edDate = new Date(discount.endDate);
         
          return stDate <= currentDate && edDate >= currentDate;
        });
        console.log(currentDate);
        console.log(activeDiscounts);
        console.log("count array",activeDiscounts.length);
        setActiveDiscountsCount(activeDiscounts.length);

        // Group products by category and sum their quantities
        const categories = {};
        products.forEach((product) => {
          if (categories[product.category]) {
            // Add quantity to existing category
            categories[product.category] += product.quantity;
          } else {
            // Create new category with quantity
            categories[product.category] = product.quantity;
          }
        });

        // Prepare data for bar chart
        const cbarChartOptions = {
          colors: ["#00008B"],
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: Object.keys(categories),
          },
        };
        const cbarChartSeries = [
          {
            name: "Quantity",
            data: Object.values(categories),
          },
        ];
        setCbarChartData({
          options: cbarChartOptions,
          series: cbarChartSeries,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <section>
        <Nav />
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
        <div className="grid grid-cols-10">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0">
            <Sidebar />
          </div>
          <div className="mt-4  container flex justify-center items-center ml-96 space-x-4">
              <div className="card p-4 bg-customBlue rounded-md shadow-lg ml-52 flex-grow">
                <FontAwesomeIcon icon={faBox} className="text-white text-3xl mr-2" />
                <h3 className="text-md font-semibold mb-2 text-white text-nowrap">
                  Total Products Quantity
                </h3>
                <p className="text-xl font-bold text-white text-center">{totalQuantity}</p>
              </div>
              <div className="card p-4 bg-customBlue rounded-md shadow-lg flex-grow ">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-3xl mr-2" />
                <h3 className="text-md font-semibold mb-2 text-white text-nowrap">
                  Low Stock Products
                </h3>
                <p className="text-xl font-bold text-white text-center">{lowStockCount}</p>
              </div>
              <div className="card p-4 bg-customBlue rounded-md shadow-lg flex-grow">
                <FontAwesomeIcon icon={faBox} className="text-red-500 text-3xl" />
                <h3 className="text-md font-semibold mb-2 text-white text-nowrap">
                  Reorder Products
                </h3>
                <p className="text-xl font-bold text-white text-center">{reorderProductsCount}</p>
              </div>
              <div className="card p-4 bg-customBlue rounded-md shadow-lg flex-grow">
                <FontAwesomeIcon icon={faPercentage} className="text-yellow-500 text-3xl" />
                <h3 className="text-md font-semibold mb-2 text-white text-nowrap">
                  Active Discounts
                </h3>
                <p className="text-xl font-bold text-white text-center">{activeDiscountsCount}</p>
              </div>
            </div>
          <div className="col-span-10 bg-white-500 h-screen">
            <div className="mt-4">
              {cbarChartData && (
                <div className="overflow-hidden">
                  <Chart
                    options={cbarChartData.options}
                    series={cbarChartData.series}
                    type="bar"
                    width="1200"
                    height="500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ProductDashboard;
