import React from 'react'
import CollectionCard from 'components/molecules/CollectionCard/'
import HSlider from 'components/atoms/HSlider/'

const HomeCollsBoard = props => {
  return (
    <HSlider>
      {props.colls.map(coll => (
        <CollectionCard key={coll._id} coll={coll} />
      ))}
    </HSlider>
  )
}

export default HomeCollsBoard
