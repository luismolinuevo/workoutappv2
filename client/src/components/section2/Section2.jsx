import React from 'react'
import './Section2.css'

function Section2() {
    return (
        <div className='Section2'>
            <div className='footerColumn-siteMap'>
                <div className='footerColumn--title'>Features</div>
                <div className='footerColumn--item'><a href='#'>Workouts</a></div>
                <div className='footerColumn--item'><a href='#'>Track Nutrition</a></div>
                <div className='footerColumn--item'><a href='#'>Track Performance</a></div>
            </div>
            <div className='footerColumn-siteMap'>
                <div className='footerColumn--title'>Resources</div>
                <div className='footerColumn--item'><a href='#'>Help Center</a></div>
                <div className='footerColumn--item'><a href='#'>Video Tutorial</a></div>
                <div className='footerColumn--item'><a href='#'>Get a Demo</a></div>
                <div className='footerColumn--item'><a href='#'>Pricing</a></div>
                <div className='footerColumn--item'><a href='#'>FAQ</a></div>
            </div>
        </div>
    );
}
export default Section2;