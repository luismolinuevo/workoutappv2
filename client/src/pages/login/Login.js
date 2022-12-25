import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Login.css'
function LoginPage() {
  const auth = useAuth();  //from authcontext
  const navigate = useNavigate();  //helps navigate to different routes
  const location = useLocation();  //get location(route)
  const [data, setData] = useState({ email: "", password: "" });  // state with username and password
  const [error, setError] = useState(false);     //if there is an error

  const from = location.state?.from?.pathname || "/";   //gets current location so when you login it takes the user where they were before

  const fieldChanged = (name) => {   //updates the setData state that has the email and password
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const login = async (e) => {
    e.preventDefault();
    let { email, password } = data;    //makes email and password variable the email and password that is in the data state           

    try {
      await auth.authenticate(email, password);  //authenticate from authcontext 
    //   navigate(from, { replace: true });   //go to where user was before login
         navigate("/")
    } catch (error) {
      setError(true);
    }
  };

  let errorMessage = "";
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Login Failed
      </div>
    );
  }

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form1"  onSubmit={login}>
          {errorMessage}
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={fieldChanged("email")}
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={fieldChanged("password")}
          />
          <button type="submit" className="btn btn-primary ml-auto">
            Login
          </button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div>
        <p>Need an account?</p>
        <Link to={"/signup"}>Signup</Link>
      </form>
    </div>
  );
}

export default LoginPage;