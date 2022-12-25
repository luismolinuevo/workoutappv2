import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import CreateExercise from './CreateExercise';
import "../workouts/Workouts.css"

export default function Workouts(props) {
  const [workout, setWorkout] = useState([])
  const [exercise, setExercise] = useState([])
  const [error, setError] = useState(false);
  let params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    async function getWorkoutData() {
      try {
        
        let response = await fetch(`http://localhost:5000/api/workouts/${params.id}` , {
            credentials: "include"
        })
        let workoutData = await response.json();

        setWorkout(workoutData);
        return workoutData;
        
      } catch (error) {
        
        console.error("Error fetching", error);
        setError(true);
      }
    }

    async function getExerciseData() {
      try {
        let response = await fetch(`http://localhost:5000/api/exercise/${params.id}` , {
            credentials: "include"
        })

        let exerciseData = await response.json();
        
        setExercise(exerciseData);
        console.log(exerciseData)
        return exerciseData;
        
      } catch (error) {
        
        console.error("Error fetching", error);
        setError(true);
      }
    }

    

    getWorkoutData();
    getExerciseData();


    return () => {
    };
  }, [params]);

  const deleteWorkout = async (e) => {
      e.preventDefault();
        try {
            console.log(params.id)
            let response = await fetch(`http://localhost:5000/api/workouts/${params.id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: params.id
            }),
          }).then(navigate(`/workouts`))
        } catch (error) {
          console.error("Server error while deleting workout", error);
          setError(true);
        }
    };
  



  return (
    <div className='container'>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      <h1 className='title'>{workout.title}</h1>
      <p className='desc'>{workout.textBody}</p>
      <div className='actions'>
        <button id = "deleteButton" onClick={deleteWorkout}>Delete Workout</button>
        <div className='createworkoutlink'>
          <Link to={`createexercise/${params.id}`}>
              {/* <CreateExercise workoutId = {params.id}/> */}
              Create Exercise
          </Link>
        </div>
      </div>
      <div>
        <div className="workouts" key={workout.id}>
           {
           exercise.map((exercise) => {
            return <div className="workoutLinks exerciseLink" key={exercise.id}> 
                      <Link to={`exercise/exerciseId/${exercise.id}`}>
                        <div>
                          <p>{exercise.name}</p>
                          <p>Sets: {exercise.sets}</p>
                          <p>Reps: {exercise.reps}</p>
                          <p>Weight: {exercise.weight}</p>
                        </div>
                        
                      </Link>
                   </div>
          })
          // workout[0] === undefined || null ? <div></div> : <div>{workout[0].title}</div>
          
          }
        </div>
      </div>
    </div>
  )
}

//navagiate to exercise list. then do the the exercise/id route