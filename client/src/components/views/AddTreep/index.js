//----------
// AddTreep View
//----------
import React, { Component } from 'react'
import api from '../../../api'
import Calendar from 'react-calendar'
import Mapbox from '../../partials/Mapbox'

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _ownerId: '',
      name: '',
      treepName: '',
      startDate: '',
      endDate: '',
      hideMe: false,
      initialMapCenter: [-0.3763, 39.4699]
    }
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
          <label>Name your treep</label>
          <input
            name='treep-name'
            onChange={e => this.handleInputChange('treepName', e)}
          />
          <Mapbox
            initialMapCenter={this.state.initialMapCenter}
            treepRadius={this.state.treepRadius}
          />
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
