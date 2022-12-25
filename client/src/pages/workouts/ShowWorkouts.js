import React, {useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";
import "../workouts/ShowWorkouts.css";

export default function ShowWorkouts() {
    const [workout, setWorkout] = useState([]);
    let params = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
          try {
            
            let response = await fetch("http://localhost:5000/api/workouts/" , {
                credentials: "include"
            })
            let workoutData = await response.json();

            setWorkout(workoutData);
            return workoutData;
            
          } catch (error) {
            
            console.error("Error fetching", error);
            setError(true);
          }

          // fetch("http://localhost:5000/api/workouts/")
          // .then((response) => response.json())
          // .then((json) => setWorkout(json))


        }

        getData();

    
        return () => {
        };
      }, []);

      // console.log(workout)
    return (
      <div className="container">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div>
          <h1 class="title">My Workouts</h1>
        </div>
        <div className='createworkoutlink'>
          <Link to={`/createworkouts`}>Create New Workouts</Link>
        </div>
        <div className="workouts">
          {
            workout.map((workout) => {
              return <div className="workoutLinks" key={workout.id}>  
                        <Link to={`/workouts/${workout.id}`}>
                          <p>{workout.title}</p>
                        </Link>
                    </div>

            })
          }
        </div>
      </div>
    );
}
