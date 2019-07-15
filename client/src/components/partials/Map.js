import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
// import MapboxCircle from 'mapbox-gl-circle'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRef: React.createRef(),
      map: null,
      markers: [],
      clusterRadius: 0,
      geocoderResultId: null
    }
  }

  async initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    var map = await new mapboxgl.Map({
      container: this.state.mapRef.current,
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.mapCenter, // lng,lat
      zoom: 10
    })
    this.setState({
      map
    })

    this.state.map.addControl(
      new MapboxGeocoder({
        accessToken:
          'pk.eyJ1IjoiY2FybG9zY2FkZWwiLCJhIjoiY2p0Mzc3dnhtMG9nYjQzcGcwcmt1NjVsdSJ9.9CPXMbZlkZGjNFmFMWCMCQ'
      }).on('result', res => {
        // Avoid the issue consisting on the result being invoked twice
        if (this.state.geocoderResultId !== res.result.id) {
          this.setState({
            geocoderResultId: res.result.id
          })
        }
      })
    )
    // The following is just some sample data
    this.state.map.on('load', () => {
      this.state.map.addSource('treeps', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              clusterRadius: 5000,
              geometry: {
                type: 'Point',
                coordinates: [1, 40.506229]
              }
            },
            {
              type: 'Feature',
              clusterRadius: 10000,
              geometry: {
                type: 'Point',
                coordinates: [-1, 40.488084]
              }
            },
            {
              type: 'Feature',
              clusterRadius: 7000,
              geometry: {
                type: 'Point',
                coordinates: [-2, 40.488737]
              }
            }
          ]
        }
      })
    })

    // var myCircle0 = new MapboxCircle({ lat: 40, lng: 0 }, 10000, {
    //   editable: false,
    //   minRadius: 5000,
    //   fillColor: '#29AB87',
    //   strokeWeight: 0
    // }).addTo(this.state.map)

    // var myCircle1 = new MapboxCircle({ lat: 40.03, lng: 0 }, 15000, {
    //   editable: false,
    //   minRadius: 5000,
    //   fillColor: '#29AB87',
    //   strokeWeight: 0
    // }).addTo(this.state.map)

    // var myCircle3 = new MapboxCircle({ lat: 40.05, lng: 0.05 }, 20000, {
    //   editable: false,
    //   minRadius: 5000,
    //   fillColor: '#29AB87',
    //   strokeWeight: 0
    // }).addTo(this.state.map)

    // myCircle.on('centerchanged', function(circleObj) {
    //   console.log('New center:', circleObj.getCenter())
    // })
    // myCircle.once('radiuschanged', function(circleObj) {
    //   console.log('New radius (once!):', circleObj.getRadius())
    // })
    // myCircle.on('click', function(mapMouseEvent) {
    //   console.log('Click:', mapMouseEvent.point)
    // })
    // myCircle.on('contextmenu', function(mapMouseEvent) {
    //   console.log('Right-click:', mapMouseEvent.lngLat)
    // })

    // for (let i = 0; i < 2; i++) {
    //   this.markers.push(
    //     new mapboxgl.Marker({ color: 'blue' })
    //       .setLngLat(this.props.mapCenter)
    //       .on('click', () => {
    //         console.log('clicked')
    //       })
    //       .addTo(this.map)
    //   )
    // }
  }

  componentDidMount() {
    this.initMap()
  }

  render() {
    return (
      <div
        ref={this.state.mapRef}
        className='map'
        style={{ width: 400, height: 400 }}
      />
    )
  }
}

export default Map
