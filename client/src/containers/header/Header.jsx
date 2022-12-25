import React from 'react'
import './Hearder.css'
import {Logo, Navbar, Signup} from '../../components'
function Header () {
    return (
        <div className='Header'>
            <Logo />
            <Navbar />
            <Signup />
        </div>
    );
}

export default Header;