import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from './views/Homepage'
import Login from './views/Login'
import Signup from './views/Signup'
import Home from './views/Home'
import AddTreep from './views/AddTreep'
import TreepDetail from './views/TreepDetail'
import NavBar from 'components/molecules/NavBar/'
import Footer from 'components/organisms/Footer/'
import api from '../api'
import styled, { createGlobalStyle } from 'styled-components'
import { font } from 'styled-theme'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`

export const AppWrapper = styled.div`
  text-align: center;
  font-family: ${font('primary')};
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      treep: null
    }
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
      <AppWrapper>
        <GlobalStyle />

        <NavBar user={this.state.user} />
        <div className='App-body'>
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/signup' component={Signup} />
            <Route
              path='/login'
              render={props => (
                <Login {...props} onLogin={this.getCurrentUser} />
              )}
            />
            <Route
              path='/:username'
              exact
              render={props => <Home {...props} user={this.state.user} />}
            />
            <Route
              path='/:username/treeps/add'
              exact
              render={props => <AddTreep {...props} user={this.state.user} />}
            />
            <Route
              path='/:username/treeps/:id'
              exact
              render={props => (
                <TreepDetail {...props} treep={this.state.treep} />
              )}
            />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
        <Footer />
      </AppWrapper>
    )
  }
}

export default App
