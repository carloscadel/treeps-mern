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
      newTreepMarker: null,
      newTreepCircle: null,
      newTreepCircleCenter: this.props.initialMapCenter,
      newTreepCircleRadius: 1000,
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

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    )

    map.on('click', e => {
      this.setState({
        newTreepCircleCenter: [e.lngLat.lng, e.lngLat.lat]
      })
      this.drawNewTreepMarker()
      this.drawTreepCircle()
    })

    this.setState({
      map
    })
  }

  drawNewTreepMarker = () => {
    this.state.newTreepMarker && this.state.newTreepMarker.remove()

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(this.state.newTreepCircleCenter)
      .addTo(this.state.map)
    marker.on('dragend', e => {
      this.setState({
        newTreepCircleCenter: [marker.getLngLat().lng, marker.getLngLat().lat]
      })
      this.drawTreepCircle()
    })
    this.setState({ newTreepMarker: marker })
  }

  drawTreepCircle = () => {
    this.state.newTreepCircle && this.state.newTreepCircle.remove()

    const newTreepCircle = new MapboxCircle(
      this.state.newTreepCircleCenter,
      this.state.newTreepCircleRadius,
      {
        editable: true,
        minRadius: 100,
        maxRadius: 25000,
        fillColor: '#29AB87',
        strokeOpacity: 0
      }
    ).addTo(this.state.map)
    newTreepCircle.on('centerchanged', circleObj => {
      this.setState({ newTreepCircleCenter: circleObj.getCenter() })
    })
    newTreepCircle.on('radiuschanged', circleObj => {
      this.setState({ newTreepCircleRadius: circleObj.getRadius() })
    })
    this.setState({ newTreepCircle })
  }

  handleInputChange(stateFieldName, e) {
    this.setState(
      {
        [stateFieldName]: e.target.value
      },
      () => {
        if (stateFieldName === 'newTreepCircleRadius') {
          this.drawTreepCircle()
        }
      }
    )
  }

  async componentDidMount() {
    await this.initMap()
    this.drawTreepCircle()
    this.drawNewTreepMarker()
  }

  render() {
    const mapStyle = { width: '100%', height: '100%' }
    return (
      <div className='mapbox-container'>
        <label>Radius</label>
        <input
          name='treep-radius'
          onChange={e => this.handleInputChange('newTreepCircleRadius', e)}
        />
        <div ref={this.state.mapRef} style={mapStyle} />
      </div>
    )
  }
}

export default Mapbox
