import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxCircle from 'mapbox-gl-circle'

class Mapbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRef: React.createRef(),
      map: null,
      marker: null,
      mapCenter: this.props.initialMapCenter, // [lng,lat]
      treeps: []
    }
  }

  async initMap() {
    // This is a the default public token with read-only scopes. It can be shown to the client
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2FybG9zY2FkZWwiLCJhIjoiY2p5M3NpeWQxMGN5MTNnbzM2MW1jbDcyeCJ9.8ggod1kZoiXnKofrO_JzWQ'

    // Embed the map where "this.mapRef" is defined in the render
    var map = await new mapboxgl.Map({
      container: this.state.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.state.mapCenter, // [lng,lat]
      zoom: 13
    })

    this.setState({
      map
    })

    this.state.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      })
    )

    this.state.map.on('move', e => {
      this.setState({
        mapCenter: [map.getCenter().lng, map.getCenter().lat]
      })
      this.handleMarker()
    })
  }
  getMapCenter = () => {
    return this.state.map.getCenter()
  }
  handleMarker = () => {
    if (this.state.marker) {
      this.state.marker.remove()
    }
    const marker = new mapboxgl.Marker()
      .setLngLat(this.state.mapCenter)
      .addTo(this.state.map)
    this.setState({ marker })
  }
  drawTreeps = () => {
    var treepRadius = new MapboxCircle(this.state.mapCenter, 5000, {
      //[lng, lat]
      editable: false,
      minRadius: 100,
      maxRadius: 25000,
      fillColor: '#29AB87',
      strokeOpacity: 0
    }).addTo(this.state.map)
  }
  async componentDidMount() {
    await this.initMap()
    await this.drawTreeps()
  }

  render() {
    console.log(this.state.map)
    const mapStyle = { width: '100%', height: '100%' }
    return (
      <div className='mapbox-container'>
        <div ref={this.state.mapRef} style={mapStyle} />
      </div>
    )
  }
}

export default Mapbox
