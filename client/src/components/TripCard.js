import React, { Component } from 'react'

export default class TripCard extends Component {
  render() {
    return (
      <div className="trip-card">
        <div className="trip-card-top-row">
          <p>Myanmar and Thailand</p>
        </div>
        <div className="trip-card-mid-row">
          <p>2 Feb ’19 - 28 Feb ‘19</p>
        </div>
        <div className="trip-card-bot-row">
          <img src="multiple-users-707070.png" />
        </div>
        
      </div>
    )
  }
}
