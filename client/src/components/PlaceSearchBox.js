import React, { Component } from 'react'
import axios from 'axios'

export default class PlaceSearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
      searchInput: '',
      access_token: 'pk.eyJ1IjoiY2FybG9zY2FkZWwiLCJhIjoiY2p0Mzc3dnhtMG9nYjQzcGcwcmt1NjVsdSJ9.9CPXMbZlkZGjNFmFMWCMCQ',
      autocomplete: true,
      resultsList: null
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
    axios.get(this.state.baseURL + this.state.searchInput + '.json?access_token=' + this.state.access_token + '&autocomplete=true&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cpoi%2Cneighborhood%2Caddress').then(res => {
      this.setState({
        resultsList: [...res.data.features]
      })
      console.log(this.state.resultsList)
    })
  }

  render() {
    return (
      <div>
        <input type='text' autoComplete='off' placeholder='Where are you going?' name='searchInput' value={this.state.searchInput} onChange={this.onInputChange} />
        <div id='results-list'>
          <ul>
            {this.state.resultsList !== null &&
              this.state.resultsList.map(el => (
                <li key={el.id}>
                  <a href='#'>{el.place_name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}
