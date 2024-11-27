import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000/users";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.Users));
  }, []);

  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { Users: [] };
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      // After deletion, fetch the updated list of users
      const updatedUsers = users.filter((user) => user._id !== _id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <table className="w-80 border-collapse border border-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">User RegNo</th>
              <th className="p-4">First Name</th>
              <th className="p-4">Last Name</th>
              <th className="p-4">NIC</th>
              <th className="p-4">Password</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">PhoneNo</th>
              <th className="p-4">User Address</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={users.indexOf(user) % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                <td className="p-2">{user.userRegNo}</td>
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.nic}</td>
                <td className="p-2">{user.password}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phoneNo}</td>
                <td className="p-2">{user.usertAddress}</td>
                <td className="p-2">
                  <Link to={`/userdetails/${user._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Update</button>
                  </Link>{" "}
                  | <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
