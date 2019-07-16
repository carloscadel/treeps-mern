//----------
// TreepDetail View
//----------
import React, { Component } from 'react'
import api from '../../api'
import Mapbox from '../partials/Mapbox'
import { humanizeDate } from '../../helpers/date-formatters'

export default class TreepDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treepUsers: [],
      initialMapCenter: [-0.3763, 39.4699],
      treep: null
    }
  }

  handleTreepDelete = () => {
    api
      .deleteTreep(this.props.match.params.id)
      .then(res => console.log('Treep deleted'))
      .catch(err => console.log(err))
  }

  getTreepMetadata() {
    api
      .getTreepMetadata(this.props.match.params.id)
      .then(treepUsers => {
        this.setState({
          treepUsers: [...treepUsers]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getTreepMetadata()
    api.getOneTreepById(this.props.match.params.id).then(treep => {
      console.log(treep)
      this.setState({
        treep
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.treep && <h4>{this.state.treep.name}</h4>}
        {this.state.treep && (
          <p>
            {humanizeDate(this.state.treep.startDate, "dddd D MMM 'YY")} -{' '}
            {humanizeDate(this.state.treep.endDate, "dddd D MMM 'YY")}
          </p>
        )}
        {this.state.treep && (
          <Mapbox
            treep={this.state.treep}
            treepCircleIsEditable={false}
            mapCenter={this.state.treep.location.coordinates}
            treepCircleCenter={this.state.treep.location.coordinates}
            treepCircleRadius={this.state.treep.location.radius}
          />
        )}
        <button onClick={this.handleTreepDelete}>
          Delete treep<i className='material-icons'>delete_outline</i>
        </button>
      </div>
    )
  }
}
