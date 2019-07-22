import React from 'react'
import CollectionCard from 'components/molecules/CollectionCard/'
import HSlider from 'components/atoms/HSlider/'

const HomeCollsBoard = props => {
  return (
    <div width='100%'>
      <HSlider>
        {props.colls.map(coll => (
          <CollectionCard key={coll._id} coll={coll} />
        ))}
      </HSlider>
    </div>
  )
}

export default HomeCollsBoard
