import React, { Component } from 'react'
import api from '../../../api'
import { calculateAge } from '../../../helpers/date-formatters'
import Img from 'components/atoms/Img'

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
      <div>
        <div className='header-div'>
          <form method='post' encType='multipart/form-data'>
            <div className='header-prof-pic-div'>
              <label>
                <Img
                  src={this.props.user.profImgPath}
                  alt='Profile pic'
                  profileImg
                  size={5}
                />
                <input
                  type='file'
                  name='photo'
                  onChange={this.imagePicker}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </form>
          <div className='header-prof-text-div'>
            <div className='header-prof-text-name-div'>
              <h3>
                {this.props.user.username}, {calculateAge(this.props.user.dob)}
              </h3>
            </div>
            <div className='header-prof-status-input-div'>
              <form autoComplete='off' onSubmit={this.handleStatusSubmit}>
                <p>
                  <input
                    id='header-prof-status-input-box'
                    type='text'
                    value={this.state.userStatusInput}
                    onChange={this.handleStatusInputChange}
                  />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
