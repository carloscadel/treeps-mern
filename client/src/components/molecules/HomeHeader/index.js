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
  background-color: rgb(250, 250, 250);
  transition: all 0.2s;
  height: 15em;
  &:hover {
    background-color: rgb(240, 240, 240);
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
  & textarea {
    position: relative;
    left: -1em;
    resize: none;
    border: none;
    border-radius: 0.5em;
    outline: none;
    padding: 1em;
    width: 90%;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s;
    &:focus {
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
      background-color: rgba(255, 255, 255, 0.9);
      transition: all 0.2s;
    }
  }
`

const Username = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1em;
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
          <div>
            <form autoComplete='off' onSubmit={this.handleStatusSubmit}>
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
            </form>
          </div>
        </ProfileInfoDiv>
      </GenContainer>
    )
  }
}
