import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import 'mapbox-gl/dist/mapbox-gl.css' // Import of Mapbox CSS
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
// import registerServiceWorker from './registerServiceWorker';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2FybG9zY2FkZWwiLCJhIjoiY2pzeDlka3VrMHE5MjQ0cDR5MDhmeHZ4biJ9.8q5OGaKuUavLJgLkXLR8NA'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
// registerServiceWorker();
