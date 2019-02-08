import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TreepCard from '../TreepCard';
import BtnAdd from '../BtnAdd';
import ContactBtn from '../ContactBtn';
import api from '../../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeps: [],
      username: "",
      userStatus: ""
    }
    // console.log(this.state.user)
  }
  handleClick(e) {
    e.preventDefault()
    api.postTreeps()
    .then(treeps => {
      console.log('success')
    })
  }
  
  componentDidMount() {
    api.getCurrentUser()
    .then(user => {
      this.setState({
        username: user.username,
        userStatus: user.userStatus
      })
    })
    api.getTreeps()
    .then(treeps => {
      this.setState({
        treeps: treeps
      })
    })
  }

  render() {  
    // if (!this.state.user) {
    //   return <div>Please <a href="/login">login</a> or <a href="/signup">signup</a></div>    
    // }     
    console.log(this.props.user)
    return (
      <div className="Home">
        <div className="header-div">
          <div className="header-prof-pic-div">
            <img className="header-prof-pic" src="Carlos.jpeg" alt="Profile" />
          </div>
          <div className="header-prof-text-div">
            <div className="header-prof-text-name-div">
              <h3>{this.state.username}</h3>
            </div>
            <div className="header-prof-text-status-div">
            <form>
              <p><input type="text" value={this.state.userStatus} /></p>

            </form>
            </div>
          </div>
        </div>
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