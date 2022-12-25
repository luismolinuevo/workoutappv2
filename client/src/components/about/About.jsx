import React from 'react'
import './About.css'

function About () {
    return (
        <div className='About'>
            <h1 className="header--title">Get Stronger and Fitter with Us</h1>
            <div className="header--subtitle">Fitszy helps you track your fitness progress on every aspect. You can create workouts, keep track of your nutrition and progress.
            </div>
            <div className="tiiBtnContainer">
                <a className="tiiBtn-primary"
                   href="#sign-up-form">Sign Up for Free</a>
                <a className="tiiBtn-secondary"
                   href="/get-a-demo" type="button">Get a Demo</a>
            </div>
        </div>
    );
}
export default About;