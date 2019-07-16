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
      treepCircle: null,
      treepCircleCenter: [-0.3763, 39.4699],
      treepCircleRadius: 3000,
      mapCenter: [-0.3763, 39.4699], // [lng,lat],
      mapZoom: 1,
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
      style: 'mapbox://styles/mapbox/dark-v10',
      center: this.state.mapCenter, // [lng,lat]
      zoom: this.state.mapZoom,
      attributionControl: false
    }).addControl(
      new mapboxgl.AttributionControl({
        compact: true
      })
    )

    this.setState({
      map
    })

    this.props.treepCircleIsEditable &&
      this.state.map.on('click', e => {
        this.setState({
          treepCircleCenter: [e.lngLat.lng, e.lngLat.lat]
        })
        this.drawtreepCircle()
      })
  }

  addMapGeocoder() {
    this.state.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
      })
    )
  }

  createtreepCircle = () => {
    const treepCircle = new MapboxCircle(
      this.state.treepCircleCenter,
      this.state.treepCircleRadius,
      {
        editable: this.props.treepCircleIsEditable,
        minRadius: 100,
        maxRadius: 15000,
        fillColor: '#29AB87',
        strokeOpacity: 0
      }
    )
    if (this.props.treepCircleIsEditable) {
      treepCircle
        .on('centerchanged', circleObj => {
          this.setState({
            treepCircleCenter: circleObj.getCenter(),
            treepCircle: treepCircle
          })
          this.props.onTreepCircleChange(treepCircle)
        })
        .on('radiuschanged', circleObj => {
          this.setState({
            treepCircleRadius: circleObj.getRadius(),
            treepCircle: treepCircle
          })
          this.props.onTreepCircleChange(treepCircle)
        })
      this.props.onTreepCircleChange(treepCircle)
    }
    this.setState({ treepCircle })
    return treepCircle
  }

  drawtreepCircle = () => {
    this.state.treepCircle && this.state.treepCircle.remove()
    this.createtreepCircle().addTo(this.state.map)
  }

  async componentDidMount() {
    this.props.treep &&
      (await this.setState({
        mapCenter: this.props.treep.location.coordinates,
        treepCircleCenter: this.props.treep.location.coordinates,
        treepCircleRadius: this.props.treep.location.radius,
        mapZoom: 12
      }))
    await this.initMap()
    await this.addMapGeocoder()
    await this.drawtreepCircle()
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
