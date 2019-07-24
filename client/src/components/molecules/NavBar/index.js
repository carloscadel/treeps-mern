import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import api from '../../../api'
import styled from 'styled-components'
import theme from 'components/themes/default'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.palette.grayscale[0]};
  padding: 1.5rem 1rem;
`
const NavLogo = styled.div`
  font-family: adobe-handwriting-ernie, sans-serif;
  font-size: 2rem;
  margin: 0;
  > * {
    color: ${theme.palette.white[0]};
  }
`
const NavLinks = styled.div`
  display: flex;
  > * {
    text-decoration: none;
    color: ${theme.palette.white[0]};
    margin: 0 1rem;
  }
`

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
          <NavLink to='/' exact>
            treeps
          </NavLink>
        </NavLogo>
        <NavLinks>
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
        </NavLinks>
      </Nav>
    )
  }
}
