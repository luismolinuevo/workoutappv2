import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Signup } from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import Test from "./components/extra/AuthButton"
import Navbar from "./components/navbar/Navbar";

import ShowWorkouts from "./pages/workouts/ShowWorkouts"
import CreateWorkouts from "./pages/workouts/Createworkouts"
import Workouts from "./pages/workouts/Workouts";

import './App.css';
import Home from'./pages/home/Home'
import Exercise from "./pages/workouts/Exercise";
import CreateExercise from "./pages/workouts/CreateExercise";
import EditExercise from "./pages/workouts/EditExercise";

import "./App.css";
import PrivateRouteRequiresAuth from "./components/extra/PrivateRouteRequiresAuth"


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/workouts/:id" element={ <PrivateRouteRequiresAuth><Workouts/></PrivateRouteRequiresAuth>} />
              <Route path="/createworkouts" element={<PrivateRouteRequiresAuth><CreateWorkouts/></PrivateRouteRequiresAuth>} />
              <Route path="/workouts/:id/createexercise/:id" element={<PrivateRouteRequiresAuth><CreateExercise/></PrivateRouteRequiresAuth>}/>
              <Route path="workouts" element={<PrivateRouteRequiresAuth><ShowWorkouts/></PrivateRouteRequiresAuth>}/>
              <Route path="/workouts/:id/exercise/exerciseId/:id" element={<PrivateRouteRequiresAuth><Exercise/></PrivateRouteRequiresAuth>} />   {/*this lets each exercise have their own page (adding /workouts/:id to it) and in the link I call exerceiseId/:id*/}
              <Route path="/workouts/:id/exercise/exerciseId/:id/exercise/edit/:id" element={<PrivateRouteRequiresAuth><EditExercise/></PrivateRouteRequiresAuth>} />
            </Routes>
        {/* <Home/> */}
        </BrowserRouter>
      </AuthProvider>    
    </div>
  );
}

export default App;
