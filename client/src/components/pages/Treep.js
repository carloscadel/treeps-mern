import React, { Component } from 'react'
import api from '../../api';

export default class Treep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      formattedDates: ""
    }
  }
  handleTreepDelete = () => {
    api.deleteTreep(this.props.match.params.id)
    .then(res => console.log('Treep deleted'))
  }
  componentDidMount() {
    api.getOneTreep(this.props.match.params.id)
    .then(res => {
      this.setState({
        location: res.location,
        startDate: res.startDate,
        endDate: res.endDate,
        formattedDates:res.formattedDates
      })
    })
  }
  render() {
    return (
      <div>
        <h4>{this.state.location}</h4>
        <p>{this.state.formattedDates}</p>
        <button onClick={this.handleTreepDelete} >Delete treep</button>
      </div>
    )
  }
}
