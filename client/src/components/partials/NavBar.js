import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'
import { Nav, NavLogo } from '../../styles/components/NavBar'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      message: null
    }
  }

  handleLogoutClick(e) {
    api.logout()
    this.setState({
      user: null
    })
  }

  componentDidUpdate() {
    if (this.props.user !== this.state.user) {
      this.setState({ user: this.props.user })
    }
  }

  render() {
    return (
      <Nav>
        <NavLogo>
          <h1 id='nav-title'>treeps</h1>
        </NavLogo>
        <div id='nav__links-container'>
          {window.location.pathname !== '/' && (
            <NavLink to='/' exact>
              Homepage
            </NavLink>
          )}
          {api.isLoggedIn() && (
            <NavLink
              to={this.state.user ? `/${this.state.user.username}` : '/'}
            >
              Home
            </NavLink>
          )}
          {!api.isLoggedIn() && <NavLink to='/signup'>Sign up</NavLink>}
          {!api.isLoggedIn() && <NavLink to='/login'>Log in</NavLink>}
          {api.isLoggedIn() && (
            <Link to='/' onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </div>
      </Nav>
    )
  }
}
