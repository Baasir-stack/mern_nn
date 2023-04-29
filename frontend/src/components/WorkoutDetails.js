import React from 'react'
// import hooks
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const handleDelete = async()=>{
        
        if(!user){
            return
        }

        const response =await fetch('/api/workouts/'+ workout._id,{
            method:"DELETE",
            headers: {"Authorization":`Bearer ${user.token}`}
                
        })
        const json =await response.json()
        console.log(json)
        if(response.ok){
            dispatch({type:"DELETE_WORKOUT", payload:json})
        }
    }

    return (
        <div className='workout-details'>
            <h4 style={{display:"inline-block"}}>{workout.title}</h4>
            <button onClick={handleDelete}
            className="material-symbols-outlined"
             style={{float:"right"}}>
                Delete
             </button>
            <p><strong>Load in (kg) : </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        </div>
    )
}

export default WorkoutDetails