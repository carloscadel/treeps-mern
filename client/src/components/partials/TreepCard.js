import React, { Component } from 'react'
import { humanizeDate } from '../../helpers/date-formatters'

export default class TreepCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: ''
    }
  }
  render() {
    return (
      <div className='trip-card-wrapper'>
        <div className='trip-card'>
          <div className='trip-card-top-row'>
            <p>{this.props.treep.location}</p>
          </div>
          <div className='trip-card-mid-row'>
            <p>
              {humanizeDate(this.props.treep.startDate, "dd D MMM 'YY")} -{' '}
              {humanizeDate(this.props.treep.endDate, "dd D MMM 'YY")}
            </p>
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
