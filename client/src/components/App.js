import React, { Component } from 'react';
// import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddTreep from './pages/AddTreep';

import api from '../api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <h1 className="App-title">treep</h1> */}
          {/* <NavLink to="/" exact>Home</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>} */}
          {/* {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>} */}
          {/* <NavLink to="/secret">Secret</NavLink> */}
        </header>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/home" component={Home} />
          <Route path="/treeps/add" component={AddTreep} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
