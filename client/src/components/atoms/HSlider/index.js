import React from 'react'
import styled from 'styled-components'

const Slider = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const HSlider = props => <Slider {...props} />

export default HSlider
