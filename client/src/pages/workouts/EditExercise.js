import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";



export default function EditExercise() {
    let params = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {                        //this gets the exercise information
        async function getExerciseData() {
          try {
            let response = await fetch(`http://localhost:5000/api/exercise/exerciseId/${params.id}` , {
                credentials: "include"
            })
    
            let exerciseData = await response.json();
            setExercise(exerciseData);

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

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch(`http://localhost:5000/api/exercise/edit/${params.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: params.id,
                name: exercise.name,
                reps: exercise.reps, 
                sets: exercise.sets,
                weight: exercise.weight,
                restPeriod: exercise.restPeriod,
                pr: exercise.pr,
                videoUrl: exercise.videoUrl,
                desc: exercise.desc,
                workoutId: exercise.workoutId
            }),
            
          }).then(navigate(`/workouts/${exercise.workoutId}/exercise/exerciseId/${params.id}`))
          if (response.ok) {
            setSuccess(true); 
          } else {
            setError(true);
          }

          
        } catch (error) {
          console.error("Server error while creating a editing exercise", error);
          setError(true);
        }
       
        
      };

  return (
    <div>
        <h1>Edit Exercise</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise.name}
              className="form-control"
              onChange={(e) => setExercise({name: e.target.value})}    //had to this is this way with the exercise object.It wasnt showing with normal state
            //   autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Reps"
              value={exercise.reps}
              className="form-control"
              onChange={(e) => setExercise({reps: e.target.value})}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Sets"
              value={exercise.sets}
              className="form-control"
              onChange={(e) => setExercise({sets: e.target.value})}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Weight"
              value={exercise.weight}
              className="form-control"
              onChange={(e) => setExercise({weight: e.target.value})}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise Rest Period"
              value={exercise.restPeriod}
              className="form-control"
              onChange={(e) => setExercise({restPeriod: e.target.value})}
              autoFocus
            />
          <input
              type="text"
              placeholder="Exercise PR"
              value={exercise.pr}
              className="form-control"
              onChange={(e) => setExercise({pr: e.target.value})}
              autoFocus
            />
            <input
              type="text"
              placeholder="Exercise URL"
              value={exercise.videoUrl}
              className="form-control"
              onChange={(e) => setExercise({videoUrl: e.target.value})}
              autoFocus
            />
            <input
              type="text"
              placeholder="Exercise Desc"
              value={exercise.desc}
              className="form-control"
              onChange={(e) => setExercise({desc: e.target.value})}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
  </div>
  )
}
