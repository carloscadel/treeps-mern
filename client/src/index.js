import React from 'react'
import ReactDOM from 'react-dom'
// import './styles/index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import { ThemeProvider } from 'styled-components'
import theme from './components/themes/default'
import './components/themes/reset.css'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)
// registerServiceWorker();
