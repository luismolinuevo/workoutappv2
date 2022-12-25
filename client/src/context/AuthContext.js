import React, { useState, useEffect, createContext } from "react";


const AuthContext = createContext();        //makes the context
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);     //

  useEffect(() => {
    async function checkIfUserIsLoggedIn() {
      try {
        let response = await fetch("http://localhost:5000/api/auth/login", {
          credentials: "include",
        })   //fetch to backend login route
        // .catch(err => {
        //   setUser({ loggedIn: false });
        //   return;
        // })
        // .then(r => {
        //   if (!r || !r.ok || r.status >= 400) {
        //     setUser({ loggedIn: false });
        //     return;
        //   }
        //   return r.json();
        // })
        // .then(data => {
        //   if (!data) {
        //     setUser({ loggedIn: false });
        //     return;
        //   }
        //   setUser({ ...data });
        // });
      
        if (!response.ok) {
          throw new Error("Unauthenticated");    //if its not ok it will throw an error
        }

        let fetchedUser = await response.json();   
        setUser(fetchedUser);      
      } catch (error) {    
        setUser(false);
      }
    }

    checkIfUserIsLoggedIn();   

    return () => {

    };
  }, []);

  const authenticate = async (email, password) => {
    // if(user) {
      let response = await fetch("http://localhost:5000/api/auth/login", {   //fetches from backend
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ email, password }),    //with the email and password
      headers: {
        "Content-Type": "application/json",
        
      },
    })

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    let loggedInUser = await response.json();
    setUser(loggedInUser);
    console.log(loggedInUser)

    return loggedInUser;
    // }
    
  };


  const signout = async () => {
    let response = await fetch("http://localhost:5000/api/auth/logout", {  //calls logout route
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Logout Failed");
    }

    let body = await response.json();
    setUser(false);

    return body;
  };

  return (
    <Provider
      value={{
        authenticate,
        signout,
        isAuthenticated: user ? true : false,  //use this to check is user is authenticated
        user,
      }}
    >
      {children}
    </Provider>
  );
};

// Create our own hook for accessing the context from any functional component
function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth, AuthProvider };