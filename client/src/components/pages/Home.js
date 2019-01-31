import React, { Component } from 'react';
import TripCard from '../TripCard';
import BtnAdd from '../BtnAdd';
import ContactBtn from '../ContactBtn';
import TripCardAdd from '../TripCardAdd';

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
              <p>Planning my trip to Myanmar and Thailand for February!!</p>
            </div>
          </div>
        </div>
        <div className="separator-div">
        </div>
        <section className="trips-section"> 
          <div className="trips-title-div">
            <h4>Treeps</h4>
            {/* <BtnAdd /> */}
          </div>
          <div className="trip-cards-slider">
            <TripCard />
            <TripCard />
            <TripCard />

            <TripCardAdd />
          </div>
        </section>
        <div className="separator-div">
        </div>
        <section className="contacts-section"> 
          <div className="contacts-title-div">
            <h4>Contacts</h4>
          </div>
          <div className="contacts-slider">
            <ContactBtn />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
