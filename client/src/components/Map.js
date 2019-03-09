import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import MapboxCircle from 'mapbox-gl-circle'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Map extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.map = null
    this.draw = null
    this.markers = []
    this.clusterRadius = 200
  }

  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.mapCenter, // lng,lat
      zoom: 10
    })
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    })
    this.map.addControl(this.draw)

    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }))

    this.map.on('load', () => {
      this.map.addSource('treeps', {
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

    var myCircle0 = new MapboxCircle({ lat: 40, lng: 0 }, 10000, {
      editable: false,
      minRadius: 5000,
      fillColor: '#29AB87',
      strokeWeight: 0
    }).addTo(this.map)

    var myCircle1 = new MapboxCircle({ lat: 40.03, lng: 0 }, 10000, {
      editable: false,
      minRadius: 5000,
      fillColor: '#29AB87',
      strokeWeight: 0
    }).addTo(this.map)

    var myCircle3 = new MapboxCircle({ lat: 40.05, lng: 0.05 }, 10000, {
      editable: false,
      minRadius: 5000,
      fillColor: '#29AB87',
      strokeWeight: 0
    }).addTo(this.map)

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
  handleItemSelection() {
    this.map.setCenter(this.props.mapCenter)
  }
  componentDidMount() {
    this.initMap()
  }
  render() {
    return <div ref={this.mapRef} className='map' style={{ width: 400, height: 400 }} />
  }
}

export default Map
