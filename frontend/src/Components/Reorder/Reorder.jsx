import React from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

function Reorder(props) {
  const {
    _id,
    prid,
    name,
    reorderQuantity,
    supplierName,
    supplierNo,
   
  } = props.reorder;
  
  

  const history = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/reorders/${_id}`)
    .then(res=> res.data)
    .then(() =>history("/"))
    .then(() =>history("/displayreorder"));
  }
  
  return (
    <tr>
     
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md" title={prid}>
        {prid}
      </td>
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md" title={name}>
        {name}
      </td>
     
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{reorderQuantity}</td>
      
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md">{supplierName}</td>
      <td className="px-4 py-2 border border-solid border-gray-400 rounded-md shadow-md ">{supplierNo}</td>
     
      <td className="px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md print:hidden">
        <Link to={`/displayreorder/${_id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded mr-2">
          <FaEdit/>
        </button>
        </Link>
      </td>
      <td className=" px-2 py-2 border border-solid border-gray-400 rounded-md shadow-md print:hidden">
        <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-2 rounded">
          <FaTrash/>
        </button>
      </td>
    </tr>
  );
}

export default Reorder;

