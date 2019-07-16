//----------
// Signup View
//----------
import React, { Component } from 'react'
import api from '../../api'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      password: '',
      message: null,
      email: '',
      dob: new Date()
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      dob: this.state.dob
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className='Signup'>
        <h2>Signup</h2>
        <form>
          Username:{' '}
          <input
            type='text'
            value={this.state.username}
            onChange={e => this.handleInputChange('username', e)}
          />{' '}
          <br />
          Name:{' '}
          <input
            type='text'
            value={this.state.name}
            onChange={e => this.handleInputChange('name', e)}
          />{' '}
          <br />
          Password:{' '}
          <input
            type='password'
            value={this.state.password}
            onChange={e => this.handleInputChange('password', e)}
          />{' '}
          <br />
          Email:{' '}
          <input
            type='email'
            value={this.state.email}
            onChange={e => this.handleInputChange('email', e)}
          />{' '}
          <br />
          Date of birth:{' '}
          <input
            type='date'
            value={this.state.dob}
            onChange={e => this.handleInputChange('dob', e)}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && (
          <div className='info info-danger'>{this.state.message}</div>
        )}
      </div>
    )
  }
}

export default Signup
