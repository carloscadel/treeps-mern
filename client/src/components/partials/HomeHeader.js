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
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let data = { _userId: this.state.userId, currentUserStatus: this.state.userStatus}
    api.changeUserStatus(data)
    document.activeElement.blur()
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
    .catch(err => console.log(err))
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
            <form onSubmit={this.handleSubmit}>
              <p><input id="header-prof-status-input-box" type="text" value={this.state.userStatus} onChange={this.handleStatusChange} /></p>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
