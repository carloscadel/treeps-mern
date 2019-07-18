import React from 'react'
import TreepCard from './TreepCard'

const HomeTreepsBoard = props => {
  return (
    <div>
      <div className='trip-cards-slider'>
        {props.treeps.map(treep => (
          <a
            key={treep._id}
            href={`/${props.user.username}/treeps/${treep._id}`}
          >
            <TreepCard treep={treep} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default HomeTreepsBoard
