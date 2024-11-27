import React from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

function Product(props) {
  const {
    _id,
    ppid,
    name,
    image,
    description,
    price,
    quantity,
    manufactureDate,
    expireDate,
    stockAlertThreshold,
    reorderPoint,
    category,
    brand,
  } = props.product;
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const imageBaseUrl = "http://localhost:5000/uploads";

  const history = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/products/${_id}`)
    .then(res=> res.data)
    .then(() =>history("/"))
    .then(() =>history("/displayproduct"));
  }
  
  return (
    <tr>
     
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md" title={ppid}>
        {ppid}
      </td>
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md" title={name}>
        {truncateText(name, 10)}
      </td>
      <td
        className="px-4 py-4 border border-solid border-gray-400 rounded-md shadow-md overflow-hidden max-w-xs"
        title={image}
      >
     {image && ( // Check if image property exists
          <img
            src={`${imageBaseUrl}/${image}`} // Construct image URL using base URL and image name
            alt={image}
            className="w-24 h-24"
          />
        )}
      </td>
      <td
        className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md overflow-hidden max-w-xs "
        title={description}
        
      >
        {truncateText(description, 30)}
      </td>
      <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md text-center">{price}</td>
      <td className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md text-center">{quantity}</td>
      <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md text-center">{manufactureDate}</td>
      <td className="px-8 py-4 border border-solid border-gray-400 rounded-md shadow-md ">{expireDate}</td>
      <td className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md text-center">
        {stockAlertThreshold}
      </td>
      <td className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md text-center">
        {reorderPoint}
      </td>
     
      <td className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">{category}</td>
      <td className="px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md">{brand}</td>
      <td className=" px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">
        <Link to={`/displayproduct/${_id}`}>
        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded mr-2 ">
         < FaEdit/>
        </button>
        </Link>
      </td>
      <td className=" px-1 py-1 border border-solid border-gray-400 rounded-md shadow-md print:hidden">
        <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-2 rounded">
        <FaTrash/>
        </button>
      </td>
    </tr>
  );
}

export default Product;
