import React, { Component } from 'react'
import api from '../../api';
import Calendar from 'react-calendar'

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
  }
  handleClick(e) {
    e.preventDefault()
    let data = {
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
  onModalChange = date => {
    this.setState({
      treepStartDate: date[0],
      treepEndDate: date[1]
    })
  }
  render() {
    return (
      <div>
        <form>
          <label>Location</label>
          <input name="treepLocation" onChange={(e) => this.handleInputChange("treepLocation", e)} /><br/>
          <Calendar onChange={this.onModalChange} selectRange={true} />
          <label>Hide me</label>
          <input type="checkbox" checked={this.state.hideMe} onChange={(e) => this.handleInputChange("hideMe", e)} /><br/>
          <button className="btn-add" type="submit" onClick={(e) => this.handleClick(e)}>Submit</button>
        </form>
      </div>
    )
  }
}
