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
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 0.2em;
  transition: all 0.2s;
  &:hover {
    background-color: rgb(240, 240, 240);
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
