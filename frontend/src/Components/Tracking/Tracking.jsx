import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Tracking(props) {
    const { _id, email, status1, date1, status2, date2, status3, date3, packageId } = props.track;
    const history = useNavigate();

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/tracking/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/trackingdetails"))
    }
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{status1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{date1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{status2}</td>
            <td className="px-6 py-4 whitespace-nowrap">{date2}</td>
            <td className="px-6 py-4 whitespace-nowrap">{status3}</td>
            <td className="px-6 py-4 whitespace-nowrap">{date3}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/trackingdetails/${_id}`} className="text-blue-600 hover:text-blue-900">Update</Link>
                <button onClick={deleteHandler} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
            </td>
        </tr>
    )
}

export default Tracking;



