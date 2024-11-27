import React, { useState, useEffect, useRef } from "react";
import Navbar from "../nav/nav";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";

const URL = "http://localhost:5000/employees";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentCounts, setDepartmentCounts] = useState({});
  const [jobTitleCounts, setJobTitleCounts] = useState({});
  const [departmentChartData, setDepartmentChartData] = useState(null);
  const [jobTitleChartData, setJobTitleChartData] = useState(null);

  useEffect(() => {
    fetchHandler().then((data) => {
      setEmployees(data.employees);
      countEmployeesByDepartment(data.employees);
      countEmployeesByJobTitle(data.employees);
    });
  }, []);

  useEffect(() => {
    renderDepartmentChart();
    renderJobTitleChart();
  }, [departmentCounts, jobTitleCounts]);

  const ComponentsRef = useRef();
  const departmentChartRef = useRef();
  const jobTitleChartRef = useRef();

  //--- Create Pdf ---
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Employees Report",
    onAfterPrint: () => alert("Employees report Successfully Downloaded!.."),
  });

  //DELETE USER
  const deleteemployees = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      // After deletion, fetch the updated list of users
      const updateemployees = employees.filter(
        (employee) => employee._id !== _id
      );
      setEmployees(updateemployees);
      countEmployeesByDepartment(updateemployees);
      countEmployeesByJobTitle(updateemployees);
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };

  // Count employees by department
  const countEmployeesByDepartment = (employees) => {
    const counts = employees.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});
    setDepartmentCounts(counts);
  };

  // Count employees by job title
  const countEmployeesByJobTitle = (employees) => {
    const counts = employees.reduce((acc, employee) => {
      acc[employee.jobTitle] = (acc[employee.jobTitle] || 0) + 1;
      return acc;
    }, {});
    setJobTitleCounts(counts);
  };

  //--- Create Search ---
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredEmployees = data.employees.filter((employee) =>
        Object.values(employee).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setEmployees(filteredEmployees);
      countEmployeesByDepartment(filteredEmployees);
      countEmployeesByJobTitle(filteredEmployees);
    });
  };

  // Function to render department chart
  const renderDepartmentChart = () => {
    const labels = Object.keys(departmentCounts);
    const data = Object.values(departmentCounts);

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };

    setDepartmentChartData(chartData);
  };

  // Function to render job title chart
  const renderJobTitleChart = () => {
    const labels = Object.keys(jobTitleCounts);
    const data = Object.values(jobTitleCounts);

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };

    setJobTitleChartData(chartData);
  };

  return (
    <div>
      <Navbar />
      &nbsp;<br/><br/>
      <center>
        <h1>Employee Details</h1>
      </center>
      <div
        className="searchbar"
        style={{ position: "relative", top: "-20px", left: "1100px" }}
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
      <div
        className="flex justify-center mt-0"
        style={{
          width: "0px",
          position: "absolute",
          left: "750px",
          top: "550px",
        }}
      >
        <div ref={ComponentsRef}>
          <table className="border-4 border-collapse w-0">
            <thead>
              <tr>
                <th className="border p-2">
                  <center>User Image</center>
                </th>
                <th className="border p-2">
                  <center>Employee RegNo</center>
                </th>
                <th className="border p-2">
                  <center>FullName</center>
                </th>
                <th className="border p-2">
                  <center>Gender</center>
                </th>
                <th className="border p-2">
                  <center>Date Of Birth</center>
                </th>
                <th className="border p-2">
                  <center>Address</center>
                </th>
                <th className="border p-2">
                  <center>Phone Number</center>
                </th>
                <th className="border p-2">
                  <center>Email</center>
                </th>
                <th className="border p-2">
                  <center>job Title</center>
                </th>
                <th className="border p-2">
                  <center>Department</center>
                </th>
                <th className="border p-2">
                  <center>Employment Status</center>
                </th>
                <th className="print:hidden">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="border p-2">
                    <img
                      src={`http://localhost:5000/profileimage/${employee.userimage}`}
                      alt="User"
                      style={{ maxWidth: "50px", borderRadius: "50%" }}
                    />
                  </td>
                  <td className="border p-2">{employee.employeeID}</td>
                  <td className="border p-2">{employee.fullName}</td>
                  <td className="border p-2">{employee.gender}</td>
                  <td className="border p-2">{employee.dateOfBirth}</td>
                  <td className="border p-2">{employee.address}</td>
                  <td className="border p-2">{employee.phoneNumber}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.jobTitle}</td>
                  <td className="border p-2">{employee.department}</td>
                  <td className="border p-2">{employee.employmentStatus}</td>
                  <td className="print:hidden w-25">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`/AdminDashboard/${employee.email}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                        View
                      </button>
                    </Link>
                    <Link to={`/Updateemployee/${employee._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 mr-2">
                        Update
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                      onClick={() => deleteemployees(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="print"
        style={{ position: "absolute", top: "155px", left: "1270px" }}
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handlePrint}
        >
          Download Report
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px auto",
          marginTop: "50px",
          width: "1000px",
        }}
      >
        {/* Display Department Counts */}
        <div
          style={{
            width: "1320px",
            height: "310px",
            backgroundColor: "#D4CCBF",
            position: "absolute",
            left: "100px",
            borderRadius: "40px",
          }}
        >
          <hr
            style={{
              position: "absolute",
              left: "670px",
              width: "2px",
              height: "290px",
              backgroundColor: "#7A766E",
              boxShadow: "4px 4px 8px rgba(0, 0, 250, 0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "700px",
              height: "300px",
              width: "450px",
            }}
          >
            <h3
              style={{
                position: "absolute",
                top: "30px",
                width: "650px",
                left: "-20px",
              }}
            >
              <center>No of Employees</center>
            </h3>
            {Object.keys(jobTitleCounts).map((jobTitle) => (
              <div
                className="card m-2"
                key={jobTitle}
                style={{ width: "100px", height: "50px", top: "180px",left:"-50px" }}
              >
                <div className="card-body" style={{ width: "200px" }}>
                  <h5 className="card-title">
                    {jobTitle} - {"  "}
                    {jobTitleCounts[jobTitle]}
                  </h5>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: "290px", top: "70px" }}>
            {departmentChartData && (
              <Pie
                data={departmentChartData}
                ref={departmentChartRef}
                width={400}
                height={200}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            )}
          </div>
          {/* Display Job Title Counts */}
          {/* Display Department Counts */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              height: "50px",
              top: "50px",
            }}
          >
            <h3
              style={{
                position: "absolute",
                top: "-15px",
                width: "450px",
                left: "80px",
              }}
            >
              <center>No of Employees in the Departments</center>
            </h3>
            {Object.keys(departmentCounts).map((department) => (
              <div
                className="card m-2"
                key={department}
                style={{ width: "150px", height: "50px", top: "10px" }}
              >
                <div className="card-body" style={{ width: "300px" }}>
                  <h5 className="card-title">
                    {department} - {"  "}
                    {departmentCounts[department]}
                  </h5>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: "900px", top: "70px" }}>
            {jobTitleChartData && (
              <Pie
                data={jobTitleChartData}
                ref={jobTitleChartRef}
                width={400}
                height={200}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployees;
