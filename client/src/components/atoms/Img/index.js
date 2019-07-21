import React from 'react'
import styled from 'styled-components'

const height = ({ height }) => `${height}rem`

const radius = ({ radius }) => `${radius}%`

const StyledImg = styled.img`
  height: ${height};
  border-radius: ${radius};
`

const Img = props => {
  return <StyledImg {...props} />
}

Img.defaultProps = {
  radius: 0,
  height: 1
}

export default Img
