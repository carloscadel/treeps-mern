import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Homepage extends Component {
  render() {
    return (
      <div id='homepage-container'>
        <div id='homepage-title'>
          <h1>treeps</h1>
        </div>
        <div id='homepage-main-content'>
          <h3>
            Join a great community.<br/>Meet great people
          </h3>
          <h4>
          <Link to='/login'>Log in</Link> or <Link to='/signup'>Sign up</Link>
          </h4>
        </div>
      </div>  
    )
  }
}
