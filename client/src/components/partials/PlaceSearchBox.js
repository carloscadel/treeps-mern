import React, { Component } from 'react'
import api from '../../api'

export default class PlaceSearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
      searchInput: '',
      autocomplete: true,
      suggestions: null
    }
  }

  onInputChange = e => {
    this.setState(
      {
        searchInput: e.target.value
      },
      () => {
        if (this.state.searchInput !== '') {
          this.apiSearch()
        }
      }
    )
  }

  apiSearch = () => {
    api
      .getMapboxSearchSuggestions(this.state.searchInput)
      .then(suggestions => {
        this.setState({ suggestions: [...suggestions] })
      }, console.log(this.state.suggestions))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <input
          type='text'
          autoComplete='off'
          placeholder='Where are you going?'
          name='searchInput'
          value={this.state.searchInput}
          onChange={this.onInputChange}
        />
        <div id='results-list'>
          <ul>
            {this.state.suggestions !== null &&
              this.state.suggestions.map(el => (
                <li key={el.id}>{/* <a href='#'>{el.place_name}</a> */}</li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}
