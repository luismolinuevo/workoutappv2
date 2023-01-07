import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // if (!auth.isAuthenticated) {
  //   return (
  //     <Link className="btn btn-primary" to="/login">
  //       Login
  //     </Link>
  //   );
  // }

  // const logIn = () => {
  //   navigate("/login")
  // }

  const logout = () => {
    auth.signout().then(() => navigate("/"));
  };

  return (
    <div>
        {
          !auth.isAuthenticated
          ? 
            <Link className="btn btn-primary" to="/login">
              Login/Signup
            </Link>
          :
            <div>
              <button className="logoutButton" onClick={logout}>
                Logout
              </button>
            </div>
        }
    </div>


  );
};

export default AuthButton;