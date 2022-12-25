import React from 'react'
import './Section3.css'

function Section3() {
    return (
        <div className='Section3'>
            <div className='footerColumn-siteMap'>
                <div className='footerColumn--title'>Company</div>
                <div className='footerColumn--item'><a href='#'>Jobs</a></div>
                <div className='footerColumn--item'><a href='#'>Contact</a></div>
                <div className='footerColumn--item'><a href='#'>Blog</a></div>
            </div>
            <div className='footerColumn-siteMap'>
                <div className='footerColumn--title'>Legal</div>
                <div className='footerColumn--item'><a href='#'>Term & Conditions</a></div>
                <div className='footerColumn--item'><a href='#'>Privacy Policy</a></div>
            </div>
        </div>
    );
}
export default Section3;
