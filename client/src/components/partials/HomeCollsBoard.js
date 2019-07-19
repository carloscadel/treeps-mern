import React from 'react'
import CollCard from './CollCard'
import { HSlider } from '../../styles/components/HSlider'

const HomeCollsBoard = props => {
  return (
    <div>
      <HSlider>
        {props.colls.map(coll => (
          <CollCard key={coll._id} coll={coll} />
        ))}
      </HSlider>
    </div>
  )
}

export default HomeCollsBoard
