import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Delay(props) {
    const { _id,email,packId,issue } = props.delay;
    const history = useNavigate();

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/delay/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/delaydetails"))
    }

   
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{packId}</td>
            <td className="px-6 py-4 whitespace-nowrap">{issue}</td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                
                <button onClick={deleteHandler} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
            </td>
        </tr>
    )
}

export default Delay;



