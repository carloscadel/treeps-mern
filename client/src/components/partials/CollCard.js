import React from 'react'

const CollCard = props => {
  return (
    <div className='trip-card-wrapper'>
      <div className='trip-card'>
        <p>{props.coll.name}</p>
      </div>
    </div>
  )
}

export default CollCard
