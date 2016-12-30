import React from 'react'
import WorkoutList from './WorkoutList'
import WorkoutTypesBar from './workoutTypesBar'
import {observer} from 'mobx-react'
import state from './state'

@observer
class WorkoutDisplay extends React.Component {
  constructor(props, state) {
    super()
    this.props = props
    this.state = {
      workouts: []
    }
    
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }
  
  render() {
    return <div>
      <WorkoutTypesBar myState={state} />
      <WorkoutList myState={state} workouts={this.state.workouts} />
    </div>
  }
  
  componentWillReceiveProps(props) {
    this.state.workouts.push(props.workouts)
  }

}

export default WorkoutDisplay
