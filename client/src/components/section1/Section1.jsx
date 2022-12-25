import React from 'react'
import './Section1.css'
import {Logo} from "../../components";
import icon1 from '../../assets/facebook.png';
import icon2 from '../../assets/youtube.png';
import icon3 from '../../assets/instagram.png';
import icon4 from '../../assets/tiktok.png';

function Section1() {
    return (
        <div className='Section1'>
            <Logo />
            <p>© 2022 • Fitszy, LLC.</p>
            <div className= 'socialMediaIcons'>
                <a><img src={icon1}/></a>
                <a><img src={icon2}/></a>
                <a><img src={icon3}/></a>
                <a><img src={icon4}/></a>
            </div>
        </div>
    );
}
export default Section1;