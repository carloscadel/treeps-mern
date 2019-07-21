import React from 'react'
import TreepCard from '../molecules/TreepCard'
import styled from 'styled-components'

export const HSlider = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  overflow-x: auto;
`

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
