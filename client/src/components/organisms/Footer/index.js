import React, { Component } from 'react'
import styled from 'styled-components'
import theme from 'components/themes/default'

const OuterWrapper = styled.section`
  width: 100%;
  background-color: ${theme.palette.grayscale[0]};
  color: ${theme.palette.white[0]};
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`

export default class Footer extends Component {
  render() {
    return (
      <OuterWrapper>
        <InnerWrapper>This is the footer</InnerWrapper>
      </OuterWrapper>
    )
  }
}
