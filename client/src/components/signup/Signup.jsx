import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthButton from '../extra/AuthButton';
import { useAuth } from "../../context/AuthContext";

import './Signup.css'
function Signup () {
    const auth = useAuth();
    const navigate = useNavigate();
    const [text, setText] = useState("")

    return (
        <div className='Signup'>
            {/* <a className='signup_button' href='#signup'>Sign Up</a> */}
            {!auth.isAuthenticated ? <Link className='signup_button' to="/signup">Sign Up</Link> : <div></div> }
            {/* <Link className='signup_button' to="/signup">Sign Up</Link> */}
            {/* <a className='login_button' href='#login'>Log In</a> */}
            {/* <Link className='login_button' to="/login">Log In</Link>  Needs to change when logged in */}
            <AuthButton/>

        </div>


    );
}
export default Signup;