//----------
// Home View
//----------
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BtnAdd from '../../partials/BtnAdd'
import ContactBtn from '../../partials/ContactBtn'
import api from '../../../api'
import HomeHeader from '../../partials/HomeHeader'
import HomeTreepsBoard from '../../partials/HomeTreepsBoard'
import { connect } from 'react-redux'
import { addArticle } from '../../../redux/actions'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeps: [],
      user: null
    }
  }
  getCurrentUserAndTreeps() {
    api.getCurrentUser().then(user => {
      this.setState(
        {
          user
        },
        this.getUserTreeps(user._id)
      )
    })
  }
  getUserTreeps(userId) {
    api
      .getUserTreeps(userId)
      .then(treeps => {
        this.setState({
          treeps
        })
      })
      .catch(err => console.log(err))
  }
  submitUserStatus = userStatus => {
    api.changeUserStatus({
      _userId: this.state.user._id,
      currentUserStatus: userStatus
    })
    document.activeElement.blur()
  }
  componentDidMount() {
    this.getCurrentUserAndTreeps()
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
        <HomeHeader
          user={this.state.user}
          onUserStatusSubmit={this.submitUserStatus}
        />
        <div className='separator-div' />
        <section className='trips-section'>
          <div className='trips-title-div'>
            <h4>Treeps</h4>
            <Link to={`/${this.state.user.username}/treeps/add`}>
              <BtnAdd />
            </Link>
          </div>
          <HomeTreepsBoard treeps={this.state.treeps} user={this.state.user} />
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
