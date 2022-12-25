import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from '../../components/extra/TextField';
import * as Yup from 'yup';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

//onsumbit that post to api
export default function CreateExercise() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [restPeriod, setRestPeriod] = useState('');
    const [pr, setPr] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [desc, setDesc] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    let params = useParams();
    const navigate = useNavigate();
  

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handleRepsChange = (event) => {
        setReps(event.target.value);
    };

    const handleSetsChange = (event) => {
        setSets(event.target.value);
      };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };
    
    const handleRestPeriodChange = (event) => {
        setRestPeriod(event.target.value);
    };

    const handlePrChange = (event) => {
        setPr(event.target.value);
      };

    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };
    
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(params.id)
          let response = await fetch("http://localhost:5000/api/exercise", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                reps: reps, 
                sets: sets,
                weight: weight,
                restPeriod: restPeriod,
                pr: pr,
                videoUrl: videoUrl,
                desc: desc,
                workoutId: params.id
            }),
          }).then(navigate(`/workouts/${params.id}`))
    
          if (response.ok) {
            setSuccess(true);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error("Server error while creating a new exercise", error);
          setError(true);
        }
      };

  return (
  <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Exercise Name"
              value={name}
              className="form-control"
              onChange={handleNameChange}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Reps"
              value={reps}
              className="form-control"
              onChange={handleRepsChange}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Sets"
              value={sets}
              className="form-control"
              onChange={handleSetsChange}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Weight"
              value={weight}
              className="form-control"
              onChange={handleWeightChange}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Rest Period"
              value={restPeriod}
              className="form-control"
              onChange={handleRestPeriodChange}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise PR"
              value={pr}
              className="form-control"
              onChange={handlePrChange}
              autoFocus
            />
            <input
              type="text"
              placeholder="Exercise URL"
              value={videoUrl}
              className="form-control"
              onChange={handleVideoUrlChange}
              autoFocus
            />
            <input
              type="text"
              placeholder="Exercise Desc"
              value={desc}
              className="form-control"
              onChange={handleDescChange}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Create Exercise
            </button>
          </div>
        </form>
      </div>
  )
}
