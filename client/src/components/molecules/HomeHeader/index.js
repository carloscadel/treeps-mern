import React, { Component } from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'
import theme from '../../themes/default'
import api from '../../../api'
import { calculateAge } from '../../../helpers/date-formatters'
import Img from 'components/atoms/Img'

const GenContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-family: ${font('primary')};
  font-size: 0.8rem;
  color: ${theme.palette.grayscale[0]};
  margin-bottom: 2em;
  padding: 0 1em;
  background-color: ${theme.palette.grayscale[10]};
  transition: all 0.2s;
  height: 15em;
  &:hover {
    background-color: ${theme.palette.grayscale[9]};
    transition: all 0.2s;
  }
`

const PictureDiv = styled.div`
  width: 25%;
`

const ProfileInfoDiv = styled.div`
  width: 67%;
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  justify-content: space-evenly;
`

const Username = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1em;
`

const Form = styled.form`
  & textarea {
    position: relative;
    left: -1em;
    resize: none;
    border: none;
    border-radius: 0.5em;
    outline: none;
    padding: 1em;
    min-width: 5%;
    width: 95%;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s;
    &:hover {
      background-color: ${theme.palette.grayscale[11]};
      cursor: pointer;
    }
    &:focus {
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
      background-color: ${theme.palette.grayscale[12]};
      cursor: text;
      transition: all 0.2s;
    }
  }
`

export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userStatusInput: this.props.user.userStatus,
      profImgPath: this.props.user.profImgPath
    }
  }
  handleStatusInputChange = e => {
    e.preventDefault()
    this.setState({
      userStatusInput: e.target.value
    })
  }
  handleStatusSubmit = e => {
    e.preventDefault()
    this.props.onUserStatusSubmit(this.state.userStatusInput)
    document.activeElement.blur()
  }
  imagePicker = e => {
    api.addUserPicture(e.target.files[0], this.props.user._id).then(res =>
      this.setState({
        profImgPath: res.picture
      })
    )
  }

  render() {
    return (
      <GenContainer>
        <PictureDiv>
          <form method='post' encType='multipart/form-data'>
            <label>
              <Img
                src={this.props.user.profImgPath}
                alt='Profile pic'
                profileImg
                size={7}
              />
              <input
                type='file'
                name='photo'
                onChange={this.imagePicker}
                style={{ display: 'none' }}
              />
            </label>
          </form>
        </PictureDiv>
        <ProfileInfoDiv>
          <div>
            <Username>
              {this.props.user.username}, {calculateAge(this.props.user.dob)}
            </Username>
          </div>
          <Form autoComplete='off' onSubmit={this.handleStatusSubmit}>
            <textarea
              id='header-prof-status-input-box'
              type='text'
              value={this.state.userStatusInput}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  this.handleStatusSubmit(e)
                }
              }}
              onChange={this.handleStatusInputChange}
            />
          </Form>
        </ProfileInfoDiv>
      </GenContainer>
    )
  }
}
