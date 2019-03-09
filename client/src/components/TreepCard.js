import React, { Component } from 'react'
// import api from '../api';

export default class TreepCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: this.props.location,
      formattedDates: this.props.formattedDates
    }
  }

  render() {
    return (
      <div className='trip-card-wrapper'>
        <div className='trip-card'>
          <div className='trip-card-top-row'>
            <p>{this.state.location}</p>
          </div>
          <div className='trip-card-mid-row'>
            <p>{this.state.formattedDates}</p>
          </div>
          <div className='trip-card-bot-row'>
            <img src='multiple-users-707070.png' alt='Users icon' />
            <div className='notification-marker-1' />
          </div>
        </div>
      </div>
    )
  }
}
