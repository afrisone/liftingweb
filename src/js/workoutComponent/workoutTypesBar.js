import React from 'react'
import WorkoutRow from './workoutRow'
import {observer} from 'mobx-react'

const targetAreas = [
  "Abs", "Arms", "Back", "Chest", "Legs"
]

@observer
class WorkoutTypesBar extends React.Component {
  constructor(props, state) {
    super()
    this.props = props
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      currentlySelected: "Abs"
    }
  }
  
  render() {
    const list = targetAreas.map((area) => {
      if(area === this.state.currentlySelected) {
        return(<span onClick={this.handleClick} className="active workoutType" key={area}>{area}</span>)
      }
      return (
        <span onClick={this.handleClick} className="workoutType" key={area}>{area}</span>
      )
    })
    
    return <div className="typesBar">{list}</div>
  }
  
  handleClick(evt) {
    this.setState({currentlySelected: evt.target.innerText})
    this.props.myState.setSel(evt.target.innerText)
  }
}

export default WorkoutTypesBar