import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import Logo from "../logo/Logo"
import Signup from '../signup/Signup';
import {FaBars, FaTimes} from "react-icons/fa";
import AuthButton from '../extra/AuthButton';
import { useAuth } from "../../context/AuthContext";

function Navbar () {
    const auth = useAuth();
    const navigate = useNavigate();

    const [authNav, setAuthNav] = useState("")
    const [expandNavbar, setExpandNavbar] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setExpandNavbar(!expandNavbar)   //sets expandnavbar to opposite value. Closes nav bar on mobile when clicked


    const changeBackground = () => {
        if(window.scrollY >= 90) {
            setNavbar(true)
        } 
        else {
            setNavbar(false)
        }
    }

    const handleLink = () => {
        if(auth.isAuthenticated) {
            setAuthNav("Logout")
        }

        else {
            setAuthNav("Login/Signout")
        }
    }

    const logout = () => {
        auth.signout().then(() => navigate("/"));
        // setAuthNav((prev) => !prev)
        handleClick()
    };

    useEffect(() => {
        setExpandNavbar(false);
        window.addEventListener("scroll", changeBackground)
    }, []);


    return (
            <header className = {navbar ? "active" : " "}>
                <div className = "container">
                    <div className = "navbar">
                        <div><Logo/></div>
                        <nav className={expandNavbar ? "responsive_nav" : " "}>
                            <Link to={"/"} onClick={handleClick}>Home</Link>
                            <Link to={"/workouts"} onClick={handleClick}>Workouts</Link>
                            {/* {!auth.isAuthenticated ? <Link to={"/login"} onClick={handleClick}>{authNav}</Link> : <button onClick={logout}>{authNav}</button>} */}
                            <AuthButton/>
                            <button className="nav-btn nav-close-btn" onClick={() => {
                                setExpandNavbar((prev) => !prev);
                             }}> 
                                <FaTimes/>
                            </button>  
                        </nav>
                    </div>
                
                    <button className="nav-btn" onClick={() => {
                        setExpandNavbar((prev) => !prev);
                    }}>
                        <FaBars/>
                    </button>
                </div>
            </header>
        
    );
}
export default Navbar;

