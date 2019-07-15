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
      pickedCoords: null,
      newTreepCircle: null,
      newTreepCircleCenter: [-0.3763, 39.4699],
      newTreepCircleRadius: 3000,
      mapCenter: [-0.3763, 39.4699], // [lng,lat],
      treepCircleIsEditable: this.props.treepCircleIsEditable,
      treeps: []
    }
  }

  async initMap() {
    // This is a the default public token with read-only scopes. It can be shown to the client
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2FybG9zY2FkZWwiLCJhIjoiY2p5M3NpeWQxMGN5MTNnbzM2MW1jbDcyeCJ9.8ggod1kZoiXnKofrO_JzWQ'

    var map = await new mapboxgl.Map({
      container: this.state.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.state.mapCenter, // [lng,lat]
      zoom: 12
    })

    this.setState({
      map
    })

    this.state.map.on('click', e => {
      this.setState({
        newTreepCircleCenter: [e.lngLat.lng, e.lngLat.lat]
      })
      this.drawNewTreepCircle()
    })
  }

  addMapGeocoder() {
    this.state.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    )
  }

  createNewTreepCircle = () => {
    const newTreepCircle = new MapboxCircle(
      this.state.newTreepCircleCenter,
      this.state.newTreepCircleRadius,
      {
        editable: this.props.treepCircleIsEditable,
        minRadius: 100,
        maxRadius: 25000,
        fillColor: '#29AB87',
        strokeOpacity: 0
      }
    )
    if (this.props.treepCircleIsEditable) {
      newTreepCircle
        .on('centerchanged', circleObj => {
          this.setState({
            newTreepCircleCenter: circleObj.getCenter(),
            newTreepCircle: newTreepCircle
          })
          this.props.onTreepCircleChange(newTreepCircle)
        })
        .on('radiuschanged', circleObj => {
          this.setState({
            newTreepCircleRadius: circleObj.getRadius(),
            newTreepCircle: newTreepCircle
          })
          this.props.onTreepCircleChange(newTreepCircle)
        })
      this.props.onTreepCircleChange(newTreepCircle)
    }
    this.setState({ newTreepCircle })
    return newTreepCircle
  }

  drawNewTreepCircle = () => {
    this.state.newTreepCircle && this.state.newTreepCircle.remove()
    this.createNewTreepCircle().addTo(this.state.map)
  }

  async componentDidMount() {
    await this.initMap()
    this.addMapGeocoder()
    this.drawNewTreepCircle()
  }

  render() {
    const mapStyle = { width: '100%', height: '100%' }
    return (
      <div className='mapbox-container'>
        <div ref={this.state.mapRef} style={mapStyle} />
      </div>
    )
  }
}

export default Mapbox
