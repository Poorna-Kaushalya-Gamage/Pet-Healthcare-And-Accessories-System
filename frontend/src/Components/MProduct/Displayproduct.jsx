import React, { useEffect, useState, useRef } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:5000/products/getAll";


const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Displayproduct() {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    fetchHandler().then((data) => setProducts(data.products));
  }, []);

  const tableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Products Report",
    onAfterPrint: () => alert("Products Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () =>{
    fetchHandler().then((data) =>{
      const filteredProducts = data.products.filter((product) =>
    Object.values(product).some((field)=>
    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ))
    setProducts(filteredProducts);
    setNoResults(filteredProducts.length === 0);
    });
  }

 
  return (
    <React.Fragment>
      <section>
        <Nav />
      </section>

      <section className="pl-60 pt-20 overflow-x-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0">
            <Sidebar />
          </div>

          <div className="col-span-10">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded mt-2 inline-block">
              <Link to="/addproduct">
                <button>Add Product</button>
              </Link>
            </div>
            <button onClick={handlePrint} className="  text-right bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 mt-2 ml-4 rounded inline-block">Download Product Report</button>
            <br />
            <br />
            
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
                <p>No Products Found</p>
              </div>
            ): (
            <div ref={tableRef} >
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">

                  <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">PPID</th>
                  <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Name</th>
                  <th className="px-8 py-4 border border-solid border-gray-400 rounded-md shadow-md">Image</th>
                  <th className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">Description</th>
                  <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Price</th>
                  <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Quantity</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">Manufacture Date</th>
                  <th className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md">Expire Date</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">Stock Alert Threshold</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">Reorder Point</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">Category</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">Brand</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">Edit</th>
                  <th className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <Product key={i} product={product} />
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

export default Displayproduct;
