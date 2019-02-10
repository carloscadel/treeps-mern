import React, { Component } from 'react'
import api from '../../api';


export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      username: "",
      userStatus: ""
    }
  }
  handleStatusChange = (e) => {
    e.preventDefault()
    this.setState({
      userStatus: e.target.value
    })
    var inputEvent = document.getElementById('header-prof-status-input-box')
    inputEvent.addEventListener('keypress', (key) => {
      if(key.charCode === 13) {
        let data = { _userId: this.state.userId, currentUserStatus: this.state.userStatus}
        api.changeUserStatus(data)
      }
    })
  }
  componentDidMount() {
    api.getCurrentUser()
    .then(user => {
      this.setState({
        userId: user._id,
        username: user.username,
        userStatus: user.userStatus
      })
    })
  }
  render() {
    return (
      <div>
        <div className="header-div">
          <div className="header-prof-pic-div">
            <img className="header-prof-pic" src="Carlos.jpeg" alt="Profile" />
          </div>
          <div className="header-prof-text-div">
            <div className="header-prof-text-name-div">
              <h3>{this.state.username}</h3>
            </div>
            <div className="header-prof-status-input-div">
            <form >
              <p><input id="header-prof-status-input-box" type="text" value={this.state.userStatus} onChange={this.handleStatusChange} onSubmit={this.handleStatusSubmit} /></p>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
