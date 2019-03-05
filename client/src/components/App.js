import React, { Component } from 'react'
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AddTreep from './pages/AddTreep'
import Treep from './pages/Treep'

import api from '../api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  userSetState = user => {
    this.setState({ user })
  }
  getCurrentUser = () => {
    api
      .getCurrentUser()
      .then(user => {
        this.setState({ user })
      })
      .catch(err => console.log(err))
  }
  handleLogoutClick(e) {
    api.logout()
  }
  handleLogout = () => {
    this.setState({
      user: null
    })
  }
  componentDidMount() {
    this.getCurrentUser()
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>treeps</h1>
          <NavLink to='/' exact>
            Homepage
          </NavLink>
          {api.isLoggedIn() && <NavLink to={!this.state.user ? '/' : '/' + this.state.user.username}>Home</NavLink>}
          {!api.isLoggedIn() && <NavLink to='/signup'>Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to='/login'>Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to='/' onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </header>
        <div className='App-body'>
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' render={props => <Login {...props} onLogin={this.getCurrentUser} />} />
            <Route path='/:username' exact render={props => <Home {...props} user={this.state.user} onUserChange={user => this.userSetState(user)} />} />
            <Route path='/:username/treeps/add' exact render={props => <AddTreep user={this.state.user} onUserChange={user => this.userSetState(user)} />} />
            <Route path='/:username/treeps/:id' exact component={Treep} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
