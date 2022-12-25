import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar () {
    return (
        <div className='Navbar'>
            <Link to={"/"}>Home</Link>
            <Link to={"/workouts"}>Workouts</Link>
            <a href='#Nutrtion'>Nutrition</a>
            <a href='#Progress'>Progress</a>
        </div>
    );
}
export default Navbar;