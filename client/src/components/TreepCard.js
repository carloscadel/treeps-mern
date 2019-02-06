import React, { Component } from 'react'
// import api from '../api';

export default class TreepCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treepLocation: this.props.treepLocation,
      treepFormattedDates: this.props.treepFormattedDates
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
            <p>{this.state.treepFormattedDates}</p>
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
