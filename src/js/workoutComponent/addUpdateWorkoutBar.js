import React from 'react'
import * as request from 'superagent'
import myState from './state'

class AddUpdateWorkoutBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { workoutName: '', workoutWeight: '', targetArea: ''}
    this.props = props

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
        <input type="radio" name="type" value="abs" defaultChecked /> Abs
        <input type="radio" name="type" value="arms" /> Arms
        <input type="radio" name="type" value="back" /> Back
        <input type="radio" name="type" value="chest" /> Chest
        <input type="radio" name="type" value="legs" /> Legs
        <br />
        <input id="e1" type="text" name="name"/>
        <input id="e2" type="text" name="weight"/>
        <input type="submit" value="Submit" />
      </form>
  }

  handleSubmit(evt) {
    const workoutName = document.querySelector('#e1').value
    const workoutValue = document.querySelector('#e2').value
    const targetArea = document.querySelector('input[name="type"]:checked').value

    this.setState({
      workoutName: workoutName,
      workoutWeight: workoutValue,
      targetArea: targetArea
    }, () => {
      this.sendWorkoutToServer()
    })
  }

  sendWorkoutToServer() {
    request
      .post('/testingPost')
      .set('Accept', 'application/json')
      .send({ workoutName: this.state.workoutName, workoutWeight: this.state.workoutWeight, targetArea: this.state.targetArea })
      .end((err: any, res: any): void => {
        console.log("Workout Sent")
      })
  }

  clearForm(input1, input2) {
    input1.value = ''
    input2.value = ''
  }
}

export default AddUpdateWorkoutBar
