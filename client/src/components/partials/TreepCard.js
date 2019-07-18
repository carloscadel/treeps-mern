import React from 'react'
import { humanizeDate } from '../../helpers/date-formatters'

const TreepCard = props => {
  return (
    <div className='trip-card-wrapper'>
      <div className='trip-card'>
        <div className='trip-card-top-row'>
          <p>{props.treep.name}</p>
        </div>
        <div className='trip-card-mid-row'>
          <p>
            {humanizeDate(props.treep.startDate, "dd D MMM 'YY")} -{' '}
            {humanizeDate(props.treep.endDate, "dd D MMM 'YY")}
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

export default TreepCard
