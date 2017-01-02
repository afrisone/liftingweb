import React from 'react'

class WorkoutRow extends React.Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const workoutString = `${this.props.name} : ${this.props.weight}`
    return <div><span>{workoutString}</span></div>
  }
}

export default WorkoutRow
