import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  width: '500px',
  height: '500px'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 39.4697495,
          lng: -0.37739
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer)
