import {React, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import "../home/Home.css"
import landing from "../../assets/landing_page.jpeg"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const auth = useAuth();  //from authcontext
  const navigate = useNavigate();  //helps navigate to different routes
  const [error, setError] = useState(false);     //if there is an error


  const login = async (e) => {
    let email = "test1@gmail.com"
    let password = "Luis111"
    e.preventDefault();
    // let { email, password } = data;    //makes email and password variable the email and password that is in the data state           
  
    try {
      await auth.authenticate(email, password);  //authenticate from authcontext 
      //  navigate(from, { replace: true });   //go to where user was before login
          navigate("/")
          
    } catch (error) {
      setError(true);
    }
  };
  

  return (
    <section id='header'>
      {/* <Navbar/> */}
      <div className='container'>
          <div className='hero'>
            <div>
              <img src={landing} className="landingPageImg" alt='landingPageImg'/>
            </div>
            <div className='heroWords'>
              <div>
                <h1 className='heropageHeading'>Track<br/>Your Workouts</h1>
                <p>Tracking your workouts leads to consistent gains at the gym and takes you a step closer to your dream body</p>
              </div>
              <div className = "heroButtons">
                <Link to={"/signup"} className="getStarted">Get Started!</Link>
                <button onClick={login} className="demoButton">Demo App</button>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
