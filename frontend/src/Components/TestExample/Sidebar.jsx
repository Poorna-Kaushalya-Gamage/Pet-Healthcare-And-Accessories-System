import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdHealthAndSafety, MdVaccines } from "react-icons/md";
import { GiEarthWorm } from "react-icons/gi";
import { BiAddToQueue } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [nav, setNav] = useState(false);
  const [isAddDetailsHovered, setIsAddDetailsHovered] = useState(false);
  const navigate = useNavigate(); // Access the navigate function from react-router-dom

  const menuItems = [
    { icon: <MdHealthAndSafety size={25} className="mr-4" />, text: "Treatment Records", path: "/petrecords" },
    { icon: <MdVaccines size={25} className="mr-4" />, text: "Immunization Records", path: "/vaccinationRecords" },
    { icon: <GiEarthWorm size={25} className="mr-4" />, text: "De-Worming Records", path: "/doWarmingRecords" },
    { icon: <TbReportSearch size={25} className="mr-4" />, text: "Reports", path: "/reports" },
    { icon: <BiAddToQueue size={25} className="mr-4" />, text: "Add Details", path: "/details", dropdown: ["Treatment", "Immunization", "DoWorming"] },
  ];

  const handleDropdownItemClick = (item) => {
    // Define route mappings for dropdown items
    const routeMappings = {
      Treatment: "/addpetrecords",
      Immunization: "/addvaccinationRecords",
      DoWorming: "/addDoWarming",
    };

    // Navigate to the selected report type
    const route = routeMappings[item];
    if (route) {
      navigate(route); // Use navigate to navigate to the specified route
    }
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-blue-200">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Pet <span className="font-bold">Pulse</span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2">Admin</p>
          <p className="p-2">Dashboard</p>
        </div>
      </div>

      {/* Additional navigation links (moved to the right) */}
      <div className="flex items-center ml-auto">
        <Link to="/home" className="mx-2 text-sm lg:text-base">
          Home
        </Link>
        <Link to="/dashboard" className="mx-2 text-sm lg:text-base">
          Dashboard
        </Link>
        <Link to="/addReminder" className="mx-2 text-sm lg:text-base">
          Reminder
        </Link>
        <Link to="/crud" className="mx-2 text-sm lg:text-base">
          Log in
        </Link>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav && <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>}

      {/* Side drawer menu */}
      <div className={nav ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300" : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"}>
        <AiOutlineClose onClick={() => setNav(!nav)} size={30} className="absolute right-4 top-4 cursor-pointer" />
        <h2 className="text-2xl p-4">
          Pet <span className="font-bold">Pulse</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text, path, dropdown }, index) => (
              <li
                key={index}
                className="py-4"
                onMouseEnter={() => setIsAddDetailsHovered(text === "Add Details")}
                onMouseLeave={() => setIsAddDetailsHovered(false)}
              >
                {dropdown ? (
                  <div className="relative">
                    <span
                      className="flex items-center cursor-pointer p-2 hover:text-white hover:bg-black"
                    >
                      {icon}
                      <span className="ml-2 text-xl">{text}</span>
                    </span>
                    {/* Dropdown menu */}
                    {isAddDetailsHovered && (
                      <ul className="absolute left-[100%] top-0 mt-2 py-2 w-36 bg-white shadow-lg rounded z-10">
                        {dropdown.map((item, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleDropdownItemClick(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link to={path} className="flex items-center cursor-pointer p-2 hover:text-white hover:bg-black">
                    {icon}
                    <span className="ml-2 text-xl">{text}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
