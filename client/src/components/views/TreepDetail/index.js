//----------
// TreepDetail View
//----------
import React, { Component } from 'react'
import api from '../../../api'
import Mapbox from '../../partials/Mapbox'
import { humanizeDate } from '../../../helpers/date-formatters'

export default class Treep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      treepUsers: [],
      initialMapCenter: [-0.3763, 39.4699]
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
    api.getOneTreepById(this.props.match.params.id).then(res => {
      this.setState({
        name: res.name,
        startDate: res.startDate,
        endDate: res.endDate
      })
    })
  }
  render() {
    return (
      <div>
        <h4>{this.state.location}</h4>
        <p>
          {humanizeDate(this.state.startDate, "dddd D MMM 'YY")} -{' '}
          {humanizeDate(this.state.endDate, "dddd D MMM 'YY")}
        </p>
        <Mapbox treepCircleIsEditable={false} />
        <button onClick={this.handleTreepDelete}>
          Delete treep<i className='material-icons'>delete_outline</i>
        </button>
      </div>
    )
  }
}
