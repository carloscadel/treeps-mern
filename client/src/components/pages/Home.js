import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {                
    return (
      <div className="Home">
        <div className="header-div">
          <div className="header-prof-pic-div">
            <img className="header-prof-pic" src="Carlos.jpeg" alt="Profile" />
          </div>
          <div className="header-prof-text-div">
            <div className="header-prof-text-name-div">
              <h3>Carlos, 35</h3>
            </div>
            <div className="header-prof-text-status-div">
              <h4>Planning my trip to Myanmar and Thailand for February!!</h4>
            </div>
          </div>
        </div>
        <div className="separator-div">
        </div>
        <section>

        </section>
      </div>
    );
  }
}

export default Home;
