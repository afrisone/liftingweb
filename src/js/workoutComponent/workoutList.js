import React from 'react'
import WorkoutRow from './workoutRow'
import {observer} from 'mobx-react'
import * as request from 'superagent'


@observer
class WorkoutList extends React.Component {
  constructor(props, state) {
    super()
    this.populateWorkouts = this.populateWorkouts.bind(this)
    this.props = props
    this.state = {
      workouts: {
        arms: [],
        legs: [],
        chest: [],
        abs: [],
        back: []
      }
    }
    this.getWorkoutsFromServer()
  }

  render() {
    const workoutArray = this.state.workouts[this.props.myState.getSel().toLowerCase()].map((workout) => {
      return (<WorkoutRow name={workout.workoutName} weight={workout.workoutWeight} key={workout.workoutName} />)
    })

    return <div>
         {workoutArray}
      </div>
  }

  getWorkoutsFromServer() {
    request
      .get('/getWorkouts')
      .set('Accept', 'application/json')
      .end((err: any, res: any): void => {
        this.populateWorkouts(res.body)
      })
  }

  populateWorkouts(workoutObj) {
    this.setState({workouts: workoutObj})
  }

  componentWillReceiveProps(props) {
    setTimeout(() => { // API calls runs asynchronously so wait 1/10th of a second
      this.getWorkoutsFromServer()
    }, 100)
  }
}

export default WorkoutList
