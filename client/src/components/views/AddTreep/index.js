import React, { Component } from 'react'
import api from '../../../api'
import Calendar from 'react-calendar'
import PlaceSearchBox from '../../partials/PlaceSearchBox'

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _ownerId: '',
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      formattedDates: '',
      hideMe: false,
      value: null
    }
  }
  onSelect = value => {
    this.setState({ value: value })
  }
  handleInputChange(stateFieldName, e) {
    if (stateFieldName === 'hideMe') {
      this.setState({
        hideMe: !this.state.hideMe
      })
    } else {
      this.setState({
        [stateFieldName]: e.target.value
      })
    }
  }
  handleClick(e) {
    e.preventDefault()
    let data = {
      _ownerId: this.state._ownerId,
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hideMe: this.state.hideMe
    }
    api
      .addTreep(data)
      .then(res => {
        console.log('New treep created')
      })
      .catch(err => {
        console.log('Error')
      })
  }
  onDatesRangeChange = date => {
    this.setState({
      startDate: date[0],
      endDate: date[1]
    })
  }
  componentDidMount() {
    api.getCurrentUser().then(user => {
      this.setState({
        _ownerId: user._id
      })
    })
  }
  render() {
    return (
      <div>
        <form>
          <label>Location</label>
          <input
            name='location'
            onChange={e => this.handleInputChange('location', e)}
          />
          <PlaceSearchBox />
          <br />
          <Calendar onChange={this.onDatesRangeChange} selectRange={true} />
          <label>Hide me</label>
          <input
            type='checkbox'
            checked={this.state.hideMe}
            onChange={e => this.handleInputChange('hideMe', e)}
          />
          <br />
          <button
            className='btn-add'
            type='submit'
            onClick={e => this.handleClick(e)}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}