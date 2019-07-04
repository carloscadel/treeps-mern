import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      message: null
    }
  }
  handleLogoutClick(e) {
    api.logout()
    this.setState({
      user: null
    })
  }
  componentDidMount() {
    api
      .getCurrentUser()
      .then(user => {
        this.setState({ user })
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {
    return (
      <div>
        <nav id='nav'>
          <div>
            <h1 id='nav-title'>treeps</h1>
          </div>
          <div id='nav-links-container'>
            <NavLink to='/' exact>
              Homepage
            </NavLink>
            {api.isLoggedIn() && (
              <NavLink
                to={!this.state.user ? '/' : '/' + this.state.user.username}>
                Home
              </NavLink>
            )}
            {!api.isLoggedIn() && <NavLink to='/signup'>Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to='/login'>Login</NavLink>}
            {api.isLoggedIn() && (
              <Link to='/' onClick={e => this.handleLogoutClick(e)}>
                Logout
              </Link>
            )}
          </div>
        </nav>
      </div>
    )
  }
}
