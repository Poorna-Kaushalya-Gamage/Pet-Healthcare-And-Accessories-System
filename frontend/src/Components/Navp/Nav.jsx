import React, { useState, useEffect  } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";




function Nav() {
  const [products, setProducts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  

  useEffect(() => {
    fetchProducts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/getAll");
      setProducts(response.data.products);
      generateAlerts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const generateAlerts = () => {
    products.forEach((product) => {
      if (product.quantity <= product.stockAlertThreshold) {
        // Generate alert or take any desired action
        console.log(`Alert: ${product.name} quantity is low!`);
      }
    });
  };
 
  return (
    <React.Fragment>
      <section>
        <div className= 'bg-customBlue h-20 w-full flex items-center justify-between fixed z-10 top-0 left-0'>
        
        <div className="flex items-center justify-center w-full">
            <h1 className=" font-Kanit font-bold text-white text-3xl">PetPulse</h1>
          </div>
          <div  className="notification-icon flex items-center cursor-pointer"onClick={toggleNotifications}>
        <FaBell  className="mr-20"  />
        {showNotifications && <span className="bg-red-500 text-white rounded-full px-4 py-1 font-bold">!</span>}
         </div>
         {showNotifications && (
          <div className="absolute bg-white shadow-md rounded-lg top-14 right-4 mt-2 overflow-hidden">
            <ul className="p-4">
            <h2 className="font-bold underline">Low Stock Products</h2>
              {products
                .filter((product) => product.quantity <= product.stockAlertThreshold)
                .map((product) => (
                  <li key={product.ppid} className="rounded-t-lg border-b border-gray-200 py-4 px-4">
                    {product.name} - Quantity: {product.quantity}
                  </li>
                ))}
            </ul>
          </div>
        )}
        
        </div>
      </section>
    </React.Fragment>
  );
}

export default Nav;
