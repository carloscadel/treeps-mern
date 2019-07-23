import React from 'react'
import { humanizeDate } from 'helpers/date-formatters'
import styled from 'styled-components'
import MaterialIcon from 'components/atoms/MaterialIcon'
import { font } from 'styled-theme'
import theme from '../../themes/default'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: ${font('primary')};
  font-size: 0.8rem;
  color: ${theme.palette.grayscale[0]};
  width: 13em;
  height: 10em;
  margin: 0.5em;
  padding: 0 1em;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 0.2em;
  transition: all 0.2s;
  &:hover {
    background-color: rgb(240, 240, 240);
    transition: all 0.2s;
  }
`
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  width: 100%;
  height: 33%;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CenterRow = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  height: 34%;
`
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  font-size: 0.8em;
  height: 34%;
`

const Span = styled.span`
  &.weekday {
    padding: 0 0.3em;
    border: 1px solid;
  }
`

const TreepCard = props => {
  return (
    <div>
      <Wrapper>
        <TopRow>
          <p>{props.treep.name}</p>
        </TopRow>
        <CenterRow>
          <p>
            <Span className='weekday'>
              {humanizeDate(props.treep.startDate, 'dd')}
            </Span>
            {humanizeDate(props.treep.startDate, " D MMM 'YY")}
            <br />
            <br />
            <Span className='weekday'>
              {humanizeDate(props.treep.endDate, ' dd')}
            </Span>
            {humanizeDate(props.treep.endDate, " D MMM 'YY")}
          </p>
        </CenterRow>
        <BottomRow>
          <MaterialIcon size={'1.2em'}>group</MaterialIcon>
        </BottomRow>
      </Wrapper>
    </div>
  )
}

export default TreepCard
