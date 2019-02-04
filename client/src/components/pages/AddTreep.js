import React, { Component } from 'react'
import api from '../../api';
// import { stat } from 'fs';

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treepName: "",
      treepLocation: "",
      treepStartDate: "",
      treepEndDate: "",
      hideMe: false
    }
  }
  handleInputChange(stateFieldName, e) {
    if (stateFieldName === "hideMe") {
      this.setState({
        hideMe: !this.state.hideMe
      })
    } else {
      this.setState({
        [stateFieldName]: e.target.value
      })
    }
    // console.log(this.state[stateFieldName])
  }
  handleClick(e) {
    e.preventDefault()
    let data = {
      treepName: this.state.treepName,
      treepLocation: this.state.treepLocation,
      treepStartDate: this.state.treepStartDate,
      treepEndDate: this.state.treepEndDate,
      hideMe: this.state.hideMe
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
          <label>Name</label>
          <input name="treepName" onChange={(e) => this.handleInputChange("treepName", e)} /><br/>
          <label>Location</label>
          <input name="treepLocation" onChange={(e) => this.handleInputChange("treepLocation", e)} /><br/>
          <label>Starting date</label>
          <input type="date" onChange={(e) => this.handleInputChange("treepStartDate", e)} /><br/>
          <label>End date</label>
          <input type="date" onChange={(e) => this.handleInputChange("treepEndDate", e)} /><br/>
          <label>Hide me</label>
          <input type="checkbox" checked={this.state.hideMe} onChange={(e) => this.handleInputChange("hideMe", e)} /><br/>
          <button className="btn-add" type="submit" onClick={(e) => this.handleClick(e)}>Submit</button>
        </form>
      </div>
    )
  }
}
