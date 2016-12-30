import React from 'react'
import AddUpdateWorkoutBar from './addUpdateWorkoutBar'
import WorkoutDisplay from './workoutDisplay'
import {observable} from 'mobx'

 
class Main extends React.Component {
  constructor(props, state) {
    super()
    this.state = {
      workouts: null
    }
    this.callback = this.callback.bind(this)
  }
  
  render() {
    return <section>
        <AddUpdateWorkoutBar updateWorkouts={this.callback} />
        <WorkoutDisplay workouts={this.state.workouts} />
      </section>
  }
  
  callback(workoutName, weight) {
    const newWorkout = {
      workoutName: workoutName,
      workoutWeight: weight
    }
    this.setState({
      workouts: newWorkout
    })
  }
  
  validateWorkout(workoutName, weight) {
    if(workoutName == '' || weight == '') {
      return false
    }
    
    return true
  }
}

export default Main


