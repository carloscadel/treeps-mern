import React, { Component } from 'react'
// import api from '../api';

export default class TreepCard extends Component {
  constructor(props) {
    super(props)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const startD = new Date(this.props.treepStartDate)
    const endD = new Date(this.props.treepEndDate)
    this.state = {
      treepLocation: this.props.treepLocation,
      treepStartDate: day[startD.getDay()] + " " + startD.getDate() + " " + months[startD.getMonth()] + " '" + startD.getFullYear().toString().substring(2),
      treepEndDate: day[endD.getDay()] + " " + endD.getDate() + " " + months[endD.getMonth()] + " '" + endD.getFullYear().toString().substring(2),
    }
  }

  render() {
    return (
      <div className="trip-card-wrapper">
        <div className="trip-card">
          <div className="trip-card-top-row">
            <p>{this.state.treepLocation}</p>
          </div>
          <div className="trip-card-mid-row">
            <p>{this.state.treepStartDate} - {this.state.treepEndDate}</p>
          </div>
          <div className="trip-card-bot-row">
            <img src="multiple-users-707070.png" alt="Users icon" />
            <div className="notification-marker-1">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
