//----------
// AddTreep View
//----------
import React, { Component } from 'react'
import api from '../../api'
import Calendar from 'react-calendar'
import Mapbox from '../partials/Mapbox'

export default class AddTreep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _ownerId: '',
      name: '',
      treepName: '',
      treepCircle: null,
      startDate: '',
      endDate: ''
    }
  }

  handleInputChange(stateFieldName, e) {
    this.setState({
      [stateFieldName]: e.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      _ownerId: this.state._ownerId,
      name: this.state.treepName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      location: {
        coordinates: [...this.state.treepCircle._currentCenterLngLat],
        radius: this.state.treepCircle._currentRadius
      }
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

  onTreepCircleChange = newTreepCircle => {
    this.setState({
      treepCircle: newTreepCircle
    })
    console.log(this.state.treepCircle)
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
            treepCircleIsEditable={true}
            onTreepCircleChange={this.onTreepCircleChange}
          />
          <br />
          <Calendar onChange={this.onDatesRangeChange} selectRange={true} />
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
