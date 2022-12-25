import React from 'react'
import './Logo.css'
import logo from '../../assets/logo.gif'
function Logo () {
    return (
        <div className= 'Logo'>
            <a><img className='logo_img' src={logo} alt='logo'/></a>
        </div>
    );
}
export default Logo;