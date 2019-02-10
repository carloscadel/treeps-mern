import React, { Component } from 'react'
import api from '../../api';
import Calendar from 'react-calendar'

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _ownerId: this.props.user._id,
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      formattedDates: "",
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
      _ownerId: this.state._ownerId,
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hideMe: this.state.hideMe
    }
    api.addTreep(data)
    .then(res => {
      console.log("New treep created")
    })
    .catch(err => {
      console.log("Error")
    })   
  }
  onDatesRangeChange = date => {
    this.setState({
      startDate: date[0],
      endDate: date[1]
    })
  }
  componentDidMount() {
    this.setState({
      _ownerId: this.props.user._id
    })
    // console.log("AddTreep", this.state._ownerId)
  }
  render() {
    return (
      <div>
        <form>
          <label>Location</label>
          <input name="location" onChange={(e) => this.handleInputChange("location", e)} /><br/>
          <Calendar onChange={this.onDatesRangeChange} selectRange={true} />
          <label>Hide me</label>
          <input type="checkbox" checked={this.state.hideMe} onChange={(e) => this.handleInputChange("hideMe", e)} /><br/>
          <button className="btn-add" type="submit" onClick={(e) => this.handleClick(e)}>Submit</button>
        </form>
      </div>
    )
  }
}
