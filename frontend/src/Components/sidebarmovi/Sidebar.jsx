import React from "react";
import { SidebarData } from "./SidebarData";
import {NavLink} from "react-router-dom";

function SideBar() {
  const activeLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-l font-bold bg-red-500'
  const normalLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-l font-bold'
  return (
    <React.Fragment>
      <section>
        <div className="text-white">
          {SidebarData.map((item, index) => {
            return (
            
              <div key={index}>
                <NavLink to={item.path} 
                className={({isActive}) =>
                isActive ? activeLink:normalLink}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                  </NavLink>
                </div>
               
            )
          })
          }
        </div>
      </section>
    </React.Fragment>
  );
}

export default SideBar;
