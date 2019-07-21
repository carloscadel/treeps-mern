import React from 'react'
import styled from 'styled-components'

const size = ({ size }) => `${size}`

const StyledI = styled.i`
  font-size: ${size};
`

const MaterialIcon = props => {
  return (
    <StyledI {...props} className='material-icons'>
      {props.children}
    </StyledI>
  )
}

MaterialIcon.defaultProps = {
  size: '1em'
}

export default MaterialIcon
