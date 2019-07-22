import React from 'react'
import TreepCard from 'components/molecules/TreepCard'
import HSlider from 'components/atoms/HSlider/'

const HomeTreepsBoard = props => {
  return (
    <div>
      <HSlider>
        {props.treeps.map(treep => (
          <a
            key={treep._id}
            href={`/${props.user.username}/treeps/${treep._id}`}
          >
            <TreepCard treep={treep} />
          </a>
        ))}
      </HSlider>
    </div>
  )
}

export default HomeTreepsBoard
