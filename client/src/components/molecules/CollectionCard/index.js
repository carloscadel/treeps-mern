import React from 'react'
import styled from 'styled-components'
import theme from '../../themes/default'
import { font } from 'styled-theme'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  font-family: ${font('primary')};
  font-size: 0.8rem;
  color: ${theme.palette.grayscale[0]};
  min-width: 13em;
  margin: 0.5em;
  padding: 1em;
  background-color: ${theme.palette.grayscale[12]};
  border: 1px solid ${theme.palette.grayscale[11]};
  border-radius: 0.2em;
  transition: all 0.2s;
  &:hover {
    background-color: ${theme.palette.grayscale[11]};
    transition: all 0.2s;
    cursor: pointer;
  }
`

const CollectionCard = props => {
  return (
    <Wrapper>
      <p>{props.coll.name}</p>
    </Wrapper>
  )
}

export default CollectionCard
