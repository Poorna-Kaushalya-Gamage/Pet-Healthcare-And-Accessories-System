import React from "react";
import Nav from "../Nav copy/Nav";
import Sidebar from "../sidebarmovi/Sidebar";

function DeliveryDashboard() {
  return (
    <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
      <div className='grid grid-cols-12' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0 '>
          <Sidebar/>
        </div>
       
      </div>
    </section>
      
    </React.Fragment>
  );
}

export default DeliveryDashboard;
