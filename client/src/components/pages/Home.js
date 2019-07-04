import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TreepCard from '../TreepCard'
import BtnAdd from '../BtnAdd'
import ContactBtn from '../ContactBtn'
import api from '../../api'
import HomeHeader from '../partials/HomeHeader.jsx'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeps: [],
      user: null,
      userId: '',
      username: '',
      userStatus: ''
    }
  }

  getUserTreeps() {
    api
      .getUserTreeps()
      .then(treeps => {
        this.setState({
          treeps: treeps
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    api.getCurrentUser().then(user => {
      this.setState({
        user: user,
        userId: user._id,
        username: user.username,
        userStatus: user.userStatus
      })
    })
    this.getUserTreeps()
  }

  render() {
    if (!this.state.user) {
      return (
        <div>
          Please <a href='/login'>Login</a> or <a href='/signup'>Signup</a>
        </div>
      )
    }
    return (
      <div className='Home'>
        <HomeHeader user={this.state.user} />
        <div className='separator-div' />
        <section className='trips-section'>
          <div className='trips-title-div'>
            <h4>Treeps</h4>
            <Link to={'/' + this.state.username + '/treeps/add'}>
              <BtnAdd />
            </Link>
          </div>
          <div className='trip-cards-slider'>
            {this.state.treeps.map(treep => (
              <a key={treep._id} href={'/' + this.state.username + '/treeps/' + treep._id}>
                <TreepCard location={treep.location} startDate={treep.startDate} endDate={treep.endDate} formattedDates={treep.formattedDates} />
              </a>
            ))}
          </div>
        </section>
        <div className='separator-div' />
        <section className='contacts-section'>
          <div className='contacts-title-div'>
            <h4>Contacts</h4>
          </div>
          <div className='contacts-slider'>
            <ContactBtn />
          </div>
        </section>
      </div>
    )
  }
}

export default Home
