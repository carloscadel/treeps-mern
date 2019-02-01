import React, { Component } from 'react'
import { stat } from 'fs';

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treepName: "",
      treepCountry: ""
    }
  }
  handleInputChange(stateFieldName, e) {
    this.setState({
      [stateFieldName]: e.target.value
    })
    console.log(this.state[stateFieldName])
  }
  render() {
    return (
      <div>
        <form>
          <label for="treepName">Name of your treep</label>
          <input name="treepName" onChange={(e) => this.handleInputChange("treepName", e)} /><br/>
          <label>Country</label>
          <input name="treepCountry" onChange={(e) => this.handleInputChange("treepCountry", e)} /><br/>
          <label>Dates</label>
          <input type="date"></input><br/>
          <label>Hide me</label>
          <input type="checkbox" />
          
        </form>
      </div>
    )
  }
}
