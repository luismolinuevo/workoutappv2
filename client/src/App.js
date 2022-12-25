import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Signup } from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import Test from "./components/extra/AuthButton"
import { Header } from "./containers";

import ShowWorkouts from "./pages/workouts/ShowWorkouts"
import CreateWorkouts from "./pages/workouts/Createworkouts"
import Workouts from "./pages/workouts/Workouts";

import './App.css';
import {Home} from'./pages'
import Exercise from "./pages/workouts/Exercise";
import CreateExercise from "./pages/workouts/CreateExercise";
import EditExercise from "./pages/workouts/EditExercise";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/workouts/:id" element={<Workouts/>} />
            <Route path="/createworkouts" element={<CreateWorkouts/>} />
            <Route path="/workouts/:id/createexercise/:id" element={<CreateExercise/>}/>
            <Route path="/test" element={<Test/>} />
            <Route path="workouts" element={<ShowWorkouts/>}/>
            <Route path="/workouts/:id/exercise/exerciseId/:id" element={<Exercise/>} />   {/*this lets each exercise have their own page (adding /workouts/:id to it) and in the link I call exerceiseId/:id*/}
            <Route path="/workouts/:id/exercise/exerciseId/:id/exercise/edit/:id" element={<EditExercise/>} />
          </Routes>
        {/* <Home/> */}
        </BrowserRouter>

      </AuthProvider>
      
      
    </div>
  );
}

export default App;
