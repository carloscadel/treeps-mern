import React, { Component } from 'react'
import api from '../../api';
// import { stat } from 'fs';

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
    // console.log(this.state[stateFieldName])
  }
  handleClick(e) {
    e.preventDefault()
    let data = {
      treepName: this.state.treepName,
      treepCountry: this.state.treepCountry
    }
    api.postTreeps(data)
    .then(result => {
      console.log("Success!")
    })
    .catch(err => {
      console.log("Error")
    })    // console.log(this.state.treepName, this.state.treepCountry)
  }
  render() {
    return (
      <div>
        <form>
          <label>Name of your treep</label>
          <input name="treepName" onChange={(e) => this.handleInputChange("treepName", e)} /><br/>
          <label>Country</label>
          <input name="treepCountry" onChange={(e) => this.handleInputChange("treepCountry", e)} /><br/>
          <label>Dates</label>
          <input type="date"></input><br/>
          <label>Hide me</label>
          <input type="checkbox" />
          <button type="submit" onClick={(e) => this.handleClick(e)}>Submit</button>
          
        </form>
      </div>
    )
  }
}
