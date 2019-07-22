import React from 'react'
import styled from 'styled-components'

const size = ({ size }) => `${size}rem`

const radius = ({ profileImg, radius }) => (profileImg ? `50%` : `${radius}`)

const StyledImg = styled.img`
  height: ${size};
  width: ${size};
  object-fit: cover;
  border-radius: ${radius};
`

const Img = props => <StyledImg {...props} />

Img.defaultProps = {
  radius: 0,
  size: 1
}

export default Img
