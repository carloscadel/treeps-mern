import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ContactBtn from '../partials/ContactBtn'
import api from '../../api'
import HomeHeader from '../molecules/HomeHeader'
import HomeCollsBoard from '../partials/HomeCollsBoard'
import HomeTreepsBoard from '../partials/HomeTreepsBoard'
import AddCollectionModal from '../partials/AddCollectionModal'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeps: [],
      colls: [],
      user: null,
      showAddCollectionModal: false
    }
  }

  async getCurrentUser() {
    await api.getCurrentUser().then(user => {
      this.setState({
        user
      })
    })
  }

  async getUserTreeps() {
    await api
      .getUserTreeps(this.state.user._id)
      .then(treeps => {
        this.setState({
          treeps
        })
      })
      .catch(err => console.log(err))
  }

  async getUserCollections() {
    await api
      .getUserCollections(this.state.user._id)
      .then(colls => {
        this.setState({ colls })
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

  openModal = () => {
    this.setState({ showAddCollectionModal: true })
  }

  afterOpenModal = () => {}

  closeModal = () => {
    this.setState({ showAddCollectionModal: false })
  }

  createCollection = name => {
    api
      .addNewCollection({ name: name, _ownerId: this.state.user._id })
      .then(res => this.getUserCollections())
      .catch(err => console.log(err))
  }

  async componentDidMount() {
    await this.getCurrentUser()
    await this.getUserTreeps()
    await this.getUserCollections()
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
        <section className='colls-section'>
          <div className='trips-title-div'>
            <h4>Treep Collections</h4>
            <button onClick={this.openModal}>
              <i className='material-icons'>library_add</i>
            </button>
          </div>
          <AddCollectionModal
            isOpen={this.state.showAddCollectionModal}
            closeModal={this.closeModal}
            handleSubmit={this.createCollection}
          />
          <br />
          <HomeCollsBoard colls={this.state.colls} user={this.state.user} />
        </section>
        <div className='separator-div' />
        <section className='trips-section'>
          <div className='trips-title-div'>
            <h4>Treeps</h4>
            <Link to={`/${this.state.user.username}/treeps/add`}>
              <i className='material-icons'>library_add</i>
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

export default Home
