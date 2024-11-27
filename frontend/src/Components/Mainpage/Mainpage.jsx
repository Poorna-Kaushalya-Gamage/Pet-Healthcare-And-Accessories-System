import React from "react";

import SideBar from "../Sidebar/Sidebar";

function Mainpage() {
    return (
        <React.Fragment>
            <section>
                <div>
                    <Nav />
                </div>
            </section>
            <section className="grid grid-cols-12">
                <div className="col-span-3 bg-black h-screen pl-2">
                    <SideBar />
                </div>
                <div className="col-span-9">
                    <h1>Mainpage</h1>
                    {/* Add your main content here */}
                </div>
            </section>
        </React.Fragment>
    );
}

export default Mainpage;





