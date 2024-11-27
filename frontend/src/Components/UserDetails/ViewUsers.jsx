import React, { useState, useEffect, useRef } from "react";
import Navbar from "../nav/nav";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.Users));
  }, []);

  const ComponentsRef = useRef();

  //--- Create Pdf ---
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report - Petpulse",
    onAfterPrint: () => alert("User report Successfully Downloaded!.."),
  });

  //DELETE USER
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

  //--- Create Search ---
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.Users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
    });
  };

  return (
    <div>
      <Navbar />
      &nbsp;
      <center>
        <h1>Pet Owner Details</h1>
      </center>
      <div
        className="seachbar"
        style={{ position: "relative", top: "-20px", left: "1100px"}}
      >
        <input //--- Search Bar ---
          type="text"
          name="Search"
          placeholder="Search Users Details"
          onChange={(e) => setSearchQuery(e.target.value)}
        />{" "}
        &nbsp;
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-700 mr-2"
        >
          Search
        </button>
      </div>
      <div className="flex justify-center mt-10" >
        <div ref={ComponentsRef}>
            <table className="border-4 border-collapse w-64">
              <thead>
                <tr>
                  <th className="border p-2">User Image</th>
                  <th className="border p-2">User RegNo</th>
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">NIC</th>
                  <th className="border p-2">Password</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">PhoneNo</th>
                  <th className="border p-2">User Address</th>
                  <th className="print:hidden"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-2">
                      <img
                        src={`http://localhost:5000/profileimage/${user.userimage}`}
                        alt="User Profile"
                        style={{ maxWidth: "50px", borderRadius: "50%" }}
                      />
                    </td>
                    <td className="border p-2">{user.userRegNo}</td>
                    <td className="border p-2">{user.firstName}</td>
                    <td className="border p-2">{user.lastName}</td>
                    <td className="border p-2">{user.nic}</td>
                    <td className="border p-2">{user.password}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.phoneNo}</td>
                    <td className="border p-2">{user.usertAddress}</td>
                    <td className="print:hidden">
                      &nbsp;&nbsp;
                      <Link to={`/UserDashboard/${user.email}`}>
                        <button className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700 mr-2">
                          View
                        </button>
                      </Link>
                      <Link to={`/UpdateUseradmin/${user._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700 mr-2">
                          Update
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-700"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      <div
        className="print"
        style={{ position: "absolute", top: "125px", left: "1260px" }}
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handlePrint}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default ViewUsers;