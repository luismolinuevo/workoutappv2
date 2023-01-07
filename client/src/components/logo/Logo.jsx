import React from 'react'
import './Logo.css'
import logo from '../../assets/logo.gif'
import { Link } from 'react-router-dom';

function Logo () {
    return (
            <div className= 'Logo'>
                <Link to={"/"}><img className='logo_img' src={logo} alt='logo'/></Link>
            </div>
    );
}
export default Logo;