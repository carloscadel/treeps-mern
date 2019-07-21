import React from 'react'
import { humanizeDate } from 'helpers/date-formatters'
import styled from 'styled-components'
import MaterialIcon from 'components/atoms/MaterialIcon'
import { font } from 'styled-theme'

const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  justify-items: center;
  font-family: ${font('primary')};
  font-size: 0.8rem;
  width: 13em;
  height: 10em;
  margin: 0.5em;
  padding: 0 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2em;
  background-color: rgba(0, 0, 0, 0.03);
  transition: all 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
  }
`
const TopRow = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 33%;
`
const CenterRow = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 34%;
`
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 0.8em;
  height: 34%;
`

const TreepCard = props => {
  return (
    <Wrapper>
      <TopRow>
        <p>{props.treep.name}</p>
      </TopRow>
      <CenterRow>
        <p>
          {humanizeDate(props.treep.startDate, "dd D MMM 'YY")} -{' '}
          {humanizeDate(props.treep.endDate, "dd D MMM 'YY")}
        </p>
      </CenterRow>
      <BottomRow>
        <MaterialIcon size={'1.2em'}>group</MaterialIcon>
        <div className='notification-marker-1' />
      </BottomRow>
    </Wrapper>
  )
}

export default TreepCard
