import React, { Component } from 'react'
import api from '../../api';


export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      username: "",
      userStatus: "",
      userDob: "",
      showImgPicker: true
    }
  }
  handleStatusChange = (e) => {
    e.preventDefault()
    this.setState({
      userStatus: e.target.value
    })
  }
  handleStatusSubmit = (e) => {
    e.preventDefault()
    let data = { _userId: this.state.userId, currentUserStatus: this.state.userStatus}
    api.changeUserStatus(data)
    document.activeElement.blur()
  }
  calculateAge() {
    var today = new Date()
    var dob = new Date(this.state.userDob)
    return Math.floor((today - dob)/1000/3600/24/365.25)
  }
  imagePicker = () => {
    // e.preventDefault()
    console.log('Mofo')
  }
  componentDidMount() {
    api.getCurrentUser()
    .then(user => {
      this.setState({
        userId: user._id,
        username: user.username,
        userStatus: user.userStatus,
        userDob: user.dob
      })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <div className="header-div">
        <form onSubmit={this.imagePicker} method="post" encType="multipart/form-data">
          <div className="header-prof-pic-div">
            <label>
              <img className="header-prof-pic" src="Carlos.jpeg" alt="Profile pic" /><input type="file" name="photo" style={{display: 'none'}}/>
            </label>
          </div>
        </form>
          <div className="header-prof-text-div">
            <div className="header-prof-text-name-div">
              <h3>{this.state.username}, {this.calculateAge()}</h3>
            </div>
            <div className="header-prof-status-input-div">
            <form autoComplete="off" onSubmit={this.handleStatusSubmit}>
              <p><input id="header-prof-status-input-box" type="text" value={this.state.userStatus} onChange={this.handleStatusChange} /></p>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
