import React from 'react'
import { CollsCardWrapper } from '../../styles/components/CollsCard'

const CollCard = props => {
  return (
    <CollsCardWrapper>
      <div className='trip-card'>
        <p>{props.coll.name}</p>
      </div>
    </CollsCardWrapper>
  )
}

export default CollCard
