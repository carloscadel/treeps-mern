import React, { Component } from 'react'
import api from '../../api'

export default class Treep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      formattedDates: '',
      treepUsers: []
    }
  }

  handleTreepDelete = () => {
    api
      .deleteTreep(this.props.match.params.id)
      .then(res => console.log('Treep deleted'))
      .catch(err => console.log(err))
  }

  getTreepUsers() {
    api
      .getTreepUsers()
      .then(treepUsers => {
        this.setState({
          treepUsers
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    api.getOneTreep(this.props.match.params.id).then(res => {
      this.setState({
        location: res[0].location,
        startDate: res[0].startDate,
        endDate: res[0].endDate,
        formattedDates: res[0].formattedDates
      })
    })
  }
  render() {
    return (
      <div>
        <h4>{this.state.location}</h4>
        <p>{this.state.formattedDates}</p>
        <button onClick={this.handleTreepDelete}>Delete treep</button>
      </div>
    )
  }
}
