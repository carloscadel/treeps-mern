import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BtnAdd from '../../partials/BtnAdd'
import ContactBtn from '../../partials/ContactBtn'
import api from '../../../api'
import HomeHeader from '../../partials/HomeHeader.jsx'
import HomeTreepsBoard from '../../partials/HomeTreepsBoard'
import { connect } from 'react-redux'
import { addArticle } from '../../../redux/actions'

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
          <HomeTreepsBoard
            treeps={this.state.treeps}
            username={this.state.username}
          />
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

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => {
      dispatch(addArticle(article))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
