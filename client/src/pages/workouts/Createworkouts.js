import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from '../../components/extra/TextField';
import * as Yup from 'yup';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../pages/workouts/CreateWorkouts.css"

//onsumbit that post to api
//navigate to back to workout page
export default function Createworkouts() {
  const [title, setTitle] =  useState();
  const [desc, setDesc] =  useState();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // setDesc(event.target.value);
  };

  const handleDescChange = (event) => {
    // setTitle(event.target.value);
    setDesc(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          textBody: desc
        }),
      }).then((navigate(`/workouts`)))

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }
  };

  // if (success) return <Navigate to="/" />;

  return (
    <div className="container">
      <div className="createWorkouts">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Workout Title"
              value={title}
              className="form-control"
              onChange={handleTitleChange}
              autoFocus
            />
            <input
              type="text"
              placeholder="Workout Desc"
              value={desc}
              className="form-control"
              onChange={handleDescChange}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Create Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}