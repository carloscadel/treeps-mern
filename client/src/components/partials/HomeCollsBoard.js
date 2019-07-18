import React from 'react'
import CollCard from './CollCard'

const HomeCollsBoard = props => {
  return (
    <div>
      <div className='trip-cards-slider'>
        {props.colls.map(coll => (
          <CollCard key={coll._id} coll={coll} />
        ))}
      </div>
    </div>
  )
}

export default HomeCollsBoard
