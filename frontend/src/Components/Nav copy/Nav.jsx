import React from 'react';
import './Nav.css';
import {Link} from "react-router-dom";




function Nav  () {
    return (
    <div>
         <React.Fragment>
      <section>
        <div className= 'bg-customBlue h-20 w-full flex items-center justify-center fixed top-0 left-0'>
          <div>
            <h1 className=" font-Kanit font-bold text-white text-3xl">PetPulse</h1>
          </div>
          <div></div>
        </div>
      </section>
    <br></br>
<br></br><br></br><br></br>

        <ul className='home-ul'>
          
        </ul>
        <div></div>
        </React.Fragment>
    </div>
    )
}


export default Nav

