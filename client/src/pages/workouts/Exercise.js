import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import "../workouts/Exercise.css";


export default function Exercise() {
    const [exercise, setExercise] = useState([])
    const [error, setError] = useState(false);
    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getExerciseData() {
          try {
            let response = await fetch(`http://localhost:5000/api/exercise/exerciseId/${params.id}` , {
                credentials: "include"
            })
    
            let exerciseData = await response.json();
            
            setExercise(exerciseData);
            console.log(exerciseData);
            return exerciseData;
            
          } catch (error) {
            
            console.error("Error fetching", error);
            setError(true);
          }
        }
    
        getExerciseData();
    
        return () => {
        };
      }, [params]);

      const deleteExercise = async (e) => {
        e.preventDefault();
          try {
              console.log(params.id)
              let response = await fetch(`http://localhost:5000/api/exercise/${params.id}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: params.id
              }),
            }).then(navigate(`/workouts/${exercise.workoutId}`))
          } catch (error) {
            console.error("Server error while deleting execise", error);
            setError(true);
          }
      };
    
  return (
    <div className='container'>
      <div className='eIntro'>
        <h1 className='title'>{exercise.name}</h1>
        <p className='desc'>{exercise.desc}</p>
      </div>
      <div className='actions'>
        <button className= "deleteButton" onClick={deleteExercise}>Delete Excerise</button>
        <div className='createworkoutlink'>
          <Link to={`exercise/edit/${params.id}`}>Edit Exercise</Link> 
        </div>
      </div>
      <div className='exerciseData'>
        <p>Excerise: {exercise.name}</p>
        <p>Sets x Reps: {exercise.sets} x {exercise.reps}</p>
        <p>Weight: {exercise.weight}</p>
        <p>Personal Record: {exercise.pr}</p>
        <p className='exerciseLink'>Video Url: <a href={exercise.videoUrl}>Video</a></p>
      </div>
        
    </div>
  )
}
