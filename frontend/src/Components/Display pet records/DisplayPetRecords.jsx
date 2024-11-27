import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayPetRecords(props) {
  const { _id,microchipId, date, diagnosis, treatment, specialNotes } = props.PetRecord;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/PetRecordBooks/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/petrecords'));
  };

  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top">{microchipId}</td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top">{date}</td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top max-w-xs overflow-hidden">
        {diagnosis}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top max-w-xs overflow-hidden">
        {treatment}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top max-w-xs overflow-hidden">
        {specialNotes}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white align-top">
        <div className="flex items-start space-x-4 print:hidden">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            <Link to={`/petrecords/${_id}`}>Edit</Link>
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default DisplayPetRecords;
