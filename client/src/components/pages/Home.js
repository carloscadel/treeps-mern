import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TreepCard from '../TreepCard';
import BtnAdd from '../BtnAdd';
import ContactBtn from '../ContactBtn';
import api from '../../api';
import HomeHeader from '../partials/HomeHeader';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeps: [],
      userId: "",
      username: "",
      userStatus: ""
    }
  }
  handleClick(e) {
    e.preventDefault()
    api.postTreeps(this.state.userId)
    .then(treeps => {
      console.log('success')
    })
  }
  componentDidMount() {
    api.getCurrentUser()
    .then(user => {
      this.setState({
        userId: user._id,
        username: user.username,
        userStatus: user.userStatus,
        treeps: user.treeps
      })
    })
    // api.getTreeps()
    // .then(treeps => {
    //   this.setState({
    //     treeps: treeps
    //   })
    // })
  }

  render() {  
    // if (!this.state.user) {
    //   return <div>Please <a href="/login">login</a> or <a href="/signup">signup</a></div>    
    // }     
    return (
      <div className="Home">
        <HomeHeader />
        <div className="separator-div">
        </div>
        <section className="trips-section"> 
          <div className="trips-title-div">
            <h4>Treeps</h4>
            <Link to="/treeps/add" ><BtnAdd /></Link>
          </div>
          <div className="trip-cards-slider">
            {this.state.treeps.map(treep => 
              <a key={treep._id} href={"/treeps/" + treep._id} >
                <TreepCard  
                  location={treep.location} 
                  startDate={treep.startDate} 
                  endDate={treep.endDate} 
                  formattedDates={treep.formattedDates}
                />
              </a> 
            )}
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