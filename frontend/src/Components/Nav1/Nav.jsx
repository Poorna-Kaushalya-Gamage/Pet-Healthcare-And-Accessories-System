import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
    <nav className="nav">
     < h1   classname="site-title">
        Petpulse
     </h1>
     <ul >
        <li>
            <Link to="/mainhome" className="active home-a" >
            <h1>Home</h1>
            </Link>
        </li>
        <li >
        <Link to="/addpetrecords" className="active home-a" >
            <h1>Add pet records</h1>
            </Link>
        </li>
        <li>
        <Link to="/petrecords" className="active home-a" >
            <h1>pet records details</h1>
            </Link>
        </li >

        <li>
        <Link to="/useReminder" className="active home-a" >
            <h1>User Reminder</h1>
            </Link>
        </li>
     </ul>
     </nav>
    </div> 
  )
}

export default Nav
