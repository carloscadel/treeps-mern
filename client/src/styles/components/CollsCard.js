import styled from 'styled-components'

export const CollsCardWrapper = styled.div`
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 250px;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 10px 5px;
  text-align: center;
  &:hover {
    transition: all 0.2s;
    background-color: rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }
`
